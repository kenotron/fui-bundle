import fs from "fs";
import path from "path";
import execa from "execa";
import { promisify } from "util";

export async function bundle(repoDir) {
  const webpack = require.resolve("webpack/bin/webpack.js");
  const webpackConfigPath = path.join(__dirname, "webpack.config.ts");
  try {
    await execa(`node ${webpack} --config ${webpackConfigPath} --progress`, {
      env: {
        REPO_DIR: repoDir,
      },
      stdio: "inherit",
    });
  } catch (e) {
    console.error(e);
  }
}
