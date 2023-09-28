import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';

import { ShieldsBaseOptions } from '@/types/shields';
import { genPickList } from '@/utils/genPickList';

export interface shareShieldControlsItem extends Partial<ShieldsBaseOptions> {
  genLink?: (props: {
    desc?: string;
    hashtags?: string;
    title?: string;
    url?: string;
  }) => string | undefined;
}

const formateHashtags = (hashtags: string): string[] =>
  hashtags.replaceAll('，', ',').replaceAll(' ', '').split(',');

const stringifyHashtags = (hashtags: string, joinfix: string = ',', prefix?: string) => {
  let tags = formateHashtags(hashtags.trim());
  if (prefix) tags = tags.map((tag) => prefix + tag);
  return tags.filter(Boolean).join(joinfix);
};

export const shareShieldControls: {
  [key: string]: shareShieldControlsItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  x: {
    logo: 'x',
    logoColor: 'white',
    genLink: ({ url, title, desc, hashtags }) => {
      const query = pickBy(
        {
          text: [title, desc].filter(Boolean).join(' - '),
          url,
          hashtags: hashtags && stringifyHashtags(hashtags),
        },
        identity,
      ) as any;
      return qs.stringifyUrl({
        url: 'https://x.com/intent/tweet',
        query,
      });
    },
  },
  telegram: {
    logo: 'telegram',
    logoColor: 'white',
    genLink: ({ url, title, desc, hashtags }) => {
      const query = pickBy(
        {
          text: [
            [title, desc].filter(Boolean).join(' - '),
            hashtags && stringifyHashtags(hashtags, ' ', '#'),
          ]
            .filter(Boolean)
            .join(' '),
          url,
        },
        identity,
      ) as any;
      return qs.stringifyUrl({
        url: 'https://t.me/share/url"',
        query,
      });
    },
  },
  whatsapp: {
    logo: 'whatsapp',
    logoColor: 'white',
    genLink: ({ url, title, desc, hashtags }) => {
      const query = pickBy(
        {
          text: [
            [title, desc].filter(Boolean).join(' - '),
            url,
            hashtags && stringifyHashtags(hashtags, ' ', '#'),
          ]
            .filter(Boolean)
            .join(' '),
        },
        identity,
      ) as any;
      return qs.stringifyUrl({
        url: 'https://api.whatsapp.com/send"',
        query,
      });
    },
  },
  weibo: {
    logo: 'sinaweibo',
    logoColor: 'white',
    genLink: ({ url, title, desc, hashtags }) => {
      const query = pickBy(
        {
          sharesource: 'weibo',
          title: [
            [title, desc].filter(Boolean).join(' - '),
            hashtags && stringifyHashtags(hashtags, ' ', '#'),
          ]
            .filter(Boolean)
            .join(' '),
          url,
        },
        identity,
      ) as any;
      return qs.stringifyUrl({
        url: 'http://service.weibo.com/share/share.php',
        query,
      });
    },
  },
  qq: {
    logo: 'tencentqq',
    logoColor: 'white',
    genLink: ({ url, title, desc, hashtags }) => {
      const query = pickBy(
        {
          title,
          desc: [desc, hashtags && stringifyHashtags(hashtags, ' ', '#')].filter(Boolean).join(' '),
          summary: [title, desc].filter(Boolean).join(' - '),
          url,
          sharesource: 'qzone',
        },
        identity,
      ) as any;
      return qs.stringifyUrl({
        url: 'http://connect.qq.com/widget/shareqq/index.html',
        query,
      });
    },
  },
  /* eslint-enable */
};

export const shareShieldControlsPickList = genPickList(shareShieldControls);
