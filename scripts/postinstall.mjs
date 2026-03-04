import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

async function main() {
  try {
    console.log("Starting Chromium postinstall packaging...");

    const chromiumResolvedPath = import.meta.resolve("@sparticuz/chromium");
    const chromiumPath = fileURLToPath(chromiumResolvedPath);
    const chromiumDir = dirname(dirname(dirname(chromiumPath)));
    const binDir = join(chromiumDir, "bin");

    if (!existsSync(binDir)) {
      console.log("Chromium bin directory not found, skipping archive creation.");
      return;
    }

    const publicDir = join(projectRoot, "public");
    const outputPath = join(publicDir, "chromium-pack.tar");

    mkdirSync(publicDir, { recursive: true });
    execSync(`tar -cf "${outputPath}" -C "${binDir}" .`, {
      stdio: "inherit",
      cwd: projectRoot,
    });

    console.log("Chromium archive created at public/chromium-pack.tar");
  } catch (error) {
    console.error("Failed to create Chromium archive:", error instanceof Error ? error.message : error);
    console.log("Skipping archive creation. This is not critical in local development.");
    process.exit(0);
  }
}

main();
