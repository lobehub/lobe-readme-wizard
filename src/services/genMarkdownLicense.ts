import urlJoin from 'url-join';

import { GITHUB_URL } from '@/const/url';

interface MarkdownLicenseOptions {
  license?: string;
  owner: string;
  repo: string;
}

export const genMarkdownLicense = (options: MarkdownLicenseOptions) => {
  const { owner, license } = options;

  const profileTitle = `[${owner === 'lobehub' ? 'LobeHub' : owner}][profile-link]`;
  const profileLink = `[profile-link]: ${urlJoin(GITHUB_URL, owner)}`;

  const md = `
---

#### 📝 License

Copyright © ${new Date().getFullYear()} ${profileTitle}. <br />
This project is [${license || 'MIT'}](./LICENSE) licensed.
  `;
  const ref = [profileLink].filter(Boolean).join('\n');

  const content = [md, ref];

  return content;
};
