import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { NotificationCount } from 'styles/CommonStyled';

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

export const Logo = styled.img`
  width: 150px;
  min-height: 30px;
  ${media.mobileScreen} {
    width: 40px;
  }
`;

export const IconWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  ${media.mobileScreen} {
    flex-direction: column;
    padding-right: 0;
    margin-left: 30px;
  }
`;

export const IconLabel = styled.span`
  color: ${props => props.theme.pureWhite};
  font-size: 18px;
  font-family: Gilroy;
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
    margin-top: 3px;
    color: ${props => props.theme.pureWhite};
    padding-right: 15px;
    cursor: pointer;
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
    text-transform: uppercase;
    ${media.mobileScreen} {
      display: block;
    }
  }
  .notf-count {
    margin-left: 0;
    padding: 5px 10px 5px;
    line-height: 18px;
    font-family: Gilroy-Semibold;
    font-size: 16px;
  }
`;

export const CallIcon = styled.div`
  border: 2px solid ${props => props.theme.pureWhite};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: relative;
  ${media.webView} {
    margin-right: 10px;
  }
  .fa-star {
    font-size: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
