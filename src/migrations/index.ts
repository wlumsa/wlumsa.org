import * as migration_20250927_170829 from './20250927_170829';
import * as migration_20250927_184359 from './20250927_184359';
import * as migration_20250929_005333 from './20250929_005333';
import * as migration_20251028 from './20251028';
import * as migration_20251221_010011 from './20251221_010011';
import * as migration_20260105_004101 from './20260105_004101';

export const migrations = [
  {
    up: migration_20250927_170829.up,
    down: migration_20250927_170829.down,
    name: '20250927_170829',
  },
  {
    up: migration_20250927_184359.up,
    down: migration_20250927_184359.down,
    name: '20250927_184359',
  },
  {
    up: migration_20250929_005333.up,
    down: migration_20250929_005333.down,
    name: '20250929_005333',
  },
  {
    up: migration_20251028.up,
    down: migration_20251028.down,
    name: '20251028',
  },
  {
    up: migration_20251221_010011.up,
    down: migration_20251221_010011.down,
    name: '20251221_010011',
  },
  {
    up: migration_20260105_004101.up,
    down: migration_20260105_004101.down,
    name: '20260105_004101'
  },
];
