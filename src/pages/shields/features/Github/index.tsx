import { useControls, useCreateStore } from '@lobehub/ui';
import { folder } from 'leva';
import { cloneDeep, identity, pick, pickBy } from 'lodash-es';
import qs from 'query-string';
import { memo, useMemo } from 'react';
import urlJoin from 'url-join';

import MarkdownStorybook from '@/Features/MarkdownStorybook';
import { shieldBaseConfig } from '@/const/shieldBaseConfig';
import { githubShields } from '@/pages/shields/features/Github/url';
import { genImg } from '@/utils/genMD';

const defaultConfig = {
  owner: 'lobehub',
  repo: 'lobe-chat',
  ['⚒️']: folder(pick(cloneDeep(shieldBaseConfig), ['color', 'labelColor', 'style'])),
};

const Github = memo(() => {
  const store = useCreateStore();

  const { owner, repo, ...config } = useControls(defaultConfig, { store });

  const md = useMemo(() => {
    const shields: string[] = [];
    const links: string[] = [];

    for (const [key, { url, suffix, color }] of Object.entries(githubShields)) {
      const query = pickBy(config, identity) as any;
      const formatUrl = [url, owner, repo, suffix].filter(Boolean) as string[];
      const shieldUrl = qs.stringifyUrl({
        query: !query.color && color ? { ...query, color } : query,
        url: urlJoin(...formatUrl),
      });
      const data = genImg(key, shieldUrl);
      shields.push(data[0]);
      links.push(data[1]);
    }

    return [shields.join('\n'), '<!-- SHIELDS -->', links.join('\n')].join('\n\n');
  }, [owner, repo, config]);

  return <MarkdownStorybook levaStore={store}>{md}</MarkdownStorybook>;
});

export default Github;
