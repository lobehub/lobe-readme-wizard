import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/features/MarkdownStorybook';
import { genGithubStarHistoryShield } from '@/services/genGithubShield';

import { defaultControls } from './share';

const controls = defaultControls;

const GithubStarHistory = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => {
    return genGithubStarHistoryShield(options);
  }, [options]);

  return <MarkdownStorybook levaStore={store}>{md}</MarkdownStorybook>;
});

export default GithubStarHistory;
