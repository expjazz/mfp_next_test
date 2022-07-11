import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { NotificationCount } from 'styles/CommonStyled';
import { LinkStyles } from 'styles/TextStyled';

export const Container = styled.div`
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 12;
  background-color: ${props => props.theme.customBlack};
  .svg-inline--fa {
    color: ${props => props.theme.pureWhite};
    font-size: 24px;
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  .fa-user-circle,
  .fa-question-circle {
    margin-right: 0;
    ${media.webView} {
      margin-right: 10px;
    }
  }
  .user-imgae {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    ${media.webView} {
      margin-right: 10px;
    }
  }
  .ham-wrp {
    display: flex;
    .company {
      font-family: Gilroy-Bold;
      color: #fff;
      font-size: 16px;
      padding-top: 3px;
      padding-left: 10px;
    }
  }
`;

export const LinkEle = styled.a`
  ${LinkStyles};
`;

export const Approval = styled.span`
  display: block;
  text-align: center;
  font-size: 16px;
  font-family: Gilroy-Bold;
  background-color: ${props => props.theme.exclamationWarn};
  padding: 5px;
  color: ${props => props.theme.greyishBrown};
  ${props => props.clickable && `
    cursor: pointer;
  `};
  @media(min-width: 832px) {
    border-radius: 4px;
    margin-left: 30px;
  }
`;

export const Logo = styled.img`
  width: 150px;
  display: block;
  ${media.mobileScreen} {
    width: 40px;
  }
`;

export const CallIcon = styled.div`
  position: relative;
  margin-right: 0;
  ${media.webView} {
    margin-right: 10px;
  }
  .fa-phone-alt {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    transform: translate(50%, 50%);
  }
  .cus-icon > div {
    display: flex;
  }
`;

export const IconWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${props => props.noPadding ? '0px' : '30px'};
  ${media.mobileScreen} {
    flex-direction: column;
  }
`;

export const IconLabel = styled.span`
  color: ${props => props.theme.pureWhite};
  font-size: 18px;
  font-family: Gilroy;
  padding-top: 3px;
  ${media.mobileScreen} {
    text-transform: uppercase;
    font-size: 10px;
    padding-top: 5px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex: 1;
  padding-left: 112px;
  align-items: center;
  .upload-bar-root {
    position: static;
    z-index: initial;
    border-left: 1px solid ${props => props.theme.brownGrey};
    border-right: 1px solid ${props => props.theme.brownGrey};
    margin-left: auto;
    margin-right: 12px;
  }
  ${media.mobileScreen} {
    padding-left: 0;
    justify-content: flex-end;
  }
`;

export const FanProf = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
  }
  .fan-name {
    font-family: Gilroy-Semibold;
    font-size: 16px;
    color: ${props => props.theme.pureWhite};
    padding-right: 15px;
    cursor: pointer;
    padding-top: 2px;
  }
`;

export const Count = styled(NotificationCount)`
  color: ${props => props.theme.greyishBrown};
  background-color: ${props => props.theme.pureWhite};
  ${media.webView} {
    margin-left: 10px;
  }
`;

export const Counter = styled.span`
  ${media.mobileScreen} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .req-lbl {
    display: none;
    ${media.mobileScreen} {
      display: block;
    }
  }
  .notf-count {
    margin-left: 0;
    padding: 7px 10px 5px;
    line-height: 18px;
    font-family: Gilroy-Semibold;
    font-size: 16px;
    ${media.mobileScreen} {
      padding: 6px 10px 1px;
    }
  }
`;
