import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/features/MarkdownStorybook';
import { genMarkdownHero } from '@/services/genMarkdonHero';

import { defaultControls, defaultControlsExtra } from './share';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  logo: 'https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp',
  logo2: '',
  title: 'Lobe Chat',
  description:
    'LobeChat is a open-source, extensible , high-performance chatbot framework.<br/>It supports one-click free deployment of your private ChatGPT/LLM web application.',
  banner: 'https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png',
  backToTop: true,
  Github: folder({ ...defaultControls, branch: 'main', workflow: 'test,release' }),
  NPM: folder({
    packageName: '@lobehub/chat',
  }),
  ...defaultControlsExtra,
  /* eslint-enable */
};

const Hero = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownHero(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Hero;
