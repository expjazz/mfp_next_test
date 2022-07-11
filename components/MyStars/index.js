import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import StarsList from './componets/StarsList';
import Details from './componets/Details';
import { getMyStars } from './services';
import {
  Layout,
  Content,
  LeftSection,
  RightSection,
  EmptyText,
} from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';

function MyStars(props) {
  const { data: userData } = useFetchLoggedUser()
  const fanName = userData?.user.first_name
  const router = useRouter()
  const { t } = useTranslation();
  const [stars, setStars] = useState([]);
  const [selected, setSelected] = useState(null);
  const isWeb = useMediaQuery('(min-width: 1279px)');
  const isMob = useMediaQuery('(max-width: 831px)');

  const closeHandler = () => {
    setSelected(null);
  };

  const onStarClick = star => {
    setSelected(star);
  };

  const onBack = () => {
    router.back();
  };

  useEffect(() => {
    props.loaderAction(true);
    getMyStars()
      .then(resp => {
        if (resp && resp.data && resp.data.data && resp.data.data.my_stars) {
          setStars(resp.data.data.my_stars);
          if (isWeb) {
            setSelected(resp.data.data.my_stars[0]);
          }
        }
        props.loaderAction(false);
      })
      .catch(() => {
        props.loaderAction(false);
      });
  }, []);

  return (
    <Layout>
      <Content>
        <LeftSection>
          {isMob && (
            <BackHeader
              backHandler={onBack}
              label={t('common.menu')}
              rootClass="success-Back"
              noHelp
            />
          )}
          <Heading className="title">{t('fan_manage.myStars.heading', {talent: props.entityData?.talentPlural})}</Heading>
          {stars.length <= 0 && (
            <EmptyText>{t('fan_manage.myStars.emptyText')}</EmptyText>
          )}
          {stars.length > 0 && (
            <StarsList
              t={t}
              stars={stars}
              onStarClick={onStarClick}
              selected={selected || {}}
            />
          )}
        </LeftSection>
        <RightSection>
          {selected && (
            <Details
              t={t}
              closeHandler={closeHandler}
              selected={selected || {}}
              {...props}
            />
          )}
        </RightSection>
      </Content>
    </Layout>
  );
}

MyStars.propTypes = {
  loaderAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapDispatch(dispatch) {
  return {
    updateToast: toastObj =>
      dispatch(updateToast({ ...toastObj, global: false })),
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
  };
}
export default MyStars
