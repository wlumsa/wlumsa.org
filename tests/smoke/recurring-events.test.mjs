import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, test } from "node:test";

import ts from "typescript";

const source = await readFile(
  join(process.cwd(), "src/collections/Events/recurrenceDates.ts"),
  "utf8"
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const recurrenceModule = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const { getRecurringEventDates, validateRecurrenceEnd } = recurrenceModule;

describe("recurring events", () => {
  test("keeps Toronto wall-clock time across daylight-saving changes", () => {
    const occurrences = getRecurringEventDates({
      date: "2026-03-02T00:00:00.000Z", // March 1 at 7 p.m. EST
      recurrence: "weekly",
      recurrenceEnd: "2026-03-15",
      recurrenceExcludedDates: [],
    });

    assert.deepEqual(occurrences, [
      { date: "2026-03-08T23:00:00.000Z", key: "2026-03-08" },
      { date: "2026-03-15T23:00:00.000Z", key: "2026-03-15" },
    ]);
  });

  test("clamps month-end dates and honors skipped dates", () => {
    const occurrences = getRecurringEventDates({
      date: "2026-02-01T00:00:00.000Z", // January 31 at 7 p.m. EST
      recurrence: "monthly",
      recurrenceEnd: "2026-03-31",
      recurrenceExcludedDates: [{ date: "2026-02-28" }],
    });

    assert.deepEqual(occurrences, [
      { date: "2026-03-31T23:00:00.000Z", key: "2026-03-31" },
    ]);
  });

  test("requires an end date after the first occurrence", () => {
    assert.equal(
      validateRecurrenceEnd(undefined, "weekly", "2026-08-28T23:00:00Z"),
      "Choose when this recurring event should end."
    );
    assert.equal(
      validateRecurrenceEnd("2026-08-28", "weekly", "2026-08-28T23:00:00Z"),
      "The recurrence end date must be after the first event."
    );
  });

  test("accepts 60 occurrences and rejects a 61st", () => {
    const event = {
      date: "2026-01-02T00:00:00.000Z", // January 1 at 7 p.m. EST
      recurrence: "weekly",
      recurrenceExcludedDates: [],
    };

    assert.equal(
      getRecurringEventDates({ ...event, recurrenceEnd: "2027-02-25" }).length,
      60
    );
    assert.throws(
      () => getRecurringEventDates({ ...event, recurrenceEnd: "2027-03-04" }),
      /at most 60 occurrences/
    );
  });
});
