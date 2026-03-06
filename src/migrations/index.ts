import * as migration_20260227_015008 from './20260227_015008';
import * as migration_20260305_002557 from './20260305_002557';

export const migrations = [
  {
    up: migration_20260227_015008.up,
    down: migration_20260227_015008.down,
    name: '20260227_015008',
  },
  {
    up: migration_20260305_002557.up,
    down: migration_20260305_002557.down,
    name: '20260305_002557',
  },
];
