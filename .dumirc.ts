import { defineConfig } from 'dumi';

import { description, homepage, name } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';
const isWin = process.platform === 'win32';

const themeConfig = {
  actions: [
    {
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
  apiHeader: {
    docUrl: false,
    match: ['/components'],
    pkg: name,
    sourceUrl: false,
  },
  description: description,
  footer: 'Made with 🤯 by LobeHub',
  giscus: {
    category: 'Q&A',
    categoryId: 'DIC_kwDOJloKoM4CXsCu',
    repo: 'lobehub/lobe-ui',
    repoId: 'R_kgDOJloKoA',
  },
  name: 'ReadmeGenerator',
  nav: [
    { link: '/components/readme-hero', title: 'Generator' },
    { link: 'https://simpleicons.org/', mode: 'override', title: 'Icons' },
    { link: '/changelog', title: 'Changelog' },
  ],
  socialLinks: {
    discord: 'https://discord.gg/AYFPHvv2jT',
    github: homepage,
  },
  title: 'ReadmeGenerator - LobeHub',
};

export default defineConfig({
  base: '/',
  define: {
    'process.env': process.env,
  },
  extraBabelPlugins: [
    'babel-plugin-antd-style',
    [
      'babel-plugin-styled-components',
      {
        displayName: process.env.NODE_ENV === 'development',
        minify: isProduction,
        pure: true,
        transpileTemplateLiterals: true,
      },
    ],
  ],
  favicons: ['https://npm.elemecdn.com/@lobehub/assets-favicons/assets/favicon.ico'],
  locales: [{ id: 'en-US', name: 'English' }],
  mfsu: isWin ? undefined : {},
  npmClient: 'pnpm',
  publicPath: '/',
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #000; }
  }`,
  ],
  themeConfig,
  title: 'ReadmeGenerator',
});
