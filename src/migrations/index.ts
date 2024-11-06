import * as migration_20241019_184550 from './20241019_184550';
import * as migration_20241024_012335 from './20241024_012335';

export const migrations = [
  {
    up: migration_20241019_184550.up,
    down: migration_20241019_184550.down,
    name: '20241019_184550',
  },
  {
    up: migration_20241024_012335.up,
    down: migration_20241024_012335.down,
    name: '20241024_012335'
  },
];
