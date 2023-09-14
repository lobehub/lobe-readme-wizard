import { useThemeMode } from 'antd-style';
import Head from 'next/head';
import { memo } from 'react';

import { useStore } from '@/store';

const HighlightStyle = memo(() => {
  const themeMode = useStore((s) => s.themeMode);
  const { browserPrefers } = useThemeMode();

  const isDarkMode = themeMode === 'auto' ? browserPrefers === 'dark' : themeMode === 'dark';

  const css = isDarkMode
    ? 'https://esm.sh/highlight.js@11/styles/github-dark.css'
    : 'https://esm.sh/highlight.js@11/styles/github.css';

  return (
    <Head>
      <link href={css} rel="stylesheet" />
    </Head>
  );
});

export default HighlightStyle;
