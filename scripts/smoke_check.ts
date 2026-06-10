import assert from "node:assert/strict";
import { createServer } from "node:http";
import { AddressInfo } from "node:net";

import { createApp } from "../src/app.js";

async function main() {
  const app = createApp();
  const server = createServer(app);

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;

  const htmlRoutes = ["/", "/recovery-lanes", "/fallback-map", "/recovery-posture", "/verification", "/docs"];
  const apiRoutes = [
    "/api/dashboard/summary",
    "/api/recovery-lanes",
    "/api/fallback-map",
    "/api/recovery-posture",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `Expected ${route} to return 200`);
    const body = await response.text();
    assert.match(body, /Board Decision Recovery Readiness Brief|Recovery lanes|Fallback map|Recovery posture/);
    if (route === "/") {
      assert.match(body, /Product depth/);
      assert.match(body, /What these repos have in common/);
      assert.match(body, /portfolio\.kineticgain\.com/);
      assert.match(body, /board-decision-recovery-readiness-brief/);
    }
  }

  for (const route of apiRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `Expected ${route} to return 200`);
  }

  server.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
