# Security policy

DockerScope is in early development. There are no supported production releases.
Security fixes currently target the latest `main` revision; do not deploy the
placeholders as a production monitoring service.

## Report a vulnerability privately

Use [GitHub private vulnerability reporting](https://github.com/tristanjcb/DockerScope/security/advisories/new).
If the form is unavailable, use [GitHub Support](https://support.github.com/contact/security)
to arrange a private reporting channel. Do not open a public issue containing an exploit.
Include the affected revision, impact, reproduction steps, and a minimal sanitized example.
Never include real credentials, private container contents or customer information.

The maintainer aims to acknowledge reports within seven days and coordinate a fix
and disclosure with the reporter. This is a best-effort community project, not an SLA.
Reporters will be credited only with their consent.

## Security boundaries

The Docker Engine socket generally grants control of its host. Future clients must
use least privilege, authenticated transport and explicit endpoint configuration.
Never expose an unauthenticated Docker API or mount a socket into untrusted workloads.

CI uses a frozen lockfile, pinned action commits, read-only permissions by default,
CodeQL, dependency review, scheduled dependency audits and Renovate proposals.
Dependency lifecycle builds are denied unless explicitly approved. Security controls
on GitHub, including private reporting and protected branches, are documented in
[MAINTAINERS.md](MAINTAINERS.md); repository files alone cannot enable all account settings.
