import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { i18n } from '@/../next-i18next.config';
import MarkdownEditor from '@/Features/MarkdownEditor';
import { genSiteHeadTitle } from '@/utils/genSiteHeadTitle';

import Layout from './layout';

const Homepage = () => {
  const pageTitle = genSiteHeadTitle();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Layout>
        <MarkdownEditor />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale ?? i18n.defaultLocale, 'common'),
});

export default Homepage;
