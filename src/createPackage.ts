import fs from "fs";
import path from "path";
import { exec } from "child_process";
import os from "os";
import { mkdtemp } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);
const execAsync = promisify(exec);

export async function createPackage(repoDir) {
  const packageJsonPath = path.join(repoDir, "package.json");
  const packageJson = {
    name: "fluentui-bundle",
    version: "1.0.0",
    dependencies: {
      "@fluentui/react": "beta",
    },
  };

  fs.copyFileSync(path.join(__dirname, "../package/core.js"), repoDir);

  await writeFileAsync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  const { stdout, stderr } = await execAsync("yarn");
  if (stderr) {
    console.error(stderr);
  }
  console.log(stdout);
}
