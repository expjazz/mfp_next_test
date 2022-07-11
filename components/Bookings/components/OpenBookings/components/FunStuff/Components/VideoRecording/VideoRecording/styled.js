import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  padding-top: 20px;
  .hidden {
    display: none;
  }
`;

export const VideoContainer = styled.div`
  width: 319px;
  height: 400px;
  border-radius: 5px;
  background-color: #e3e3e3;
  position: relative;
  margin: 20px auto 0;
  .videoElm {
    width: 319px;
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
  }
  ${media.mobileScreen} {
    max-height: calc(100% - 150px);
  }
  .retry {
    display: none;
  }
  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Buttons = styled.div`
  max-width: 315px;
  margin: 0 auto;
  display: flex;
  ${props =>
    props.hasSupport
      ? 'justify-content: space-between'
      : 'justify-content: center'};
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  padding: 10px;
  background: ${props => props.theme.white};
  border-radius: 5px;
  margin-top: 10px;
  .file-details {
    display: flex;
    flex-direction: column;
    .file-name {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
    }
    .file-size {
      padding-top: 5px;
      font-family: Gilroy;
      color: ${props => props.theme.greyishBrown};
    }
  }
  .close {
    top: 10px;
    right: 10px;
    ::before,
    ::after {
      background-color: ${props => props.theme.flatBlue};
    }
  }
`;
