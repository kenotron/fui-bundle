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
      react: "latest",
      "react-dom": "latest",
      "@fluentui/react": "beta",

      "react-loadable": "latest",
    },
  };

  for (const f of fs.readdirSync(path.join(__dirname, "../package"))) {
    fs.mkdirSync(path.join(repoDir, "lib"), { recursive: true });
    fs.copyFileSync(
      path.join(__dirname, `../package/${f}`),
      path.join(repoDir, "lib", f)
    );
  }
  await writeFileAsync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  const { stdout, stderr } = await execAsync("yarn", { cwd: repoDir });
  if (stderr) {
    console.error(stderr);
  }
  console.log(stdout);
}
