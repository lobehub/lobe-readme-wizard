import { ImageResponse } from '@vercel/og';

import cors from '../lib/cors';
import Sponsor from '../src/Sponsor';
import { caleHeight, fetchFonts, getNumber } from '../src/Sponsor/utils';
import { fetchSponsors } from '../src/services/sponsorkit';

const MULTIPLE = 2;

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);

    const avatarSize = getNumber(searchParams.get('avatarSize'), 64 * MULTIPLE);
    const width = getNumber(searchParams.get('width'), 800 * MULTIPLE);
    const themeMode = searchParams.get('themeMode') === 'dark' ? 'dark' : 'light';
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

    const res = new ImageResponse(
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

    return cors(request, res);
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
