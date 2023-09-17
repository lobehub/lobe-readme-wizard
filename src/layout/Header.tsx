import { Header, Logo, ThemeSwitch } from '@lobehub/ui';
import { memo } from 'react';

import { useStore } from '@/store';

import Nav from './Nav';

export default memo(() => {
  const [themeMode, setThemeMode] = useStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <Header
      actions={<ThemeSwitch onThemeSwitch={setThemeMode} themeMode={themeMode} />}
      logo={<Logo extra={'Readme Generator'} type={'combine'} />}
      nav={<Nav />}
    />
  );
});
