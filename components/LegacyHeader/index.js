import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faGlobe,
  faChevronLeft,
  faTimes,
  faUserCircle,
  faSearch,
} from '@fortawesome/pro-light-svg-icons';
// import EntitySelector from 'components/EntitySelector';
import { NotificationCount } from '../../src/styles/CommonStyled';
import HeaderSection, { Banner } from './styled';
// import CategorySection from './components/CategorySection';
// import MinimalHeader from './components/MinimalHeader';
import SecondaryButton from '../SecondaryButton';
// import BannerMessage from '../BannerMessage';
// import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
// import {
//   fetchSuggestionList,
//   resetSearchParam,
// } from '../../store/shared/actions/getSuggestionsList';
import { getInititals, getShortName } from '../../src/utils/dataToStringFormatter';
import EntitySelector from '../EntitySelector'
import Search from '../Search';
import Popover from '@material-ui/core/Popover'
// import { isSafari, isMobileSafari } from 'react-device-detect';
import { isEmpty } from '../../src/utils/dataStructures';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import BannerMessage from '../BannerMessage';
import dynamic from 'next/dynamic';
import { withLoggedUser } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { toggleLogin, toggleSignup, withGeneral } from 'src/context/general';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { withPartnerData, withProfessionsList } from 'customHooks/reactQueryHooks';
import { withTranslation } from 'next-i18next';
import ContactInitials from 'components/ContactInitials';
import Image from 'next/image';
import { isVodacom } from 'customHooks/domUtils';
const CategorySection = dynamic(() => import('./components/CategorySection'))
const DiscountBanner = dynamic(() => import('components/DiscountBanner'), { ssr: false });

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      showCategories: false,
      openSet: false,
      locIsStar: false,
      redirectURL: '',
    };
  }

  handleProfileClick = () => {
    if (
      this.props.router.asPath !== '/manage' &&
      this.props.isLoggedIn
    ) {
      this.props.router.push(this.props.isStar ? '/manage' : '/fan-manage');
    }
  };

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  handleBackClick = () => {
    const { showCategories } = this.state;
    if (showCategories) {
      this.toggleCategories();
    } else if (this.props.onBackClick) {
      this.props.onBackClick();
    }
  };

  toggleCategories = () => {
    const { showCategories } = this.state;
    this.setState({ showCategories: !showCategories });
  };

  toggleLogin = () => {
    toggleLogin(this.props.dispatch, {active: true, options: { noRedirect: true }})
  }

  toggleSignup = payload => {
    toggleSignup(this.props.dispatch, payload)
  }

  handleProfilePhoto = () => {
    const { isLoggedIn, user } = this.props;
    if (isLoggedIn && !this.props.loggedUser.user.avatarPhoto) {
      return (
        <ContactInitials>
          {getInititals(this.props.loggedUser.user.first_name, this.props.loggedUser.user.last_name)}
        </ContactInitials>
      )
    } else {

      return this.props.loggedUser.user.avatarPhoto ? (
          <HeaderSection.ProfileButton
          hide={
            (this.props.loggedUser?.celebrity_details?.pending_requests_count ||
              this.props.notificationCount) &&
            !this.props.disabledNotification
          }
          profileUrl={
            this.props.loggedUser.user.avatarPhoto ||  null }
        />
      ) : (
        <HeaderSection.SignInButtonMobile
          hide={
            this.props.loggedUser?.celebrity_details?.pending_requests_count ||
            this.props.notificationCount
          }
        >
          <FontAwesomeIcon className='user-circle' icon={faUserCircle} />
        </HeaderSection.SignInButtonMobile>
      )}

    }

    render() {
    const { props } = this;
    const userDetails = props.userValue.settings_userDetails;
    const { showCategories } = this.state;

    // if (props.minimalView) {
    //   return (
    //     <MinimalHeader
    //       {...props}
    //       showCategories={showCategories}
    //       toggleCategories={this.toggleCategories}
    //       handleBackClick={this.handleBackClick}
    //       userDetails={userDetails}
    //       handleProfileClick={this.handleProfileClick}
    //     />
    //   );
    // }
    const entityData = props.partnerData || props.entityData

    return (
      <HeaderSection
        ref={props.forwardRef}
        notFixed={props.notFixed}
        desktopSearch={this.props.desktopSearch}
        className="manage-user-header"
        itemprop=""
        itemtype="http://schema.org/WPHeader"
        role="branding"
      >
        <HeaderSection.HeaderDiv
          notFixed={props.notFixed}
          shouldAlign={props.disableLogo && props.disableSearch}
          className="header-div"
        >
          <HeaderSection.MobileIconWrapper>
            {(showCategories || this.props.showBack) && (
              <HeaderSection.BackIcon overlayMode={props.overlayMode}>
                <FontAwesomeIcon
                  className='back-icon'
                  icon={faChevronLeft}
                  onClick={this.handleBackClick}
                />
              </HeaderSection.BackIcon>
            )}
            {!showCategories && (
              <HeaderSection.MenuButton
                overlayMode={props.overlayMode}
                onClick={this.toggleCategories}
              >
                <FontAwesomeIcon icon={faBars} />
              </HeaderSection.MenuButton>
            )}
          </HeaderSection.MobileIconWrapper>
          {!props.disableLogo && (
            <HeaderSection.HeaderLeft
              className="header-logo"
              hide={this.state.searchActive}
            >
              <Link href="/" passHref>
              <a>
                <span className='starsona-logo'>
                  <Image
                    layout='fill'
                    // height={32}
                    // width={36}
                    className="starsona-logo"
                    isSuperSport={entityData?.entity_id === 'SUPERSPORT-ZA-1'}
                    src={
                      props.logo ? props.logo : (entityData.logo_reverse || entityData.logo)
                    }
                    alt={`t'`}
                  />
                </span>
              </a>
                {/* <a>

                <HeaderSection.ImgLogo
                  className="starsona-logo"
                  src={
                    props.logo ? props.logo : entityData.logo_reverse
                  }
                  alt={`logo`}
                />
                </a> */}
              </Link>
            </HeaderSection.HeaderLeft>
          )}
          {
            !props.showCatHeader && showCategories &&
              <FontAwesomeIcon
                onClick={this.toggleCategories}
                icon={faTimes}
                className="cat-close-icon"
              />
          }
          <HeaderSection.HeaderRight
            className="header-actions"
            overlayMode={props.overlayMode}
            isVodacom={isVodacom()}
            visible={!showCategories}
            narrowAuthButtons
            isLoggedIn={this.props.isLoggedIn}
            openSet={this.state.openSet}
          >
            {this.props.isLoggedIn ? (
              <React.Fragment>

                {
                  props.smallEntitySelect && !isVodacom() &&
                    <FontAwesomeIcon
                      className='globe-icon'
                      icon={faGlobe}
                      onClick={() => this.setState({openSet: true})}
                    />
                }
                {
                  (!props.smallEntitySelect || this.state.openSet) &&
                    <EntitySelector
                      classes={{
                        root: 'ent-sel-root'
                      }}
                      openModal={this.state.openSet}
                      currencyData={this.props.currencyData}
                      languageData={this.props.languageData}
                      entityData={this.entityData}
                      isLoggedIn={this.props.isLoggedIn}
                      onModalClose={() => this.setState({openSet: false})}
                      {...this.props.entitySelProps}
                    />
                }
                <HeaderSection.ProfileWrapper onClick={this.handleProfileClick}>
                  {this.handleProfilePhoto()}
                  <HeaderSection.ProfileName
                    overlayMode={props.overlayMode}
                    hide={
                      (this.props.celebDetails?.pending_requests_count ||
                        this.props.notificationCount) &&
                      !this.props.disabledNotification
                    }
                    id="header-profile-photo"
                    profilePhoto={
                      getAvtar(this.props.loggedUser.user.avatar_photo)
                    }
                  >
                    {this.props.loggedUser?.user &&
                      getShortName(
                        this.props.loggedUser.user.nick_name,
                        this.props.loggedUser.user.first_name,
                      )}
                  </HeaderSection.ProfileName>
                  {(this.props.celebDetails?.pending_requests_count ||
                    this.props.notificationCount) &&
                  (!this.props.disabledNotification ||
                    window.matchMedia('(min-width: 832px)').matches) ? (
                    <NotificationCount className="notification-count">
                      {this.props.celebDetails?.pending_requests_count ||
                        this.props.notificationCount}
                    </NotificationCount>
                  ) : null}
                </HeaderSection.ProfileWrapper>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {
                  props.smallEntitySelect && !props.noEntity && !isVodacom() &&
                    <FontAwesomeIcon
                      className='globe-icon'
                      icon={faGlobe}
                      onClick={() => this.setState({openSet: true})}
                    />
                }
                <HeaderSection.SignInButtonMobile
                  desktop
                  overlayMode={props.overlayMode}
                  onClick={() => this.toggleLogin()}
                >
                  <FontAwesomeIcon className='user-circle' icon={faUserCircle} />
                </HeaderSection.SignInButtonMobile>
                {
                  (!props.smallEntitySelect || this.state.openSet) &&
                    <EntitySelector
                      classes={{
                        root: 'ent-sel-root'
                      }}
                      openModal={this.state.openSet}
                      currencyData={this.props.currencyData}
                      languageData={this.props.languageData}
                      entityData={this.entityData}
                      isLoggedIn={this.props.isLoggedIn}
                      onModalClose={() => this.setState({openSet: false})}
                      {...this.props.entitySelProps}
                    />
                }
                <SecondaryButton
                  className="auth-button"
                  id="sign-up"
                  overlayMode={props.overlayMode}
                  secondary={!props.notFixed}
                  onClick={() => this.toggleSignup(true)}
                >
                  {this.props.t('common.register')}
                </SecondaryButton>
                <SecondaryButton
                  className="auth-button"
                  secondary={!props.notFixed}
                  overlayMode={props.overlayMode}
                  onClick={() => this.toggleLogin()}
                >
                  {this.props.t('common.login')}
                </SecondaryButton>
              </React.Fragment>
            )}
          </HeaderSection.HeaderRight>
          {!this.props.disableSearch && (
            <HeaderSection.SearchWrapper
              ref={props.searchRef}
              desktopSearch={this.props.desktopSearch}
            >
              <Search classes={props.searchClasses} {...props.searchProps} openRef={this.openRef} classes={props.searchClasses} t={props.t} entityData={entityData} />
            </HeaderSection.SearchWrapper>
          )}
        </HeaderSection.HeaderDiv>
        {!props.notFixed && !props.noCategory && (
          <HeaderSection.CategoryWrapper
            className='header-cat-wrap'
            showCatHeader={props.showCatHeader}
            overlayMode={props.overlayMode}
            visible={showCategories}
            {...props.navRef ? {ref: props.navRef} : {}}
          >
            <CategorySection
              showCategories
              dynamicFilters={props.dynamicFilters}
              showCatHeader={props.showCatHeader}
              handleBackClick={this.handleBackClick}
              professionsList={props.professionsList}
              closeCategories={this.toggleCategories}
              entityData={entityData}
              entity={props.entity}
            />
          </HeaderSection.CategoryWrapper>
        )}
        {!isEmpty(props.config) && props.config.banner_settings && props.showBanner && (
          <Banner
            className="banner-mobile"
            bannerWeb={
              !isEmpty(props.config.banner_settings.banner_web_template)
            }
            bannerMob={
              !isEmpty(props.config.banner_settings.banner_mobile_template)
            }
          >
            <BannerMessage
              config={props.config.banner_settings}
              timerUpdate={props.timerEnd}
            />
          </Banner>
        )}

        {
          props?.discountBanner && (
            <DiscountBanner/>
          )
        }
      </HeaderSection>
    );
  }
}

Header.defaultProps = {
  onChange: false,
  entitySelProps: {},
  dynamicFilters: [],
};

Header.propTypes = {
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  entitySelProps: PropTypes.object,
  dynamicFilters: PropTypes.array,
};

export default withTranslation()(withRouter(withGeneral(withLoggedUser(withPartnerData(withProfessionsList(Header))))))

Header.defaultProps = {
  userValue: {
    error: '',
    fromSocialMedia: false,
    isStar: false,
    loading: false,
    role: '',
    settings_celebrityDetails: {},
    settings_userDetails: {},
    userDataLoaded: false
  }
}