import { useControls, useCreateStore } from '@lobehub/ui';
import { LevaInputs, folder } from 'leva';
import { pick } from 'lodash-es';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { shieldBaseControls } from '@/const/shieldBaseControls';
import { genBilibiliShield } from '@/services/genCustomShield';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  uid: {
    value: '410372',
    type: LevaInputs.STRING,
  },
  label: 'followers',
  ['⚒️']: folder(
    {
      ...pick(shieldBaseControls, ['style', 'labelColor']),
      color: {
        ...shieldBaseControls.labelColor,
        value: 'fb7299',
      },
      logoColor: {
        ...shieldBaseControls.logoColor,
        value: 'white',
      },
    },
    {
      collapsed: true,
    },
  ),
  /* eslint-enable */
};

const Bilibili = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genBilibiliShield(options as any), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Bilibili;
