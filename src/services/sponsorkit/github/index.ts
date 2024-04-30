import type { Provider, SponsorkitConfig, Sponsorship } from '../types';
import { getPastSponsors } from './get-past-sponsors';
import { makeQuery } from './makeQuery';

const API = 'https://api.github.com/graphql';

export async function fetchGitHubSponsors(
  token: string,
  login: string,
  type: string,
  config: SponsorkitConfig,
): Promise<Sponsorship[]> {
  if (!token) throw new Error('GitHub token is required');
  if (!login) throw new Error('GitHub login is required');
  if (!['user', 'organization'].includes(type))
    throw new Error('GitHub type must be either `user` or `organization`');

  const sponsors: Sponsorship[] = [];
  let cursor;

  do {
    const query = makeQuery(login, type, cursor);
    const res = await fetch(API, {
      body: JSON.stringify({ query }),
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await res.json();

    if (!data) throw new Error(`Get no response on requesting ${API}`);
    else if (data.errors?.[0]?.type === 'INSUFFICIENT_SCOPES')
      throw new Error('Token is missing the `read:user` and/or `read:org` scopes');
    else if (data.errors?.length)
      throw new Error(`GitHub API error:\n${JSON.stringify(data.errors, null, 2)}`);

    sponsors.push(...(data.data[type].sponsorshipsAsMaintainer.nodes || []));
    if (data.data[type].sponsorshipsAsMaintainer.pageInfo.hasNextPage)
      cursor = data.data[type].sponsorshipsAsMaintainer.pageInfo.endCursor;
    else cursor = undefined;
  } while (cursor);

  const processed = sponsors.map(
    (raw: any): Sponsorship => ({
      createdAt: raw.createdAt,
      isOneTime: raw.tier.isOneTime,
      monthlyDollars: raw.tier.monthlyPriceInDollars,
      privacyLevel: raw.privacyLevel,
      sponsor: {
        ...raw.sponsorEntity,
        __typename: undefined,
        linkUrl: `https://github.com/${raw.sponsorEntity.login}`,
        type: raw.sponsorEntity.__typename,
      },
      tierName: raw.tier.name,
    }),
  );

  if (config.includePastSponsors) {
    try {
      processed.push(...(await getPastSponsors(login)));
    } catch (error) {
      console.error('Failed to fetch past sponsors:', error);
    }
  }

  return processed;
}

export const GitHubProvider: Provider = {
  fetchSponsors(config) {
    return fetchGitHubSponsors(
      config.github?.token || config.token!,
      config.github?.login || config.login!,
      config.github?.type || 'user',
      config,
    );
  },
  name: 'github',
};
