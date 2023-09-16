import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { genGithubActionShield } from '@/services/genGithubShield';

import { defaultControlsExtra } from './share';

const controls = {
  workflow: 'release',
  ...defaultControlsExtra,
};

const GithubAction = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genGithubActionShield(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default GithubAction;
