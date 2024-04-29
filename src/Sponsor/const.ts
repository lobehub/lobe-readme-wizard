import { CSSProperties } from 'react';

export const DEFAULT_WIDTH = 800;
export const DEFAULT_AVATAR_SIZE = 64;

export interface MemberProfile {
  MemberId?: number;
  company?: string;
  createdAt?: string;
  currency?: string;
  description?: string;
  email?: string;
  github?: string;
  image?: string;
  isActive?: boolean;
  lastTransactionAmount?: number;
  lastTransactionAt?: string;
  name: string;
  profile?: string;
  role?: 'ADMIN' | 'HOST' | 'BACKER';
  tier?: string;
  totalAmountDonated: number;
  twitter?: string;
  type?: 'USER' | 'ORGANIZATION';
  website?: string;
}

export interface TierItem {
  amount: number;
  emoji: string;
  preset: 'backer' | 'sponsor';
  sort: number;
  style?: CSSProperties;
  title: string;
}

export const DEFAULT_GROUP: TierItem[] = [
  {
    amount: 250,
    emoji: '🥇',
    preset: 'sponsor',
    sort: 22,
    style: {
      backgroundImage: `linear-gradient(45deg, #F5E729 0%, #DC9A01 33%, #DC9A01 66%, #F5E729 100%)`,
    },
    title: '🥇 Gold Sponsor',
  },
  {
    amount: 100,
    emoji: '🥈',
    preset: 'sponsor',
    sort: 21,
    style: {
      backgroundImage: `linear-gradient(45deg, #D8D8D8 0%, #888888 33%, #888888 66%, #D8D8D8 100%)`,
    },
    title: '🥈 Silver Sponsor',
  },
  {
    amount: 50,
    emoji: '🥉',
    preset: 'sponsor',
    sort: 20,
    style: {
      backgroundImage: `linear-gradient(45deg, #D8974D 0%, #833204 33%, #833204 66%, #D8974D 100%)`,
    },
    title: '🥉 Bronze Sponsor',
  },
  {
    amount: 18,
    emoji: '💖',
    preset: 'backer',
    sort: 11,
    title: '💖 Generous Backer',
  },
  {
    amount: 6,
    emoji: '☕',
    preset: 'backer',
    sort: 10,
    title: '☕ Backer',
  },
  {
    amount: 1,
    emoji: '🌟',
    preset: 'backer',
    sort: 0,
    title: '🌟 One Time',
  },
];
