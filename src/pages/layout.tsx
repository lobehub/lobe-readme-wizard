import { ReactNode, memo } from 'react';

import AppLayout from '@/layout/AppLayout';

const Layout = memo<{ children: ReactNode }>(({ children }) => {
  return <AppLayout>{children}</AppLayout>;
});

export default Layout;
