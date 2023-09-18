import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    `,
    markdown: css`
      overflow: hidden;
      flex: 1;
      height: 100%;
      border-bottom: 1px solid ${token.colorBorder};
    `,
    preview: css`
      flex: 1;
      border-radius: 0;
    `,
  };
});
