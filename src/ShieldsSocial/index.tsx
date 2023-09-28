import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { pick } from 'lodash-es';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { shieldBaseControls } from '@/const/shieldBaseControls';
import { socialShieldControlsPickList } from '@/const/socialShieldControls';
import { genSocialShields } from '@/services/genSocialShield';

const idControls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  qq: '40073838',
  wechat: '40073838',
  x: 'canisminor1990',
  weibo: 'Canis_Minor',
  discord: 'canisminor1990',
  steam: 'canisminor',
  /* eslint-enable */
};

const controls = {
  prefix: true,
  ['⚒️']: folder(
    {
      ...pick(shieldBaseControls, ['style', 'labelColor', 'color']),
      logoColor: {
        ...shieldBaseControls.logoColor,
        value: 'white',
      },
    },
    {
      collapsed: true,
    },
  ),
};
const pickControls = { ['✅']: folder(socialShieldControlsPickList, { collapsed: true }) };

const Social = memo(() => {
  const store = useCreateStore();

  const idOptions = useControls(idControls, { store });
  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(
    () => genSocialShields(options, idOptions, pickOptions),
    [options, idOptions, pickOptions],
  );

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Social;
