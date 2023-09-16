import { kebabCase } from 'lodash-es';

export const genShield = (alt: string, url: string, link?: string) => {
  const shieldName = kebabCase([alt.toLowerCase(), 'shield'].filter(Boolean).join('-'));
  if (!link) return [`![][${shieldName}]`, `[${shieldName}]: ${url}`];
  const linkName = kebabCase([alt.toLowerCase(), 'link'].filter(Boolean).join('-'));
  return [
    `[![][${shieldName}]][${linkName}]`,
    [`[${shieldName}]: ${url}`, `[${linkName}]: ${link}`].join('\n'),
  ];
};
