import { readFile } from "node:fs/promises";

export default async function labelIssue({ github, context }) {
  // Untrusted issue text is data only; it is never interpolated into scripts.
  const issue = context.payload.issue;
  const text = `${issue.title}\n${issue.body ?? ""}`.slice(0, 20000);
  const rules = JSON.parse(
    await readFile(new URL("../issue-labeler.json", import.meta.url), "utf8"),
  );
  const labels = Object.entries(rules)
    .filter(([, patterns]) => patterns.some((pattern) => new RegExp(pattern, "i").test(text)))
    .map(([label]) => label);
  if (labels.length) {
    await github.rest.issues.addLabels({ ...context.repo, issue_number: issue.number, labels });
  }
}
