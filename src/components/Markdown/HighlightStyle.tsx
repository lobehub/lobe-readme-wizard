import { FontLoader } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { memo } from 'react';

const HighlightStyle = memo(() => {
  const { browserPrefers, themeMode } = useThemeMode();

  const isDarkMode = themeMode === 'auto' ? browserPrefers === 'dark' : themeMode === 'dark';

  const css = isDarkMode
    ? 'https://esm.sh/highlight.js@11/styles/github-dark.css'
    : 'https://esm.sh/highlight.js@11/styles/github.css';

  return <FontLoader url={css} />;
});

export default HighlightStyle;
