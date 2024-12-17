import * as migration_20241217_011405 from './20241217_011405';

export const migrations = [
  {
    up: migration_20241217_011405.up,
    down: migration_20241217_011405.down,
    name: '20241217_011405'
  },
];
