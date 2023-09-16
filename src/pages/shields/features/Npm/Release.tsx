import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { npmReleaseControls } from '@/const/npmShieldControls';
import { genNpmShield } from '@/services/genNpmShield';
import { genPickList } from '@/utils/genPickList';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(genPickList(npmReleaseControls), { collapsed: true }) };

const NpmRelease = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => {
    const defShields: string[] = [];
    const defLinks: string[] = [];

    for (const [name, config] of Object.entries(npmReleaseControls)) {
      if (!pickOptions[name]) continue;
      const data = genNpmShield({ name, ...options, ...config });
      defShields.push(data[0]);
      defLinks.push(data[1]);
    }
    return [defShields.join('\n'), defLinks.join('\n')];
  }, [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default NpmRelease;
