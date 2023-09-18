import { FontLoader, genCdnUrl } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { memo } from 'react';

const HighlightStyle = memo(() => {
  const { browserPrefers, themeMode } = useThemeMode();

  const isDarkMode = themeMode === 'auto' ? browserPrefers === 'dark' : themeMode === 'dark';

  return (
    <>
      <FontLoader
        url={genCdnUrl({ path: 'github-markdown.css', pkg: 'github-markdown-css', version: '5' })}
      />
      <FontLoader
        url={genCdnUrl({
          path: isDarkMode ? 'github-dark.css' : 'github.css',
          pkg: 'highlight.js',
          version: '11',
        })}
      />
    </>
  );
});

export default HighlightStyle;
