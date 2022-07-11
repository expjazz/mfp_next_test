import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding-top: 110px;
  ${media.webView} {
    padding-top: 0;
    height: auto;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding-top: 34px;
    padding-bottom: 34px;
  }

  .back-header {
    top: 70px;
    ${media.modalView} {
      padding: 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    ${media.largeScreen} {
      display: none;
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
  }

  .select__value-container {
    .select__multi-value {
      border: 1px solid ${props => props.theme.orangePink};
    }
    .select__multi-value__remove {
      color: ${props => props.theme.faltBlue};
    }
  }

  .title {
    ${media.modalView} {
      padding-top: 15px;
    }
    ${media.mobileScreen} {
      padding-bottom: 5px;
    }
  }
  .save-btn {
    padding-top: 20px;
  }
`;

export const UploadContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media (min-width: 1025px) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;

UploadContainer.CategoriesWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 832px) {
    &.fans-want {
      padding-top: 8px;
    }
    &.select-category {
      padding-bottom: 0;
    }
  }
  .basic-multi-select {
    max-width: 100%;
  }
  .select__clear-indicator {
    svg {
      cursor: pointer;
    }
  }
`;

export const Wrapper = styled.section`
  padding: 0 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media.webView} {
    padding: 0 25px;
  }
  ${media.largeScreen} {
    padding: 0 50px;
  }


`;

Wrapper.Adornment = styled.span`
  font-family: Gilroy-Light;
  font-size: 18px;
  margin-left: 25px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  .tagName {
    color: ${props => props.theme.orangePink};
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 831px) {
    margin-left: 10px;
  }
`;
