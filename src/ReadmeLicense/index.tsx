import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import { defaultControls } from '@/Readme/share';
import MarkdownStorybook from '@/components/MarkdownStorybook';
import { genMarkdownLicense } from '@/services/genMarkdownLicense';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  ...defaultControls,
  license: 'MIT',
  /* eslint-enable */
};

const Hero = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownLicense(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Hero;
