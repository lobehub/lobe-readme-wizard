import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { npmShieldControlsPickList } from '@/const/npmShieldControls';
import { genNpmShields } from '@/services/genNpmShield';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(npmShieldControlsPickList, { collapsed: true }) };

const Npm = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genNpmShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Npm;
