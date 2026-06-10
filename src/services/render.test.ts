import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderFallbackMap,
  renderRecoveryLanes,
  renderRecoveryOverview,
  renderRecoveryPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderRecoveryOverview()).toContain("Board Decision Recovery Readiness Brief");
  });

  it("includes product-depth and portfolio context", () => {
    const html = renderRecoveryOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("board-decision-recovery-readiness-brief");
  });

  it("renders the recovery lanes route", () => {
    expect(renderRecoveryLanes()).toContain("/recovery-lanes");
  });

  it("renders the fallback map route", () => {
    expect(renderFallbackMap()).toContain("/fallback-map");
  });

  it("renders the recovery posture route", () => {
    expect(renderRecoveryPosture()).toContain("Composite recovery risk");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic decision-path-recovery data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
