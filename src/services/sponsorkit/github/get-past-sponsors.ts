import { parse } from 'node-html-parser';

import type { Sponsorship } from '../types';

export interface GetPastSponsorsOptions {
  /**
   * @default false
   */
  includePrivate?: boolean;
}

function pickSponsorsInfo(html: string): Sponsorship[] {
  const root = parse(html);
  const baseDate = new Date('2000-1-1');
  const sponsors = root.querySelectorAll('div').map((el) => {
    const isPublic = el.querySelector('img');
    const name = isPublic ? isPublic?.getAttribute('alt')?.replace('@', '') : 'Private Sponsor';
    const avatarUrl = isPublic ? isPublic?.getAttribute('src') : '';
    const login = isPublic
      ? el.querySelector('a')?.getAttribute('href')?.replace('/', '')
      : undefined;
    const type = el
      .querySelector('a')
      ?.getAttribute('data-hovercard-type')
      ?.replace(/^\S/, (s) => s.toUpperCase());

    return {
      createdAt: baseDate.toUTCString(),
      isOneTime: undefined,
      monthlyDollars: -1,
      privacyLevel: isPublic ? 'PUBLIC' : 'PRIVATE',
      sponsor: {
        __typename: undefined,
        avatarUrl,
        linkUrl: `https://github.com/${name}`,
        login,
        name,
        type,
      },
      tierName: undefined,
    } as Sponsorship;
  });

  return sponsors;
}

export async function getPastSponsors(username: string): Promise<Sponsorship[]> {
  const allSponsors: Sponsorship[] = [];
  let newSponsors = [];
  let cursor = 1;

  do {
    const res = await fetch(
      `https://github.com/sponsors/${username}/sponsors_partial?filter=inactive&page=${cursor++}`,
      { method: 'GET' },
    );
    const content = await res.text();
    newSponsors = pickSponsorsInfo(content);
    allSponsors.push(...newSponsors);
  } while (newSponsors.length);

  return allSponsors;
}
