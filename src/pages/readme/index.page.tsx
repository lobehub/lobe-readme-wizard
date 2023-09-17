import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { i18n } from '@/../next-i18next.config';
import Layout from '@/pages/layout';
import { useStore } from '@/store';
import { Tab } from '@/store/initialState';
import { genSiteHeadTitle } from '@/utils/genSiteHeadTitle';

import Tabs from './features/Tabs';

const Homepage = () => {
  const pageTitle = genSiteHeadTitle();
  const setActiveTab = useStore((s) => s.setActiveTab);

  setActiveTab(Tab.Readme);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Layout>
        <Tabs />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale ?? i18n.defaultLocale, 'common'),
});

export default Homepage;
