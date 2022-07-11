import React, { useState, useEffect, lazy } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { backgroundImages, pageColors, pageFonts } from 'src/services/pageDesign';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
// import { updateUserDetails } from 'store/shared/actions/getUserDetails';
import ErrorHandler from 'components/ErrorHandler';
import { accountStatus } from 'src/constants/stars/accountStatus';
import BackHeader from 'components/BackHeader';
import Button from 'components/SecondaryButton';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import Loader from 'components/Loader';
import { Heading, Description, LinkText } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
import Carousel from './Carousel';
import { Layout, CarouselWrp } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import dynamic from 'next/dynamic';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const ColorPicker = dynamic(() => import('components/ColorPicker'));

const FontPicker = dynamic(() => import('components/FontPicker'));

const PageDesign = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { t } = useTranslation();
  const { data: userData } = useFetchLoggedUser()
  const userDetails = userData.user
  const celbDetails = userData.celebrity_details
  const [selectedColor, setSelectedColor] = useState(
    !isEmpty(celbDetails && celbDetails.page_color)
      ? celbDetails.page_color
      : {},
  );

  const [selectedFont, setSelectedFont] = useState(
    !isEmpty(celbDetails && celbDetails.page_font) ? celbDetails.page_font : {},
  );

  const [selectedBgCover, setSelectedBg] = useState({
    id: '#00000#',
    image: celbDetails && celbDetails.banner_image,
  });

  const [images, setImages] = useState([]);
  const [bannerLoader, setBannerLoader] = useState(true);
  const [deleted, setDeleted] = useState({});
  const [notSaved, setNotSaved] = useState(false);

  const colorChange = selected => {
    setSelectedColor(selected);
    props.confirmSave({ saved: false, route: 'page-design' });
  };

  const fontChange = selected => {
    setSelectedFont(selected);
    props.confirmSave({ saved: false, route: 'page-design' });
  };

  const selectedBg = data => () => {
    setSelectedBg(data);
    props.confirmSave({ saved: false, route: 'page-design' });
  };

  const updateBg = async (userData, errorData) => {
    const celbData = cloneDeep(userData);
    const errorObj = cloneDeep(errorData);
    return new Promise(resolve => {
      const result = backgroundImages('post', {
        ...selectedBgCover,
        type: 'existing_image',
      });
      result
        .then(res => {
          if (res.status === 'success') {
            celbData.banner_image = selectedBgCover.image;
            resolve({ celbData, errorObj });
            props.confirmSave({ saved: true, route: '' });
          } else {
            errorObj.push(t('common.profilesec.update_banner_failed'));
            resolve({ celbData, errorObj });
          }
        })
        .catch(err => {
          errorObj.push(`${err.data}`);
          resolve({ celbData, errorObj });
        });
    });
  };

  const updateColor = async (userData, errorData) => {
    const celbData = cloneDeep(userData);
    const errorObj = cloneDeep(errorData);
    return new Promise(resolve => {
      const result = pageColors('post', { ...selectedColor });
      result
        .then(res => {
          if (res.status === 'success') {
            celbData.page_color = selectedColor;
            resolve({ celbData, errorObj });
            props.confirmSave({ saved: true, route: '' });
          } else {
            errorObj.push(t('common.profilesec.update_color_failed'));
            resolve({ celbData, errorObj });
          }
        })
        .catch(err => {
          errorObj.push(`${err.data}`);
          resolve({ celbData, errorObj });
        });
    });
  };

  const updateFont = async (userData, errorData) => {
    const celbData = cloneDeep(userData);
    const errorObj = cloneDeep(errorData);
    return new Promise(resolve => {
      const result = pageFonts('post', { ...selectedFont });
      result
        .then(res => {
          if (res.status === 'success') {
            celbData.page_font = selectedFont;
            resolve({ celbData, errorObj });
            props.confirmSave({ saved: true, route: '' });
          } else {
            errorObj.push(t('common.profilesec.update_font_failed'));
            resolve({ celbData, errorObj });
          }
        })
        .catch(err => {
          errorObj.push(`${err.data}`);
          resolve({ celbData, errorObj });
        });
    });
  };

  const handleSave = async () => {
    loaderAction(true);
    let userData = cloneDeep(celbDetails);
    let errorData = [];
    if (selectedBgCover && selectedBgCover.image !== celbDetails.banner_image) {
      const bgRes = await updateBg(userData, errorData);
      userData = { ...bgRes.celbData, page_design: true };
      errorData = [...bgRes.errorObj];
    }
    if (selectedColor && selectedColor.id !== celbDetails.page_color.id) {
      const colRes = await updateColor(userData, errorData);
      userData = { ...colRes.celbData, page_design: true };
      errorData = [...colRes.errorObj];
    }
    if (selectedFont && selectedFont.id !== celbDetails.page_font.id) {
      const fontRes = await updateFont(userData, errorData);
      userData = { ...fontRes.celbData, page_design: true };
      errorData = [...fontRes.errorObj];
    }
    if (errorData.length === 0) {
      localUpdateToast({
        value: true,
        message: t('common.updatedSuccessfully'),
        variant: 'success',
      });
    } else {
      localUpdateToast({
        value: true,
        message: errorData.join(', '),
        variant: 'error',
      });
    }
    props.updateUserDetails({
      userDetails,
      celbDetails: userData,
    });
    loaderAction(false);
  };

  const getBannerList = () => {
    const result = backgroundImages();
    result.then(resp => {
      if (resp.status === 'success') {
        setImages(resp.data);
        setBannerLoader(false);
      }
    });
  };

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.goBack();
    }
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.goBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const removeBg = data => () => {
    loaderAction(true);
    const result = backgroundImages('delete', {
      ...data,
    });
    result
      .then(res => {
        loaderAction(false);
        if (res.status === 'success') {
          const userData = cloneDeep(celbDetails);
          userData.banner_image = res.data;
          props.updateUserDetails({
            userDetails,
            celbDetails: userData,
          });
          setImages(images.filter(image => image.id !== data.id));
          setDeleted(data);
          localUpdateToast({
            value: true,
            message: t('common.deleted_success'),
            variant: 'success',
          });
        } else {
          localUpdateToast({
            value: true,
            message: t('common.failed_delete'),
            variant: 'error',
          });
        }
      })
      .catch(err => {
        loaderAction(false);
        localUpdateToast({
          value: true,
          message: err,
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    getBannerList();
  }, []);

  const renderContent = data => {
    return (
      <div className="slide-item-wrp">
        <img className="cover-image" src={data.image} alt="banner-img" />
        {data.image_type === 'cover_image' && (
          <Button
            secondary
            className="select-btn remove-btn"
            onClick={removeBg(data)}
          >
            {t('common.remove')}
          </Button>
        )}
        <Button secondary className="select-btn" onClick={selectedBg(data)}>
          {t('common.select')}
        </Button>
      </div>
    );
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

      <Layout>
        <BackHeader
          backHandler={backHandler}
          label={t('common.design')}
          closeHandler={backHandler}
          noHelp
          rootClass="back-root"
        />
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="pagedesign-scroll" />
          )}
        >
          <div className="mob-pad">
            <Heading className="head-title">
              {t('common.personalize_store', { store: entityData?.partnerData?.partner_name })}
            </Heading>
            <div className="drop-wrapper">
              <ErrorHandler>
                <ColorPicker
                  options={[]}
                  onChange={colorChange}
                  labelKey="id"
                  valueKey="id"
                  selected={selectedColor}
                  default={[]}
                />
              </ErrorHandler>
              <ErrorHandler>
                <FontPicker
                  options={[]}
                  onChange={fontChange}
                  labelKey="id"
                  valueKey="id"
                  selected={selectedFont}
                  label={userDetails && userDetails.first_name.substring(0, 5)}
                  default={[]}
                />
              </ErrorHandler>
            </div>
            <Heading className="head-title img-head">
              {t('common.profilesec.cover_image')}
            </Heading>
            <Description className="desc">
              {t('common.profilesec.page_design_desc', {
                store: entityData?.partnerData?.partner_name,
              })}
            </Description>

            <img
              className="cover-image"
              src={selectedBgCover.image}
              alt="cover-img"
            />

            <Description className="desc choose-desc">
              {t('common.profilesec.choose_new')}
            </Description>
          </div>
          <CarouselWrp>
            <Carousel
              getComponent={renderContent}
              data={images || []}
              deleted={deleted}
            />
            {bannerLoader && <Loader />}
          </CarouselWrp>
          <Description className="goto-link">
            <Link href={`/${userDetails.user_id}?direct_view=true`}>
              <a>
                <Trans i18nKey="common.profilesec.store_link">
                  Or
                      <LinkText className="link">go to your storefront</LinkText>
                  and add your own image
                </Trans>
              </a>
            </Link>
          </Description>
          <FlexCenter className="align-center">
            <Button className="save-button" onClick={handleSave}>
              {t('common.save')}
            </Button>
          </FlexCenter>
        </Scrollbars>
      </Layout>
    </React.Fragment>
  );
};

PageDesign.defaultProps = {
  goBack: () => {},
};

PageDesign.propTypes = {
  userDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     loaderAction: value => dispatch(loaderAction(value)),
//     updateToast: toastObj =>
//       dispatch(updateToast({ ...toastObj, global: false })),
//     updateUserDetails: data => dispatch(updateUserDetails(data)),
//   };
// }

export default PageDesign
