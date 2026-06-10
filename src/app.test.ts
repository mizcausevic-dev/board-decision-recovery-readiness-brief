import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-recovery-readiness-brief app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Recovery Readiness Brief");
    expect(response.text).toContain("Product depth");
    expect(response.text).toContain("What these repos have in common");
    expect(response.text).toContain("portfolio.kineticgain.com");
  });

  it("serves the recovery lanes route", async () => {
    const response = await request(app).get("/recovery-lanes");
    expect(response.status).toBe(200);
  });

  it("serves the fallback map route", async () => {
    const response = await request(app).get("/fallback-map");
    expect(response.status).toBe(200);
  });

  it("serves the recovery posture route", async () => {
    const response = await request(app).get("/recovery-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves the recovery lanes API", async () => {
    const response = await request(app).get("/api/recovery-lanes");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the fallback map API", async () => {
    const response = await request(app).get("/api/fallback-map");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
