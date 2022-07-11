import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 12px;
  ${media.largeScreen} {
    padding-left: 35px;
    padding-right: 35px;
  }
  .capitalize {
    text-transform: capitalize;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .platform-sec {
    padding-bottom: 15px;
  }
  .req-sec {
    padding-bottom: 30px;
  }
  .note {
    padding-bottom: 10px;
    display: block;
  }
  .social-link {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.flatBlue};
    line-height: 21px;
  }
  .image-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${media.webView} {
      justify-content: normal;
    }
    .image-span {
      position: relative;
    }
  }
  .image-preview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 20px;
    opacity: 0.5;
  }
  .download-wrap {
    display: flex;
    .text {
      width: auto;
    }
    .img-download {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 10px;
      .download-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .download-icon {
          font-size: 38px;
          color: ${props => props.theme.flatBlue};
        }
        .icon-text {
          color: ${props => props.theme.flatBlue};
          line-height: 26px;
        }
      }
    }
  }
`;

export const Image = styled.span`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 5px;
  background: ${props => (props.image ? `url(${props.image})` : '#333')};
  background-size: cover;
  background-repeat: no-repeat;
`;
