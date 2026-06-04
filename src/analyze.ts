import type {
  BoardDecisionRecoveryReadinessBriefExport,
  BoardDecisionRecoveryReadinessBriefItem,
  BoardDecisionRecoveryReadinessBriefReportItem,
  RecoveryReadinessAssessment,
  RecoveryReadinessSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): RecoveryReadinessAssessment {
  let severity: RecoveryReadinessSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): RecoveryReadinessAssessment {
  let severity: RecoveryReadinessSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionRecoveryReadinessBriefItem[],
  options: { now?: string } = {}
): BoardDecisionRecoveryReadinessBriefExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionRecoveryReadinessBriefReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to recover the path without extra coordination debt.",
      "Decision handoffs are stretching recovery and may soon slow the fallback path.",
      "Decision handoffs are too long to trust in a recovery scenario."
    );

    const restoreAssessment = assessDelay(
      item.recoveryHoursToRestore,
      24,
      72,
      "The path can be restored inside a board-safe recovery window.",
      "Recovery time is slipping and may soon strain the next board cycle.",
      "Recovery time is too long to trust before the next board-facing cycle."
    );

    const escalationAssessment = assessDelay(
      item.escalationGaps,
      0,
      1,
      "Escalation gaps are low enough to keep recovery routing stable.",
      "Escalation gaps are starting to slow recovery.",
      "Escalation gaps are now overwhelming the recovery path."
    );

    const fallbackOwnerAssessment = assessStrength(
      item.fallbackOwnerCoverageScore,
      78,
      62,
      "Fallback ownership is strong enough to keep the path recoverable.",
      "Fallback ownership is uneven and may soon expose a recovery gap.",
      "Fallback ownership is too weak to support clean recovery."
    );

    const redundancyAssessment = assessStrength(
      item.pathRedundancyScore,
      78,
      62,
      "Path redundancy is strong enough to absorb a recovery event.",
      "Path redundancy is thinning and may soon expose a weak fallback path.",
      "Path redundancy is too weak to support another break-and-recover cycle."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the recovery path.",
      "Board confidence is becoming dependent on extra recovery explanation.",
      "Board confidence is too thin to trust this path after a break."
    );

    const compositeRecoveryRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.recoveryHoursToRestore / 4 +
          item.escalationGaps * 12 +
          (100 - item.fallbackOwnerCoverageScore) +
          (100 - item.pathRedundancyScore) +
          (100 - item.boardConfidenceScore)) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      restoreAssessment,
      escalationAssessment,
      fallbackOwnerAssessment,
      redundancyAssessment,
      confidenceAssessment,
      compositeRecoveryRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.restoreAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.fallbackOwnerAssessment.severity === "HIGH" ||
      item.redundancyAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const recoveryPriorityLanes = reportItems.filter(
    (item) => item.action === "BUILD_REDUNDANCY" || item.action === "ASSIGN_FALLBACK_OWNER"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Decision-path recovery readiness remains strong enough to support the current board packet."
      : constrainedLanes <= 2
        ? "A few lanes need fallback reinforcement before the next board cycle depends on recovery."
        : "Recovery readiness is now a shared board-facing constraint and should be reinforced across multiple paths."
    ;

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      recoveryPriorityLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionRecoveryReadinessBriefItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
