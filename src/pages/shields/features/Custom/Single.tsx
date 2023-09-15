import { useControls, useCreateStore } from '@lobehub/ui';
import { cloneDeep, identity, merge, pick, pickBy } from 'lodash-es';
import qs from 'query-string';
import { memo, useMemo } from 'react';
import urlJoin from 'url-join';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { shieldBaseConfig } from '@/const/shieldBaseConfig';
import { SHIELD_BADGE_URL } from '@/const/url';
import { formatCustomLabel, genImg } from '@/utils/genMD';

const defaultConfig = merge(
  pick(cloneDeep(shieldBaseConfig), ['color', 'logo', 'logoColor', 'style']),
  {
    color: {
      value: 'black',
    },
    label: 'Readme Generator',
  },
);

const Github = memo(() => {
  const store = useCreateStore();

  const { label, color, ...config } = useControls(defaultConfig, { store });

  const md = useMemo(() => {
    const url = qs.stringifyUrl({
      query: pickBy(config, identity) as any,
      url: urlJoin(
        SHIELD_BADGE_URL,
        formatCustomLabel({
          color: color as string,
          label,
        }),
      ),
    });

    return genImg(label, url).join('\n\n');
  }, [label, color, config]);

  return <MarkdownStorybook levaStore={store}>{md}</MarkdownStorybook>;
});

export default Github;
