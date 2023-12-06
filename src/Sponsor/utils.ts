import {
  DEFAULT_AVATAR_SIZE,
  DEFAULT_GROUP,
  DEFAULT_WIDTH,
  MemberProfile,
  TierItem,
} from './const';

export const caleHeight = (
  data: MemberProfile[] = [],
  {
    width = DEFAULT_WIDTH,
    avatarSize = DEFAULT_AVATAR_SIZE,
  }: { avatarSize: number; multiplier?: number; width: number },
): number => {
  const length = data.length + 2;
  const col = width / (avatarSize * 1.4);
  return Math.ceil(length / Math.ceil(col)) * avatarSize * 1.4;
};

export const fechOpenCollectiveData = async (
  id = 'lobehub',
  groupBy: TierItem[] = DEFAULT_GROUP,
  fallbackTier: string = (DEFAULT_GROUP.at(-1) as TierItem).title,
): Promise<MemberProfile[]> => {
  const res = await fetch(`https://opencollective.com/${id}/members/all.json`);
  const json = await res.json();
  const filteredData = json.filter((item: any) => item?.totalAmountDonated > 0);
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
