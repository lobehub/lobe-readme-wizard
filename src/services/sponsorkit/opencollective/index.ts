import type { Provider, Sponsorship } from '../types';
import { makeSubscriptionsQuery, makeTransactionsQuery } from './makeQuery';

interface SocialLink {
  type: string;
  url: string;
}

const API = 'https://api.opencollective.com/graphql/v2/';

/**
 * Get the best URL from a list of social links.
 * The best URL is the first URL in a priority order,
 * with WEBSITE being the highest priority.
 * The rest of the order is somewhat arbitrary.
 *
 * @param socialLinks List of social links
 * @returns The best URL or `undefined` if no URL is found
 * @see makeQuery
 */
function getBestUrl(socialLinks: SocialLink[]): string | undefined {
  const urls = socialLinks
    .filter(
      (i) =>
        i.type === 'WEBSITE' ||
        i.type === 'GITHUB' ||
        i.type === 'GITLAB' ||
        i.type === 'TWITTER' ||
        i.type === 'FACEBOOK' ||
        i.type === 'YOUTUBE' ||
        i.type === 'INSTAGRAM' ||
        i.type === 'LINKEDIN' ||
        i.type === 'DISCORD' ||
        i.type === 'TUMBLR',
    )
    .map((i) => i.url);

  return urls[0];
}

/**
 * Get the account type from the API values.
 *
 * @param type The type of the account from the API
 * @returns The account type
 */
function getAccountType(type: string): 'User' | 'Organization' {
  switch (type) {
    case 'INDIVIDUAL': {
      return 'User';
    }
    case 'ORGANIZATION':
    case 'COLLECTIVE':
    case 'FUND':
    case 'PROJECT':
    case 'EVENT':
    case 'VENDOR':
    case 'BOT': {
      return 'Organization';
    }
    default: {
      throw new Error(`Unknown account type: ${type}`);
    }
  }
}

function createSponsorFromTransaction(
  transaction: any,
  excludeOrders: string[],
): [string, Sponsorship] | undefined {
  const slug = transaction.fromAccount.slug;
  if (slug === 'github-sponsors')
    // ignore github sponsors
    return undefined;

  if (excludeOrders.includes(transaction.order?.id)) return undefined;

  let monthlyDollars: number = transaction.amount.value;
  if (transaction.order?.status !== 'ACTIVE') {
    const firstDayOfCurrentMonth = new Date(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      1,
    );
    if (new Date(transaction.createdAt) < firstDayOfCurrentMonth) monthlyDollars = -1;
  } else if (transaction.order?.frequency === 'MONTHLY') {
    monthlyDollars = transaction.order?.amount.value;
  } else if (transaction.order?.frequency === 'YEARLY') {
    monthlyDollars = transaction.order?.amount.value / 12;
  }

  const sponsor: Sponsorship = {
    createdAt:
      transaction.order?.frequency === 'ONETIME'
        ? transaction.createdAt
        : transaction.order?.createdAt,
    isOneTime: transaction.order?.frequency === 'ONETIME',
    monthlyDollars,
    privacyLevel: transaction.fromAccount.isIncognito ? 'PRIVATE' : 'PUBLIC',
    raw: transaction,
    sponsor: {
      avatarUrl: transaction.fromAccount.imageUrl,
      linkUrl: `https://opencollective.com/${slug}`,
      login: slug,
      name: transaction.fromAccount.name,
      type: getAccountType(transaction.fromAccount.type),
      websiteUrl: getBestUrl(transaction.fromAccount.socialLinks),
    },
    tierName: transaction.tier?.name,
  };

  return [transaction.fromAccount.id, sponsor];
}

function createSponsorFromOrder(order: any): [string, Sponsorship] | undefined {
  const slug = order.fromAccount.slug;
  if (slug === 'github-sponsors')
    // ignore github sponsors
    return undefined;

  let monthlyDollars: number = order.amount.value;
  if (order.status !== 'ACTIVE') monthlyDollars = -1;
  else
    switch (order.frequency) {
      case 'MONTHLY': {
        monthlyDollars = order.amount.value;
        break;
      }
      case 'YEARLY': {
        monthlyDollars = order.amount.value / 12;
        break;
      }
      case 'ONETIME': {
        {
          monthlyDollars = order.amount.value;
          // No default
        }
        break;
      }
    }

  const sponsor: Sponsorship = {
    createdAt: order.frequency === 'ONETIME' ? order.createdAt : order.order?.createdAt,
    isOneTime: order.frequency === 'ONETIME',
    monthlyDollars,
    privacyLevel: order.fromAccount.isIncognito ? 'PRIVATE' : 'PUBLIC',
    raw: order,
    sponsor: {
      avatarUrl: order.fromAccount.imageUrl,
      linkUrl: `https://opencollective.com/${slug}`,
      login: slug,
      name: order.fromAccount.name,
      type: getAccountType(order.fromAccount.type),
      websiteUrl: getBestUrl(order.fromAccount.socialLinks),
    },
    tierName: order.tier?.name,
  };

  return [order.fromAccount.id, sponsor];
}

export async function fetchOpenCollectiveSponsors(
  key?: string,
  id?: string,
  slug?: string,
  githubHandle?: string,
  includePastSponsors?: boolean,
): Promise<Sponsorship[]> {
  if (!key) throw new Error('OpenCollective api key is required');
  if (!slug && !id && !githubHandle)
    throw new Error('OpenCollective collective id or slug or GitHub handle is required');

  const sponsors: any[] = [];
  const monthlyTransactions: any[] = [];
  let offset;
  offset = 0;

  do {
    const query = makeSubscriptionsQuery(id, slug, githubHandle, offset, !includePastSponsors);
    const res = await fetch(API, {
      body: JSON.stringify({ query }),
      headers: {
        'Api-Key': `${key}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await res.json();
    const nodes = data.data.account.orders.nodes;
    const totalCount = data.data.account.orders.totalCount;

    sponsors.push(...(nodes || []));

    if (nodes.length !== 0) {
      if (totalCount > offset + nodes.length) offset += nodes.length;
      else offset = undefined;
    } else {
      offset = undefined;
    }
  } while (offset);

  offset = 0;
  do {
    const now: Date = new Date();
    const dateFrom: Date | undefined = includePastSponsors
      ? undefined
      : new Date(now.getFullYear(), now.getMonth(), 1);
    const query = makeTransactionsQuery(id, slug, githubHandle, offset, dateFrom);
    const res = await fetch(API, {
      body: JSON.stringify({ query }),
      headers: {
        'Api-Key': `${key}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await res.json();
    const nodes = data.data.account.transactions.nodes;
    const totalCount = data.data.account.transactions.totalCount;

    monthlyTransactions.push(...(nodes || []));
    if (nodes.length !== 0) {
      if (totalCount > offset + nodes.length) offset += nodes.length;
      else offset = undefined;
    } else {
      offset = undefined;
    }
  } while (offset);

  const sponsorships: [string, Sponsorship][] = sponsors
    .map((element) => createSponsorFromOrder(element))
    .filter((sponsorship): sponsorship is [string, Sponsorship] => sponsorship !== null);

  const monthlySponsorships: [string, Sponsorship][] = monthlyTransactions
    .map((t) =>
      createSponsorFromTransaction(
        t,
        sponsorships.map((i) => i[1].raw.id),
      ),
    )
    .filter(
      (sponsorship): sponsorship is [string, Sponsorship] =>
        sponsorship !== null && sponsorship !== undefined,
    );

  const transactionsBySponsorId: Map<string, Sponsorship> = monthlySponsorships.reduce(
    (map, [id, sponsor]) => {
      const existingSponsor = map.get(id);
      if (existingSponsor) {
        const createdAt = new Date(sponsor.createdAt!);
        const existingSponsorCreatedAt = new Date(existingSponsor.createdAt!);
        if (createdAt >= existingSponsorCreatedAt) map.set(id, sponsor);
        else if (
          new Date(
            existingSponsorCreatedAt.getFullYear(),
            existingSponsorCreatedAt.getMonth(),
            1,
          ) === new Date(createdAt.getFullYear(), createdAt.getMonth(), 1)
        )
          existingSponsor.monthlyDollars += sponsor.monthlyDollars;
      } else {
        map.set(id, sponsor);
      }

      return map;
    },
    new Map(),
  );

  const processed: Map<string, Sponsorship> = sponsorships.reduce((map, [id, sponsor]) => {
    const existingSponsor = map.get(id);
    if (existingSponsor) {
      const createdAt = new Date(sponsor.createdAt!);
      const existingSponsorCreatedAt = new Date(existingSponsor.createdAt!);
      if (createdAt >= existingSponsorCreatedAt) map.set(id, sponsor);
    } else {
      map.set(id, sponsor);
    }
    return map;
  }, new Map());

  const result: Sponsorship[] = [...processed.values(), ...transactionsBySponsorId.values()];
  return result;
}

export const OpenCollectiveProvider: Provider = {
  fetchSponsors(config) {
    return fetchOpenCollectiveSponsors(
      config.opencollective?.key,
      config.opencollective?.id,
      config.opencollective?.slug,
      config.opencollective?.githubHandle,
      config.includePastSponsors,
    );
  },
  name: 'opencollective',
};
