import { ImageResponse } from '@vercel/og';

import cors from '../lib/cors';
import Sponsor from '../src/Sponsor';

const fetchFonts = async () => {
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

export const config = {
  runtime: 'edge',
};

const getNumber = (value: string | null, defaultValue?: number) => {
  if (!value || value === null) return defaultValue;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return defaultValue;
  return parsed;
};

const getData = async (id: string) => {
  const res = await fetch(`https://opencollective.com/${id}/members/all.json`);
  const json = await res.json();
  return json;
};
export default async function handler(request: Request): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);

    const avatarSize = getNumber(searchParams.get('avatarSize'));
    const width = getNumber(searchParams.get('width'), 800);
    const height = getNumber(searchParams.get('height'), 88);
    const padding = getNumber(searchParams.get('padding'));
    const themeMode = searchParams.get('themeMode') === 'dark' ? 'dark' : 'light';
    const id = searchParams.get('id') || 'lobehub';
    const data = (await getData(id)) as any;
    const { fontBold, fontRegular } = await fetchFonts();

    const res = new ImageResponse(
      (
        <Sponsor
          avatarSize={avatarSize}
          data={data}
          padding={padding}
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
