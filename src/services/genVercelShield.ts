import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { GITHUB_URL, SHIELD_URL } from '@/const/url';
import { genShield } from '@/utils/genShield';

interface VercelDeployShieldOptions {
  env?: string;
  envDescription?: string;
  envLink?: string;
  owner: string;
  repo: string;
}

export const GenVercelDeployShield = (options: VercelDeployShieldOptions) => {
  const { owner, repo, env, envDescription, envLink } = options;
  const query = {
    env,
    envDescription,
    envLink,
    ['project-name']: repo,
    ['repository-link']: urlJoin(GITHUB_URL, owner, repo),
    ['repository-name']: repo,
  };
  const defShield = 'https://vercel.com/button';
  const defLink = qs.stringifyUrl({
    query: pickBy(query, identity),
    url: 'https://vercel.com/new/clone',
  });
  return genShield('vercel-deploy', defShield, defLink);
};

export const genVercelWebsiteShield = (options: { label: string; url: string }) => {
  const url = qs.stringifyUrl({
    query: pickBy(
      {
        down_message: 'offline',
        labelColor: 'black',
        logo: 'vercel',
        style: 'flat-square',
        up_message: 'online',
        ...options,
      },
      identity,
    ) as any,
    url: urlJoin(SHIELD_URL, 'website'),
  });

  return genShield('vercel-website', url, options.url);
};
