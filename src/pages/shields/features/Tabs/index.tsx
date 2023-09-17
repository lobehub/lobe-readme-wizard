import { SiGithub, SiMarkdown, SiNpm, SiVercel } from '@icons-pack/react-simple-icons';
import { Segmented, SegmentedProps } from 'antd';
import { useTheme } from 'antd-style';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Label from '@/components/Label';

import Custom from '../Custom';
import Github from '../Github';
import Npm from '../Npm';
import Vercel from '../Vercel';

enum Tab {
  Custom = 'custom',
  Github = 'github',
  Npm = 'npm',
  Vercel = 'vercel',
}

const options: SegmentedProps['options'] = [
  {
    label: <Label icon={SiMarkdown} title={'Custom'} />,
    value: Tab.Custom,
  },
  {
    label: <Label icon={SiGithub} title={'Github'} />,
    value: Tab.Github,
  },
  {
    label: <Label icon={SiNpm} title={'NPM'} />,
    value: Tab.Npm,
  },
  {
    label: <Label icon={SiVercel} title={'Vercel'} />,
    value: Tab.Vercel,
  },
];

const Tabs = memo(() => {
  const [tab, setTab] = useState<Tab>(Tab.Custom);
  const theme = useTheme();
  return (
    <Flexbox>
      <Segmented
        onChange={setTab as any}
        options={options}
        style={{ alignSelf: 'center', background: theme.colorFillQuaternary }}
        value={tab}
      />
      <Flexbox gap={8}>
        {tab === Tab.Custom && <Custom />}
        {tab === Tab.Github && <Github />}
        {tab === Tab.Npm && <Npm />}
        {tab === Tab.Vercel && <Vercel />}
      </Flexbox>
    </Flexbox>
  );
});

export default Tabs;
