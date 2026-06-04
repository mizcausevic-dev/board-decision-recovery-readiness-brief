import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionRecoveryReadinessBrief } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionRecoveryReadinessBriefItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionRecoveryReadinessBrief.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts recovery-priority lanes", () => {
    const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.recoveryPriorityLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(141);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.items).toBe(0);
    expect(report.summary.averageBoardConfidence).toBe(0);
    expect(report.summary.leadingMessage).toContain("remains strong enough");
  });

  it("hits low and medium recovery branches explicitly", () => {
    const fixtures: BoardDecisionRecoveryReadinessBriefItem[] = [
      {
        id: "low-branch",
        lane: "Low branch lane",
        track: "PROCUREMENT",
        action: "BUILD_REDUNDANCY",
        recoveryTheme: "Low strain path.",
        boardQuestion: "Can the path recover quickly?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        readinessHeadline: "Low branch is healthy.",
        recoverySignal: "Path is recoverable.",
        weakestFallback: "None immediate",
        recoveryMoves: ["path log"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        decisionHandoffs: 2,
        recoveryHoursToRestore: 12,
        escalationGaps: 0,
        fallbackOwnerCoverageScore: 82,
        pathRedundancyScore: 80,
        boardConfidenceScore: 79,
        valueAtStakeMillions: 5,
        headline: "Healthy recovery path.",
        narrative: "Low branch test.",
        nextMove: "Keep the path buffered."
      },
      {
        id: "medium-branch",
        lane: "Medium branch lane",
        track: "IDENTITY",
        action: "SHORTEN_RECOVERY",
        recoveryTheme: "Medium strain path.",
        boardQuestion: "Where are the first recovery bottlenecks?",
        owner: "Security owner",
        audience: "Audit committee",
        currentPosture: "Watch state.",
        readinessHeadline: "Medium branch is watch-listed.",
        recoverySignal: "Recovery drag is building.",
        weakestFallback: "Escalation collision",
        recoveryMoves: ["gap log"],
        relatedSurfaces: ["certs.kineticgain.com"],
        companyTags: ["Okta"],
        decisionHandoffs: 4,
        recoveryHoursToRestore: 48,
        escalationGaps: 1,
        fallbackOwnerCoverageScore: 70,
        pathRedundancyScore: 68,
        boardConfidenceScore: 65,
        valueAtStakeMillions: 7,
        headline: "Watch the recovery path.",
        narrative: "Medium branch test.",
        nextMove: "Reduce friction."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-01T00:00:00Z" });
    expect(report.items[0].handoffAssessment.severity).toBe("LOW");
    expect(report.items[0].fallbackOwnerAssessment.severity).toBe("LOW");
    expect(report.items[1].handoffAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].restoreAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].fallbackOwnerAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("remains strong enough");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionRecoveryReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.items).toBe(sampleBoardDecisionRecoveryReadinessBrief.length);
  });
});
