export interface Provider {
  fetchSponsors: (config: SponsorkitConfig) => Promise<Sponsorship[]>;
  name: string;
}

export interface Sponsor {
  avatarUrl: string;
  avatarUrlHighRes?: string;
  avatarUrlLowRes?: string;
  avatarUrlMediumRes?: string;
  linkUrl?: string;
  login: string;
  name: string | null;
  type: 'User' | 'Organization';
  websiteUrl?: string;
}

export interface Sponsorship {
  createdAt?: string;
  expireAt?: string;
  isOneTime?: boolean;
  monthlyDollars: number;
  privacyLevel?: 'PUBLIC' | 'PRIVATE';
  provider?: ProviderName | string;
  /**
   * Raw data from provider
   */
  raw?: any;
  sponsor: Sponsor;
  tierName?: string;
}

export type OutputFormat = 'svg' | 'png' | 'json';

export type ProviderName = 'github' | 'patreon' | 'opencollective' | 'afdian';

export interface ProvidersConfig {
  afdian?: {
    /**
     * Exchange rate of USD to CNY
     *
     * @default 6.5
     */
    exechangeRate?: number;
    /**
     * Afdian Token that have access to your sponsorships.
     *
     * Will read from `SPONSORKIT_AFDIAN_TOKEN` environment variable if not set.
     *
     * @see https://afdian.net/dashboard/dev
     * @deprecated It's not recommended set this value directly, pass from env or use `.env` file.
     */
    token?: string;
    /**
     * The userId of your Afdian.
     *
     * Will read from `SPONSORKIT_AFDIAN_USER_ID` environment variable if not set.
     *
     * @see https://afdian.net/dashboard/dev
     */
    userId?: string;
  };
  github?: {
    /**
     * User id of your GitHub account.
     *
     * Will read from `SPONSORKIT_GITHUB_LOGIN` environment variable if not set.
     */
    login?: string;
    /**
     * GitHub Token that have access to your sponsorships.
     *
     * Will read from `SPONSORKIT_GITHUB_TOKEN` environment variable if not set.
     *
     * @deprecated It's not recommended set this value directly, pass from env or use `.env` file.
     */
    token?: string;
    /**
     * The account type for sponsorships.
     *
     * Possible values are `user`(default) and `organization`.
     * Will read from `SPONSORKIT_GITHUB_TYPE` environment variable if not set.
     */
    type?: string;
  };
  opencollective?: {
    /**
     * The GitHub handle of your account.
     *
     * Will read from `SPONSORKIT_OPENCOLLECTIVE_GH_HANDLE` environment variable if not set.
     */
    githubHandle?: string;
    /**
     * The id of your account.
     *
     * Will read from `SPONSORKIT_OPENCOLLECTIVE_ID` environment variable if not set.
     */
    id?: string;
    /**
     * Api key of your OpenCollective account.
     *
     * Will read from `SPONSORKIT_OPENCOLLECTIVE_KEY` environment variable if not set.
     *
     * @deprecated It's not recommended set this value directly, pass from env or use `.env` file.
     */
    key?: string;
    /**
     * The slug of your account.
     *
     * Will read from `SPONSORKIT_OPENCOLLECTIVE_SLUG` environment variable if not set.
     */
    slug?: string;
    /*
     * The type of your account. (`collective` or `individual`)
     *
     * Will read from `SPONSORKIT_OPENCOLLECTIVE_TYPE` environment variable if not set.
     */
    type?: string;
  };
  patreon?: {
    /**
     * Patreon Token that have access to your sponsorships.
     *
     * Will read from `SPONSORKIT_PATREON_TOKEN` environment variable if not set.
     *
     * @deprecated It's not recommended set this value directly, pass from env or use `.env` file.
     */
    token?: string;
  };
}

export interface SponsorkitConfig extends ProvidersConfig {
  /**
   * Filter of sponsorships to render in the final image.
   */
  filter?: (sponsor: Sponsorship, all: Sponsorship[]) => boolean | void;

  /**
   * By pass cache
   */
  force?: boolean;

  /**
   * Output formats
   *
   * @default ['json', 'svg', 'png']
   */
  formats?: OutputFormat[];

  /**
   * Whether to display the past sponsors
   * Currently only works with GitHub provider
   *
   * @default auto detect based on tiers
   */
  includePastSponsors?: boolean;

  /**
   * Whether to display the private sponsors
   *
   * @default false
   */
  includePrivate?: boolean;

  /**
   * @deprecated use `github.login` instead
   */
  login?: string;

  /**
   * Name of exported files
   *
   * @default 'sponsors'
   */
  name?: string | null;

  /**
   * Padding of image container
   */
  padding?: {
    bottom?: number;
    top?: number;
  };

  /**
   * @default auto detect based on the config provided
   */
  providers?: ProviderName[];

  /**
   * Inline CSS of generated SVG
   */
  svgInlineCSS?: string;

  /**
   * Tiers
   */
  tiers?: Tier[];

  /**
   * @deprecated use `github.token` instead
   */
  token?: string;

  /**
   * Width of the image.
   *
   * @default 700
   */
  width?: number;
}

export interface Tier {
  monthlyDollars?: number;
  padding?: {
    bottom?: number;
    top?: number;
  };
  title?: string;
}
