import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../../styled';

export const Layout = styled.div`
`;

export const Wrapper = styled(Wrap)`
  position: relative;
  width: 100%;
  &.pay-wrp {
    ${media.webView} {
      padding-top: 40px;
    }
  }
  .comm-link {
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
`;

export const CommercialWrp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  align-items: center;
`;

export const FooterCard = styled.div`
  padding: 0;
  ${media.webView} {
    padding: 30px;
    background-color: ${props => props.theme.white};
  }
  .share-page,
  .share-btn,
  .share-btn.share-btn {
    height: 30px !important;
    min-height: 30px !important;
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
