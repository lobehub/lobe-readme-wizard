import { CSSProperties, FC } from 'react';

import { Avatar } from '@/Sponsor/Avatar';
import { theme } from '@/Sponsor/style';

interface MemberProfile {
  MemberId: number;
  company?: string;
  createdAt: string;
  currency?: string;
  description?: string;
  email?: string;
  github?: string;
  image?: string;
  isActive: boolean;
  lastTransactionAmount: number;
  lastTransactionAt: string;
  name: string;
  profile: string;
  role: 'ADMIN' | 'HOST' | 'BACKER';
  tier?: string;
  totalAmountDonated: number;
  twitter?: string;
  type: 'USER' | 'ORGANIZATION';
  website?: string;
}

interface TierItem {
  emoji: string;
  preset: 'backer' | 'sponsor';
  sort: number;
  style?: CSSProperties;
  title: string;
}

const DEFAULT_GROUP: TierItem[] = [
  {
    emoji: '🥇',
    preset: 'sponsor',
    sort: 22,
    style: {
      backgroundImage: `linear-gradient(45deg, #F5E729 0%, #DC9A01 33%, #DC9A01 66%, #F5E729 100%)`,
    },
    title: '🥇 Gold Sponsor',
  },
  {
    emoji: '🥈',
    preset: 'sponsor',
    sort: 21,
    style: {
      backgroundImage: `linear-gradient(45deg, #D8D8D8 0%, #888888 33%, #888888 66%, #D8D8D8 100%)`,
    },
    title: '🥈 Silver Sponsor',
  },
  {
    emoji: '🥉',
    preset: 'sponsor',
    sort: 20,
    style: {
      backgroundImage: `linear-gradient(45deg, #D8974D 0%, #833204 33%, #833204 66%, #D8974D 100%)`,
    },
    title: '🥉 Bronze Sponsor',
  },
  {
    emoji: '💖',
    preset: 'backer',
    sort: 11,
    title: '💖 Generous Backer',
  },
  {
    emoji: '☕',
    preset: 'backer',
    sort: 10,
    title: '☕ Backer',
  },
  {
    emoji: '🌟',
    preset: 'backer',
    sort: 1,
    title: '🌟 One Time',
  },
];

export interface SponsorProps {
  avatarSize?: number;
  data: MemberProfile[];
  fallbackTier?: string;
  groupBy?: TierItem[];
  height?: number;
  padding?: number;
  texts?: [string, string];
  themeMode?: 'light' | 'dark';
  width?: number;
}

const Sponsor: FC<SponsorProps> = ({
  padding,
  width = 800,
  height,
  data,
  groupBy = DEFAULT_GROUP,
  fallbackTier = '🌟 One Time',
  avatarSize = 64,
  texts = ['Become ❤️', 'LobeHub'],
  themeMode,
}) => {
  const styles = theme(themeMode);
  const sortedData = () => {
    const filteredData = data.filter((item) => item.totalAmountDonated > 0);
    const tierSortMap = new Map(groupBy.map((item) => [item.title, item.sort]));
    return [...filteredData].sort((a, b) => {
      const sortA = tierSortMap.get(a.tier || fallbackTier) || 0;
      const sortB = tierSortMap.get(b.tier || fallbackTier) || 0;
      if (sortA !== sortB) {
        return sortB - sortA;
      }
      return b.totalAmountDonated - a.totalAmountDonated;
    });
  };

  const getTier = (tier = fallbackTier): TierItem => {
    return (
      groupBy.find((item) => item.title.toLowerCase() === tier.toLowerCase()) ||
      (groupBy.at(-1) as TierItem)
    );
  };

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: avatarSize / 8,
        height,
        padding,
        width,
      }}
    >
      {sortedData().map((item) => {
        const tierConfig = getTier(item.tier);
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
            <div
              style={{
                alignItems: 'center',
                background: styles.backgroundColor,
                border: `${Math.floor(avatarSize / 64)}px solid ${styles.borderColor}`,
                borderRadius: avatarSize / 16,
                color: styles.fontColor,
                display: 'flex',
                fontSize: avatarSize / 6,
                justifyContent: 'center',
                marginTop: -avatarSize / 6,
                padding: avatarSize / 16,
                zIndex: 2,
              }}
            >
              {`${tierConfig.emoji} ${
                item.name.length > 9 ? item.name.slice(0, 9) + '...' : item.name
              }`}
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
        <div style={{ fontSize: avatarSize / 6 }}>{texts[0]}</div>
        <div style={{ fontSize: avatarSize / 4, fontWeight: 'bold' }}>
          {`${texts[1]} `}
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
  );
};

export default Sponsor;
