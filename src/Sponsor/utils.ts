import { Sponsorship } from 'sponsorkit';

import {
  DEFAULT_AVATAR_SIZE,
  DEFAULT_GROUP,
  DEFAULT_WIDTH,
  MemberProfile,
  TierItem,
} from './const';

export const caleHeight = (
  data: Sponsorship[] = [],
  {
    width = DEFAULT_WIDTH,
    avatarSize = DEFAULT_AVATAR_SIZE,
  }: { avatarSize: number; multiplier?: number; width: number },
): number => {
  const length = data.length + 2;
  const col = width / (avatarSize * 1.4);
  return Math.ceil(length / Math.ceil(col)) * avatarSize * 1.4;
};

export const formateSponsorData = (
  json: Sponsorship[],
  groupBy: TierItem[] = DEFAULT_GROUP,
  fallbackTier: string = (DEFAULT_GROUP.at(-1) as TierItem).title,
): MemberProfile[] => {
  const tierSortMap = new Map(groupBy.map((item) => [item.title, item.sort]));

  const getValue = (item: Sponsorship) =>
    item?.raw?.totalDonations?.value || item?.raw?.amount?.value || item?.monthlyDollars;

  const sortByGroup = (a: Sponsorship, b: Sponsorship) => {
    const sortA = tierSortMap.get(a.tierName || fallbackTier) || 0;
    const sortB = tierSortMap.get(b.tierName || fallbackTier) || 0;
    if (sortA !== sortB) {
      return sortB - sortA;
    }

    return getValue(b) - getValue(a);
  };
  const filteredData = json.filter((item: Sponsorship) => {
    const dump = json
      .filter((i: Sponsorship) => item.sponsor.login === i.sponsor.login)
      .sort(sortByGroup);
    if (dump.length > 1 && item.tierName !== dump[0].tierName) return false;
    return getValue(item) > 0;
  });

  return filteredData.sort(sortByGroup).map((item) => {
    return {
      image: item.sponsor.avatarUrl,
      name: item.sponsor.name,
      tier: item.tierName || fallbackTier,
      totalAmountDonated: getValue(item),
    };
  });
};

export const getTier = (
  tier: string = (DEFAULT_GROUP.at(-1) as TierItem).title,
  groupBy: TierItem[] = DEFAULT_GROUP,
): TierItem => {
  return (
    groupBy.find((item) => item.title.toLowerCase() === tier.toLowerCase()) ||
    (groupBy.at(-1) as TierItem)
  );
};

export const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    'https://gw.alipayobjects.com/os/kitchen/BUfo9kyDYs/HarmonyOS_Sans_Regular.ttf',
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    'https://gw.alipayobjects.com/os/kitchen/ywwdIaXDZa/HarmonyOS_Sans_Bold.ttf',
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontBold, fontRegular };
};

export const getNumber = (value: string | null, defaultValue?: number) => {
  if (!value || value === null) return defaultValue;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return defaultValue;
  return parsed;
};
