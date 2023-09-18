import { Typography } from 'antd';
import { CSSProperties, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';

import HighlightStyle from './HighlightStyle';
import { useStyles } from './style';

export interface MarkdownProps {
  children: string;
  className?: string;
  style?: CSSProperties;
}

const Markdown = memo<MarkdownProps>(({ children, className, style, ...props }) => {
  const { styles, cx } = useStyles();
  const rehypePlugins = [rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]] as any;
  const remarkPlugins = [remarkGfm, remarkToc, remarkSlug];

  return (
    <article className={cx(styles.container, className)} style={style}>
      <HighlightStyle />
      <Typography>
        <ReactMarkdown
          className={cx(styles.markdown, styles.scheme)}
          rehypePlugins={rehypePlugins}
          remarkPlugins={remarkPlugins}
          {...props}
        >
          {children}
        </ReactMarkdown>
      </Typography>
    </article>
  );
});

export default Markdown;
