# Commit convention

Use [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```text
<type>(<optional scope>)<optional !>: <imperative description>

<optional body>

<optional footers>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
`chore`, `revert`. Use an application or subsystem as the scope, such as `api`,
`agents`, `dashboard`, `deps`, or `security`. Keep the header at most 100 characters.

```text
feat(agents): discover Docker containers
fix(api): handle an unavailable Docker socket
feat(api)!: replace the container identifier format

BREAKING CHANGE: clients must send the full container ID instead of its short form.
```

`feat` signals a minor change; `fix` signals a patch; `!` or a `BREAKING CHANGE:`
footer signals an incompatible change requiring migration instructions and a major
release after 1.0. Before 1.0, document incompatibilities explicitly in release notes.
Conventional Commits describe changes; [Contributor Covenant](CODE_OF_CONDUCT.md)
describes community behavior.

Husky checks new local commit messages. CI checks every PR commit and its title.
Keep each commit focused and passing checks. Prefer squash merges with a valid PR
title; include the breaking-change footer in the final squash message when needed.
Release tags are created deliberately by a maintainer, not automatically by commit type.
