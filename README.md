# Board Decision Recovery Readiness Brief

Board-ready recovery-readiness surface for showing whether executive decision paths can recover cleanly after failure, where fallback capacity is too thin, and what boards should reinforce before the next cycle starts.

- Live: `http://recovery.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-recovery-readiness-brief`

## Why this matters

Leaders need one board-readable recovery layer that shows whether a broken path can be restored quickly, where fallback ownership is too thin, and which reinforcement move belongs in the packet before another cycle starts.

## What it includes

- TypeScript executive-intelligence surface for board-facing recovery readiness with modeled executive lanes, fallback capacity, and board-safe recovery posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for recovery lanes, fallback maps, recovery posture, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/recovery-lanes`
- `/fallback-map`
- `/recovery-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-recovery-readiness-brief
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-recovery-readiness-brief fixtures/board-decision-recovery-readiness-brief.json --format summary
npx board-decision-recovery-readiness-brief fixtures/board-decision-recovery-readiness-brief-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Recovery lanes](screenshots/02-recovery-lanes-proof.png)
![Fallback map](screenshots/03-fallback-map-proof.png)
![Recovery posture](screenshots/04-recovery-posture-proof.png)
