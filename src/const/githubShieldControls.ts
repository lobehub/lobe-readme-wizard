import urlJoin from 'url-join';

import { colorOptions } from '@/const/shieldBaseControls';
import { GITHUB_URL, SHIELD_GITHUB_URL } from '@/const/url';
import { GithubShieldBaseOptions, ShieldsBaseOptions } from '@/types/shields';
import { genPickList } from '@/utils/genPickList';

export interface GithubShieldControlItem extends Partial<ShieldsBaseOptions> {
  genLink?: (options: GithubShieldBaseOptions) => string | undefined;
  suffix?: string;
  url: string;
}

export const githubSocialControls: {
  [key: string]: GithubShieldControlItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  contributors: {
    color: colorOptions.lime,
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'graphs/contributors'),
    url: urlJoin(SHIELD_GITHUB_URL, 'contributors'),
  },
  forks: {
    color: colorOptions.blue,
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'network/members'),
    url: urlJoin(SHIELD_GITHUB_URL, 'forks'),
  },
  stars: {
    color: colorOptions.gold,
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'network/stargazers'),
    url: urlJoin(SHIELD_GITHUB_URL, 'stars'),
  },
  issues: {
    color: colorOptions.magenta,
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'issues'),
    url: urlJoin(SHIELD_GITHUB_URL, 'issues'),
  },
  license: {
    color: colorOptions.white,
    genLink: ({ owner, repo, branch }) =>
      branch && urlJoin(GITHUB_URL, owner, repo, 'blob', branch, 'LICENSE'),
    url: urlJoin(SHIELD_GITHUB_URL, 'license'),
  },
  /* eslint-enable */
};

export const githubSocialControlsPickList = genPickList(githubSocialControls);

export const githubShieldControls: {
  [key: string]: GithubShieldControlItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  release: {
    logo: 'github',
    color: colorOptions.geekblue,
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'releases'),
    url: urlJoin(SHIELD_GITHUB_URL, 'v/release'),
  },
  releaseDate: {
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'releases'),
    url: urlJoin(SHIELD_GITHUB_URL, 'release-date'),
  },
  downloads: {
    genLink: ({ owner, repo }) => urlJoin(GITHUB_URL, owner, repo, 'releases'),
    suffix: 'total',
    url: urlJoin(SHIELD_GITHUB_URL, 'downloads'),
  },
  /* eslint-enable */
};

export const githubShieldControlsPickList = genPickList(githubShieldControls);
