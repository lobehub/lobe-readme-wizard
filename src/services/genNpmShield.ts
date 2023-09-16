import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { NpmShieldControlItem } from '@/const/npmShieldControls';
import { NpmShieldBaseOptions } from '@/types/shields';
import { genShield } from '@/utils/genShield';

interface NpmShieldOptions extends NpmShieldBaseOptions, NpmShieldControlItem {
  name: string;
}

export const genNpmShield = (options: NpmShieldOptions) => {
  const { packageName, url, suffix, name, genLink, ...config } = options;

  const formatUrl = [url, packageName, suffix].filter(Boolean) as string[];
  const defShield = qs.stringifyUrl({
    query: pickBy(config, identity) as any,
    url: urlJoin(...formatUrl),
  });
  const defLink = genLink?.(packageName);

  return genShield(`npm-${name}`, defShield, defLink);
};
