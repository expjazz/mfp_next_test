import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useTranslation } from 'next-i18next';
// import axios from 'axios';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import getAWSCredentials from 'src/utils/AWSUpload';
import { locations } from 'src/constants/locations';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
// import {
//   loaderAction,
//   updateMediaStore,
//   updateToast,
// } from 'store/shared/actions/commonActions';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { Layout, Wrapper } from './styled';
import Video from './Video';
import { generalLoader, updateMediaStore, updateToast, useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const WelcomeVideo = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [state, dispatch] = useGeneral()
  const { data: userData, refetch: refetchUser } = useFetchLoggedUser()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { t } = useTranslation();
  const [compSwitch, compSwitchHandler] = useState(
    props.switched ? props.switched : false,
  );

  const [notSaved, setNotSaved] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (
      userData?.celebrity_details?.video_status === 'Completed'
    ) {
      updateMediaStore(dispatch, {
        videoSrc: userData?.celebrity_details?.profile_video,
        recordedTime: userData?.celebrity_details?.duration,
      });
    }
  }, [userData?.celebrity_details?.video_status]);

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.onBack();
    }
  };

  const onUpdateSuccess = () => {
    setUploaded(false);
  };

  const removeVideo = () => {
    const finalUserDetails = {
      celebrity_details: {
        profile_video: '',
      },
      user_details: {},
    };
    props.updateUserDetails(
      userData?.user?.id,
      finalUserDetails,
      onUpdateSuccess,
    );
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.onBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const backArrowClick = () => {
    if (compSwitch) {
      compSwitchHandler(false);
    } else {
      backHandler();
    }
  };

  const uploadVideo = file => {
    let video = null;
    if (file.name && typeof file.name === 'string') {
      video = file;
    } else {
      video = new File([file], 'welcome-video.mp4');
    }
    loaderAction(true);
    getAWSCredentials(locations.getAwsVideoCredentials, video)
      .then(response => {
        if (response && response.filename) {
          axios
            .post(
              response.url.replace('s3.', 's3-accelerate.'),
              response.formData,
            )
            .then(() => {
              const finalUserDetails = {
                celebrity_details: {
                  profile_video: response.filename,
                },
                user_details: {},
              };
              props.updateUserDetails(
                userData?.user?.id,
                finalUserDetails,
              );

              refetchUser()

              loaderAction(false);
              setUploaded(true);
              props.confirmSave({ saved: true, route: '' });
            })
            .catch(() => {
              loaderAction(false);
            });
        }
      })
      .catch(() => {
        loaderAction(false);
      });
  };

  return (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/profile/page-design"
        confirmSave={props.confirmSave}
      />
      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}
      <Layout compSwitch={compSwitch}>
        <BackHeader
          backHandler={backArrowClick}
          label={t('common.design')}
          closeHandler={backArrowClick}
          noHelp
        />
        <Heading className="wel-head">
          {t('common.profilesec.wel_your_purchaser', {
            purchaser: entityData?.partnerData?.purchaser_plural_name,
          })}
        </Heading>
        <Wrapper>
          <Video
            uploadVideo={uploadVideo}
            loaderAction={loaderAction}
            videoStatus={
              userData?.celebrity_details?.profile_video &&
              userData?.celebrity_details?.video_status
            }
            poster={userData?.celebrity_details?.thumbnail}
            updateToast={localUpdateToast}
            src={userData?.celebrity_details?.profile_video}
            confirmSave={props.confirmSave}
            removeVideo={removeVideo}
            hasRemove={
              uploaded ||
              userData?.celebrity_details?.profile_video
            }
          />
        </Wrapper>
      </Layout>
    </React.Fragment>
  );
};

WelcomeVideo.propTypes = {
  onBack: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  switched: PropTypes.bool,
  updateToast: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};

WelcomeVideo.defaultProps = {
  switched: false,
};

function mapDispatchToProps(dispatch) {
  return {
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    updateMediaStore: payload => dispatch(updateMediaStore(payload)),
    updateUserDetails: (id, obj) =>
      dispatch(updateUserDetails(id, obj, null, false)),
    updateToast: toastObj =>
      dispatch(updateToast({ ...toastObj, global: false })),
  };
}

export default WelcomeVideo
