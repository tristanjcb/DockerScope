# DockerScope

**An open-source Docker monitoring and diagnostics platform.**

DockerScope aims to help developers and system administrators monitor their Docker environments, understand resource usage, and investigate container-related issues through a simple, centralized interface.

> **Project status:** Early development: DockerScope is not ready for production use.

## Vision

Monitoring containers shouldn't require switching between multiple tools just to understand what's happening.

DockerScope is being designed to provide a clear view of Docker environments, from individual containers to the services they depend on.

The long-term goal is to make infrastructure troubleshooting more accessible, without sacrificing technical depth.

## Planned Features

- **Container discovery** — Automatically detect running and stopped Docker containers.
- **Resource monitoring** — Track CPU, memory, and network usage.
- **Container insights** — View container status, restarts, and relevant events.
- **Historical metrics** — Explore resource usage over time.
- **Dependency visualization** — Understand connections between containers and services.
- **Incident investigation** — Correlate events and metrics to help identify potential causes of failures.

These features are planned and may change as the project evolves.

## Tech Stack

| Component             | Technology                                         |
| --------------------- | -------------------------------------------------- |
| Monitoring agent      | TypeScript with a first-party Docker Engine client |
| Backend API           | TypeScript, NestJS                                 |
| Web dashboard         | React, TypeScript                                  |
| Container integration | Docker Engine API                                  |

The Docker Engine integration will use a package developed and maintained by us,
not Dockerode. Its implementation will be introduced under `packages/` later.
Additional technologies will be selected as the project develops.

## Monorepo

The repository uses **pnpm workspaces** and **Turborepo** on **Node.js 24 LTS**.

```text
apps/
  docs/        Documentation application placeholder
  mobile/      Mobile application placeholder
  dashboard/   Web dashboard placeholder
  desktop/     Desktop application placeholder
  api/         Backend API placeholder
  agents/      Monitoring agents placeholder
packages/
  .gitkeep     Reserved for future shared packages
```

The six applications currently compile only placeholder metadata. The frameworks
listed above describe the intended stack, not implemented product features.

## Getting started

Use the Node version in `.node-version`, then:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

`package.json` pins the pnpm version. See the [contribution guide](.github/CONTRIBUTING.md)
for editor setup, commands, testing and adding dependencies.

## Quality and delivery

Oxlint, Oxfmt, strict TypeScript, SCSS Stylelint, Vitest unit and integration tests,
Commitlint, Husky and lint-staged provide local and CI checks. GitHub Actions runs
on Linux and Windows. CodeQL, secret scanning, dependency review and scheduled audits
cover repository security; Renovate manages dependency update proposals.

Coverage currently measures repository tooling only. Codecov upload is ready to
activate after connecting the repository. There are no executable user journeys
requiring e2e tests yet. Release tags trigger full validation and create a draft
GitHub release with source and compiled archives plus SHA-256 checksums.
See the [maintainer setup guide](.github/MAINTAINERS.md) for service activation,
GitHub settings, release steps and the limits of the current scaffold.

## Roadmap

- [x] Initialize the TypeScript monorepo and contribution tooling
- [ ] Implement the TypeScript monitoring agent and first-party Docker client
- [ ] Connect to the Docker Engine API
- [ ] Discover and list containers
- [ ] Collect basic container metrics
- [ ] Build the backend API
- [ ] Create the first dashboard
- [ ] Add historical metrics and alerts
- [ ] Explore container dependency mapping

## Contributing

DockerScope is an open-source project in its early stages.

Contributions, ideas, bug reports, and technical discussions are welcome.

Read the [contribution guide](.github/CONTRIBUTING.md),
[commit convention](.github/COMMIT_CONVENTION.md), and
[code of conduct](.github/CODE_OF_CONDUCT.md).
Report vulnerabilities privately using our [security policy](.github/SECURITY.md).

## License

DockerScope is licensed under [Apache-2.0](LICENSE).
The adapted code of conduct is separately licensed under CC BY-SA 4.0.
