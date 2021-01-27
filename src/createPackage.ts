import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function createPackage(tmpDir: string) {
  const packageJsonPath = path.join(tmpDir, "package.json");
  const packageJson = {
    name: "fluentui-mf",
    version: "1.0.0",
    dependencies: {
      react: "^17.0.1",
      "react-dom": "^17.0.1",
      "@fluentui/date-time-utilities": "latest",
      "@fluentui/react-file-type-icons": "latest",
      "@fluentui/font-icons-mdl2": "latest",
      "@fluentui/foundation-legacy": "latest",
      "@fluentui/ie11-polyfills": "latest",
      "@fluentui/merge-styles": "latest",
      "@fluentui/react": "latest",
      "@fluentui/react-avatar": "latest",
      "@fluentui/react-button": "latest",
      "@fluentui/react-cards": "latest",
      "@fluentui/react-charting": "latest",
      "@fluentui/react-checkbox": "beta",
      "@fluentui/react-date-time": "latest",
      "@fluentui/react-flex": "latest",
      "@fluentui/react-focus": "latest",
      "@fluentui/react-hooks": "latest",
      "@fluentui/react-icons-mdl2": "latest",
      "@fluentui/react-image": "latest",
      "@fluentui/react-internal": "latest",
      "@fluentui/react-link": "latest",
      "@fluentui/react-shared-contexts": "latest",
      "@fluentui/react-slider": "latest",
      "@fluentui/react-tabs": "latest",
      "@fluentui/react-text": "latest",
      "@fluentui/react-theme-provider": "latest",
      "@fluentui/react-toggle": "latest",
      "@fluentui/scheme-utilities": "latest",
      "@fluentui/style-utilities": "latest",
      "@fluentui/theme": "latest",
      "@fluentui/utilities": "latest",
    },
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  execSync("yarn", { cwd: tmpDir, env: process.env, stdio: "inherit" });
}
