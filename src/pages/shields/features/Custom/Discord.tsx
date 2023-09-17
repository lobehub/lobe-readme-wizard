import { useControls, useCreateStore } from '@lobehub/ui';
import { LevaInputs } from 'leva';
import { memo, useMemo } from 'react';

import { shieldBaseControls } from '@/const/shieldBaseControls';
import MarkdownStorybook from '@/features/MarkdownStorybook';
import { defaultControls } from '@/pages/shields/features/Custom/share';
import { genCustomDiscordShield } from '@/services/genCustomShield';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  serverId: {
    value: '1127171173982154893',
    type: LevaInputs.STRING,
  },
  label: 'discord',
  labelColor: {
    ...shieldBaseControls.labelColor,
    value: 'black',
  },
  link: 'https://discord.gg/AYFPHvv2jT',
  ...defaultControls,
  /* eslint-enable */
};

const CustomDiscord = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genCustomDiscordShield(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default CustomDiscord;
