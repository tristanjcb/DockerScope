import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  applicationNames,
  readApplications,
  validateApplications,
} from "../../scripts/workspace.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));

describe("compiled monorepo", () => {
  it("discovers real workspace manifests", async () => {
    expect(() => validateApplications(awaitedManifests)).not.toThrow();
  });
  it.each(applicationNames)("builds an importable %s ESM entry and declarations", async (name) => {
    const entry = new URL(`../../apps/${name}/dist/index.js`, import.meta.url);
    const module = await import(entry.href);
    expect(module.application).toEqual({ name, status: "placeholder" });
    const declaration = await readFile(
      new URL(`../../apps/${name}/dist/index.d.ts`, import.meta.url),
      "utf8",
    );
    expect(declaration).toContain(`readonly name: "${name}"`);
  });
  it("keeps packages empty until shared code is introduced", async () => {
    expect(await readdir(new URL("../../packages/", import.meta.url))).toEqual([".gitkeep"]);
  });
});
const awaitedManifests = await readApplications(root);
