import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-lobehub';
import { INavItem } from 'dumi/dist/client/theme-api/types';

import { description, homepage } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const isWin = process.platform === 'win32';

const nav: INavItem[] = [
  { link: '/components/readme-hero', title: 'Generator' },
  { link: 'https://simpleicons.org/', mode: 'override', title: 'Icons' },
  { link: '/changelog', title: 'Changelog' },
];

const themeConfig: SiteThemeConfig = {
  actions: [
    {
      icon: 'Github',
      link: homepage,
      openExternal: true,
      text: 'Github',
    },
    {
      link: '/components/readme-hero',
      text: 'Get Started',
      type: 'primary',
    },
  ],
  analytics: {
    plausible: {
      domain: 'readme-wizard.lobehub.com',
      scriptBaseUrl: 'https://plausible.lobehub-inc.cn',
    },
  },
  apiHeader: {
    docUrl: `{github}/tree/master/src/{atomId}/index.md`,
    match: ['/components'],
    sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
    type: 'doc',
  },
  description,
  giscus: {
    category: 'Ideas',
    categoryId: 'DIC_kwDOJloKoM4CXsCu',
    repo: 'lobehub/lobe-readme-wizard',
    repoId: 'R_kgDOKTF8TQ',
  },
  metadata: {
    openGraph: {
      image:
        'https://repository-images.githubusercontent.com/691108941/a66e25b3-1481-429c-b565-419bfb859ecb',
    },
  },
  name: 'ReadmeWizard',
  nav,
  prefersColor: {
    default: 'dark',
    switch: false,
  },
  socialLinks: {
    discord: 'https://discord.gg/AYFPHvv2jT',
    github: homepage,
  },
  title: 'ReadmeWizard - LobeHub',
};

export default defineConfig({
  base: '/',
  define: {
    'process.env': process.env,
  },
  exportStatic: {},
  extraBabelPlugins: ['antd-style'],
  favicons: ['https://lobehub.com/favicon.ico'],
  jsMinifier: 'swc',
  locales: [{ id: 'en-US', name: 'English' }],
  mfsu: isWin ? undefined : {},
  npmClient: 'pnpm',
  publicPath: '/',
  sitemap: {
    hostname: 'https://readme-wizard.lobehub.com',
  },
  ssr: isProduction ? {} : false,
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #000; }
  }`,
  ],
  themeConfig,
  title: 'ReadmeWizard',
});
