import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../../styled';

export const Wrapper = styled(Wrap)`
  position: relative;
  width: 100%;
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
