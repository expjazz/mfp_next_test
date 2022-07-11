import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import ShareButton from 'components/ShareButton';
import Button from 'components/SecondaryButton';
// import { sharePromoProfile, updateCelebrityShare } from 'services';
// import { getShareImage } from 'services/userManagement/starDetails';
import { ShareContent } from './constants';
import { Layout, SmallHead, FooterWrap, Image } from './styled';
import { generalLoader, useGeneral } from 'src/context/general';
import { sharePromoProfile, updateCelebrityShare } from 'src/services';
import { getShareImage } from 'src/services/myfanpark/celebActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const BoostFans = ({
  requestType,
  global = true,
}) => {
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => localUpdateToast(dispatch, payload)
  const isMobile = useMediaQuery('(max-width: 831px)');
  const { t, ready } = useTranslation();
  const [shareImage, setShareImage] = useState(null);
  const [tempId, setTempId] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const { data: userData } = useFetchLoggedUser()
  const userDetails = userData.user
  const beforeShare = type => {
    loaderAction(true);
    return new Promise((resolve, reject) => {
      const promiseList = [
        updateCelebrityShare('celebrity', { type, tid: tempId }),
        sharePromoProfile(userDetails.user_id, tempId),
      ];
      Promise.all(promiseList)
        .then(() => {
          loaderAction(false);
          resolve();
        })
        .catch(exception => {
          loaderAction(false);
          reject();
          localUpdateToast({
            value: true,
            message: exception.response.data.error.message,
            variant: 'error',
            global,
          });
        });
    });
  };

  useEffect(() => {
    if (requestType) {
      getShareImage(requestType).then(resp => {
        if (resp.templates && resp.templates.id) {
          setShareImage(resp.templates.background_url);
          setTempId(resp.templates.id);
          setShareUrl(
            `${window.location.origin}/${userDetails.user_id}?tid=${resp.templates.id}`,
          );
        }
      });
    }
  }, [requestType]);

  if (!shareUrl) {
    return null;
  }

  return ready && (
    <Layout className="content-wrapper">
      <SmallHead>
        {
          t('common.boostStar', {purchaser:entityData?.partnerData?.purchaser_plural_name})
        }
      </SmallHead>
      <Image src={shareImage} />
      <FooterWrap>
        <Link href="/manage/promote/promo-share">
          <a>
            <Button secondary className="view-btn">
              {t('services.viewAllDesigns')}
            </Button>
          </a>
        </Link>
        <ShareButton
          buttonText={t('common.share')}
          classes={{
            button: 'foot-btn share-btn',
          }}
          buttonTooltip={t('services.promoteExperience')}
          shareUrl={shareUrl}
          beforeShare={beforeShare}
          content={ShareContent(userDetails.stageName, shareUrl, t, entityData?.partnerData)}
          popperProps={isMobile ? ({
            placement: 'top-end',
            preventOverflow: null,
            disablePortal: false
          }) : {}}
        />
      </FooterWrap>
    </Layout>
  );
};

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
});

const mapDispatch = dispatch => ({
  loaderAction: state => dispatch(loaderAction(state)),
  localUpdateToast: toastObj => dispatch(localUpdateToast(toastObj)),
});

export default BoostFans
