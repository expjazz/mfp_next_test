import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const HeaderSection = styled.header`
  position: ${props => (props.notFixed ? 'static' : 'fixed')};
  transform: translate3d(0, 0, 200px);
  -webkit-transform:translate3d(0,0,200px);
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.customBlack};
  .promocodeBanner {
    /* background-color: ${props => props.theme.customBlack}; */
  }
  height: auto;
  z-index: 12;
  .starsona-logo {
    position: relative;
    width: 100%;
    height: auto;
    min-width: 100px;
    min-heigth: 18px;
    ${media.webView} {
      min-height: 35px;
      min-width: 160px;
    }
      ${props =>
		props.small
			? `
      width: 36px;
      height: auto;
    `
			: `
      height: 22px;
    `}
    ${props => props.isSuperSport ? 'width: 100px !important; height: auto !important;' : ''}
    /* @media (min-width: 1280px) {
      height: 35px;
    } */
  }
  ${props =>
		props.overlayMode &&
    `
    color: ${props.theme.pureWhite};
  `};
  border-bottom: 1px solid ${props => props.theme.customBlack};
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
  ${props =>
		props.minimalView &&
    `
    position: absolute;
    background: transparent;
  `}
  .ent-sel-root {
    margin-right: 35px;
    .text-container {
      color: ${props => props.theme.pureWhite};
    }
  }
  .cat-close-icon {
    position: absolute;
    right: 9px;
    top: 17px;
    font-size: 28px;
    color: ${props => props.theme.pureWhite};
  }
  @media (min-width: 832px) {
    .cat-close-icon {
      display: none;
    }
    min-height: ${props => (!props.notFixed ? 'auto' : '50px')};
    padding: 0;
    height: auto;
    padding-bottom: 0px;
    border-bottom: 0px;
  }
  .help-icon {
    cursor: pointer;
  }
  .just-webview {
    display: none;
    @media (min-width: 832px) {
      display: block
    }
  }

  .just-mobile {
    display: block;
    @media (min-width: 832px) {
      display: none
    }
  }
`;

HeaderSection.HeaderDiv = styled.div`
  height: 75px !important;
  display: flex;
  padding: ${props => (props.notFixed ? '3px 16px' : '0')};
  justify-content: ${props =>
		props.shouldAlign ? 'flex-end' : 'space-between'};
  align-items: center;
  padding: 15px 12px;

  .header-logo {
    z-index: 50;
    a {
      display: flex;
    }
  }
  @media (min-width: 832px) {
    height: 100%;
    padding: ${props => (props.notFixed ? '20px 30px 0px' : '20px 106px')};
  }

  @media (min-width: 832px) and (max-width: 1280px) {
    padding: 20px 40px 10px;
  }
  .filter-back,
  .filter-close {
    font-size: 20px;
    color: ${props => props.theme.flatBlue};
    height: auto;
  }
  .filter-back {
    font-size: 16px;
  }
`;
HeaderSection.HeaderRight = styled.div`
  display: flex;
  min-width: ${props => props.isVodacom ? '90px' : '151px'};
  justify-content: space-between;
  align-items: center;
  &:first-child {
    height: 100%;
  }
  ${media.webView} {
    width: 169px;
  }
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  position: relative;
  z-index: 1;
  .globe-icon {
    display: inline-block;
    align-self: center;
    font-size: 28px;
    width: 28px;
    cursor: pointer;
    height: 28px;
    color: ${props => props.theme.pureWhite};
    margin-right: 50px;
    height: 100%;
    margin-right: ${props => props.isLoggedIn ? '11px !important' : '50px'};
    ${media.mobileScreen} {
      margin: 0;
    }
  }
  ${props => props.openSet && `
    .ent-sel-root {
      margin: 0;
    }
  `}
  @media (max-width: 831px) {
    .text-container {
      display: none;
    }
  }
  .auth-button {
    margin-left: 18px;
    text-transform: uppercase;
    font-family: Poppins-Medium;
    color: ${props => props.theme.pureWhite};
    border-color: black;
    max-width: ${props => (props.narrowAuthButtons ? '65px' : '100%')};
    min-width: ${props => (props.narrowAuthButtons ? '65px' : '150px')};
    background-color: transparent;
    min-height: 35px;
    border: none;
    @media only screen and (max-width: 831px) {
      display: none;
    }
    :first-of-type {
      margin-left: 0;
    }
  }
  @media (min-width: 832px) {
    ${props => props.isLoggedIn ? 'grid-template-columns: auto;' : ''}
    .globe-icon {
      margin-right: ${props => !props.isLoggedIn ? '19px' : '40px'};
    }
    .search-icon {
      color: ${props => props.theme.v3LightGray};
      display: inline-block;
      font-size: 28px;
      width: 28px;
      cursor: pointer;
      height: 28px;
      color: ${props => props.theme.pureWhite};
      height: 100%;
      margin-left: 10px;
    }
    ${props =>
		props.minimalView &&
      `
      justify-content: space-between;
    `};
    visibility: visible;
    ${props =>
		props.overlayMode &&
      `
      .auth-button {
        background: transparent;
        color: ${props.theme.pureWhite};
      }
    `};
  }

  order: 4;
  @media (min-width: 1280px) {
    align-items: center;
    .auth-button {
      /* margin-top: 2px;
      font-size: 24px;
      font-family: 'Gilroy-Light'; */
    }
  }

  .help-icon {
    font-size: 28px;
    margin-right: 10px;
    @media (min-width: 832px) {
      font-size: 35px;
      margin-right: 0;
    }
    color: ${props => props.theme.flatBlue};
  }
  .help-logged {
    margin-right: 0;
    @media (min-width: 832px) {
      margin-right: 10px;
    }
  }
`;
HeaderSection.HeaderLeft = styled.div`
  display: ${props => (props.minimalView ? 'none' : 'inline-block')};
  /* max-width: 180px; */
  /* width: 60%; */

  @media (min-width: 832px) {
    display: inline-block;
    text-align: left;
  }
  /* @media (min-width: 1000px) and (max-width: 1279px) {
    width: 20%;
  } */

  @media (min-width: 1280px) {
    width: auto;
    position: static;
    order: 2;
  }
`;

HeaderSection.SearchContainer = styled.div`
  position: relative;
  align-self: center;
  font-size: 10px;
`;

HeaderSection.SearchWrapper = styled.div`
  padding: 12px 0;
  padding-top: 0;
  border-radius: 20px;
  bottom: -19px;
  position: absolute !important;
  right: 237px;
  display: ${props => (props.desktopSearch ? 'none' : 'block')};
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  font-family: Poppins-Light;
  ${media.mobileScreen} {
    bottom: -46px;
    right: ${props => props.isVodacom ? -50 : 4}px;
    display: block;
    width: 300px;
  }
  ${media.smallScreen} {
    right: ${props => props.isVodacom ? -105 : -65}px;
  }
  .search-icon {
    display: inline-block;
    font-size: 28px;
    width: 14px;
    cursor: pointer;
    height: 28px;
    color: ${props => props.theme.v3LightGray};
    margin-right: 30px !important;
    height: 100%;
  }
  .input-root {
    color: ${props => props.theme.v3LightGray};
    background-color: ${props => props.theme.customBlack};
    border-radius: 20px;
    font-family: Poppins-Medium;
    font-family: Poppins-Light;
  }
  #search-term {
    font-family: Poppins-Medium;
    font-family: Poppins-Light;
    font-size: 16px;
    line-height: 38px;
    color: ${props => props.theme.brownGrey};
    ${media.mobileScreen} {
      padding: 0;
      font-size: 13px;
    }
  }
  .search-root {
    max-height: 35px;
    margin-top: 0;
    border-radius: 31px;
  }


  .search-suggest-root {
    border-radius: 31px;
    color: ${props => props.theme.v3LightGray};
    background-color: ${props => props.theme.customBlack};
    width: 300px;
    font-family: Poppins-Medium;
  }
  ${media.webView} {
    .search-root {
      max-height: 61px;
      height: 61px;
      min-width: 500px;
      border-radius: 31px;
    }
    .search-suggest-root {
      top: 69px;
      width: 500px;
    }
  }

  ${media.modalView} {
    bottom: -57px;
  }

  @media (max-width: 1279px) {
    max-width: inherit;
    padding: 12px 0 0;
  }
  @media (min-width: 832px) {
    display: block;
    position: static;
    height: 50px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 1280px) {
    height: 35px;
    padding: 0;
    .search-suggest-root {
      color: ${props => props.theme.v3LightGray};
      background-color: ${props => props.theme.customBlack};
      left: 0px;
      right: initial;
      min-width: 450px;
    }
  }
  @media (min-width: 1280px) {
    order: 1;
    max-width: 375px;
    padding: 0;
    margin: 0;
    margin-top: -9px;
    flex: 0 0 100%;
    max-width: inherit;
    margin-bottom: -47px;
    .search-suggest-root {
      /* min-width: 563px; */
      background-color: ${props => props.theme.customBlack};
    }
  }
`;

HeaderSection.SearchBtn = styled.span`
  margin-right: 19px;
  ${media.mobileScreen} {
    margin: 0
  }
  svg {
    fill: white !important;
    color: white !important;
    display: inline-block;
    font-size: 28px;
    width: 24px;
    cursor: pointer;
    height: 28px;
    color: ${props => props.theme.pureWhite};
    height: 100%;
  }
`;

HeaderSection.BackIcon = styled.span`
  width: 20px;
  color: ${props => props.theme.pureWhite};
  padding-right: 10px;
  .back-icon {
    font-size: 28px;
  }
  @media (min-width: 832px) {
    display: none;
  }
`;

HeaderSection.CategoryWrapper = styled.div`
  /* position: fixed; */
  width: 70%;
  display: ${props => (props.visible ? 'block' : 'none')};
  top: ${props => (props.showCatHeader ? '0' : '56px')};
  background-color: ${props => props.theme.customBlack};
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  @media (min-width: 832px) {
    height: auto;
    display: ${props =>
		props.minimalView || props.overlayMode ? 'none' : 'block'};
    position: static;
  }
  @media (min-width: 1000px) {
    order: 3;
  }
`;

HeaderSection.MobileIconWrapper = styled.div`
/* display: none !important; */
  ${props =>
		props.minimalView &&
    `
    display: flex;
    align-items: center;
  `}
  flex: 1 0 0;
  justify-items: flex-start;
  display: flex;
  @media (min-width: 832px) {
    display: none;
  }
`;

HeaderSection.ImgLogo = styled.img`
  ${props =>
		props.small
			? `
    width: 36px;
    height: auto;
  `
			: `
    height: 32px;
  `}
  ${props => props.isSuperSport ? 'width: 100px !important; height: auto !important;' : ''}
  @media (min-width: 1280px) {
    height: 35px;
  }
`;

HeaderSection.MenuButton = styled.span`
  font-size: 17px;
  cursor: pointer;
  margin-left: 7px;
  margin-top: ${props => props.minimalView && '7px'};
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.pureWhite};
  border-radius: 50%;
  color: ${props => props.theme.greyishBrown};
  @media (min-width: 832px) {
    display: none;
  }
`;

HeaderSection.SignInButtonMobile = styled.span`
  .user-circle {
    font-size: 28px;
  }
  color: ${props => props.theme.pureWhite};
  display: ${props => (props.hide ? 'none' : 'block')};
  @media only screen and (min-width: 832px) {
    display: ${props => (!props.desktop ? 'block' : 'none')};
  }
`;

HeaderSection.ProfileButton = styled.button`
  display: ${props => (props.hide ? 'none' : 'inline-block')};
  background-image: ${props =>
		props.profileUrl
			? `url(${props.profileUrl})`
			: 'url(/images/icon_profile_40a.png)'};
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 50%;
  background-size: cover;
  background-color: white;
  cursor: pointer;
  @media (min-width: 832px) {
    display: inline-block;
    padding: 14px;
  }
`;

HeaderSection.ProfileName = styled.span`
  display: none;
  @media (min-width: 832px) {
    display: block;
    margin-left: 10px;
    font-family: Poppins-Medium;
    font-size: 16px;
    margin-top: 0;
    color: ${props => props.theme.pureWhite};
  }
`;

HeaderSection.ProfileWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  .notification-count {
    display: flex;
    line-height: 14px;
    padding: 8px 10px 5px;
    color: ${props => props.theme.greyishBrown};
    background-color: ${props => props.theme.pureWhite};
    justify-content: center;
    align-items: center;
    margin-left: 15px;
  }

  .help-fan-mob {
    @media (max-width: 831px) {
      font-size: 35px;
      margin-right: 10px;
    }
  }
`;

HeaderSection.ProfileDropdown = styled.ul`
  position: absolute;
  right: 0;
  padding: 10px;
  top: 100%;
  background: #fff;
  border-radius: 13px;
  box-shadow: 0px 4px 8px 0px #cccccc;
`;
HeaderSection.ProfileDropdownItem = styled.li`
  font-size: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: #333333;
  cursor: pointer;
  text-decoration: none;
  a {
    width: 100%;
    display: block;
  }
  &:hover {
    color: ${props => props.theme.orangePink};
  }
  &:last-child {
    border-bottom: none;
  }
`;
HeaderSection.LinkElement = styled.span`
  position: relative;
`;

HeaderSection.InnerListItemCount = styled.span`
  font-family: 'Avenir-Medium';
  font-size: 13px;
  line-height: 18px;
  margin-left: 5px;
  padding: 0 11px;
  text-align: center;
  border-radius: 16px;
  background-color: ${props => props.theme.orangePink};
  color: #fff;
  display: inline-block;
`;
HeaderSection.UserProfileName = styled(HeaderSection.ProfileDropdownItem)`
  font-family: 'Avenir-Bold';
  cursor: auto;
  border-bottom: none;
  &:hover {
    color: #333333;
  }
`;

HeaderSection.MyvideoButton = styled.button`
  display: none;
  @media (min-width: 768px) {
    display: inline;
    cursor: pointer;
    outline: none;
    background-image: url('/images/icon_myVids_40a.png');
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    padding: 18px;
    background-size: 29px;
    background-color: white;
    margin-right: 16px;
  }
`;

HeaderSection.AutoSuggest = styled.div`
  height: 100%;
  @media (min-width: 1025px) {
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  }
`;

HeaderSection.noDataWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;
HeaderSection.noDataText = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
`;

HeaderSection.InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    background-image: url('/images/icon_search_40a.png');
    background-repeat: no-repeat;
    background-position: center;
    left: 15px;
    top: 20%;
    width: 35px;
    height: 35px;
  }
  @media (min-width: 768px) {
    width: 319px;
    height: 32px;
    background-color: #f8f8f8;
    &::before {
      width: 20px;
      height: 23px;
    }
  }
  @media (min-width: 1025px) {
    width: 100%;
  }
  @media (min-width: 1920px) {
    height: 48px;
  }
`;
HeaderSection.Input = styled.input`
  padding-left: 64px;
  width: calc(100% - 28px);
  outline: none;
  height: 100%;
  font-family: 'Avenir-Light';
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: transparent;
  @media (min-width: 768px) {
    text-indent: 24px;
  }
  @media (min-width: 1025px) {
    text-indent: 0;
    text-align: center;
    font-size: 18px;
  }
  @media (min-width: 1920px) {
    font-size: 20px;
  }
`;
HeaderSection.SignIn = styled.button`
  background-color: #fff;
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-family: 'Avenir-Bold';
  display: inline-block;
  border: none;
  outline: none;
  cursor: pointer;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    padding: 6px 10px;
    padding-bottom: 10px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
HeaderSection.AuthButton = styled.button`
  padding: 0 14px;
  border-radius: 5px;
  border: ${props => `solid 1px ${props.theme.flatBlue}`};
  background-color: ${props =>
		!props.notFixed ? '#fff' : props.theme.flatBlue};
  font-family: Poppins-Medium;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  line-height: 36px;
  height: 36px;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.pureWhite};
  margin-left: 18px;
  @media (max-width: 831px) {
    display: none;
  }
`;
HeaderSection.Heading = styled.span`
  padding: 0 30px;
  font-family: Poppins-Medium;
  font-family: Poppins-Bold;
  font-size: 36px;
  line-height: 27px;
  text-align: center;
  color: ${props => props.theme.orangePink};
  display: inline-block;
  max-width: 800px;
  margin: 20px 0px 8px;
  @media (min-width: 1280px) {
    max-width: 100%;
  }
`;
export default HeaderSection;

export const Banner = styled.div`
  display: ${props => (props.bannerMob ? 'block' : 'none')};
  @media (min-width: 832px) {
    display: ${props => (props.bannerWeb ? 'block' : 'none')};
  }
`;
