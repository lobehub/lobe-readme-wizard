import { CodeEditor } from '@lobehub/ui';
import { Segmented } from 'antd';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Markdown from '@/components/Markdown';

import { useStyles } from './style';

enum Tabs {
  Editor = 'editor',
  Preview = 'preview',
  Split = 'split',
}

const MarkdownEditor = memo<{ children: string }>(({ children }) => {
  const [tab, setTab] = useState<Tabs>(Tabs.Split);
  const [code, setCode] = useState<string>(children);
  const { styles } = useStyles();

  const editor = (
    <CodeEditor
      className={styles.editor}
      language={'md'}
      onValueChange={setCode}
      resize={false}
      type={'pure'}
      value={code}
    />
  );

  const preview = <Markdown className={styles.markdown}>{code}</Markdown>;

  return (
    <Flexbox gap={16}>
      <Segmented
        onChange={setTab as any}
        options={[
          {
            label: 'Split',
            value: Tabs.Split,
          },
          {
            label: 'Editor',
            value: Tabs.Editor,
          },
          {
            label: 'Preview',
            value: Tabs.Preview,
          },
        ]}
        style={{ alignSelf: 'center' }}
        value={tab}
      />
      {tab === 'split' ? (
        <Flexbox align={'stretch'} className={styles.container} horizontal>
          {preview}
          {editor}
        </Flexbox>
      ) : (
        <div className={styles.container}>
          {tab === Tabs.Preview && preview}
          {tab === Tabs.Editor && editor}
        </div>
      )}
    </Flexbox>
  );
});

export default MarkdownEditor;
