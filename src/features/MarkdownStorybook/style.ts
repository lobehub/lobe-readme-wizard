import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      position: relative;

      overflow: hidden;

      width: 100%;

      border-radius: ${token.borderRadiusLG}px;
      box-shadow: 0 0 0 1px ${token.colorBorder};
    `,
    markdown: css`
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      height: 100%;
    `,
    preview: css`
      border-top: 1px solid ${token.colorBorder};
      border-radius: 0;
    `,
  };
});
