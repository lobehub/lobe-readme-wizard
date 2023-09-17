import urlJoin from 'url-join';

import { GITHUB_URL, SHIELD_BADGE_URL } from '@/const/url';
import { genShield } from '@/utils/genShield';

export const featuresSample = `
## ✨ Features

- [x] 💨 **Quick Deployment**: Using the Vercel platform, you can deploy with just one click and complete the process within 1 minute, without any complex configuration;
- [x] 💎 **Exquisite UI Design**: With a carefully designed interface, it offers an elegant appearance and smooth interaction. It supports light and dark themes and is mobile-friendly. PWA support provides a more native-like experience;
- [x] 🗣️ **Smooth Conversation Experience**: Fluid responses ensure a smooth conversation experience. It fully supports Markdown rendering, including code highlighting, LaTex formulas, Mermaid flowcharts, and more;
- [x] 🧩 **Plugin Support & Custom Plugin Development**: Conversations are extendable with plugins. Users can install and use various plugins, such as search engines, web extraction, etc. It also supports the development of custom plugins to meet custom needs;
- [x] 🔒 **Privacy Protection**: All data is stored locally in the user's browser, ensuring user privacy;
- [x] 🤖 **Customizable Assistant Roles**: Users can create, share, and debug personalized dialogue assistant roles according to their needs, providing more flexible and personalized dialogue functions;
- [x] 🌐 **Custom Domain**: If users have their own domain, they can bind it to the platform for quick access to the dialogue assistant from anywhere.
- [x] 🏬 **Role Market**: A Role Market is provided where users can select their preferred dialogue assistant roles, enriching the content and style of the dialogue;
`;

export const creditsSample = `
## 🔗 Links

### More Products

- **[🤖 Lobe Chat][lobe-chat] :** An open-source, extensible (Function Calling), high-performance chatbot framework. It supports one-click free deployment of your private ChatGPT/LLM web application.
- **[🌏 Lobe i18n][lobe-i18n] :** Lobe i18n is an automation tool for the i18n (internationalization) translation process, powered by ChatGPT. It supports features such as automatic splitting of large files, incremental updates, and customization options for the OpenAI model, API proxy, and temperature.
- **[💌 Lobe Commit][lobe-commit] :** Lobe Commit is a CLI tool that leverages Langchain/ChatGPT to generate Gitmoji-based commit messages.

### Credits

- stable-diffusion-webui：<https://github.com/AUTOMATIC1111/stable-diffusion-webui>
- gradio-theme-gallery: <https://huggingface.co/spaces/gradio/theme-gallery>
- cozy-nest: <https://github.com/Nevysha/Cozy-Nest>
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
