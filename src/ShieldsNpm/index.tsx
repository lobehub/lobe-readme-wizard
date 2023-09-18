import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import { npmReleaseControlsPickList } from '@/const/npmShieldControls';
import MarkdownStorybook from '@/features/MarkdownStorybook';
import { genNpmReleaseShields } from '@/services/genNpmShield';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(npmReleaseControlsPickList, { collapsed: true }) };

const NpmRelease = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genNpmReleaseShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default NpmRelease;
