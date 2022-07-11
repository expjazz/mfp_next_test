import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { LinkButton } from 'styles/CommonStyled';

const imageHeight = css`
  height: 150px;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const GallImg = styled.img`
  ${imageHeight};
  border-radius: 5px;
  display: block;
  margin-bottom: 5px;
`;

export const ImageItem = styled.li`
  margin-right: 10px;
  padding: 10px 0;
  text-align: center;
  ${LinkButton} {
    font-size: 14px;
  }
  @media(min-width: 832px) {
    padding-bottom: 0;
    display: inline-block;
    vertical-align: top;
  }
`;

export const ImageList = styled.ul`
  display: flex;
  overflow: auto;
  margin-bottom: 15px;
  @media(min-width: 832px) {
    display: block;
    overflow: initial;
    margin-bottom: 0;
  }
`;

export const Wrap = styled.section`
  display: flex;
  justify-content: center;
  .upload-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .upload-picture {
    margin-right: 5px;
    font-size: 19px;
    margin-bottom: 4px;
  }
  @media(min-width: 832px) {
    ${imageHeight};
    .upload-btn {
      flex-direction: column;
      min-width: auto;
      width: 100px;
      line-height: 21px;
    }
    .upload-picture {
      margin-right: 0;
    }
  }
`;

export const Layout = styled.section`

`;
