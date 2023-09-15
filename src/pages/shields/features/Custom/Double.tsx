import { useControls, useCreateStore } from '@lobehub/ui';
import { cloneDeep, identity, merge, pickBy } from 'lodash-es';
import qs from 'query-string';
import { memo, useMemo } from 'react';
import urlJoin from 'url-join';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { shieldBaseConfig } from '@/const/shieldBaseConfig';
import { SHIELD_BADGE_URL } from '@/const/url';
import { formatCustomLabel, genImg } from '@/utils/genMD';

const defaultConfig = merge(cloneDeep(shieldBaseConfig), {
  color: {
    value: 'white',
  },
  content: 'LobeHub',
  label: 'Readme Generator',
});

const Github = memo(() => {
  const store = useCreateStore();

  const { content, label, color, ...config } = useControls(defaultConfig, { store });

  const md = useMemo(() => {
    const url = qs.stringifyUrl({
      query: pickBy(config, identity) as any,
      url: urlJoin(
        SHIELD_BADGE_URL,
        formatCustomLabel({
          color: color as string,
          content,
          label,
        }),
      ),
    });

    return genImg(content || label, url).join('\n\n');
  }, [content, label, color, config]);

  return <MarkdownStorybook levaStore={store}>{md}</MarkdownStorybook>;
});

export default Github;
