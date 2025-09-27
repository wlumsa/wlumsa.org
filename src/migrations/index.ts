import * as migration_20250927_170829 from './20250927_170829';

export const migrations = [
  {
    up: migration_20250927_170829.up,
    down: migration_20250927_170829.down,
    name: '20250927_170829'
  },
];
