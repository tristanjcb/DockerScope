import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// JavaScript infrastructure is exercised directly, without compiling test doubles.
import {
  applicationNames,
  readApplications,
  validateApplications,
} from "../../scripts/workspace.mjs";

function manifests() {
  return applicationNames.map((name: string) => ({
    name: `@dockerscope/${name}`,
    private: true,
    type: "module",
    scripts: { build: "tsc", typecheck: "tsc --noEmit", dev: "tsc --watch" },
  }));
}

describe("workspace contract", () => {
  it("accepts all six applications regardless of order", () => {
    expect(() => validateApplications(manifests().toReversed())).not.toThrow();
  });
  it.each(["missing", "extra", "duplicate"])("rejects a %s workspace", (variant) => {
    const list = manifests();
    if (variant === "missing") list.pop();
    if (variant === "extra") list.push({ ...list[0]!, name: "@dockerscope/extra" });
    if (variant === "duplicate") list[0] = list[1]!;
    expect(() => validateApplications(list)).toThrow("exactly the six");
  });
  it.each([{ private: false }, { type: "commonjs" }])("rejects unsafe metadata %j", (patch) => {
    const list = manifests();
    Object.assign(list[0]!, patch);
    expect(() => validateApplications(list)).toThrow("private ESM");
  });
  it.each(["build", "typecheck", "dev"] as const)("requires the %s task", (task) => {
    const list = manifests();
    list[0]!.scripts[task] = " ";
    expect(() => validateApplications(list)).toThrow(`missing the ${task}`);
  });
  it("rejects absent scripts", () => {
    const list = manifests();
    Object.assign(list[0]!, { scripts: undefined });
    expect(() => validateApplications(list)).toThrow("missing the build");
  });
  it("rejects a non-string task", () => {
    const list = manifests();
    Object.assign(list[0]!.scripts, { build: 42 });
    expect(() => validateApplications(list)).toThrow("missing the build");
  });
  it("reads workspace directories and ignores ordinary files", async () => {
    const root = await mkdtemp(join(tmpdir(), "dockerscope-"));
    try {
      await mkdir(join(root, "apps", "api"), { recursive: true });
      await writeFile(join(root, "apps", ".gitkeep"), "");
      await writeFile(join(root, "apps", "api", "package.json"), JSON.stringify(manifests()[1]));
      expect(await readApplications(root)).toEqual([manifests()[1]]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
  it("surfaces malformed manifests", async () => {
    const root = await mkdtemp(join(tmpdir(), "dockerscope-"));
    try {
      await mkdir(join(root, "apps", "api"), { recursive: true });
      await writeFile(join(root, "apps", "api", "package.json"), "{");
      await expect(readApplications(root)).rejects.toThrow();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
