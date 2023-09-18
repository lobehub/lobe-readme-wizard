import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import { defaultControls } from '@/Readme/share';
import MarkdownStorybook from '@/components/MarkdownStorybook';
import { genMarkdownDevelopment } from '@/services/genMarkdownDevelopment';

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
