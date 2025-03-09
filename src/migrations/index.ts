import * as migration_20250309_051318 from './20250309_051318';

export const migrations = [
  {
    up: migration_20250309_051318.up,
    down: migration_20250309_051318.down,
    name: '20250309_051318'
  },
];
