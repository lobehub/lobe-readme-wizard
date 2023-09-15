import urlJoin from 'url-join';

import { colorOptions } from '@/const/shieldBaseConfig';
import { SHIELD_GITHUB_URL } from '@/const/url';

export const githubShields: {
  [key: string]: { color?: string; suffix?: string; url: string };
} = {
  contributors: {
    color: colorOptions.lime,
    url: urlJoin(SHIELD_GITHUB_URL, 'contributors'),
  },
  downloads: {
    color: colorOptions.cyan,
    suffix: 'total',
    url: urlJoin(SHIELD_GITHUB_URL, 'downloads'),
  },
  forks: { color: colorOptions.blue, url: urlJoin(SHIELD_GITHUB_URL, 'forks') },
  issues: {
    color: colorOptions.magenta,
    url: urlJoin(SHIELD_GITHUB_URL, 'issues'),
  },
  license: {
    color: colorOptions.white,
    url: urlJoin(SHIELD_GITHUB_URL, 'license'),
  },
  release: {
    color: colorOptions.lime,
    url: urlJoin(SHIELD_GITHUB_URL, 'v/release'),
  },
  stargazers: {
    color: colorOptions.gold,
    url: urlJoin(SHIELD_GITHUB_URL, 'stars'),
  },
};
