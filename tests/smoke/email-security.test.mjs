import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";

const root = process.cwd();

/**
 * @param {string} relativePath
 */
async function assertFileDoesNotExist(relativePath) {
  await assert.rejects(access(join(root, relativePath)), { code: "ENOENT" });
}

describe("email security boundaries", () => {
  test("sensitive email operations are not exposed as public API routes", async () => {
    await Promise.all([
      assertFileDoesNotExist("src/app/api/sendByDistributionList/route.tsx"),
      assertFileDoesNotExist("src/app/api/sendreceipt/route.tsx"),
    ]);
  });

  test("distribution email delivery stays behind authenticated CMS updates", async () => {
    const [sender, collection] = await Promise.all([
      readFile(join(root, "src/lib/sendDistributionEmail.ts"), "utf8"),
      readFile(join(root, "src/collections/EmailCollection/index.ts"), "utf8"),
    ]);

    assert.doesNotMatch(sender, /import ["']server-only["']/);
    assert.doesNotMatch(sender, /NEXT_PUBLIC_RESEND_API_KEY/);
    assert.match(
      collection,
      /import \{ sendDistributionEmail \} from "@\/lib\/sendDistributionEmail"/
    );
    assert.match(collection, /update: \(\{ req \}\) => Boolean\(req\.user\)/);
    assert.doesNotMatch(collection, /update: \(\) => true/);
  });
});
