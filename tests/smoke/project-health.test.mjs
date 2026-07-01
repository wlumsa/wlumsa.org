import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";

const root = process.cwd();

/**
 * @param {string} relativePath
 */
async function fileExists(relativePath) {
  await access(join(root, relativePath));
}

describe("project health", () => {
  test("critical public route entrypoints exist", async () => {
    const routes = [
      "src/app/(user)/page.tsx",
      "src/app/(user)/about/page.tsx",
      "src/app/(user)/events/page.tsx",
      "src/app/(user)/forms/page.tsx",
      "src/app/(user)/resources/page.tsx",
      "src/app/(user)/contact/page.tsx",
      "src/app/(user)/prayerinfo/page.tsx",
      "src/app/(user)/halalfood/page.tsx",
      "src/app/(user)/grocery/page.tsx",
      "src/app/(user)/housing/page.tsx",
      "src/app/(user)/roommateservice/page.tsx",
    ];

    await Promise.all(routes.map(fileExists));
  });

  test("critical API route entrypoints exist", async () => {
    const routes = [
      "src/app/api/contact/route.tsx",
      "src/app/api/upload-form-file/route.ts",
      "src/app/api/youform/[title]/route.tsx",
      "src/app/api/prayer-times/weekly/route.ts",
      "src/app/api/ramadan/calendar/route.ts",
      "src/app/api/revalidate/route.ts",
    ];

    await Promise.all(routes.map(fileExists));
  });

  test("required public assets exist", async () => {
    const assets = [
      "public/favicon.ico",
      "public/robots.txt",
      "public/sitemap.xml",
      "public/msa_guidebook.pdf",
      "public/RamadanJournal.pdf",
    ];

    await Promise.all(assets.map(fileExists));
  });

  test("package scripts keep the lightweight test contract", async () => {
    const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

    assert.equal(packageJson.scripts.test, "pnpm check");
    assert.equal(
      packageJson.scripts.check,
      "pnpm check:type && pnpm check:lint && pnpm check:smoke"
    );
    assert.equal(packageJson.scripts["check:type"], "tsc --noEmit --pretty false");
    assert.equal(packageJson.scripts["check:lint"], "eslint .");
    assert.equal(packageJson.scripts["check:smoke"], "node --test tests/smoke/*.test.mjs");
  });
});
