import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { Scrollbars } from 'react-custom-scrollbars';
import { getSocialDetails, updateSocial } from 'src/services/';
import Loader from 'components/Loader';
import { Heading, Description } from 'styles/TextStyled';
import Social from '../Social';
import { Container } from '../styled';
import { Layout } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const SocialInteractions = props => {
  const { data: entityData } = useGetPartner()
  const { t, ready } = useTranslation();
  const [saved, setSaved] = useState(false);
  const [socialDetails, setDetails] = useState([]);
  const [loader, setLoader] = useState(false);

  const topHeight = useRef(null);

  const getSocials = async () => {
    try {
      setLoader(true);
      const result = getSocialDetails();
      result.then(res => {
        setLoader(false);
        setDetails(res.social_media_shout_out_title);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const submitHandler = (payload, details) => {
    try {
      props.loaderAction(true);
      const result = updateSocial(payload);
      result.then(res => {
        props.loaderAction(false);
        if (!res) {
          props.updateToast({
            value: true,
            message: t('common.update_failed'),
            variant: 'error',
          });
          return
        }
        if (res?.code === 1001) {
          props.updateToast({
            value: true,
            message: res ? res.message : t('common.update_failed'),
            variant: 'error',
          });
        } else {
          if (!isEmpty(res?.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: res.services },
            });
          }
          setDetails(details);
          props.confirmSave({ saved: true, route: 'social' });
          setSaved(true);
          props.updateToast({
            value: true,
            message: res ? res.message : t('common.updatedSuccessfully'),
            variant: 'success',
          });
        }
      });
    } catch (e) {
      props.loaderAction(false);
      props.updateToast({
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
        <Heading className="inner-head">{t('services.socialInt.heading')}</Heading>
        <div ref={topHeight}>
          <Description className="note-padding">
            <Trans i18nKey="services.socialInt.description"
            values={{
              purchaser1: entityData?.partnerData?.purchaser_singular_name,
              purchaser2: props.entityData.purchaser_singular_name,
            }}>
              Supercharge your {entityData?.partnerData?.purchaser_singular_name} engagement and give them the gift of social
              cred through the channels of your choice.
              <br /> *Includes follow a {entityData?.partnerData?.purchaser_singular_name}, like and/or comment on a {props.entityData.purchaser_singular_name}’s post,
              post a video shoutout, etc.
            </Trans>
          </Description>

          <Description className="info">
            {t('services.socialInt.chooseService')}
          </Description>
        </div>
        {!isEmpty(socialDetails) && (
          <div className="acc-wrp">
            <Scrollbars
              autoHide
              renderView={scrollProps => (
                <div {...scrollProps} id="social-inetraction-scroll" />
              )}
            >
              <Social
                socialDetails={socialDetails}
                submitHandler={submitHandler}
                history={props.history}
                entityData={props.entityData}
                adminApproved={props.adminApproved}
                currencyData={props.currencyData}
                celebActive={props.celebActive}
                confirmSave={props.confirmSave}
                isSaved={saved}
                saved={props.saved}
                topHeight={topHeight}
                pageOffset={60}
                validateUrl="/manage/storefront/social-media"
                active={props.celbDetails.services.social_shout_out}
              ></Social>
            </Scrollbars>
          </div>
        )}
        {loader && <Loader class="custom-loader" />}
      </Layout>
    </Container>
  );
};

SocialInteractions.propTypes = {
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
  saved: PropTypes.object.isRequired,
  updateUserData: PropTypes.func.isRequired,
  celbDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

SocialInteractions.defaultProps = {};

export default SocialInteractions;
