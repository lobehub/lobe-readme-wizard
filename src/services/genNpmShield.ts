import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { NpmShieldControlItem, npmReleaseControls } from '@/const/npmShieldControls';
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

export const genNpmReleaseShields = (
  options: Partial<NpmShieldOptions> | any,
  pickOptions: { [key: string]: boolean },
) => {
  const defShields: string[] = [];
  const defLinks: string[] = [];

  for (const [name, config] of Object.entries(npmReleaseControls)) {
    if (!pickOptions[name]) continue;
    const data = genNpmShield({ name, ...options, ...config });
    defShields.push(data[0]);
    defLinks.push(data[1]);
  }
  return [defShields.join('\n'), defLinks.join('\n')];
};
