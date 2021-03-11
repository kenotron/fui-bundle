import path from "path";
import fs from "fs";
import os from "os";
import { createPackage } from "./createPackage";
import { bundle } from "./bundle";
import { promisify } from "util";

const mkdtempAsync = promisify(fs.mkdtemp);
async function main() {
  // const location = await mkdtempAsync(path.join(os.tmpdir(), "fluentui-mf"));
  const location = path.join(os.tmpdir(), "fui-bundle");

  fs.mkdirSync(location, { recursive: true });
  process.env["TMP_DIR"] = location;

  console.log("TEMP LOCATION: ", location);

  await createPackage(location);
  await bundle(location);
}

main();
