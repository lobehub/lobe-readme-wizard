import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

export const remarkFormat = (md: string) =>
  remark().use(remarkGfm).use(remarkFrontmatter).process(md.trim());
