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
  /* padding-top: ${props =>
    getTop(
      props.reqDisplay,
      props.theme.collapsed,
      props.theme.hasDiscount,
    )}; */
  position: relative;
  .alertRoot {
    max-width: 100%;
    margin: 0 auto 10px;
    ${media.webView} {
      max-width: 320px;
    }
  }
  /* ${media.webView} {
    padding-top: 60px;
  }
  &.pay-wrp {
    ${media.webView} {
      padding-top: 40px;
    }
  } */
  width: 100%;
`;

export const NoMessage = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  .conv-btn {
    min-width: 122px;
    min-height: 30px;
    border-radius: 0;
    height: 30px;
    line-height: 30px;
  }
  .btn-center {
    padding-top: 15px;
  }
`;
