import * as migration_20250927_170829 from './20250927_170829';
import * as migration_20250927_184359 from './20250927_184359';

export const migrations = [
  {
    up: migration_20250927_170829.up,
    down: migration_20250927_170829.down,
    name: '20250927_170829',
  },
  {
    up: migration_20250927_184359.up,
    down: migration_20250927_184359.down,
    name: '20250927_184359'
  },
];
