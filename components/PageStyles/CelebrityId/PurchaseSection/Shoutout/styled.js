import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../styled';

export const Wrapper = styled(Wrap)`
  padding-top: 30px;
  position: relative;
  width: 100%;
  .promo-switch {
    color: ${props => props.theme.links};
  }
  .text-area {
    min-height: 100px;
  }
  /* &.pay-wrp {
    ${media.webView} {
      padding-top: 40px;
    }
  } */
  .web-back {
    display: ${props => !props?.isVodacom ? 'none' : 'block'};
    ${media.webView} {
      display: block;
    }
  }
  .alertRoot {
    max-width: 100%;
    margin: 0 auto 10px;
    ${media.webView} {
      max-width: 320px;
    }
  }
  .edit-link {
    display: block;
    width: 100%;
    text-align: center;
    padding-top: 8px;
    color: ${props =>
		props.theme.link ? props.theme.link : props.theme.flatBlue};
  }
`;

export const FooterCard = styled.div`
  padding: 0;
  ${media.webView} {
    padding: 30px;
    padding-top:10px;
    background-color: ${props => props.theme.pureWhite};
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
    background-color: ${props => props.theme.pureWhite};
    ${media.mobileScreen} {
      .slick-list {
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
`;

export const ShoutOutVideoWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.veryLightPink};
  border-top: 1px solid ${props => props.theme.veryLightPink};

  ${media.mobileScreen} {
    width: 100%;
    padding:0px;
  }
`;
export const CardAndButtonWrapper = styled.div``;
