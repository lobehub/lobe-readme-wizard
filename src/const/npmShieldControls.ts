import urlJoin from 'url-join';

import { colorOptions } from '@/const/shieldBaseControls';
import { NPM_URL, SHIELD_NPM_URL } from '@/const/url';
import { ShieldsBaseOptions } from '@/types/shields';
import { genPickList } from '@/utils/genPickList';

export interface NpmShieldControlItem extends Partial<ShieldsBaseOptions> {
  genLink?: (packageName: string) => string | undefined;
  suffix?: string;
  url: string;
}

const genLink: NpmShieldControlItem['genLink'] = (packageName) => urlJoin(NPM_URL, packageName);

export const npmShieldControls: {
  [key: string]: NpmShieldControlItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  release: {
    logo: 'npm',
    logoColor: 'white',
    color: colorOptions.geekblue,
    genLink,
    url: urlJoin(SHIELD_NPM_URL, 'v'),
  },
  downloads: {
    genLink,
    url: urlJoin(SHIELD_NPM_URL, 'dt'),
  },
  types: {
    genLink,
    url: urlJoin(SHIELD_NPM_URL, 'types'),
  },
  /* eslint-enable */
};

export const npmShieldControlsPickList = genPickList(npmShieldControls);
