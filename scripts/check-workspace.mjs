import { fileURLToPath } from "node:url";
import { readApplications, validateApplications } from "./workspace.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
validateApplications(await readApplications(root));
console.log("All six application workspaces are valid.");
