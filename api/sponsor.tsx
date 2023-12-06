import { ImageResponse } from '@vercel/og';

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
    const height = getNumber(searchParams.get('height'));
    const padding = getNumber(searchParams.get('padding'));
    const themeMode = searchParams.get('themeMode') === 'dark' ? 'dark' : 'light';
    const id = searchParams.get('id') || 'lobehub';
    const data = (await getData(id)) as any;

    return new ImageResponse(
      (
        <div>
          🤯❤️{avatarSize}
          {padding}
          {themeMode}
          {JSON.stringify(data)}
        </div>
      ),
      {
        emoji: 'fluent',
        headers: {
          'CDN-Cache-Control': 'public, s-maxage=60',
          'Cache-Control': 'public, s-maxage=1',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
          'content-type': 'image/png',
        },
        height,
        width,
      },
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
