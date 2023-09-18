import urlJoin from 'url-join';

import { GITHUB_URL, SHIELD_BADGE_URL } from '@/const/url';
import { genShield } from '@/utils/genShield';

export const featuresSample = `- [x] 💨 **Quick Deployment**: Using the Vercel platform, you can deploy with just one click and complete the process within 1 minute, without any complex configuration;
- [x] 💎 **Exquisite UI Design**: With a carefully designed interface, it offers an elegant appearance and smooth interaction. It supports light and dark themes and is mobile-friendly. PWA support provides a more native-like experience;
- [x] 🗣️ **Smooth Conversation Experience**: Fluid responses ensure a smooth conversation experience. It fully supports Markdown rendering, including code highlighting, LaTex formulas, Mermaid flowcharts, and more;
`;

export const creditsSample = `### More Products

- **[🤖 Lobe Chat](https://github.com/lobehub/lobe-chat)** - An open-source, extensible (Function Calling), high-performance chatbot framework. It supports one-click free deployment of your private ChatGPT/LLM web application.
- **[🤯 Lobe theme](https://github.com/lobehub/sd-webui-lobe-theme)** - The modern theme for stable diffusion webui, exquisite interface design, highly customizable UI, and efficiency boosting features.

### Credits

- **remark** - https://github.com/remarkjs/remark
- **shikiji** - https://github.com/antfu/shikiji
`;

export const bunShields = genShield(
  'bun',
  urlJoin(SHIELD_BADGE_URL, '-speedup%20with%20bun-black?logo=bun&style=for-the-badge'),
  'https://bun.sh',
);

export const prWelcomeShields = (prWelcome: string, owner: string, repo: string) =>
  genShield(
    'pr-welcome',
    urlJoin(
      SHIELD_BADGE_URL,
      `${encodeURIComponent(prWelcome)}-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge`,
    ),
    urlJoin(GITHUB_URL, owner, repo, 'pulls'),
  );
