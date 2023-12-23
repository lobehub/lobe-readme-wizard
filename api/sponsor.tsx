import { ImageResponse } from '@vercel/og';

import cors from '../lib/cors';
import Sponsor from '../src/Sponsor';
import { caleHeight, fetchOpenCollectiveData, fetchFonts, getNumber } from '../src/Sponsor/utils';

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
    const id = searchParams.get('id') || 'lobehub';
    const data = await fetchOpenCollectiveData(id);
    const { fontBold, fontRegular } = await fetchFonts();
    const height = caleHeight(data, { avatarSize, width });

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
