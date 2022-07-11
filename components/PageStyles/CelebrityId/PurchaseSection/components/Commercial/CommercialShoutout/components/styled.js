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
  padding-top: ${props =>
    getTop(props.reqDisplay, props.theme.collapsed, props.theme.hasDiscount)};
  ${media.webView} {
    padding-top: 60px;
  }
  &.pay-wrp {
    ${media.webView} {
      padding-top: 40px;
    }
  }
  .main-head {
    padding-bottom: 10px;
  }
  .promo-switch {
    width: 100%;
    text-align: center;
    padding-bottom: 5px;
  }
`;

export const Left = styled.div`
  width: 50%;
  border-right: 1px solid ${props => props.theme.veryLightPink};
  padding-right: 60px;
`;

export const Right = styled.div`
  width: 50%;
  padding-left: 60px;
`;

export const PromoWrapper = styled.div`
  padding-top: 15px;
  ${media.webView} {
    padding-top: 40px;
  }
`;
