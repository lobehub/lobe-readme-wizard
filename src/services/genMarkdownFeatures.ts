import { addBackToTop } from '@/utils/addBackTopTop';

interface MarkdownFeaturesOptions {
  backToTop?: boolean;
  title: string;
}

export const genMarkdownFeatures = (options: MarkdownFeaturesOptions, value: string) => {
  const { title, backToTop } = options;

  const content = [[`## ✨ ${title}`, value].join('\n\n'), ''];

  return backToTop ? addBackToTop(content) : content;
};
