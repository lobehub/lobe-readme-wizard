import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { githubReleaseControls } from '@/const/githubShieldControls';
import { genGithubShield } from '@/services/genGithubShield';
import { genPickList } from '@/utils/genPickList';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(genPickList(githubReleaseControls), { collapsed: true }) };

const GithubRelease = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => {
    const defShields: string[] = [];
    const defLinks: string[] = [];

    for (const [name, config] of Object.entries(githubReleaseControls)) {
      if (!pickOptions[name]) continue;
      const data = genGithubShield({ name, ...options, ...config });
      defShields.push(data[0]);
      defLinks.push(data[1]);
    }
    return [defShields.join('\n'), defLinks.join('\n')];
  }, [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default GithubRelease;
