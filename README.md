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

| Component | Technology |
|---|---|
| Monitoring agent | Rust |
| Backend API | TypeScript, NestJS |
| Web dashboard | React, TypeScript |
| Container integration | Docker Engine API |

Additional technologies will be selected as the project develops.

## Roadmap

- [ ] Initialize the Rust monitoring agent
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

Contribution guidelines will be added as the project matures.

## License

DockerScope is intended to be released under an open-source license. License details will be finalized before the first public release.
