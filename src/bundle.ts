import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function bundle(tmpDir: string) {
  const webpack = require.resolve("webpack/bin/webpack.js");
  const webpackConfigPath = path.join(__dirname, "webpack.config.js");

  execSync(`node ${webpack} --config ${webpackConfigPath} --progress`, {
    cwd: tmpDir,
    env: { ...process.env, TMP_DIR: tmpDir },
    stdio: "inherit",
  });
}
