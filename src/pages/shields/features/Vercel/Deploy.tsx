import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/features/MarkdownStorybook';
import { GenVercelDeployShield } from '@/services/genVercelShield';

import { defaultControls } from './share';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  ...defaultControls,
  env: 'OPENAI_API_KEY',
  envDescription: 'Find your OpenAI API Key by click the right Learn More button.',
  envLink: 'https://platform.openai.com/account/api-keys',
  /* eslint-enable */
};

const VercelDeploy = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => {
    return GenVercelDeployShield(options);
  }, [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default VercelDeploy;
