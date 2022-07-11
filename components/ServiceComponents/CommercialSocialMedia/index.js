import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from 'components/Loader';
import { Heading, Description } from 'styles/TextStyled';
// import { getSocialDetails, updateSocial } from 'services/';
import Social from '../Social';
import { Container } from '../styled';
import { Layout } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { getSocialDetails, updateSocial } from 'src/services';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const CommercialRequests = props => {
  const { t, ready } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { data: userData } = useFetchLoggedUser()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const [saved, setSaved] = useState(false);
  const [loader, setLoader] = useState(false);
  const [socialDetails, setDetails] = useState([]);

  const topHeight = useRef(null);

  const getSocials = async () => {
    try {
      setLoader(true);
      const result = getSocialDetails();
      result.then(res => {
        setLoader(false);
        setDetails(res.social_media_promotions_title);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const submitHandler = (payload, details) => {
    try {
      loaderAction(true);
      const result = updateSocial(payload);
      result.then(res => {
        loaderAction(false);
        if (res.code === 1001) {
          localUpdateToast({
            value: true,
            message: res ? res.message : t('common.update_failed'),
            variant: 'error',
          });
        } else {
          if (!isEmpty(res.services)) {
            props.updateUserData({
              userDetails: userData?.user,
              celbDetails: { ...userData?.celebrity_details, services: res.services },
            });
          }
          setDetails(details);
          props.confirmSave({ saved: true, route: 'social' });
          setSaved(true);
          localUpdateToast({
            value: true,
            message: res ? res.message : t('common.updatedSuccessfully'),
            variant: 'success',
          });
        }
      });
    } catch (e) {
      loaderAction(false);
      localUpdateToast({
        value: true,
        message: t('common.update_failed'),
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    getSocials();
  }, []);

  return ready && (
    <Container>
      <Layout className="content-wrapper">
        <Heading className="inner-head">{t('services.socialPromotion.heading')}</Heading>
        <Description className="note-padding">
          {t('services.socialPromotion.description')}
        </Description>

        <Description className="info">
          {t('services.selectChannels')}
        </Description>
        {!isEmpty(socialDetails) && (
          <div className="acc-wrp">
            <Scrollbars
              autoHide
              renderView={scrollProps => (
                <div {...scrollProps} id="commercial-scroll" />
              )}
            >
              <Social
                socialDetails={socialDetails}
                submitHandler={submitHandler}
                confirmSave={props.confirmSave}
                saved={props.saved}
                isSaved={saved}
                isPromotion
                history={props.history}
                entityData={props.entityData}
                adminApproved={props.adminApproved}
                currencyData={props.currencyData}
                topHeight={topHeight}
                celebActive={props.celebActive}
                pageOffset={125}
                validateUrl="manage/storefront/commercial"
                active={userData?.celebrity_details.services.social_promotions}
              ></Social>
            </Scrollbars>
          </div>
        )}
        {loader && <Loader class="custom-loader" />}
      </Layout>
    </Container>
  );
};

CommercialRequests.propTypes = {
  celbDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  messages: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  confirmSave: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  saved: PropTypes.object.isRequired,
};

CommercialRequests.defaultProps = {};

export default CommercialRequests;
