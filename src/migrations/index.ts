import * as migration_20250309_051318 from './20250309_051318';
import * as migration_20250819_023505 from './20250819_023505';

export const migrations = [
  {
    up: migration_20250309_051318.up,
    down: migration_20250309_051318.down,
    name: '20250309_051318',
  },
  {
    up: migration_20250819_023505.up,
    down: migration_20250819_023505.down,
    name: '20250819_023505'
  },
];
