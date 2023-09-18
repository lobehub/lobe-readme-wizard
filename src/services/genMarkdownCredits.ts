import { addBackToTop } from '@/utils/addBackTopTop';

interface MarkdownCreditsOptions {
  backToTop?: boolean;
  title: string;
}

export const genMarkdownCredits = (options: MarkdownCreditsOptions, value: string) => {
  const { title, backToTop } = options;

  const content = [[`## 🔗 ${title}`, value].join('\n\n'), ''];

  return backToTop ? addBackToTop(content) : content;
};
