import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18n } from '@/../next-i18next.config';

const Homepage = () => {
  const { t } = useTranslation('common');

  return <h1>{t('h1')}</h1>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale ?? i18n.defaultLocale, 'common'),
});

export default Homepage;
