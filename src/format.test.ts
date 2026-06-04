import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the recovery summary lines", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 4,
      recoveryPriorityLanes: 4,
      averageBoardConfidence: 60.5,
      valueAtStakeMillions: 141,
      leadingMessage: "Decision-path recovery needs reinforcement."
    });

    expect(output).toContain("Board Decision Recovery Readiness Brief");
    expect(output).toContain("Recovery-priority lanes: 4");
    expect(output).toContain("Decision-path recovery needs reinforcement.");
  });
});
