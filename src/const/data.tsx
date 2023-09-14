import { Icon } from '@lobehub/ui';
import { Bug, FileClock, GitFork, Github } from 'lucide-react';

import { homepage } from '@/../package.json';

export const Resources = [
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
];

export const Community = [
  {
    icon: <Icon icon={Bug} size="small" />,
    openExternal: true,
    title: 'Report Bug',
    url: `${homepage}/issues/new/choose`,
  },
  {
    icon: <Icon icon={GitFork} size="small" />,
    openExternal: true,
    title: 'Request Feature',
    url: `${homepage}/issues/new/choose`,
  },
];

export const Help = [
  {
    icon: <Icon icon={Github} size="small" />,
    openExternal: true,
    title: 'GitHub',
    url: homepage,
  },
  {
    icon: <Icon icon={FileClock} size="small" />,
    openExternal: true,
    title: 'Changelog',
    url: `${homepage}/blob/main/CHANGELOG.md`,
  },
];

export const MoreProducts = [
  {
    description: 'OpenAI Chat Bot',
    openExternal: true,
    title: '🤖 Lobe Chat',
    url: 'https://chat.lobehub.com',
  },
  {
    description: 'Stable Diffusion Webui Extension',
    openExternal: true,
    title: '🤯 Lobe Theme',
    url: 'https://chat.lobehub.com',
  },
  {
    description: 'AIGC Components',
    openExternal: true,
    title: '🍭 Lobe UI',
    url: 'https://ui.lobehub.com',
  },
  {
    description: 'AI Commit CLI',
    openExternal: true,
    title: '💌 Lobe Commit',
    url: 'https://github.com/lobehub/lobe-commit',
  },
  {
    description: 'AI i18n CLI',
    openExternal: true,
    title: '🌐 Lobe i18n',
    url: 'https://github.com/lobehub/lobe-commit',
  },
];
