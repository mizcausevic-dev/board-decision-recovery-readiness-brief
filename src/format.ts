import type { BoardDecisionRecoveryReadinessBriefSummary } from "./types.js";

export function formatSummary(
  summary: BoardDecisionRecoveryReadinessBriefSummary,
  title = "Board Decision Recovery Readiness Brief"
) {
  return [
    title,
    `Generated lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Recovery-priority lanes: ${summary.recoveryPriorityLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
