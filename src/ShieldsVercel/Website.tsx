import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { genVercelWebsiteShield } from '@/services/genVercelShield';

const controls = {
  label: '',
  url: 'https://lobe-readme-wizard.vercel.app',
};

const VercelWebsite = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(
    () =>
      genVercelWebsiteShield({
        label: options.label || options.url.replaceAll('https://', '').replaceAll('http://', ''),

        url: options.url,
      }),
    [options],
  );

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default VercelWebsite;
