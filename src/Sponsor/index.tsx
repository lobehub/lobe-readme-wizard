import type { CSSProperties, FC } from 'react';

import { Avatar } from './Avatar';
import { DEFAULT_AVATAR_SIZE, MemberProfile } from './const';
import { theme } from './style';
import { getTier } from './utils';

export interface SponsorProps {
  avatarSize?: number;
  data: MemberProfile[];
  height?: number;
  padding?: number;
  style?: CSSProperties;
  texts?: [string, string];
  themeMode?: 'light' | 'dark';
  width?: number;
}

const Sponsor: FC<SponsorProps> = ({
  style,
  data,
  avatarSize = DEFAULT_AVATAR_SIZE,
  texts = ['Become ❤️', 'LobeHub'],
  themeMode,
}) => {
  const styles = theme(themeMode);

  return (
    <div
      style={{
        alignItems: 'center',
        columnGap: avatarSize / 8,
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: avatarSize / 4,
        ...style,
      }}
    >
      {data.map((item) => {
        const tierConfig = getTier(item.tier);
        const multiplier = Math.floor(item.totalAmountDonated / tierConfig.amount);
        return (
          <div
            key={item.MemberId}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              lineHeight: 1,
              position: 'relative',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                borderRadius: '50%',
                display: 'flex',
                height: avatarSize * 1.15,
                justifyContent: 'center',
                position: 'relative',
                width: avatarSize * 1.15,
                ...tierConfig.style,
              }}
            >
              <Avatar name={item.name} size={avatarSize} src={item.image} themeMode={themeMode} />
            </div>
            {multiplier > 1 && (
              <div
                style={{
                  alignItems: 'center',
                  background: styles.backgroundColor,
                  border: `${Math.floor(avatarSize / 64)}px solid ${styles.borderColor}`,
                  borderRadius: avatarSize / 6,
                  color: styles.fontColor,
                  display: 'flex',
                  fontSize: avatarSize / 6,
                  height: avatarSize / 3.5,
                  lineHeight: 1,
                  padding: `0 ${avatarSize / 12}px`,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              >
                {`×${Math.floor(multiplier)}`}
              </div>
            )}
            <div
              style={{
                alignItems: 'center',
                background: styles.backgroundColor,
                border: `${Math.floor(avatarSize / 64)}px solid ${styles.borderColor}`,
                borderRadius: avatarSize / 16,
                bottom: -avatarSize / 8,
                color: styles.fontColor,
                display: 'flex',
                fontSize: avatarSize / 6,
                gap: avatarSize / 24,
                justifyContent: 'center',
                padding: avatarSize / 16,
                position: 'absolute',
              }}
            >
              <span>{tierConfig.emoji}</span>
              <span>{item.name.length > 9 ? item.name.slice(0, 8) + '...' : item.name}</span>
            </div>
          </div>
        );
      })}

      <div
        style={{
          alignItems: 'flex-start',
          backgroundColor: styles.avatarBackgroundColor,
          border: `${Math.floor(avatarSize / 64)}px solid ${styles.borderColor}`,
          borderRadius: avatarSize / 6,
          color: styles.fontColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: 1.3,
          overflow: 'hidden',
          padding: `${avatarSize / 8}px ${avatarSize / 6}px`,
        }}
      >
        <div style={{ display: 'flex', fontSize: avatarSize / 6 }}>{texts[0]}</div>
        <div
          style={{
            display: 'flex',
            fontSize: avatarSize / 4,
            fontWeight: 'bold',
            gap: avatarSize / 12,
          }}
        >
          <span>{texts[1]}</span>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#DC485F' }}>S</span>
            <span style={{ color: '#AB4ABB' }}>p</span>
            <span style={{ color: '#3BBCFF' }}>o</span>
            <span style={{ color: '#76DAC1' }}>n</span>
            <span style={{ color: '#99D52C' }}>s</span>
            <span style={{ color: '#F2C314' }}>o</span>
            <span style={{ color: '#E65E41' }}>r</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
