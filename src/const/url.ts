import urlJoin from 'url-join';

export const GITHUB_URL = 'https://github.com';
export const GITHUB_STAR_HISTORY_URL = 'https://api.star-history.com/svg';
export const GITHUBE_CONTRIB_URL = 'https://contrib.rocks/image';
export const NPM_URL = 'https://www.npmjs.com/package';
export const DOCKER_URL = 'https://hub.docker.com/r';
export const SHIELD_URL = 'https://img.shields.io';
export const SHIELD_BADGE_URL = urlJoin(SHIELD_URL, 'badge');
export const SHIELD_GITHUB_URL = urlJoin(SHIELD_URL, 'github');
export const SHIELD_NPM_URL = urlJoin(SHIELD_URL, 'npm');
export const SHIELD_DOCKER_URL = urlJoin(SHIELD_URL, 'docker');
