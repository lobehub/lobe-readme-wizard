import { useControls, useCreateStore } from '@lobehub/ui';
import { LevaInputs, folder } from 'leva';
import { pick } from 'lodash-es';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { shieldBaseControls } from '@/const/shieldBaseControls';
import { genDiscordShield } from '@/services/genCustomShield';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  serverId: {
    value: '1127171173982154893',
    type: LevaInputs.STRING,
  },
  label: 'discord',
  link: 'https://discord.gg/AYFPHvv2jT',
  ['⚒️']: folder(
    {
      ...pick(shieldBaseControls, ['style', 'labelColor']),
      color: {
        ...shieldBaseControls.labelColor,
        value: '5865f2',
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

const Discord = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genDiscordShield(options), [options]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Discord;
