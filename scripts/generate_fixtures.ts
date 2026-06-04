import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionRecoveryReadinessBrief } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "board-decision-recovery-readiness-brief.json"), { force: true });
rmSync(path.join(fixturesDir, "board-decision-recovery-readiness-brief-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-recovery-readiness-brief.json"),
  JSON.stringify(sampleBoardDecisionRecoveryReadinessBrief, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-recovery-readiness-brief-clean.json"),
  JSON.stringify(sampleBoardDecisionRecoveryReadinessBrief.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item), null, 2)
);
