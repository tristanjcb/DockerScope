# Maintainer setup and releases

## GitHub settings

Repository files cannot configure external accounts. Complete these settings as the
repository owner, and verify their state after importing this repository:

- Enable private vulnerability reporting, dependency graph, Dependabot security alerts,
  secret scanning and push protection under Settings > Security.
- Protect `main`: require PRs, resolve conversations, disallow force pushes and deletion,
  and require `Quality (ubuntu-latest)`, `Quality (windows-latest)`, `Dependency audit`,
  `CodeQL`, `Secret scan`, and `commitlint`. Add dependency review as a PR-required check.
  Require a code owner review when there is another maintainer able to review PRs;
  do not require a sole maintainer to approve their own PR. Require up-to-date branches
  or a merge queue. Do not require optional Codecov uploads before enabling the service.
- Use squash merges with Conventional Commit PR titles and breaking-change migration notes.
- In Actions settings, use read-only default workflow permissions and require approval
  for first-time external contributors. Do not grant fork PR workflows write tokens.
- Install the [Renovate GitHub App](https://github.com/apps/renovate) for this repository.
  Configuration is in `.github/renovate.json`: Monday updates, three-day cooldown,
  pinned dependencies/actions, grouped related tools, explicit major-version approval,
  weekly lockfile refresh and no automerge. Security alerts bypass the schedule.
- Connect this public repository to [Codecov](https://app.codecov.io/gh/tristanjcb/DockerScope).
  Configure tokenless uploads for public/fork PRs; optionally add `CODECOV_TOKEN` as an
  Actions secret for trusted uploads. Set the Actions variable `CODECOV_ENABLED=true`
  only after activation. Local coverage and its thresholds always run independently.
- Run **Sync labels** after the first push if necessary. It creates or updates labels
  from `.github/labels.json` and never deletes unrelated existing labels.
- Create an Actions environment named `release`, restrict it to protected `v*` tags
  and add required reviewers when another maintainer is available. Protect release
  tags so only maintainers can create them. Draft releases still require human publication.
- The funding file links to nonmonetary support. Add a real sponsorship destination
  only after the maintainer has registered one. Conduct reports are sent privately to `tristan@kresov.com`, as documented in the
  code of conduct. Keep that contact address current.

## Workflow boundaries

CI runs a frozen install and all local gates on Linux and Windows. No deployment
credentials are needed. Artifacts expire after seven days. Security scans run on
PRs, pushes to main and weekly. Dependency review compares the PR's dependency changes.
Secret scans examine Git history; never suppress a real leaked credential without
revoking it. Gitleaks Action is free for personal repositories; an organization
transfer may require configuring its license or replacing it with the CLI.

PR labeling uses `pull_request_target` for fork support, reads only the base-branch
configuration, and never checks out or runs a PR head. Issue text is data passed to
fixed regular expressions. Label definitions are synchronized only from trusted
pushes to main or a maintainer's manual dispatch. Fork tests get no repository secrets.

## Release procedure

All applications are private placeholders. There is no npm publication, Docker image
or hosted service deployment until an actual application and target are implemented.
The current delivery unit is a draft GitHub release of the verified repository.

1. Update the root `package.json` version in a reviewed PR. Keep application versions
   at `0.0.0` until independent versioning is needed. Document migrations for breaking changes.
2. Merge the PR and verify that main's CI and security checks pass.
3. Create a tag matching the root version on main, for example `git tag -a v0.1.0 -m
   "DockerScope 0.1.0"`, and push that exact tag with `git push origin v0.1.0`.
4. The release workflow reruns CI, verifies the tag matches the version and is contained
   in main, then packages source, compiled placeholders and `SHA256SUMS`.
5. A separate job with `contents: write`, behind the `release` environment, creates a
   **draft** GitHub release. Review generated notes, migration instructions and archives,
   then publish deliberately in GitHub. Mark prereleases appropriately before publication.

A failed verification cannot publish. Do not move published tags. Fix through a new
version; revoke compromised credentials and follow the security policy if needed.
If a release job must be retried after draft creation, inspect the existing draft
rather than deleting or overwriting a release automatically.
