import { FontLoader, genCdnUrl } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { memo } from 'react';

const HighlightStyle = memo(() => {
  const { isDarkMode } = useThemeMode();

  return (
    <FontLoader
      url={genCdnUrl({
        path: isDarkMode ? 'styles/github-dark.css' : 'styles/github.css',
        pkg: 'highlight.js',
        version: '11',
      })}
    />
  );
});

export default HighlightStyle;
