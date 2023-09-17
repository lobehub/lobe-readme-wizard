import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/features/MarkdownStorybook';
import { genMarkdownDevelopment } from '@/services/genMarkdownDevelopment';

import { defaultControls } from './share';

const controls = {
  ...defaultControls,
  backToTop: true,
  bun: true,
};

const Hero = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownDevelopment(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Hero;
