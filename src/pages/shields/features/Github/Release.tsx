import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import { githubReleaseControlsPickList } from '@/const/githubShieldControls';
import MarkdownStorybook from '@/features/MarkdownStorybook';
import { genGithubReleaseShields } from '@/services/genGithubShield';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(githubReleaseControlsPickList, { collapsed: true }) };

const GithubRelease = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genGithubReleaseShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default GithubRelease;
