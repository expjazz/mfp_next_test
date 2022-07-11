import styled from '@emotion/styled';

const HeaderSection = styled.header`
  position: ${props => (props.notFixed ? 'static' : 'fixed')};
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.customBlack};
  height: auto;
  z-index: 12;
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
`;

HeaderSection.HeaderDiv = styled.div`
  display: flex;
  padding: ${props => (props.notFixed ? '3px 16px' : '0')};
  justify-content: ${props =>
    props.shouldAlign ? 'flex-end' : 'space-between'};
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 9px;

  .header-logo {
    z-index: 50;
    a {
      display: flex;
    }
  }
  @media (min-width: 832px) {
    height: 50%;
    padding: ${props => (props.notFixed ? '20px 30px 0px' : '20px 15px')};
  }

  @media (min-width: 832px) and (max-width: 1280px) {
    padding: 20px 15px 10px;
  }
  @media (min-width: 1280px) {
    justify-content: ${props =>
      props.shouldAlign ? 'flex-end' : 'flex-start'};
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
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  position: relative;
  z-index: 1;
  .globe-icon {
    display: inline-block;
    font-size: 28px;
    width: 28px;
    cursor: pointer;
    height: 28px;
    color: ${props => props.theme.pureWhite};
    margin-right: 10px;
  }
  ${props => props.openSet && `
    .ent-sel-root {
      margin: 0;
    }
  `}
  @media (max-width: 831px) {
    flex: 1 0 0;
    display: flex;
    justify-content: flex-end;
    .text-container {
      display: none;
    }
  }
  .auth-button {
    margin-left: 18px;
    border-radius: 20px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    border-color: ${props => props.theme.pureWhite};
    max-width: ${props => (props.narrowAuthButtons ? '120px' : '100%')};
    min-width: ${props => (props.narrowAuthButtons ? '120px' : '150px')};
    min-height: 35px;
    @media (max-width: 831px) {
      display: none;
    }
    :first-of-type {
      margin-left: 0;
    }
  }
  @media (min-width: 832px) {
    .globe-icon {
      margin-right: ${props => !props.isLoggedIn ? '18px' : '10px'};
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
  @media (min-width: 1280px) {
    order: 3;
    margin-left: auto;
    align-items: center;
    .auth-button {
      margin-top: 2px;
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
  max-width: 180px;
  @media (max-width: 831px) {
    flex: 1 0 0;
  }
  @media (min-width: 832px) {
    display: inline-block;
    text-align: left;
  }
  @media (min-width: 1000px) and (max-width: 1279px) {
    width: 20%;
  }

  @media (min-width: 1280px) {
    width: auto;
    position: static;
    order: 2;
  }
`;

HeaderSection.SearchWrapper = styled.div`
  padding: 12px 0;
  padding-top: 0;
  border-radius: 20px;
  display: ${props => (props.desktopSearch ? 'none' : 'block')};
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  .search-icon {
    color: ${props => props.theme.greyishBrown};
  }
  .input-root {
    background: ${props => props.theme.pureWhite};
    border-radius: 20px;
  }
  #search-term {
    font-family: Gilroy;
    font-size: 16px;
    line-height: 38px;
    color: ${props => props.theme.brownGrey};
  }
  .search-root {
    max-height: 35px;
    margin-top: 0;
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
      top: 40px;
      left: 10px;
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
    .search-root {
      min-width: 500px;
    }
    .search-suggest-root {
      min-width: 563px;
    }
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
  position: fixed;
  display: ${props => (props.visible ? 'block' : 'none')};
  top: ${props => (props.showCatHeader ? '0' : '56px')};
  background-color: ${props => props.theme.customBlack};
  bottom: 0;
  left: 0;
  right: 0;
  @media (min-width: 832px) {
    display: ${props =>
      props.minimalView || props.overlayMode ? 'none' : 'block'};
    position: static;
  }
`;

HeaderSection.MobileIconWrapper = styled.div`
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
  @media (min-width: 832px) {
    display: ${props => (!props.desktop ? 'block' : 'none')};
  }
`;

HeaderSection.ProfileButton = styled.button`
  display: ${props => (props.hide ? 'none' : 'inline-block')};
  background-image: ${props =>
    props.profileUrl
      ? `url(${props.profileUrl})`
      : 'url(images/icon_profile_40a.png)'};
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
    font-family: Gilroy-Medium;
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
    background-image: url('images/icon_myVids_40a.png');
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
    background-image: url('images/icon_search_40a.png');
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
  font-family: Gilroy;
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
  font-family: Gilroy-Bold;
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
