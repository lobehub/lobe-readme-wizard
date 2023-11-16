import { defineConfig } from 'dumi';

import { description, homepage, name } from './package.json';

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
    type: 'doc',
  },
  description: description,
  docStyle: 'pure',
  footer: 'Made with 🤯 by LobeHub',
  footerConfig: {
    resources: {
      items: [
        {
          description: 'Markdown processor ',
          openExternal: true,
          title: 'Remark',
          url: 'https://github.com/remarkjs',
        },
        {
          description: 'Concise badges',
          openExternal: true,
          title: 'Shields',
          url: 'https://shields.io/',
        },
        {
          description: 'Icons for popular brands',
          openExternal: true,
          title: 'Simple Icons',
          url: 'https://simpleicons.org',
        },
        {
          description: 'Dynamically stats for github',
          openExternal: true,
          title: 'Readme Stats',
          url: 'https://github.com/anuraghazra/github-readme-stats',
        },
        {
          description: 'List of GitHub badges',
          openExternal: true,
          title: 'Awesome Badges',
          url: 'https://github.com/Envoy-VC/awesome-badges',
        },
      ],
      title: 'Resources',
    },
  },
  giscus: {
    category: 'Ideas',
    categoryId: 'DIC_kwDOJloKoM4CXsCu',
    repo: 'lobehub/lobe-readme-wizard',
    repoId: 'R_kgDOKTF8TQ',
  },
  name: 'ReadmeWizard',
  nav: [
    { link: '/components/readme-hero', title: 'Generator' },
    { link: 'https://simpleicons.org/', mode: 'override', title: 'Icons' },
    { link: '/changelog', title: 'Changelog' },
  ],
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
  title: 'ReadmeWizard',
});
