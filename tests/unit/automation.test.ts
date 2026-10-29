import { describe, expect, it, vi } from "vitest";
import labelIssue from "../../.github/scripts/label-issue.mjs";
import syncLabels from "../../.github/scripts/sync-labels.mjs";

function context(title = "", body: string | null = null) {
  return {
    repo: { owner: "example", repo: "example" },
    payload: { issue: { title, body, number: 7 } },
  };
}

describe("issue triage", () => {
  it("also matches issue body text", async () => {
    const addLabels = vi.fn();
    await labelIssue({
      github: { rest: { issues: { addLabels } } },
      context: context("A proposal", "This is an enhancement"),
    });
    expect(addLabels).toHaveBeenCalledWith(expect.objectContaining({ labels: ["enhancement"] }));
  });

  it("labels matching text without interpreting executable content", async () => {
    const addLabels = vi.fn();
    const title = "Bug: crash when processing $(echo feature)";
    await labelIssue({ github: { rest: { issues: { addLabels } } }, context: context(title) });
    expect(addLabels).toHaveBeenCalledWith({
      owner: "example",
      repo: "example",
      issue_number: 7,
      labels: ["bug", "enhancement"],
    });
  });
  it("does not write labels for unrelated text or absent bodies", async () => {
    const addLabels = vi.fn();
    await labelIssue({
      github: { rest: { issues: { addLabels } } },
      context: context("A question"),
    });
    expect(addLabels).not.toHaveBeenCalled();
  });
});

describe("label synchronization", () => {
  it("creates missing labels without deleting existing repository labels", async () => {
    const issues = {
      getLabel: vi.fn().mockRejectedValue({ status: 404 }),
      createLabel: vi.fn(),
      updateLabel: vi.fn(),
    };
    await syncLabels({ github: { rest: { issues } }, context: context() });
    expect(issues.createLabel).toHaveBeenCalledWith(
      expect.objectContaining({ name: "bug", color: "d73a4a" }),
    );
    expect(issues.updateLabel).not.toHaveBeenCalled();
  });
  it("updates known labels rather than duplicating them", async () => {
    const issues = {
      getLabel: vi.fn().mockResolvedValue({}),
      createLabel: vi.fn(),
      updateLabel: vi.fn(),
    };
    await syncLabels({ github: { rest: { issues } }, context: context() });
    expect(issues.updateLabel).toHaveBeenCalledWith(
      expect.objectContaining({ name: "dependencies" }),
    );
    expect(issues.createLabel).not.toHaveBeenCalled();
  });
  it("surfaces authorization failures instead of treating them as missing labels", async () => {
    const issues = {
      getLabel: vi.fn().mockRejectedValue({ status: 403 }),
      createLabel: vi.fn(),
      updateLabel: vi.fn(),
    };
    await expect(syncLabels({ github: { rest: { issues } }, context: context() })).rejects.toEqual({
      status: 403,
    });
    expect(issues.createLabel).not.toHaveBeenCalled();
  });
});
