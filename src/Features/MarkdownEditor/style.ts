import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, responsive }) => {
  return {
    container: css`
      position: relative;

      overflow: hidden;

      width: 100%;

      background: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusLG}px;
    `,
    editor: css`
      flex: 1;
      padding: 16px;
    `,
    markdown: css`
      flex: 1;
      border-left: 1px solid ${token.colorBorder};

      ${responsive.mobile} {
        border-left: none;
      }
    `,
  };
});
