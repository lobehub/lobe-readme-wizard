import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

export const remarkFormat = (md: string) =>
  remark()
    .use(remarkGfm)
    .use({
      settings: {
        bullet: '-',
        fences: true,
        listItemIndent: 1,
        rule: '-',
        tightDefinitions: true,
      },
    })
    .process(md.trim());
