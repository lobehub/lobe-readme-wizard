import { CodeEditor } from '@lobehub/ui';
import { Segmented } from 'antd';
import { useResponsive } from 'antd-style';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Markdown from '@/components/Markdown';
import { sample } from '@/const/sample';

import { useStyles } from './style';

enum Tabs {
  editor = 'editor',
  preview = 'preview',
}

const MarkdownEditor = memo(() => {
  const [tab, setTab] = useState<Tabs>(Tabs.editor);
  const [code, setCode] = useState<string>(sample);
  const { styles } = useStyles();
  const { mobile } = useResponsive();

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

  if (mobile)
    return (
      <Flexbox gap={8}>
        <Segmented
          onChange={setTab as any}
          options={[
            {
              label: 'Editor',
              value: Tabs.editor,
            },
            {
              label: 'Preview',
              value: Tabs.preview,
            },
          ]}
          style={{ alignSelf: 'center' }}
          value={tab}
        />
        <div className={styles.container}>
          {tab === Tabs.editor && editor}
          {tab === Tabs.preview && preview}
        </div>
      </Flexbox>
    );

  return (
    <Flexbox align={'stretch'} className={styles.container} horizontal>
      {editor}
      {preview}
    </Flexbox>
  );
});

export default MarkdownEditor;
