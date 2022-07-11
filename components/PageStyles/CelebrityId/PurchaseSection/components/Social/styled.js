import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../../styled';

export const Wrapper = styled(Wrap)`
  position: relative;
  width: 100%;
  .promo-switch {
    color: ${props => props.theme.links};
  }
  .main-head {
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

export const SocialListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  margin: 0 auto 20px;
  text-align: center;
  .svg-inline--fa {
    font-size: 20px;
  }
  padding: 10px;
  border: 1px solid ${props => props.theme.brownGreyTwo};
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  .head {
    font-size: 11px;
  }
`;

export const SocialUl = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
`;

export const IconWrap = styled.span`
  text-align: center;
  font-size: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-left: 11px;
  margin-right: 11px;
  :hover {
    color: ${props => props.theme.links};
  }
  &.active {
    color: ${props => props.theme.links};
  }
`;

export const PromoWrapper = styled.div``;

export const FooterCard = styled.div`
  padding: 0;
  ${media.webView} {
    padding: 30px;
    padding-top: 10px;
    background-color: ${props => props.theme.white};
  }
  ${media.mobileScreen} {
    padding-top: 30px;
  }
  .share-page,
  .share-btn,
  .share-btn.share-btn {
    height: 30px;
    min-height: 30px;
    border-radius: 0;
    line-height: 27px;
    min-width: 130px;
  }
  .review-wrp {
    ${media.mobileScreen} {
      margin-top: 20px;
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
  .card-display {
    ${media.mobileScreen} {
      padding-top: 0;
      padding-bottom: 30px;
    }
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${media.webView} {
    align-items: flex-start;
  }
  .card-display {
    max-width: 375px;
    max-height: 160px;
    ${media.mobileScreen} {
      .slick-list {
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
`;

export const InteractionsWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.veryLightPink}
  border-top: 1px solid ${props => props.theme.veryLightPink}

  ${media.mobileScreen} {
    width: 100%;
    padding:0px;
  }
`;
