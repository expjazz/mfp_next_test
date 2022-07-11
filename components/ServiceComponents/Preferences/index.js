import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import ErrorHandler from 'components/ErrorHandler';
import { Heading } from 'styles/TextStyled';
import MenuList from 'components/MenuList';
import { useMedia } from 'customHooks/domUtils';
import { links } from './constants';
import { Layout } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Engagement = dynamic(() => import('./Components/Engagement'))

const Offlimit = dynamic(() => import('./Components/Offlimit'))

const Languages = dynamic(() => import('./Components/Languages'))

const ConnectSocial = dynamic(() => import('./Components/ConnectSocial'))

function Preferences(props) {
  const { t, ready } = useTranslation();
  const { data: entityData } = useGetPartner()
  const isMobile = useMedia('(max-width: 831px)');
  const router = useRouter()
  const pathname = router.asPath
  const getComponent = component => {
    return component;
  };

  const getRoutes = () => {
    switch(pathname) {
      case '/manage/storefront/services/preferences/engagement':
        return getComponent(
          <ErrorHandler>
            <Engagement {...props} />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/preferences/off-limit':
        return getComponent(
          <ErrorHandler>
            <Offlimit {...props} />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/preferences/languages':
        return getComponent(
          <ErrorHandler>
            <Languages {...props} />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/preferences/connect-social':
        return getComponent(
          <ErrorHandler>
            <ConnectSocial {...props} />
          </ErrorHandler>
        )
      default:
        return null
    }
  }

  return ready && (
    <Layout>
      {isMobile &&
        (router.query.slug[2] === 'preferences' && !router.query.slug[3]) && (
          <React.Fragment>
            <Heading className="title">{t('common.preferences')}</Heading>
            <MenuList
              links={links(t, entityData?.partnerData)}
              classNames={{ root: 'tips-list' }}
              shallow
            />
          </React.Fragment>
        )}
        {getRoutes()}
    </Layout>
  );
}


export default Preferences;
