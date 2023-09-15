import { Layout, ThemeProvider } from '@lobehub/ui';
import { ReactNode, memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useStore } from '@/store';

import Footer from './Footer';
import { GlobalStyle } from './GlobalStyle';
import Header from './Header';

const AppLayout = memo<{ children: ReactNode }>(({ children }) => {
  const themeMode = useStore((s) => s.themeMode);

  return (
    <ThemeProvider themeMode={themeMode}>
      <GlobalStyle />
      <Layout footer={<Footer />} header={<Header />}>
        <Center horizontal>
          <Flexbox
            flex={1}
            style={{ maxWidth: 'min(100vw, 960px)', padding: '32px 16px', position: 'relative' }}
          >
            {children}
          </Flexbox>
        </Center>
      </Layout>
    </ThemeProvider>
  );
});

export default AppLayout;
