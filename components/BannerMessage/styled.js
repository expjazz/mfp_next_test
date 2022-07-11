import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries';

const BannerStyled = styled.div`
  width: 100%;
  background: ${props => props.theme.twilight};
  display: flex;
  justify-content: center;
  padding: 10px;
  color: #fff;
  align-items: center;
  flex-direction: column;
  ${media.webView} {
    flex-direction: initial;
  }
  .countdown-timer {
    padding-left: 0;
    ${media.webView} {
      padding-left: 10px;
    }
  }

  .banner-timer {
    padding-top: 5px;
    min-width: 100%;
    min-height: 24px;
    display: inline-block;
    ${media.webView} {
      padding-top: 0;
      min-width: 250px;
      min-height: auto;
    }
  }
  background-image: ${props => props.bgImg && `url(${props.bgImg})`};
`;

export default BannerStyled;
