import { kebabCase } from 'lodash-es';

export const genImg = (alt: string, url: string) => {
  const name = kebabCase([alt.toLowerCase(), 'shield'].filter(Boolean).join('-'));
  return [`![][${name}]`, `[${name}]: ${url}`];
};

export const formatCustomLabel = ({
  content,
  label,
  color,
}: {
  color?: string;
  content?: string;
  label: string;
}) => {
  const data = encodeURIComponent([content, label, color || 'white'].filter(Boolean).join('-'));
  return content ? data : `-${data}`;
};
