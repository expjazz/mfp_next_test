import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding-top: 0;
  ${media.webView} {
    padding-top: 0;
    height: auto;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .back-header {
    top: 80px;
    ${media.mobileScreen} {
      top: inherit;
    }
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
  .description {
    padding-bottom: 10px;
  }
  .title {
    ${media.modalView} {
      padding-top: 15px;
    }
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
  .tag-container .select__value-container {
    .select__multi-value {
      border: 1px solid ${props => props.theme.orangePink};
    }
    .select__multi-value__remove {
      color: ${props => props.theme.faltBlue};
    }
  }
  .select__value-container {
    padding: 2px 0;
    margin-right: -5px;

    .select__multi-value {
      padding: 0px 8px 0 15px;
    }
  }
  .btn-wrpr {
    ${media.mobileScreen} {
      padding-top: 20px;
    }
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

UploadContainer.ItemWrapper = styled.ul`
  min-width: 227px;
`;
UploadContainer.SubItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: visible;
  li {
    padding: 1px 15px 0;
    border-radius: 15px;
    border: 1px solid ${props => props.theme.flatBlue};
    display: flex;
    font-family: Gilroy-Medium;
    font-size: 12px;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    line-height: 20px;
    margin-bottom: 5px;
    color: #555;
  }
`;

UploadContainer.CategoriesWrapper = styled.div`
  padding: 0 15px 25px;
  ${media.webView} {
    padding: 0 50px 25px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  .basic-multi-select {
    max-width: 100%;
  }
  .select__clear-indicator {
    svg {
      cursor: pointer;
    }
  }
  .desc-pad {
    text-align: center;
    padding-top: 5px;
  }
  .bold-desc {
    font-family: Gilroy-Bold;
  }
`;
UploadContainer.Item = styled.li`
  font-size: 22px;
  font-family: Gilroy;
  cursor: pointer;
  padding: 0 0 28px;
  background-color: ${props =>
    props.selected ? props.theme.flatBlue : '#fff'};
  color: ${props => (props.selected ? '#fff' : '#555')} !important;

  &.categoryItem {
    background-color: #fff;
    color: ${props =>
      props.selected ? props.theme.flatBlue : '#999'} !important;
    font-family: ${props => (props.selected ? 'Gilroy-Medium' : 'Gilroy')};
  }
`;
UploadContainer.BrowseCategoryWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
  max-height: 620px;
  height: 100%;
  top: -40px;
  padding: 0;
  ${media.webView} {
    padding: 40px 30px 0;
    top: 0;
  }

  .back-header {
    top: ${props => (props.globalToast ? '100px' : '40px')};
    ${media.webView} {
      padding: 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    .back-lbl-wrp {
      ${media.webView} {
        display: flex;
      }
    }
  }
`;

UploadContainer.BrowseCategoryContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  .right-section {
    display: flex;
    flex-direction: column;
    height: 525px;
    width: 100%;
  }
  .subCategoryHeading {
    color: #555;
    font-family: Gilroy-SemiBold;
    font-size: 19px;
    line-height: 23px;
    margin-bottom: 10px;
    max-width: 270px;
    span {
      font-family: Gilroy-Light;
      font-size: 14px;
      display: block;
    }
  }
`;

UploadContainer.DesktopView = styled.div`
  display: none;
  @media (min-width: 832px) {
    display: block;
    height: calc(100% - 30px);
  }
  #browse-category-list {
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
`;

UploadContainer.MobileView = styled.div`
  display: block;
  max-width: 100%;
  margin: ${props => (props.globalToast ? '115px auto' : '70px auto')};
  padding: 0 10px;
  ${UploadContainer.BrowseCategoryContainer} {
    padding: 0 10px;
    display: block;
    &.mobile-select-category .select__indicators {
      display: none;
    }
    .btn-wrpr {
      padding-top: 320px;
    }
  }
  @media (min-width: 832px) {
    display: none;
  }
`;

UploadContainer.Wrapper = styled.div`
  .error-msg {
    font-size: 14px;
    margin-bottom: 10px;
    color: #990000;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  @media (max-width: 831px) {
    height: max-content;
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
    color: ${props => props.theme.flatBlue};
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 831px) {
    margin-left: 10px;
  }
`;
