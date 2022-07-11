/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import PromoTemplate from 'components/PromoTemplates';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { socialConstants } from 'src/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { sharePromoProfile, updateCelebrityShare } from '../../services';
import { Layout } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { shareCustomPromoImg, sharePromoProfile, updateCelebrityShare } from 'src/services';

const Promotion = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const dispatch = useGeneral()[1]
  const router = useRouter()
  const { data: userData } = useFetchLoggedUser()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const { template } = userData?.celebrity_details;
  const getTemplate = () => {
    const { first_name, nick_name } = userData.user;
    let temp = template.template;
    temp = temp.replace('background_url', template.background_url);
    temp = temp.replace('profile_pic', getAvtar(userData?.user?.avatar_photo));
    temp = temp.replace('full_name', getShortName(nick_name, first_name));
    return temp;
  };

  const beforeShare = (tid, type) => () => {
    loaderAction(true);
    return new Promise((resolve, reject) => {
        const promiseList = [
          updateCelebrityShare('celebrity', { type, tid }),
          sharePromoProfile(userData?.user.user_id, tid),
        ];
        Promise.all(promiseList)
          .then(() => {
            loaderAction(false);
            resolve();
          })
          .catch(exception => {
            loaderAction(false);
            reject();
            updateToast(dispatch, {
              value: true,
              message: exception.response.data.error.message,
              variant: 'error',
              global: false,
            });
          });
    });
  };

  const tid =
    !isEmpty(props.celebDetails) && !isEmpty(props.celebDetails.template)
      ? props.celebDetails.template.id
      : null;

  const shareUrl = `https://${router.query.site}/${userData?.user?.user_id}?tid=${tid}`;

  return (
    <Layout>
      <section className="header-sec">
        <h2 className="promotion-head">
          {t('dashboard.promotional.heading', {
            purchaser: entityData?.partnerData?.purchaser_plural_name,
          })}
        </h2>
        <p className="note-sec">
        <span data-lokalise data-key="dashboard.promotional.note">
          {t('dashboard.promotional.note')}
        </span>
        </p>

        {!isEmpty(userData?.celebrity_details) &&
          !isEmpty(userData?.celebrity_details.template) && (
            <PromoTemplate selected template={getTemplate()} />
          )}
      </section>
      <span className="share-text">
        <span data-lokalise data-key="dashboard.promotional.sharehead">
        {t('dashboard.promotional.shareHead')}
        </span>
      </span>
      <section className="social-wrap">
        {
          template?.has_facebook && (

        <FacebookShareButton
          className="icon-wrap"
          quote=""
          url={shareUrl}
          beforeOnClick={beforeShare(tid, socialConstants.facebook)}
        >
          <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          <span className="social-name">{t('common.facebook')}</span>
        </FacebookShareButton>
          )
        }
        <TwitterShareButton
          className="icon-wrap twitter"
          url={shareUrl}
          beforeOnClick={beforeShare(tid, socialConstants.twitter)}
        >
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <span className="social-name">{t('common.twitter')}</span>
        </TwitterShareButton>
      </section>
    </Layout>
  );
};

Promotion.propTypes = {
  userDetails: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
};

Promotion.defaultProps = {};

export default Promotion;
