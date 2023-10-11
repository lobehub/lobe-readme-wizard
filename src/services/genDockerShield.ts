import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { DockerShieldControlItem, dockerShieldControls } from '@/const/dockerShieldControls';
import { DockerShieldBaseOptions } from '@/types/shields';
import { genShield } from '@/utils/genShield';

interface DockerShieldOptions extends DockerShieldBaseOptions, DockerShieldControlItem {
  name: string;
}

export const genDockerShield = (options: DockerShieldOptions) => {
  const { packageName, url, suffix, name, genLink, ...config } = options;

  const formatUrl = [url, packageName, suffix].filter(Boolean) as string[];
  const defShield = qs.stringifyUrl({
    query: pickBy(config, identity) as any,
    url: urlJoin(...formatUrl),
  });
  const defLink = genLink?.(packageName);

  return genShield(`docker-${name}`, defShield, defLink);
};

export const genDockerShields = (
  options: Partial<DockerShieldOptions> | any,
  pickOptions: { [key: string]: boolean },
) => {
  const defShields: string[] = [];
  const defLinks: string[] = [];

  for (const [name, config] of Object.entries(dockerShieldControls)) {
    if (!pickOptions[name]) continue;
    const data = genDockerShield({ name, ...options, ...config });
    defShields.push(data[0]);
    defLinks.push(data[1]);
  }
  return [defShields.join('\n'), defLinks.join('\n')];
};
