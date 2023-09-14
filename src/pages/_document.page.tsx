import { Meta } from '@lobehub/ui';
import { StyleProvider, extractStaticStyle } from 'antd-style';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={extractStaticStyle.cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

    const styles = extractStaticStyle(page.html).map((item) => item.style);

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <Meta title={'LobeChat'} withManifest />
          <link href="https://esm.sh/github-markdown-css@5/github-markdown.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
