# Contributing to DockerScope

Welcome! Read the [code of conduct](CODE_OF_CONDUCT.md) and
[commit convention](COMMIT_CONVENTION.md) before contributing.
All intentional contributions are licensed under Apache-2.0, as described in LICENSE.
Do not submit third-party code without its required license and attribution.

## Local setup

Install Node.js from `.node-version` (the Node 24 LTS line) and enable Corepack.
If your Node distribution does not bundle Corepack, install it from its official project first.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

The root `packageManager` field pins pnpm. Never edit `pnpm-lock.yaml` manually.
Install runs Husky hooks; `HUSKY=0` disables them in CI only. Dependencies with build
scripts must be explicitly reviewed before being allowed in `pnpm-workspace.yaml`.
New dependency versions have a one-day installation cooldown.

## Repository layout

- `apps/{docs,mobile,dashboard,desktop,api,agents}`: private ESM TypeScript placeholders.
- `packages/.gitkeep`: reserved for future shared packages, including our Docker client.
- `scripts/`: repository tooling; `tests/unit` and `tests/integration`: infrastructure tests.
- `.github/`: automation, contribution and security policies.

No framework is scaffolded yet. Do not expose a Docker socket to untrusted code.
An actual monitoring agent must treat Docker socket access as host-level privilege.

## Commands

| Command                              | Purpose                                            |
| ------------------------------------ | -------------------------------------------------- |
| `pnpm build`                         | Compile all six applications through Turborepo     |
| `pnpm dev --filter=@dockerscope/api` | Watch one application                              |
| `pnpm typecheck`                     | Check tooling, tests, and application TypeScript   |
| `pnpm lint`                          | Oxlint and SCSS Stylelint                          |
| `pnpm format` / `pnpm format:check`  | Oxfmt write / verify                               |
| `pnpm test:unit`                     | Unit tests with infrastructure coverage thresholds |
| `pnpm test:integration`              | Build and import every application output          |
| `pnpm check`                         | Complete local quality gate                        |

SCSS lint accepts an empty file set until styles exist. End-to-end tests will be
introduced with the first executable user flow; placeholder compilation is not an e2e test.
Coverage measures the workspace tooling only, not unimplemented application features.

## Pull requests

1. Discuss substantial changes in an issue, then fork and create a focused branch.
2. Add meaningful tests for behavior changes and update documentation.
3. Run `pnpm check`; commit with Conventional Commits and open a PR against `main`.
4. Explain motivation, verification, migration requirements and any security impact.
5. Respond to review. A maintainer reviews changes; a green CI is not approval.

Fork PRs run without repository secrets. Labeling workflows never execute PR code.
Never attach tokens, real production logs or Docker socket credentials to an issue.
Report vulnerabilities using [SECURITY.md](SECURITY.md), not a public bug report.

See [MAINTAINERS.md](MAINTAINERS.md) for GitHub setup and release instructions.
