import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

// This CI-only runner targets Linux x64. Tool archives are pinned by digest.
assert.equal(process.platform, "linux", "Run native validators locally on other systems");
assert.equal(process.arch, "x64");
const execute = promisify(execFile);
const tools = JSON.parse(
  await readFile(new URL("../workflow-tools.json", import.meta.url), "utf8"),
);
const directory = await mkdtemp(join(tmpdir(), "dockerscope-actions-"));
try {
  for (const [name, tool] of Object.entries(tools)) {
    const response = await fetch(tool.url);
    assert.ok(response.ok, `Cannot download ${name}: ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    assert.equal(
      createHash("sha256").update(data).digest("hex"),
      tool.sha256,
      `${name}: checksum mismatch`,
    );
    const archive = join(directory, `${name}.tar.gz`);
    await writeFile(archive, data);
    await execute("tar", ["-xzf", archive, "-C", directory]);
    const args =
      name === "zizmor" ? ["--offline", "--min-severity", "medium", ".github/workflows"] : [];
    const result = await execute(join(directory, name), args);
    console.log(result.stdout || `${name}: passed`);
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}
