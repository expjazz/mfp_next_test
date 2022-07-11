import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { useTranslation, Trans } from 'next-i18next';
// import { Link, withRouter } from 'react-router-dom';
// import { updateToast } from 'store/shared/actions/commonActions';
import {ReactSVG} from 'react-svg';
// import UploadComponent from 'components/UploadComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
// import { useMedia, openHelp, notPipt } from 'src/utils/domUtils';
import { getUserImage } from 'src/utils/dataformatter';
import { getShortName } from 'src/utils/dataToStringFormatter';
// import { toggleLogin } from 'store/shared/actions/toggleModals';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import MobDrawer from './components';
import {
  Container,
  Wrapper,
  Logo,
  FanProf,
  Count,
  CallIcon,
  IconWrap,
  IconLabel,
  IconContainer,
  Counter,
  Approval,
  LinkEle,
} from './styled';
import { capitalize, useMediaQuery } from '@material-ui/core';
import { notPipt, openHelp } from 'customHooks/domUtils';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { toggleLogin, updateToast, useGeneral } from 'src/context/general';
import Link from 'next/link';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import UploadComponent from 'components/UploadComponent';
import { useRouter } from 'next/router';

const callIcon = (
  <CallIcon>
    <ReactSVG src="/images/circle.svg" class="cus-icon" />
    <FontAwesomeIcon icon={faPhoneAlt} />
  </CallIcon>
);

function Header({
  links,
  ...props
}) {
  const { data: entityData } = useGetPartner()
  const isPipt = false
  const [state, dispatch] = useGeneral()
  const router = useRouter()
  const { data: userData } = useFetchLoggedUser()
  const isLoggedIn = !!userData
  const { user: userValue, celebrity_details: celebValue } = userData
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [drawer, setDrawer] = useState(false);

  const openDrawer = () => {
    setDrawer(!drawer);
  };

  const onProfClick = () => {
    if (!isLoggedIn) {
      toggleLogin(dispatch, {active: true, options: { preventStarLogin: true, noRedirect: true }});
    } else {
      router.push(
        notPipt(userValue) ? '/manage/bookings' : '/manage/settings',
      );
    }
  };

  const getImage = () => {
    const url = getUserImage(userValue?.avatar_photo);
    if (url) {
      return <img src={url} alt="user" className="user-imgae" />;
    }
    return <FontAwesomeIcon icon={faUserCircle} />;
  };

  const renderApproval = () => {
    switch (userValue?.talent_status) {
      case accountStatus.pending:
        return (
          <Approval
            clickable
            onClick={() => {
              updateToast(dispatch, {
                value: true,
                message: t('common.accountPendAlert', {
                  talent: capitalize(entityData?.partnerData?.talent_singular_name),
                }),
                variant: 'info',
                global: false,
              });
            }}
          >
            {t('common.acconutStatus')}
          </Approval>
        );
      case accountStatus.paused:
        return (
          <Approval
            clickable
            onClick={() => {
              updateToast(dispatch, {
                value: true,
                message: () => (
                  <Trans i18nKey="common.accountPauseAlert">
                    Your account has been paused. Please contact your{' '}
                    <LinkEle
                      href={`mailto:${entityData?.partnerData?.concierge_email}`}
                    >
                      concierge
                    </LinkEle>{' '}
                    for details.
                  </Trans>
                ),
                variant: 'info',
                global: false,
              });
            }}
          >
            {t('common.accountPause')}
          </Approval>
        );
      case accountStatus.hidden:
        return <Approval>{t('common.accountHidden')}</Approval>;
      default:
        return null;
    }
  };

  const renderNotCount = () => {
    const notfCount =
      celebValue?.pending_requests_count || userValue?.completed_fan_unseen_count;
    return notfCount ? (
      <Counter>
        <Count className="notf-count">{notfCount}</Count>{' '}
        <IconLabel className="req-lbl">{t('common.requests')}</IconLabel>
      </Counter>
    ) : null;
  };

  const getContent = () => {
    return (
      <React.Fragment>
        <FanProf onClick={onProfClick}>
          {!isMobile && getImage()}
          {isLoggedIn && (
            <React.Fragment>
              {!isMobile && (
                <span className="fan-name">
                  {getShortName(userValue.nick_name, userValue.first_name)}
                </span>
              )}
              {renderNotCount()}
            </React.Fragment>
          )}
        </FanProf>
      </React.Fragment>
    );
  };


  return (
    <React.Fragment>
      <Container ref={props.forwardRef}>
        <Wrapper>
          {!isMobile && (
            <Link href={notPipt(userValue) ? '/manage' : '/manage/settings'} shallow>
              <a>
                <Logo src={entityData?.partnerData?.logo_reverse} alt="logo"></Logo>
              </a>
            </Link>
          )}
          {isMobile && (
            <span className="ham-wrp">
              <FontAwesomeIcon icon={faBars} onClick={openDrawer} />
              <span className="company">{entityData?.partnerData?.partner_name}</span>
            </span>
          )}
          {notPipt(userValue) ? (
            <IconContainer>
              <IconWrap onClick={openHelp}>
                <FontAwesomeIcon icon={faQuestionCircle} />
                <IconLabel>{t('common.help')}</IconLabel>
              </IconWrap>
              {!isMobile && (
                <Link href="/manage/tools/star-concierge" passHref>
                  <IconWrap>
                    {callIcon}
                    <IconLabel>{t('star_header.myConcierge')}</IconLabel>
                  </IconWrap>
                </Link>
              )}
              <Link href={`/${userValue?.user_id}`} passHref>
                <IconWrap
                  noPadding={
                    !celebValue?.pending_requests_count &&
                    !userValue?.completed_fan_unseen_count
                  }
                >
                  {getImage()}
                  <IconLabel>
                    {userValue?.allow_posts ? (
                      <React.Fragment>
                        {isMobile ? t('common.posts') : t('common.viewPosts')}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {isMobile
                          ? `${capitalize(entityData?.partnerData?.partner_name)}`
                          : `${t('star_header.viewMyPage')} ${capitalize(
                            entityData?.partnerData?.storeNameCaps,
                            )}`}
                      </React.Fragment>
                    )}
                  </IconLabel>
                </IconWrap>
              </Link>
              {!isMobile && renderApproval()}
              {isDesktop && (
                <UploadComponent
                  classes={{
                    root: 'upload-bar-root',
                  }}
                />
              )}
            </IconContainer>
          ) : null}
          {getContent()}
        </Wrapper>
        {isMobile && renderApproval()}
      </Container>
      {drawer && isMobile ? (
        <MobDrawer links={links} onClose={openDrawer} origin="/manage" />
      ) : null}
    </React.Fragment>
  );
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  userValue: PropTypes.object.isRequired,
  celebValue: PropTypes.object.isRequired,
  forwardRef: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  hamBurger: PropTypes.bool,
  toggleLogin: PropTypes.func,
  updateToast: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired,
};

Header.defaultProps = {
  hamBurger: true,
  toggleLogin: () => {},
  forwardRef: {},
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   userValue: state.userDetails.settings_userDetails,
//   celebValue: state.userDetails.settings_celebrityDetails,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
//   updateToast: toastObject => dispatch(updateToast(toastObject)),
// });

export default Header
