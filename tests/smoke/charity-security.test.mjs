import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";

const root = process.cwd();
/** @param {string} path */
const read = (path) => readFile(join(root, path), "utf8");

describe("charity CMS security and public behavior", () => {
  test("charity role cannot mutate or read unrelated collections", async () => {
    const guard = await read(
      "src/collections/Charity/restrictCharityEditors.ts"
    );
    assert.match(
      guard,
      /if \(isCharityEditor\(args\.req\.user\)\) return false/
    );
    assert.match(guard, /create: denyCharityEditor/);
    assert.match(guard, /delete: denyCharityEditor/);
    assert.match(guard, /read: denyCharityEditor/);
    assert.match(guard, /update: denyCharityEditor/);
  });

  test("user permissions can only be assigned by administrators", async () => {
    const users = await read("src/collections/Users/Execs/index.ts");
    assert.match(users, /value: "charity_editor"/);
    assert.match(
      users,
      /name: "roles"[\s\S]*?create: adminsOnlyField[\s\S]*?update: adminsOnlyField/
    );
    assert.match(
      users,
      /isCharityEditor\(req\.user\)[\s\S]*?id:[\s\S]*?equals/
    );
  });

  test("charity events and media are server-scoped", async () => {
    const [events, media] = await Promise.all([
      read("src/collections/Events/index.ts"),
      read("src/collections/Media.ts"),
    ]);
    assert.match(events, /charityManaged: \{ equals: true \}/);
    assert.match(events, /charityManaged: true/);
    assert.match(events, /charityOwner:/);
    assert.match(events, /departments: \["charity"\]/);
    assert.match(media, /charityMedia: \{ equals: true \}/);
    assert.match(media, /charityMedia: true/);
    assert.match(media, /uploadedBy:/);
  });

  test("public queries enforce published drafts and campaign phases disable stale CTAs", async () => {
    const [data, view] = await Promise.all([
      read("src/Utils/datafetcher.ts"),
      read("src/components/Charity/CharityWeekView.tsx"),
    ]);
    assert.match(data, /draft: false/);
    assert.match(data, /overrideAccess: false/);
    assert.match(data, /hub\._status !== "published"/);
    assert.match(view, /const isCompleted = campaign\.phase === "completed"/);
    assert.match(view, /const donationURL = isActive/);
    assert.match(view, /registrationURL = !isCompleted/);
  });
});
