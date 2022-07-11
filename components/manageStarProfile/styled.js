import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.section`
  .back-header {
    top: 80px;
    z-index: 10;
    .header-label {
      padding-top: 14px;
      margin-top: 0;
      ${media.webView} {
        padding-top: 0;
        padding-left: 5px;
        font-size: 24px;
      }
      ${media.mobileScreen} {
        padding-bottom: 0;
        font-size: 24px;
        padding-top: 15px;
        padding-bottom: 5px;
      }
    }
    ${media.mobileScreen} {
      position: relative;
      top: inherit;
      padding-top: 0;

      .header-wrp {
        padding-top: 10px;
      }
    }
  }
`;

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 0;
  padding-top: 0;
  position: relative;
  @media (max-width: 832px) {
    padding-left: 0;
    padding-top: 0;
  }
  display: flex;
  .top-heading {
    padding-top: 54px;
    @media (min-width: 832px) {
      text-align: left;
      padding-top: 0;
    }
  }
  .menu-ul {
    padding: 16px 0 30px;
  }
  .progress-mob {
    display: block;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    @media (min-width: 832px) {
      display: none;
    }
  }
  .progress-web {
    display: none;
    @media (min-width: 832px) {
      display: block;
    }
  }
  .main-desc {
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-family: Gilroy-Light;
    ${media.webView} {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

Layout.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  text-align: center;
  display: block;
  margin-bottom: 15px;
  @media (min-width: 832px) {
    text-align: left;
  }
`;
export const Content = styled.div``;

Content.LeftSection = styled.section`
  width: 240px;
  margin-right: 20px;
  @media (max-width: 831px) {
    width: 100%;
    margin-right: 0;
  }
  ${media.modalView} {
    width: auto;
  }
  .sub-menu-wrap {
    ul {
      @media (min-width: 832px) {
        padding: 0;
      }
    }
  }
  .prof-li {
    font-family: Gilroy;
    color: ${props => props.theme.greyishBrown};
    font-size: 16px;
    border-bottom: 1px solid #e2e2e2;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    ${media.webView} {
      border: none;
      padding-left: 0;
    }
    .img-wrp {
      display: flex;
      .prof-pic {
        margin: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      .label {
        padding-left: 18px;
        margin-top: 3px;
      }
    }
  }
`;

Content.Description = styled.div`
  font-family: Gilroy-Medium;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #999;
  margin-bottom: 15px;
  @media (min-width: 832px) {
    text-align: left;
  }
  @media (max-width: 831px) {
    max-width: 235px;
    margin: 0 auto 15px;
  }
`;
Content.Visiblity = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')};
  @media (min-width: 832px) {
    display: block;
  }
`;

Content.RightSection = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 831px) {
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 95px;
    width: calc(100% - 180px);
    max-width: 580px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 831px) {
    top: 120px;
    width: calc(100% - 60px);
  } */
`;
Content.InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
Content.SidebarWrapper = styled(Content.Visiblity)`
  @media(max-width: 1280px) {
    width: 100%;
  }
  @media(min-width: 1281px) {
    display: inline-block;
    width: 100%;
  }

  .status-switch{
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    @media(max-width: 831px) {
      padding-top: 0;
      justify-content: center;
      align-items: center;
    }
    .profile-status{
      padding-bottom: 8px;
      font-size: 16px;
      font-family: Gilroy-Bold;
      color: ${props => props.theme.brownGrey};
      @media(max-width: 831px) {
        text-align: center;
      }
    }
  }
`;
Content.ViewPublicProfile = styled.div`
  cursor: pointer;
  font-family: Gilroy-Regular;
  font-size: 16px;
  color: rgb(0, 127, 170);
  margin: 10px 0 0 0;
  @media (max-width: 831px) {
    margin: 15px 0 20px 15px;
  }
`;
Content.RightContent = styled(Content.Visiblity)`
  width: 100%;
  ${media.webView} {
    flex: auto;
  }
`;
export const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .progress-wrap {
    width: 100%;
    @media (min-width: 832px) {
      margin-bottom: 20px;
    }
  }
`;
