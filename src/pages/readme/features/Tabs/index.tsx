import { Segmented, SegmentedProps } from 'antd';
import { useTheme } from 'antd-style';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Label from '@/components/Label';

import Contributing from '../Custom/Contributing';
import Credits from '../Custom/Credits';
import Development from '../Custom/Development';
import Features from '../Custom/Features';
import Hero from '../Custom/Hero';
import Installation from '../Custom/Installation';
import License from '../Custom/License';

enum Tab {
  Contributing = 'contributing',
  Credits = 'credits',
  Development = 'development',
  Features = 'features',
  Hero = 'hero',
  Installation = 'installation',
  License = 'license',
}

const options: SegmentedProps['options'] = [
  {
    label: <Label title={'🤯 Hero'} />,
    value: Tab.Hero,
  },
  {
    label: <Label title={'✨ Features'} />,
    value: Tab.Features,
  },
  {
    label: <Label title={'🚀 Installation'} />,
    value: Tab.Installation,
  },
  {
    label: <Label title={'⌨️ Development'} />,
    value: Tab.Development,
  },
  {
    label: <Label title={'🤝 Contributing'} />,
    value: Tab.Contributing,
  },
  {
    label: <Label title={'🔗 Credits'} />,
    value: Tab.Credits,
  },
  {
    label: <Label title={'📝 License'} />,
    value: Tab.License,
  },
];

const Tabs = memo(() => {
  const [tab, setTab] = useState<Tab>(Tab.Hero);
  const theme = useTheme();
  return (
    <Flexbox gap={32}>
      <Segmented
        onChange={setTab as any}
        options={options}
        style={{ alignSelf: 'center', background: theme.colorFillQuaternary }}
        value={tab}
      />
      <Flexbox gap={8}>
        {tab === Tab.Hero && <Hero />}
        {tab === Tab.Features && <Features />}
        {tab === Tab.Installation && <Installation />}
        {tab === Tab.Development && <Development />}
        {tab === Tab.Contributing && <Contributing />}
        {tab === Tab.Credits && <Credits />}
        {tab === Tab.License && <License />}
      </Flexbox>
    </Flexbox>
  );
});

export default Tabs;
