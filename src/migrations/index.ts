import * as migration_20260227_015008 from './20260227_015008';
import * as migration_20260306_141008 from './20260306_141008';

export const migrations = [
  {
    up: migration_20260227_015008.up,
    down: migration_20260227_015008.down,
    name: '20260227_015008',
  },
  {
    up: migration_20260306_141008.up,
    down: migration_20260306_141008.down,
    name: '20260306_141008'
  },
];
