import * as migration_20260227_015008 from './20260227_015008';
import * as migration_20260306_141008 from './20260306_141008';
import * as migration_20260827_012915_event_planning from './20260827_012915_event_planning';
import * as migration_20260827_013537_event_reminders from './20260827_013537_event_reminders';

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
];
