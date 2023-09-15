import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getIconsData, titleToSlug } from 'simple-icons/sdk';

const runIconSync = async () => {
  const data = await getIconsData();
  const list = data.map((icon) => titleToSlug(icon.title));
  writeFileSync(
    resolve('./src/const/icons.ts'),
    `export default ${JSON.stringify(Array.from(new Set(list.filter(Boolean))))} as const`,
    'utf8',
  );
};

runIconSync();
