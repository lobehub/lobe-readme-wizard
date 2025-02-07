import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

export const remarkFormat = async (md: string): Promise<string> => {
  const data = await remark()
    .use(remarkGfm)
    .use({
      settings: {
        bullet: '-',
        emphasis: '*',
        fences: true,
        rule: '-',
        strong: '*',
        tightDefinitions: true,
      },
    })
    .process(md.trim());

  return data.toString();
};
