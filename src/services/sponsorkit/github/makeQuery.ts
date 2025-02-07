const graphql = String.raw;

export function makeQuery(login: string, type: string, activeOnly = true, cursor?: string) {
  return graphql`{
  ${type}(login: "${login}") {
    sponsorshipsAsMaintainer(activeOnly: ${Boolean(activeOnly)}, first: 100${cursor ? ` after: "${cursor}"` : ''}) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        createdAt
        privacyLevel
        isActive
        tier {
          name
          isOneTime
          monthlyPriceInCents
          monthlyPriceInDollars
        }
        sponsorEntity {
          __typename
          ...on Organization {
            login
            name
            avatarUrl
            websiteUrl
          }
          ...on User {
            login
            name
            avatarUrl
            websiteUrl
          }
        }
      }
    }
  }
}`;
}
