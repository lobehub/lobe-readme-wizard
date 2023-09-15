import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Highlight from '@/components/Highlight';
import Markdown from '@/components/Markdown';

import { useStyles } from './style';

const MarkdownEditor = memo<{ children: string }>(({ children }) => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.container}>
      <Markdown className={styles.markdown}>{children}</Markdown>;
      <Highlight className={styles.preview} language={'md'} type={'pure'}>
        {children}
      </Highlight>
    </Flexbox>
  );
});

export default MarkdownEditor;
