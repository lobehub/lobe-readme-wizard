import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { socialShieldControls, socialShieldControlsItem } from '@/const/socialShieldControls';
import { SHIELD_BADGE_URL } from '@/const/url';
import { ShieldsBaseOptions } from '@/types/shields';
import { formatCustomLabel } from '@/utils/formatCustomLabel';
import { genShield } from '@/utils/genShield';

interface SpcialIdOptions {
  discord?: string;
  qq?: string;
  steam?: string;
  wechat?: string;
  weibo?: string;
  x?: string;
}

type SocialShieldOptions = ShieldsBaseOptions &
  socialShieldControlsItem & {
    id: string;
    name: string;
    prefix: boolean;
  };

export const genSocialShield = (options: SocialShieldOptions) => {
  const { name, genLink, id, color, prefix, ...config } = options;

  const defShield = qs.stringifyUrl({
    query: pickBy(config, identity) as any,
    url: urlJoin(
      SHIELD_BADGE_URL,
      formatCustomLabel({
        color: (color as string) || 'black',
        label: `${prefix ? '@' : ''}${id}`,
      }),
    ),
  });
  const defLink = genLink?.(id);

  return genShield(`social-${name}`, defShield, defLink);
};

export const genSocialShields = (
  options: Partial<SocialShieldOptions> | any,
  idOptions: SpcialIdOptions,
  pickOptions: { [key: string]: boolean },
) => {
  const defShields: string[] = [];
  const defLinks: string[] = [];

  for (const [name, config] of Object.entries(socialShieldControls)) {
    if (!pickOptions[name]) continue;
    const data = genSocialShield({
      name,
      ...config,
      ...options,
      color: options.color || config.color,
      // @ts-ignore
      id: idOptions?.[name],
    });
    defShields.push(data[0]);
    defLinks.push(data[1]);
  }
  return [defShields.join('\n'), defLinks.join('\n')];
};
