import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { pick } from 'lodash-es';
import { memo, useMemo } from 'react';

import MarkdownStorybook from '@/components/MarkdownStorybook';
import { shareShieldControlsPickList } from '@/const/shareShieldControls';
import { shieldBaseControls } from '@/const/shieldBaseControls';
import { genShareShields } from '@/services/genShareShield';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  title: {
    value: 'Check this GitHub repository out 🤯 LobeChat',
    rows: 4,
  },
  desc: {
    value:
      'An open-source, extensible (Function Calling), high-performance chatbot framework. It supports one-click free deployment of your private ChatGPT/LLM web application.',
    rows: 8,
  },
  hashtags: 'chatbot, chatGPT, openAI',
  url: 'https://github.com/lobehub/lobe-chat',
  ['⚒️']: folder(
    {
      ...pick(shieldBaseControls, ['style', 'color']),
      labelColor: {
        ...shieldBaseControls.labelColor,
        value: 'black',
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
const pickControls = { ['✅']: folder(shareShieldControlsPickList, { collapsed: true }) };

const Share = memo(() => {
  const store = useCreateStore();

  const options = useControls(controls, { store });
  const pickOptions = useControls(pickControls, { store });

  const md = useMemo(() => genShareShields(options, pickOptions), [options, pickOptions]);

  return <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>;
});

export default Share;
