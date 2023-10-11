import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { dockerShieldControlsPickList } from '@/const/dockerShieldControls';
import { genDockerShields } from '@/services/genDockerShield';

import { defaultControlsExtra } from './share';

const controls = defaultControlsExtra;
const pickControls = { ['✅']: folder(dockerShieldControlsPickList, { collapsed: true }) };

const Docker = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genDockerShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Docker;
