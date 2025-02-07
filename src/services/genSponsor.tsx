import { ImageResponse } from '@vercel/og';

import Sponsor from '@/Sponsor';
import { caleHeight, fetchFonts } from '@/Sponsor/utils';
import { fetchSponsors } from '@/services/sponsorkit';

export const MULTIPLE = 2;

export const genSponsor = async ({
  avatarSize = 64 * MULTIPLE,
  width = 800 * MULTIPLE,
  themeMode = 'dark',
}: {
  avatarSize?: number;
  themeMode: 'dark' | 'light';
  width?: number;
}): Promise<Response> => {
  const data = await fetchSponsors({
    github: {
      login: process.env.SPONSORKIT_GITHUB_LOGIN || '',
      token: process.env.SPONSORKIT_GITHUB_TOKEN || '',
      type: process.env.SPONSORKIT_GITHUB_TYPE || 'organization',
    },
    includePastSponsors: true,
    opencollective: {
      key: process.env.SPONSORKIT_OPENCOLLECTIVE_KEY || '',
      slug: process.env.SPONSORKIT_OPENCOLLECTIVE_ID || 'lobehub',
      type: process.env.SPONSORKIT_OPENCOLLECTIVE_TYPE || 'collective',
    },
  });

  const { fontBold, fontRegular } = await fetchFonts();
  const height = caleHeight(data, { avatarSize, width } as any);

  return new ImageResponse(
    (
      <Sponsor
        avatarSize={avatarSize}
        data={data}
        style={{ fontFamily: '"HarmonyOS Sans"' }}
        themeMode={themeMode}
        width={width}
      />
    ),
    {
      emoji: 'fluent',
      fonts: [
        {
          data: fontRegular,
          name: 'HarmonyOS Sans',
          style: 'normal',
          weight: 400,
        },
        {
          data: fontBold,
          name: 'HarmonyOS Sans',
          style: 'normal',
          weight: 600,
        },
      ],
      headers: {
        'CDN-Cache-Control': 'public, s-maxage=120',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
        'cache-control': 'public, max-age=120, s-maxage=120',
        'content-type': 'image/png',
      },
      height,
      width,
    },
  );
};
