import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { shareShieldControls, shareShieldControlsItem } from '@/const/shareShieldControls';
import { SHIELD_BADGE_URL } from '@/const/url';
import { ShieldsBaseOptions } from '@/types/shields';
import { formatCustomLabel } from '@/utils/formatCustomLabel';
import { genShield } from '@/utils/genShield';

type ShareShieldOptions = ShieldsBaseOptions &
  shareShieldControlsItem & {
    desc?: string;
    hashtags?: string;
    name: string;
    title?: string;
    url?: string;
  };

export const genSharehield = (options: ShareShieldOptions) => {
  console.log(options);

  const { name, genLink, title, desc, hashtags, url, color, label, ...config } = options;

  const defShield = qs.stringifyUrl({
    query: pickBy(config, identity) as any,
    url: urlJoin(
      SHIELD_BADGE_URL,
      formatCustomLabel({
        color: (color as string) || 'black',
        label: `share on ${label}`,
      }),
    ),
  });
  const defLink = genLink?.({ desc, hashtags, title, url });

  return genShield(`share-${name}`, defShield, defLink);
};

export const genShareShields = (
  options: Partial<ShareShieldOptions> | any,
  pickOptions: { [key: string]: boolean },
) => {
  const defShields: string[] = [];
  const defLinks: string[] = [];

  for (const [name, config] of Object.entries(shareShieldControls)) {
    if (!pickOptions[name]) continue;
    const data = genSharehield({ name, ...config, ...options, label: name });
    defShields.push(data[0]);
    defLinks.push(data[1]);
  }
  return [defShields.join('\n'), defLinks.join('\n')];
};
