import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  .hidden-upload {
    display: none;
  }
  .head-pad {
    padding-top: 20px;
  }
`;

export const Buttons = styled.div`
  max-width: 315px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const ModalContent = styled.div`
  .back-header {
    padding: 0 15px 15px;
    ${media.webView} {
      padding: 25px 25px 15px;
    }
    .back-lbl-wrp {
      display: block;
    }
  }
  .take-photo-wrp {
    height: auto;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  padding: 10px;
  background: ${props => props.theme.white};

  border-radius: 5px;
  margin-top: 10px;
  .image {
    display: block;
    margin-top: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  .file-details {
    display: flex;
    flex-direction: column;
    font-size: 14px;
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
