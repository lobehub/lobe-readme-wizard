import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { genMarkdownInstallation } from '@/services/genMarkdownInstallation';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  packageName: '@lobehub/ui',
  esm: true,
  bun: true,
  nextjs: true,
  backToTop: true,
  /* eslint-enable */
};

const Installation = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownInstallation(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Installation;
