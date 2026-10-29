import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const applicationNames = ["agents", "api", "dashboard", "desktop", "docs", "mobile"];

export function validateApplications(manifests) {
  const names = manifests.map((manifest) => manifest.name).toSorted();
  const expected = applicationNames.map((name) => `@dockerscope/${name}`);
  if (JSON.stringify(names) !== JSON.stringify(expected)) {
    throw new Error("Expected exactly the six @dockerscope application workspaces");
  }
  for (const manifest of manifests) {
    if (manifest.private !== true || manifest.type !== "module") {
      throw new Error(`${manifest.name} must be a private ESM workspace`);
    }
    for (const task of ["build", "typecheck", "dev"]) {
      if (typeof manifest.scripts?.[task] !== "string" || !manifest.scripts[task].trim()) {
        throw new Error(`${manifest.name} is missing the ${task} task`);
      }
    }
  }
}

export async function readApplications(root) {
  const entries = await readdir(join(root, "apps"), { withFileTypes: true });
  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const source = await readFile(join(root, "apps", entry.name, "package.json"), "utf8");
        return JSON.parse(source);
      }),
  );
}
