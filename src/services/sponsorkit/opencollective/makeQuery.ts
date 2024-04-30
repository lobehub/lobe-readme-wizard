const graphql = String.raw;

/**
 * Make a partial query for the OpenCollective API.
 * This is used to query for either a collective or an account.
 * If `id` is set, it will query for a collective.
 * If `slug` is set, it will query for an account.
 * If `githubHandle` is set, it will query for an account.
 * If none of the above are set, an error will be thrown.
 *
 * @param id Collective id
 * @param slug Collective slug
 * @param githubHandle GitHub handle
 * @returns The partial query
 * @see makeQuery
 * @see fetchOpenCollectiveSponsors
 */
function makeAccountQueryPartial(id?: string, slug?: string, githubHandle?: string) {
  if (id) return `id: "${id}"`;
  else if (slug) return `slug: "${slug}"`;
  else if (githubHandle) return `githubHandle: "${githubHandle}"`;
  else throw new Error('OpenCollective collective id or slug or GitHub handle is required');
}

export function makeTransactionsQuery(
  id?: string,
  slug?: string,
  githubHandle?: string,
  offset?: number,
  dateFrom?: Date,
  dateTo?: Date,
) {
  const accountQueryPartial = makeAccountQueryPartial(id, slug, githubHandle);
  const dateFromParam = dateFrom ? `, dateFrom: "${dateFrom.toISOString()}"` : '';
  const dateToParam = dateTo ? `, dateTo: "${dateTo.toISOString()}"` : '';
  return graphql`{
    account(${accountQueryPartial}) {
    transactions(limit: 1000, offset:${offset}, type: CREDIT ${dateFromParam} ${dateToParam}) {
      offset
      limit
      totalCount
      nodes {
        type
        kind
        id
        order {
          id
          status
          frequency
          tier {
            name
          }
          amount {
            value
          }
        }
        createdAt
        amount {
          value
        }
        fromAccount {
          name
          id
          slug
          type
          socialLinks {
            url
            type
          }
          isIncognito
          imageUrl(height: 460, format: png)
        }
      }
    }
  }
  }`;
}

export function makeSubscriptionsQuery(
  id?: string,
  slug?: string,
  githubHandle?: string,
  offset?: number,
  activeOnly?: boolean,
) {
  const activeOrNot = activeOnly ? 'onlyActiveSubscriptions: true' : 'onlySubscriptions: true';
  return graphql`{
    account(${makeAccountQueryPartial(id, slug, githubHandle)}) {
    orders(limit: 1000, offset:${offset}, ${activeOrNot}, filter: INCOMING) {
      nodes {
        id
        createdAt
        frequency
        status
        tier {
          name
        }
        amount {
          value
        }
        totalDonations {
          value
        }
        createdAt
        fromAccount {
          name
          id
          slug
          type
          socialLinks {
            url
            type
          }
          isIncognito
          imageUrl(height: 460, format: png)
        }
      }
    }
  }
  }`;
}
