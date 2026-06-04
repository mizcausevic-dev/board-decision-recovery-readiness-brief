import { describe, expect, it } from "vitest";
import { fallbackMap, payload, recoveryLanes, recoveryPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the recovery readiness summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the recovery lanes view", () => {
    expect(recoveryLanes().length).toBeGreaterThan(0);
  });

  it("returns the fallback map view", () => {
    expect(fallbackMap().length).toBeGreaterThan(0);
  });

  it("returns the recovery posture view", () => {
    expect(recoveryPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
