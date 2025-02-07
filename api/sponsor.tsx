import cors from '../lib/cors';
import { MULTIPLE, genSponsor } from '../lib/genSponsor';
import { getNumber } from '../src/Sponsor/utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);

    const avatarSize = getNumber(searchParams.get('avatarSize'), 64 * MULTIPLE);
    const width = getNumber(searchParams.get('width'), 800 * MULTIPLE);
    const themeMode = searchParams.get('themeMode') === 'dark' ? 'dark' : 'light';

    const res = await genSponsor({ avatarSize, themeMode, width });
    return cors(request, res);
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
