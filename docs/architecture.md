# Architecture

Board Decision Recovery Readiness Brief is a static-friendly TypeScript executive-intelligence surface for showing whether decision paths can recover after a break, where fallback ownership is weakest, and how much board confidence is being carried by thin redundancy and long restore windows.

## Routes

- `/`
- `/recovery-lanes`
- `/fallback-map`
- `/recovery-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample decision-path-recovery items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores handoff pressure, restore windows, escalation gaps, fallback-owner coverage, path redundancy, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable recovery-readiness packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
