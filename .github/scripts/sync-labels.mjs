import { readFile } from "node:fs/promises";

export default async function syncLabels({ github, context }) {
  const labels = JSON.parse(await readFile(new URL("../labels.json", import.meta.url), "utf8"));
  for (const label of labels) {
    try {
      await github.rest.issues.getLabel({ ...context.repo, name: label.name });
      await github.rest.issues.updateLabel({ ...context.repo, ...label });
    } catch (error) {
      if (error.status !== 404) throw error;
      await github.rest.issues.createLabel({ ...context.repo, ...label });
    }
  }
}
