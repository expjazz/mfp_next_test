import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const VideoStyled = styled.section`
  padding-bottom: 35px;
  min-width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.pureWhite};
  margin-bottom: 20px;
  ${media.webView} {
    padding: 0;
    min-width: 360px;
    margin-bottom: 0;
  }
  .block-root {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
  .list-root {
    height: 145px;
    margin-top: 10px;
    .slide-arrow {
      padding-bottom: 15px;
    }
  }
  @media (min-width: 832px) {
    display: flex;
    align-items: center;
    margin-right: 60px;
  }
  .video-head {
    font-size: 11px;
    font-family: Gilroy-Semibold;
  }
  .video-title {
    font-size: 10px;
    font-family: Gilroy-Light;
  }
`;

VideoStyled.Header = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.greyishBrown};
  font-family: Gilroy-Bold;
`;

VideoStyled.InnerContent = styled.article`
  position: relative;
  @media (min-width: 832px) {
    flex: 1;
  }
  .scroll-list-wrp {
    ${media.mobileScreen} {
      width: 100%;
    }
  }
`;

export { VideoStyled as default };
