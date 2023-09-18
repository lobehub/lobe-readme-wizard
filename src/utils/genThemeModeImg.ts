export const genThemeModeImg = ({ light, dark }: { dark: string; light: string }) => {
  return [
    '<picture>',
    `  <source media="(prefers-color-scheme: dark)" srcset="${dark}">`,
    `  <img width="100%" src="${light}">`,
    `</picture>`,
  ].join('\n');
};
