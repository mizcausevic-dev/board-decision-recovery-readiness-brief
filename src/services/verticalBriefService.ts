import { analyze } from "../analyze.js";
import { sampleBoardDecisionRecoveryReadinessBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use procurement as the recovery reference path first, shorten the identity and AI restore windows second, add redundancy in revenue and biotech third, and buffer the FinTech lane before more committee load arrives."
  };
}

export function recoveryLanes() {
  return sampleBoardDecisionRecoveryReadinessBrief.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    recoveryTheme: item.recoveryTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    recoveryHoursToRestore: item.recoveryHoursToRestore
  }));
}

export function fallbackMap() {
  return sampleBoardDecisionRecoveryReadinessBrief.map((item) => ({
    lane: item.lane,
    readinessHeadline: item.readinessHeadline,
    recoverySignal: item.recoverySignal,
    weakestFallback: item.weakestFallback,
    recoveryMoves: item.recoveryMoves,
    recoveryHoursToRestore: item.recoveryHoursToRestore,
    escalationGaps: item.escalationGaps
  }));
}

export function recoveryPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRecoveryRiskScore: item.compositeRecoveryRiskScore,
    handoffs: item.handoffAssessment,
    restoreWindow: item.restoreAssessment,
    escalationGaps: item.escalationAssessment,
    fallbackOwners: item.fallbackOwnerAssessment,
    redundancy: item.redundancyAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeRecoveryRiskScore: item.compositeRecoveryRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-path-recovery data only - no live board packets, actual committee routes, or real restoration logs are included.",
    "Scores are modeled to show how Kinetic Gain can turn weak fallback ownership, thin redundancy, and long restore windows into board-readable recovery decisions.",
    "All routes are read-only and demonstrate board-facing recovery readiness, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    recoveryLanes: recoveryLanes(),
    fallbackMap: fallbackMap(),
    recoveryPosture: recoveryPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionRecoveryReadinessBrief
  };
}
