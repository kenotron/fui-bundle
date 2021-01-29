import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export async function bundle() {
    const webpack = require.resolve("webpack/bin/webpack.js");
    const webpackConfigPath = path.join(__dirname, "webpack.config.js");
    const { stdout, stderr } = await execAsync(`node ${webpack} --config ${webpackConfigPath}`);
    if (stderr) {
        console.error(stderr);
    }
    console.log(stdout);
}
