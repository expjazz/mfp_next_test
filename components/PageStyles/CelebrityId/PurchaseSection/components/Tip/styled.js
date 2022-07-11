import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../../styled';

const getTop = (reqDisplay, collapsed, hasDiscount) => {
  if (reqDisplay) {
    if (collapsed) {
      return hasDiscount ? '240px' : '190px';
    }
    return hasDiscount ? '330px' : '280px';
  } else if (collapsed) {
    return hasDiscount ? '130px' : '80px';
  }
  return hasDiscount ? '220px' : '170px';
};

export const Wrapper = styled(Wrap)`
  position: relative;
  padding-top: ${props =>
    getTop(props.reqDisplay, props.theme.collapsed, props.theme.hasDiscount)};
  padding-left: 15px;
  padding-right: 15px;
  ${media.webView} {
    padding-top: 60px;
    padding-left: 0;
    padding-right: 0;
  }
  &.pay-wrp {
    ${media.webView} {
      padding-top: 40px;
    }
  }
  .sub-btn {
    padding-top: 15px;
  }
`;

export const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  .login-btns {
    text-align: center;
    width: 330px;
    margin: 15px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .success-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .success-title {
      font-family: Gilroy-Semibold;
      color: ${props => props.theme.greyishBrown};
      font-size: 24px;
      text-align: center;
    }
  }
  .back-link {
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
`;

export const Left = styled.div`
  width: 50%;
  border-right: 1px solid ${props => props.theme.veryLightPink};
  padding-right: 60px;
`;
