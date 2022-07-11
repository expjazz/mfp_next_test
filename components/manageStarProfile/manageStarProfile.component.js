import { useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import MoboList from 'components/MoboList';
import { Description, Heading } from 'styles/TextStyled';
import StarManageHeader from 'components/StarManageHeader';
import PageStatus from 'components/PageStatus';
import { Wrapper, Layout, Content, ProgressBarWrapper } from './styled';
import { STAR_PROFILE } from './constants';
import ProgressBar from 'components/ProgressBar';
import InnerSidebar from '../../components/InnerSidebar';
import {
  NameAndPhotoRoot,
  ProfileVideoRoot,
  BioRoot,
  IndustryRoot,
  TagsRoot,
  SocialHandlesRoot,
  Charity,
  SetPriceAndCharityRoot,
  PageDesign,
} from '../../components/Profile';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import { isEmpty } from 'src/utils/dataStructures';
import { accountStatus } from 'src/constants/stars/accountStatus';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { updateProfilePhoto } from 'src/services/myfanpark/celebActions';
import { useGeneral } from 'src/context/general';
import { useQueryClient } from 'react-query';
import { useMedia } from 'customHooks/domUtils';


const ManageStarProfile = props => {
  const { t } = useTranslation();
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const [currentPage, setcurrentPage] = useState('');
  const router = useRouter()
  const pathname = router.asPath
  const { slug } = router.query
  const isMobile = useMedia('(max-width: 1279px)');
  const [redirecttoProfile, setredirecttoProfile] = useState(false);
  const isIpad = useMedia('(min-width:832px) and (max-width: 1279px)');
  const isMobo = useMedia('(max-width: 831px)');
  useEffect(() => {
    const urlParts = pathname.split('/');
    setcurrentPage(urlParts[urlParts.length - 1]);
  }, []);

  const redirect = useMemo(() => {
    if (!isMobile && pathname === '/manage/storefront/profile') {
      return true;
    }
    return false;
  }, [isMobile, pathname])

  const closeProfileModal = () => {
    setredirecttoProfile(true);
  };
  const goToManage = () => {
    if (isMobile) {
     router.push('/manage/storefront', undefined, { shallow: true });
    } else {
     router.push('/manage', undefined, { shallow: true });
    }
  };

  const linkStatus = link => {
    const celebrityDetails = userData?.celebrity_details;
    const userDetails = userData?.user;
    const temp = { ...link };
    switch (link.selectedName) {
      case 'name&photo':
        if (getAvtar(userData?.user?.avatar_photo)) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'pagedeign':
        temp.completed = userData?.celebrity_details?.page_design;
        return temp;
      case 'Welcome-fans':
        if (userData?.celebrity_details?.profile_video) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'bio':
        if (userData?.celebrity_details?.description.length > 4) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'industry':
        if (!isEmpty(userData?.celebrity_details?.profession_details)) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'tags':
        if (!isEmpty(userData?.celebrity_details?.tags)) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'social':
        userData?.user?.social_links?.filter(sociallink => {
          const linkValue = sociallink.social_link_value.split('.com/');
          if (!isEmpty(linkValue[1])) {
            temp.completed = true;
          }
        });
        return temp;
      case 'pricelimit':
        temp.completed = true;
        return temp;
      default:
        return link;
    }
    return link;
  };

  const getLinks = links => {
    return links.map(link => {
      return linkStatus(link);
    });
  };
  const [state, dispatch] = useGeneral()
  const queryClient = useQueryClient()
  const localUpdateProfilePhoto = obj => {
    return updateProfilePhoto(obj, true, false, dispatch, queryClient, t)
  }

  const getRoutes = () => {
    switch (pathname) {
      case '/manage/storefront/profile/name-photo':
        return (
          <ErrorHandler>
            <NameAndPhotoRoot
              {...props}
              userDetails={userData}
              goBack={closeProfileModal}
              updateProfilePhoto={localUpdateProfilePhoto}
              setProfilePicToState={() => {}}
            />
          </ErrorHandler>
        )
      case '/manage/storefront/profile/page-design':
        return (

          <PageDesign goBack={closeProfileModal} {...props} />
        )
      case '/manage/storefront/profile/welcome-video':
        return (
          <ErrorHandler>
            <ProfileVideoRoot goBack={closeProfileModal} {...props} />
          </ErrorHandler>
        )
      case '/manage/storefront/profile/bio':
        return (
          <ErrorHandler>
            <BioRoot goBack={closeProfileModal} {...props} />
          </ErrorHandler>
        )
      case '/manage/storefront/profile/industry':
        return (
          <ErrorHandler>
            <IndustryRoot goBack={closeProfileModal} {...props} />
          </ErrorHandler>
        )
      case '/manage/storefront/profile/tags':
        return (
          <ErrorHandler>
          <TagsRoot
            goBack={closeProfileModal}
            subTitle={STAR_PROFILE(t, entityData?.partnerData).TAGS.subtitle}
            {...props}
          />
        </ErrorHandler>
        )
      case '/manage/storefront/profile/social-handles':
        return (
          <ErrorHandler>
            <SocialHandlesRoot
              subTitle={STAR_PROFILE(t, entityData?.partnerData).SOCIAL_HANDLE.subtitle}
              heading={STAR_PROFILE(t, entityData?.partnerData).SOCIAL_HANDLE.heading}
              goBack={closeProfileModal}
              {...props}
            />
        </ErrorHandler>
        )
      case '/manage/storefront/profile/price-limits':
        return (
          <ErrorHandler>
            <SetPriceAndCharityRoot
              goBack={closeProfileModal}
              confirmDescription={
                STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.confirmDescription
              }
              description={STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.description}
              confirmationTitle={
                STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.confirmationTitle
              }
              title={
                isMobile
                  ? STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.titleMobile
                  : STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.title
              }
              {...props}
            />
        </ErrorHandler>
        )
      case '/manage/storefront/profile/charities':
        return (
          <ErrorHandler>
            <Charity
              goBack={closeProfileModal}
              titleCharity={STAR_PROFILE(t, entityData?.partnerData).CHARITY.titleCharity}
              subtitleCharity={STAR_PROFILE(t, entityData?.partnerData).CHARITY.subtitleCharity}
              titleFund={STAR_PROFILE(t, entityData?.partnerData).CHARITY.titleFund}
              subtitleFund={STAR_PROFILE(t, entityData?.partnerData).CHARITY.subtitleFund}
              {...props}
            />
          </ErrorHandler>
        )
      default:
          return <h3>To Redirect</h3>
    }


  };

  const getPercentage = () => {
    const completedArray = getLinks(STAR_PROFILE(t, entityData?.partnerData).INNER_LINKS);
    const completedCount = completedArray.filter(
      link => link.completed === true,
    ).length;
    const percentage = Math.round(
      completedCount * (100 / completedArray.length),
    );
    return percentage;
  };

  useEffect(() => {
    if (pathname === '/manage/storefront/profile') {
      setredirecttoProfile(false);
    }
  }, [pathname])

  useEffect(() => {
    if (redirect) {
      router.push('/manage/storefront/profile/name-photo', undefined, { shallow: true })
    }
  }, [redirect])

  // if (redirect) {
  //   // return <Redirect to="/manage/storefront/profile/name-photo" />;
  // }

  useEffect(() => {
    if (redirecttoProfile) {
      router.push('/manage/storefront/profile', undefined, { shallow: true })
    }
  }, [redirecttoProfile])
  // if (redirecttoProfile && pathname !== '/manage/storefront/profile') {
  //   // return <Redirect to="/manage/storefront/profile" />;
  // }

  return (
    <Wrapper>
      {isMobo &&
       pathname === '/manage/storefront/profile' && (
          <BackHeader
            backHandler={goToManage}
            label={t('common.menu')}
            heading={entityData?.partnerData?.partner_name}
            headerCls="header-label"
            noHelp
          />
        )}
      <Layout>
        {(pathname === '/manage/storefront/profile' ||
          !isMobo) && (
          <Content.LeftSection>
            {!isMobo && (
              <React.Fragment>
                <Heading className="main-heading">
                  {t('star_profile.design_your', {
                    store: entityData?.partnerData?.partner_name,
                  })}
                </Heading>
                <Description className="main-desc">
                  {STAR_PROFILE(t, entityData?.partnerData).DESCRIPTION}
                </Description>
                <ProgressBarWrapper className="progress-mob">
                  <ProgressBar percentage={getPercentage()} />
                </ProgressBarWrapper>
              </React.Fragment>
            )}

            <Content.SidebarWrapper>
              {!isMobo && (
                <InnerSidebar
                  links={getLinks(STAR_PROFILE(t, entityData?.partnerData).INNER_LINKS)}
                  normalTick
                />
              )}
              {isMobo &&
               pathname ===
                  '/manage/storefront/profile' && (
                  <MoboList links={STAR_PROFILE(t, entityData?.partnerData).INNER_LINKS} />
                )}
              {userData?.user?.talent_status !== accountStatus.pending && (
                <PageStatus
                  {...props}
                />
              )}
            </Content.SidebarWrapper>
          </Content.LeftSection>
        )}
        {(pathname !== '/manage/storefront/profile' ||
          !isMobo) && (
          <Content.RightSection>
            <ProgressBarWrapper className="progress-web">
              <ProgressBar percentage={getPercentage()} />
            </ProgressBarWrapper>
            <Content.InnerWrapper>
              {isIpad && currentPage !== 'profile' ? (
                <RequestFlowPopup
                  closePopUp={closeProfileModal}
                  disableClose
                  modalView
                  smallPopup
                  closeClass="closeClass"
                  classes={{
                    root: 'custom-modal',
                    sub: 'profile-modal',
                  }}
                >
                  {!isIpad && <StarManageHeader links={props.links} />}
                  {getRoutes()}
                </RequestFlowPopup>
              ) : (
                <Content.RightContent>{getRoutes()}</Content.RightContent>
              )}
            </Content.InnerWrapper>
          </Content.RightSection>
        )}
      </Layout>
    </Wrapper>
  );
};


export default ManageStarProfile;

// <Switch>
// <Route
//   path="/manage/storefront/profile/name-photo"
//   render={() => (
//     <ErrorHandler>
//       <NameAndPhotoRoot goBack={closeProfileModal} {...props} />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/page-design"
//   render={() => (
//     <ErrorHandler>
//       <PageDesign goBack={closeProfileModal} {...props} />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/welcome-video"
//   render={() => (
//     <ErrorHandler>
//       <ProfileVideoRoot goBack={closeProfileModal} {...props} />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/bio"
//   render={() => (
//     <ErrorHandler>
//       <BioRoot goBack={closeProfileModal} {...props} />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/industry"
//   render={() => (
//     <ErrorHandler>
//       <IndustryRoot goBack={closeProfileModal} {...props} />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/tags"
//   render={() => (
//     <ErrorHandler>
//       <TagsRoot
//         goBack={closeProfileModal}
//         subTitle={STAR_PROFILE(t, entityData?.partnerData).TAGS.subtitle}
//         {...props}
//       />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/social-handles"
//   render={() => (
//     <ErrorHandler>
//       <SocialHandlesRoot
//         subTitle={STAR_PROFILE(t, entityData?.partnerData).SOCIAL_HANDLE.subtitle}
//         heading={STAR_PROFILE(t, entityData?.partnerData).SOCIAL_HANDLE.heading}
//         goBack={closeProfileModal}
//         {...props}
//       />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/price-limits"
//   render={() => (
//     <ErrorHandler>
//       <SetPriceAndCharityRoot
//         goBack={closeProfileModal}
//         confirmDescription={
//           STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.confirmDescription
//         }
//         description={STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.description}
//         confirmationTitle={
//           STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.confirmationTitle
//         }
//         title={
//           isMobile
//             ? STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.titleMobile
//             : STAR_PROFILE(t, entityData?.partnerData).PRICE_AND_LIMITS.title
//         }
//         {...props}
//       />
//     </ErrorHandler>
//   )}
// />
// <Route
//   path="/manage/storefront/profile/charities"
//   render={() => (
//     <ErrorHandler>
//       <Charity
//         goBack={closeProfileModal}
//         titleCharity={STAR_PROFILE(t, entityData?.partnerData).CHARITY.titleCharity}
//         subtitleCharity={STAR_PROFILE(t, entityData?.partnerData).CHARITY.subtitleCharity}
//         titleFund={STAR_PROFILE(t, entityData?.partnerData).CHARITY.titleFund}
//         subtitleFund={STAR_PROFILE(t, entityData?.partnerData).CHARITY.subtitleFund}
//         {...props}
//       />
//     </ErrorHandler>
//   )}
// />
// </Switch>