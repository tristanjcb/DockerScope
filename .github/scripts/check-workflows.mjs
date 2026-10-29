import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { parseDocument } from "yaml";

const directory = new URL("../workflows/", import.meta.url);
for (const name of await readdir(directory)) {
  if (!name.endsWith(".yml")) continue;
  const document = parseDocument(await readFile(new URL(name, directory), "utf8"), {
    uniqueKeys: true,
  });
  assert.equal(document.errors.length, 0, `${name}: invalid YAML: ${document.errors}`);
  const workflow = document.toJS();
  assert.ok(workflow.on && workflow.jobs, `${name}: missing triggers or jobs`);
  assert.ok(workflow.permissions, `${name}: missing explicit permissions`);
  for (const [jobName, job] of Object.entries(workflow.jobs)) {
    assert.ok(job.uses || job["timeout-minutes"], `${name}/${jobName}: missing timeout`);
    for (const step of job.steps ?? []) {
      if (step.uses && !step.uses.startsWith("./")) {
        assert.match(step.uses, /@[a-f0-9]{40}$/, `${name}: unpinned action`);
      }
      if (step.run) {
        assert.doesNotMatch(
          step.run,
          /\$\{\{\s*github\.event\./,
          `${name}: untrusted event in shell`,
        );
      }
      if (step.uses?.startsWith("actions/checkout@")) {
        assert.equal(
          step.with?.["persist-credentials"],
          false,
          `${name}: persisted Git credentials`,
        );
      }
    }
  }
  console.log(`Validated ${name}`);
}
