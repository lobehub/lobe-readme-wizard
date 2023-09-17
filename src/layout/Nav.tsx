import { TabsNav, TabsNavProps } from '@lobehub/ui';
import Router from 'next/router';
import { memo } from 'react';

import { useStore } from '@/store';
import { Tab } from '@/store/initialState';

const items: TabsNavProps['items'] = [
  {
    key: Tab.Readme,
    label: 'Readme',
  },
  {
    key: Tab.Shields,
    label: 'Shields',
  },
];

export default memo(() => {
  const [activeTab, setActiveTab] = useStore((s) => [s.activeTab, s.setActiveTab]);
  return (
    <TabsNav
      activeKey={activeTab}
      items={items}
      onChange={(key) => {
        Router.push(`/${key}`);
        setActiveTab(key as Tab);
      }}
    />
  );
});
