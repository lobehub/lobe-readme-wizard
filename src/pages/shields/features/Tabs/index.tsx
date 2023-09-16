import { Segmented, SegmentedProps } from 'antd';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Custom from '../Custom';
import Github from '../Github';
import Npm from '../Npm';

enum Tab {
  Custom = 'custom',
  Github = 'github',
  Npm = 'npm',
}

const options: SegmentedProps['options'] = [
  {
    label: 'Custom',
    value: Tab.Custom,
  },
  {
    label: 'Github',
    value: Tab.Github,
  },
  {
    label: 'NPM',
    value: Tab.Npm,
  },
];

const Tabs = memo(() => {
  const [tab, setTab] = useState<Tab>(Tab.Custom);

  return (
    <Flexbox>
      <Segmented
        onChange={setTab as any}
        options={options}
        style={{ alignSelf: 'center' }}
        value={tab}
      />
      <Flexbox gap={8}>
        {tab === Tab.Custom && <Custom />}
        {tab === Tab.Github && <Github />}
        {tab === Tab.Npm && <Npm />}
      </Flexbox>
    </Flexbox>
  );
});

export default Tabs;
