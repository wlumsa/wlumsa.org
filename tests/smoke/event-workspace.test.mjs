import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";

const root = process.cwd();

describe("event workspace", () => {
  test("registers one event workspace with calendar-linked work", async () => {
    const [
      config,
      workspace,
      calendar,
      navigation,
      workspaceNavigation,
      adminShell,
    ] = await Promise.all([
      readFile(join(root, "src/payload.config.ts"), "utf8"),
      readFile(
        join(root, "src/components/Admin/EventWorkspaceView.tsx"),
        "utf8"
      ),
      readFile(
        join(root, "src/components/Admin/PlanningCalendarView.tsx"),
        "utf8"
      ),
      readFile(join(root, "src/components/Admin/PlanningNav.tsx"), "utf8"),
      readFile(
        join(root, "src/components/Admin/PlanningWorkspaceNav.tsx"),
        "utf8"
      ),
      readFile(
        join(root, "src/components/Admin/PlanningAdminShell.tsx"),
        "utf8"
      ),
    ]);

    assert.match(config, /path: "\/events"/);
    assert.match(navigation, /href="\/admin\/events"/);
    assert.match(workspace, /collection: "event-tasks"/);
    assert.match(workspace, /collection: "content-schedule"/);
    assert.match(workspace, /href="\/admin\/calendar"/);
    assert.match(workspace, /<CalendarQuickView/);
    assert.match(workspace, /<PlanningAdminShell/);
    assert.match(calendar, /<PlanningAdminShell/);
    assert.match(adminShell, /<DefaultTemplate/);
    assert.match(workspaceNavigation, /label: "My Tasks"/);
    assert.match(workspaceNavigation, /label: "Events"/);
    assert.match(workspaceNavigation, /label: "Calendar"/);
  });

  test("stores the small planning brief and carries it to recurrences", async () => {
    const [events, recurrence, migration] = await Promise.all([
      readFile(join(root, "src/collections/Events/index.ts"), "utf8"),
      readFile(join(root, "src/collections/Events/recurrence.ts"), "utf8"),
      readFile(
        join(root, "src/migrations/20260902_000200_event_workspace.ts"),
        "utf8"
      ),
    ]);

    for (const field of [
      "planningStatus",
      "potentialVenue",
      "planningUpdate",
    ]) {
      assert.match(events, new RegExp(`name: "${field}"`));
      assert.match(recurrence, new RegExp(`${field}: event\\.${field}`));
    }

    assert.match(migration, /"planning_status"/);
    assert.match(migration, /"potential_venue"/);
    assert.match(migration, /"planning_update"/);
  });
});
