import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderFallbackMap,
  renderRecoveryLanes,
  renderRecoveryOverview,
  renderRecoveryPosture,
  renderVerification
} from "../src/services/render.js";
import { fallbackMap, payload, recoveryLanes, recoveryPosture, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderRecoveryOverview()]],
  ["/recovery-lanes", ["recovery-lanes/index.html", renderRecoveryLanes()]],
  ["/fallback-map", ["fallback-map/index.html", renderFallbackMap()]],
  ["/recovery-posture", ["recovery-posture/index.html", renderRecoveryPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://recovery.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://recovery.kineticgain.com/</loc></url><url><loc>https://recovery.kineticgain.com/recovery-lanes/</loc></url><url><loc>https://recovery.kineticgain.com/fallback-map/</loc></url><url><loc>https://recovery.kineticgain.com/recovery-posture/</loc></url><url><loc>https://recovery.kineticgain.com/verification/</loc></url><url><loc>https://recovery.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/recovery-lanes.json": recoveryLanes(),
  "api/fallback-map.json": fallbackMap(),
  "api/recovery-posture.json": recoveryPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
