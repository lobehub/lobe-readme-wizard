import { identity, pickBy } from 'lodash-es';
import qs from 'query-string';
import urlJoin from 'url-join';

import { GithubShieldControlItem } from '@/const/githubShieldControls';
import {
  GITHUBE_CONTRIB_URL,
  GITHUB_STAR_HISTORY_URL,
  GITHUB_URL,
  SHIELD_GITHUB_URL,
} from '@/const/url';
import { GithubShieldBaseOptions } from '@/types/shields';
import { genShield } from '@/utils/genShield';
import { genThemeModeImg } from '@/utils/genThemeModeImg';

interface GithubShieldOptions extends GithubShieldBaseOptions, GithubShieldControlItem {
  name: string;
}

export const genGithubShield = (options: GithubShieldOptions) => {
  const { owner, repo, branch, name, url, suffix, genLink, ...config } = options;

  const formatUrl = [url, owner, repo, suffix].filter(Boolean) as string[];
  const defShield = qs.stringifyUrl({
    query: pickBy(config, identity) as any,
    url: urlJoin(...formatUrl),
  });
  const defLink = genLink?.({ branch, owner, repo });

  return genShield(`github-${name}`, defShield, defLink);
};

interface GithubActionShieldOptions extends GithubShieldBaseOptions {
  workflow: string;
}

export const genGithubActionShield = (options: GithubActionShieldOptions) => {
  const { owner, repo, workflow, ...config } = options;

  const query = pickBy(config, identity) as any;

  const defShield = qs.stringifyUrl({
    query: { label: workflow, logo: 'githubactions', logoColor: 'white', ...query },
    url: urlJoin(SHIELD_GITHUB_URL, 'actions/workflow/status', owner, repo, workflow + '.yml'),
  });
  const defLink = urlJoin(GITHUB_URL, 'actions/workflows', owner, repo, workflow + '.yml');

  return genShield(`github-action-${workflow}`, defShield, defLink);
};

export const genGithubStarHistoryShield = (options: { owner: string; repo: string }) => {
  const light = qs.stringifyUrl({
    query: {
      repos: `${options.owner}/${options.repo}`,
      type: 'Date',
    },
    url: GITHUB_STAR_HISTORY_URL,
  });
  const dark = qs.stringifyUrl({
    query: {
      repos: `${options.owner}/${options.repo}`,
      theme: 'dark',
      type: 'Date',
    },
    url: GITHUB_STAR_HISTORY_URL,
  });
  return genThemeModeImg({ dark, light });
};
export const GenGithubContributorsShield = (options: { owner: string; repo: string }) => {
  const defShield = qs.stringifyUrl({
    query: {
      repo: `${options.owner}/${options.repo}`,
    },
    url: GITHUBE_CONTRIB_URL,
  });
  const defLink = urlJoin(GITHUB_URL, options.owner, options.repo, 'graphs/contributors');
  return genShield('github-contrib', defShield, defLink);
};
