import type { CSSProperties, FC } from 'react';

import { theme } from './style';

interface AvatarProps {
  name: string;
  size?: number;
  src?: string;
  style?: CSSProperties;
  themeMode?: 'light' | 'dark';
}

export const Avatar: FC<AvatarProps> = ({
  src,
  name,
  size = 64,
  style,

  themeMode,
}) => {
  const styles = theme(themeMode);
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: styles.avatarBackgroundColor,
        border: `${Math.floor(size / 64)}px solid ${styles.borderColor}`,
        borderRadius: '50%',
        color: styles.avatarFontColor,
        display: 'flex',
        height: size,
        justifyContent: 'center',
        overflow: 'hidden',
        width: size,
        ...style,
      }}
    >
      {src ? (
        <img alt={name} height={'100%'} src={src} width={'100%'} />
      ) : (
        <div
          style={{
            fontSize: size / 2,
            fontWeight: 'bold',
            lineHeight: 1,
          }}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};
