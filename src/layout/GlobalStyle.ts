import { createGlobalStyle } from 'antd-style';

export const GlobalStyle = createGlobalStyle`
  body {
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    font-kerning: normal;
    text-size-adjust: 100%;
    word-break: break-word;

    color-scheme: light dark;
  }

  * {
    box-sizing: border-box;
    line-height: calc(1 * (1em + 1ex));
  }

  code,
  kbd,
  pre,
  textarea{
    font-feature-settings: normal;
  }
`;
