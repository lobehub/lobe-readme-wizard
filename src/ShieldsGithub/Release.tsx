import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { githubShieldControlsPickList } from '@/const/githubShieldControls';
import { genGithubReleaseShields } from '@/services/genGithubShield';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(githubShieldControlsPickList, { collapsed: true }) };

const GithubRelease = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genGithubReleaseShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default GithubRelease;
