import { StroyBook, StroyBookProps } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Highlight from '@/components/Highlight';
import Markdown from '@/components/Markdown';

import { useStyles } from './style';

const MarkdownEditor = memo<{ children: string; levaStore: StroyBookProps['levaStore'] }>(
  ({ children, levaStore }) => {
    const { styles } = useStyles();

    return (
      <Flexbox className={styles.container}>
        <StroyBook levaStore={levaStore} noPadding>
          <Markdown className={styles.markdown}>{children}</Markdown>
        </StroyBook>
        <Highlight className={styles.preview} fullFeatured language={'md'} type={'pure'}>
          {children}
        </Highlight>
      </Flexbox>
    );
  },
);

export default MarkdownEditor;
