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
import { getShortName } from '../../src/utils/dataToStringFormatter';
import EntitySelector from '../../components/EntitySelector'
import Search from '../Search';
import Loader from '../Loader'
import Popover from '@material-ui/core/Popover'
// import { isSafari, isMobileSafari } from 'react-device-detect';
import { isEmpty } from '../../src/utils/dataStructures';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import BannerMessage from '../BannerMessage';
import { editModals, toggleLogin, withGeneral } from 'src/context/general';
import { withLoggedUser } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import dynamic from 'next/dynamic';
import { withPartnerData } from 'customHooks/reactQueryHooks';
import Image from 'next/image';
import { isVodacom, isVodacomIOS } from 'customHooks/domUtils';
const CategorySection = dynamic(() => import('./components/CategorySection'))
const DiscountBanner = dynamic(() => import('components/DiscountBanner'), { ssr: false });

class HeaderV3 extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      searchActive: false,
      showCategories: false,
      searchOpen: false,
      openSet: false,
      redirectURL: '',
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.openRef = React.createRef();
  }

  handleProfileClick = () => {
    this.props.router.push(this.props.isStar ? `/manage` : `/fan-manage`)

  };

  closeSearch = e => {
    this.setState({searchMenu: null})
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  handleClickOutside(event) {
    // alert('out')
    if (this.state.searchOpen && this.props.searchRef && !this.props.searchRef.current.contains(event.target)) {
        if (this.openRef.current) {
          return;
        } else {
          this.setState({searchOpen: false})
        }
    }
  }

  handleBackClick = () => {
    const { showCategories } = this.state;
    if (showCategories) {
      this.toggleCategories();
    } else if (this.props.onBackClick) {
      this.props.onBackClick();
    } else {
      this.props.router.back()
    }
  };

  toggleCategories = () => {
    const { showCategories } = this.state;
    this.setState({ showCategories: !showCategories });
  };

  render() {
    const { props } = this;
    const userDetails = {};
    const { showCategories } = this.state;
    if (this.state.redirectURL) {
      return <Redirect to={this.state.redirectURL} />;
    }
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
    // const safari = isSafari || isMobileSafari
    const safari = false;
    // const isSafari = true;
    const entityData = props.partnerData || props.entityData
    return (
      <HeaderSection
        ref={props.forwardRef}
        notFixed={props.notFixed}
        desktopSearch={this.props.desktopSearch}
        className="manage-user-header v3-header"
        itemprop=""
        itemtype="http://schema.org/WPHeader"
        role="branding"
      >
        <HeaderSection.HeaderDiv
          notFixed={props.notFixed}
          shouldAlign={false}
          className="header-div"
        >
          {/* <button
            onClick={() => props.router.push('/?logout=true', undefined, { shallow: true })}
          >
            LOGOUT
          </button>

          <button
            onClick={() => props.router.push('/?logout=true', undefined, { shallow: true })}
          >
            in
          </button> */}
          {
            !this.props.hideHamburguer && (

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
            )
          }
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
                        entityData.logo_reverse || entityData.logo
                      }
                      alt={`t'`}
                    />
                  </span>
                </a>
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

        {!props.notFixed && !props.noCategory && (


          <HeaderSection.CategoryWrapper
            className='header-cat-wrap'
            showCatHeader={props.showCatHeader}
            overlayMode={props.overlayMode}
            visible={showCategories}
            {...props.navRef ? {ref: props.navRef} : {}}
          >
          <div className="just-webview">
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
          </div>
          </HeaderSection.CategoryWrapper>
        )}

          <HeaderSection.HeaderRight
            className="header-actions"
            overlayMode={props.overlayMode}
            visible={!showCategories}
            narrowAuthButtons
            isVodacom={isVodacom()}
            isLoggedIn={!!this.props.loggedUser}
            openSet={this.state.openSet}
            isSafari={safari}
          >
            {!!this.props.loggedUser ? (
              <React.Fragment>
                {
                  props.smallEntitySelect && !isVodacom() &&
                    <FontAwesomeIcon
                      className='globe-icon'
                      icon={faGlobe}
                      onClick={() => this.setState({openSet: true})}
                    />
                }
                <HeaderSection.SearchContainer isSafari={safari}>

                  <HeaderSection.SearchBtn className="search-btn" onClick={() => this.setState((state) => ({searchOpen: !state.searchOpen}))}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  </HeaderSection.SearchBtn>


                  {this.state.searchOpen && (
                    <div className="" ref={props.searchRef}>
                      <HeaderSection.SearchWrapper
                        desktopSearch={this.props.desktopSearch}
                        isVodacom={isVodacom()}
                      >
                        <Search openWithFocus openRef={this.openRef} classes={props.searchClasses} t={props.t} entityData={entityData} {...props.searchProps} darkMode item={this.state.searchOpen} transition />
                      </HeaderSection.SearchWrapper>
                    </div>
                    )}
                  </HeaderSection.SearchContainer>
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
                      onModalClose={() => this.setState({openSet: false})}
                      isLoggedIn={!!this.props.loggedUser}
                      {...this.props.entitySelProps}
                    />
                }
                {
                  !this.props.userLoading && (


                <HeaderSection.ProfileWrapper onClick={this.handleProfileClick}>
                  {this.props.loggedUser?.user.avatar_photo ? (
                    <HeaderSection.ProfileButton
                      hide={
                        (this.props.loggedUser?.celebrity_details?.pending_requests_count ||
                          this.props.notificationCount) &&
                        !this.props.disabledNotification
                      }
                      profileUrl={
                        this.props.loggedUser?.user ? getAvtar(this.props.loggedUser.user.avatar_photo) : null }
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
                  <HeaderSection.ProfileName
                    overlayMode={props.overlayMode}
                    hide={
                      (this.props.loggedUser?.celebrity_details?.pending_requests_count ||
                        this.props.notificationCount) &&
                      !this.props.disabledNotification
                    }
                    id="header-profile-photo"
                    profilePhoto={
                      this.props.loggedUser?.user ? getAvtar(this.props.loggedUser.user.avatar_photo) : null
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

                )
                }
              </React.Fragment>
            ) : (
              <React.Fragment>
                {
                 !isVodacom() && props.smallEntitySelect &&
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
                      onModalClose={() => this.setState({openSet: false})}
                      isLoggedIn={!!this.props.loggedUser}
                      {...this.props.entitySelProps}
                    />
                }
                <HeaderSection.SearchContainer isSafari={safari}>

                <HeaderSection.SearchBtn className="search-btn" onClick={() => this.setState((state) => ({searchOpen: !state.searchOpen}))}>
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </HeaderSection.SearchBtn>


                {this.state.searchOpen && (
                  <div className="" ref={props.searchRef}>
                    <HeaderSection.SearchWrapper
                      desktopSearch={this.props.desktopSearch}
                      isVodacom={isVodacom()}
                    >
                      <Search openWithFocus openRef={this.openRef} classes={props.searchClasses} t={props.t} entityData={entityData} {...props.searchProps} darkMode item={this.state.searchOpen} transition />
                    </HeaderSection.SearchWrapper>
                  </div>
                  )}
                </HeaderSection.SearchContainer>

                {
                  this.props.userLoading && <Loader class="loader-color" />
                }

                {
                  !this.props.userLoading && (
                  <>


                    <HeaderSection.SignInButtonMobile
                      desktop
                      overlayMode={props.overlayMode}
                      onClick={() => {
                        toggleLogin(this.props.generalContext[1], { active: true, options: { noRedirect: !!this.props.router.query.celebrityId } })


                      }}
                      isSafari={safari}
                    >
                      <FontAwesomeIcon className='user-circle' icon={faUserCircle} />
                    </HeaderSection.SignInButtonMobile>
                    <SecondaryButton
                      className="auth-button"
                      secondary={!props.notFixed}
                      overlayMode={props.overlayMode}
                      onClick={() => {
                        toggleLogin(this.props.generalContext[1], { active: true, options: { noRedirect: !!this.props.router.query.celebrityId } })
                                    }
                        }
                    >
                      {/* {this.props.t('common.login')} */}
                      Login
                    </SecondaryButton>
                  </>
                )
                }
              </React.Fragment>
            )}
          </HeaderSection.HeaderRight>

        </HeaderSection.HeaderDiv>
        {!props.notFixed && !props.noCategory && (
          <div className="just-mobile">

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
          </div>
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
      </HeaderSection>
    );
  }
}

export default withRouter(withLoggedUser(withGeneral(withPartnerData(HeaderV3))))



