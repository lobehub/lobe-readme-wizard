import urlJoin from 'url-join';

import { colorOptions } from '@/const/shieldBaseControls';
import { ShieldsBaseOptions } from '@/types/shields';
import { genPickList } from '@/utils/genPickList';

export interface socialShieldControlsItem extends Partial<ShieldsBaseOptions> {
  genLink?: (id: string) => string | undefined;
}

export const socialShieldControls: {
  [key: string]: socialShieldControlsItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  qq: {
    logo: 'tencentqq',
    logoColor: 'white',
    color: colorOptions.blue,
  },
  wechat: {
    logo: 'wechat',
    logoColor: 'white',
    color: colorOptions.lime,
  },
  discord: {
    logo: 'discord',
    logoColor: 'white',
    color: colorOptions.purple,
  },
  weibo: {
    logo: 'sinaweibo',
    logoColor: 'white',
    color: 'FF9F9F',
    genLink: (id) => urlJoin('https://weibo.com/n', id),
  },
  steam: {
    logo: 'steam',
    logoColor: 'white',
    color: 'ABCAFF',
    genLink: (id) => urlJoin('https://steamcommunity.com/id', id),
  },
  x: {
    logo: 'x',
    logoColor: 'white',
    color: colorOptions.white,
    genLink: (id) => urlJoin('https://x.com', id),
  },
  /* eslint-enable */
};

export const socialShieldControlsPickList = genPickList(socialShieldControls);
