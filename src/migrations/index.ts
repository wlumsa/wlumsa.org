import * as migration_20241003_233506 from './20241003_233506';
import * as migration_20241007_142654 from './20241007_142654';

export const migrations = [
  {
    up: migration_20241003_233506.up,
    down: migration_20241003_233506.down,
    name: '20241003_233506',
  },
  {
    up: migration_20241007_142654.up,
    down: migration_20241007_142654.down,
    name: '20241007_142654'
  },
];
