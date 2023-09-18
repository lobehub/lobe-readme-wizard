import { CodeEditor } from '@lobehub/ui';
import { Segmented } from 'antd';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import useControlledState from 'use-merge-value';

import Markdown from '@/components/Markdown';

import { useStyles } from './style';

enum Tabs {
  Editor = 'editor',
  Preview = 'preview',
  Split = 'split',
}

interface MarkdownEditorProps {
  onChange: (text: string) => void;
  value: string;
}

const MarkdownEditor = memo<MarkdownEditorProps>(({ onChange, value }) => {
  const [currentValue, setCurrentValue] = useControlledState<string>(value, {
    defaultValue: value,
    onChange,
    value,
  });
  const [tab, setTab] = useState<Tabs>(Tabs.Editor);
  const { styles } = useStyles();

  const editor = (
    <CodeEditor
      className={styles.editor}
      language={'md'}
      onValueChange={setCurrentValue}
      resize={false}
      type={'pure'}
      value={currentValue}
    />
  );

  const preview = <Markdown className={styles.markdown}>{currentValue}</Markdown>;

  return (
    <Flexbox gap={16}>
      <Segmented
        onChange={setTab as any}
        options={[
          {
            label: 'Editor',
            value: Tabs.Editor,
          },
          {
            label: 'Preview',
            value: Tabs.Preview,
          },
          {
            label: 'Split',
            value: Tabs.Split,
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
