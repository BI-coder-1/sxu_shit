import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Git does not track empty directories. Restore only this fixed project scaffold.
// The root comes from this script's location, not the terminal's current directory.
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const directories = [
  'docs/decisions',
  'docs/reports',
  'src/components',
  'src/layouts',
  'src/pages',
  'src/content/papers',
  'src/styles',
  'src/lib',
  'src/types',
  'public/images',
  'public/icons',
  'public/papers',
];

for (const directory of directories) {
  await mkdir(join(projectRoot, directory), { recursive: true });
}

console.log('Phase 0 工程目录已就绪；已有文件保持原样。');
