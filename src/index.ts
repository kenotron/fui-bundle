import path from "path";
import fs from "fs";
import os from "os";
import { createPackage } from "./createPackage";
import { bundle } from "./bundle";
import { promisify } from "util";

const mkdtempAsync = promisify(fs.mkdtemp);
async function main() {
  const location = await mkdtempAsync(path.join(os.tmpdir(), "fluentui-mf"));
  process.env["TMP_DIR"] = location;
  await createPackage(location);
  await bundle(location);
}

main();
