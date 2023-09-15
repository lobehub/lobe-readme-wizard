import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Flexbox } from 'react-layout-kit';

import { i18n } from '@/../next-i18next.config';
import Layout from '@/pages/layout';
import { genSiteHeadTitle } from '@/utils/genSiteHeadTitle';

import { CustomDouble, CustomSingle } from './features/Custom';
import Github from './features/Github';

const Homepage = () => {
  const pageTitle = genSiteHeadTitle();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Layout>
        <Flexbox gap={8}>
          <h2>Custom Single Shield</h2>
          <CustomSingle />
          <h2>Custom Double Shield</h2>
          <CustomDouble />
          <h2>Github Shield</h2>
          <Github />
        </Flexbox>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale ?? i18n.defaultLocale, 'common'),
});

export default Homepage;
