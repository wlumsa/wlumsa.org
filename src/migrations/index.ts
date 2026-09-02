import * as migration_20260227_015008 from './20260227_015008';
import * as migration_20260306_141008 from './20260306_141008';
import * as migration_20260827_012915_event_planning from './20260827_012915_event_planning';
import * as migration_20260827_013537_event_reminders from './20260827_013537_event_reminders';
import * as migration_20260828_234500_recurring_events from './20260828_234500_recurring_events';
import * as migration_20260829_000100_fix_recurring_array_columns from './20260829_000100_fix_recurring_array_columns';
import * as migration_20260902_000100_add_manager_role from './20260902_000100_add_manager_role';

export const migrations = [
  {
    up: migration_20260227_015008.up,
    down: migration_20260227_015008.down,
    name: '20260227_015008',
  },
  {
    up: migration_20260306_141008.up,
    down: migration_20260306_141008.down,
    name: '20260306_141008',
  },
  {
    up: migration_20260827_012915_event_planning.up,
    down: migration_20260827_012915_event_planning.down,
    name: '20260827_012915_event_planning',
  },
  {
    up: migration_20260827_013537_event_reminders.up,
    down: migration_20260827_013537_event_reminders.down,
    name: '20260827_013537_event_reminders'
  },
  {
    up: migration_20260828_234500_recurring_events.up,
    down: migration_20260828_234500_recurring_events.down,
    name: '20260828_234500_recurring_events'
  },
  {
    up: migration_20260829_000100_fix_recurring_array_columns.up,
    down: migration_20260829_000100_fix_recurring_array_columns.down,
    name: '20260829_000100_fix_recurring_array_columns'
  },
  {
    up: migration_20260902_000100_add_manager_role.up,
    down: migration_20260902_000100_add_manager_role.down,
    name: '20260902_000100_add_manager_role'
  },
];
