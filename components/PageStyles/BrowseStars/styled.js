import styled from '@emotion/styled'
import { media } from '../../../styles/mediaQueries';
import { descStyles } from "../../../styles/TextStyled";

const CategoryPageStyled = styled.div`
  ${media.mediumScreen} {
    background-color: #121212;
  }

  .partner-footer {
    background-color: #121212;
    .foot-link {
      color: #EF1461;
    }
  }
  ${props => {
    const headerHeight = props.headerRef ? props.headerRef.clientHeight : 0;
    const finalOffset = headerHeight;
    return `
        margin-top: ${finalOffset}px;
        height: calc(100vh - ${finalOffset}px);
    `;
  }};
  @media (min-width: 832px) {
    ${props => {
      const headerHeight = props.headerRef ? props.headerRef.clientHeight : 0;
      const finalOffset = headerHeight;
      return `
          margin-top: ${finalOffset}px;
          height: calc(100vh - ${finalOffset}px);
      `;
    }};
  }
`;

CategoryPageStyled.TagDetWrap = styled.section`
  margin-bottom: 10px;
  display: block;
  width: 100%;
  .description {
    ${descStyles};
    & > span {
      ${props => !props.isExpanded && `
          white-space: nowrap;
      `};
    }
  }
`;

CategoryPageStyled.More = styled.span`
  color: ${props => props.theme.flatBlue};
  margin-left: 5px;
  cursor: pointer;
`;

CategoryPageStyled.Forbidden = styled.span`
  color: ${props => props.theme.greyishBrown};
  font-size: 18px !important;
`;

CategoryPageStyled.ForbiddenContainer = styled.div`
  margin-top: 50px !important;
  width: 100%;
  text-align: center;
`;

CategoryPageStyled.CategoryName = styled.h1`
  font-family: Gilroy-Medium;
  font-size: 24px;
  line-height: 28px;
  flex: 1;
  color: ${props => props.theme.twilight};
  text-transform: ${props => (props.noCapitalise ? 'none' : 'capitalize')};
  display: ${props => (props.isTag ? 'none' : 'block')};
  @media (min-width: 832px) {
    ${props =>
      props.isTag &&
      `
      color: ${props.theme.twilight};
      font-family: Gilroy-Regular;
      display: block;
      font-size: 50px;
      width: 100%;
      line-height: 1;
      padding-top: 22px;
      padding-bottom: 10px;
      max-width: 832px;
      margin: 0 auto;
    `}
  }
  @media (min-width: 1280px) {
    ${props =>
      props.isTag &&
      `
      max-width: 1246px;
      margin: 0 auto;
      padding-top: 25px;
    `}
  }
`;

CategoryPageStyled.FilterList = styled.span`
  display: block;
  width: 100%;
  font-family: Gilroy-Light;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.greyishBrown};
  text-transform: capitalize;
  padding-right: 30px;

  &:empty {
    display: none;
  }
`;

CategoryPageStyled.Filter = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  text-align: center;
  &:after {
    content: ${props => `'${props.title}'`};
    margin-top: 5px;
    display: block;
  }
`;

CategoryPageStyled.FilterSection = styled.div`
  position: fixed;
  padding-top: 12px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 13;
  background: #fff;
  display: block;
  @media (min-width: 832px) {
    background: transparent;
    position: static;
    z-index: 1;
    /* width: 200px; */
    ${CategoryPageStyled.CategoryName} {
      font-size: 24px;
      line-height: 28px;
      margin-left: 0;
    }
    display: block;
  }
  @media (min-width: 1280px) {
    max-width: none;
    margin: 0 auto;
    ${props =>
      props.fixedContent &&
      `
      max-width: 100%;
    `}
  }
  @media (min-width: 832px) and (max-width: 1280px) {
    margin-top: -3px;
    padding-top: 13px;
  }
`;

CategoryPageStyled.TagImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  max-height: 111px;
  margin-top: 15px;
  @media(min-width: 832px) {
    margin-top: 0;
    max-height: 566px;
  }
`;

CategoryPageStyled.Heading = styled.span`
  display: block;
  margin-top: 0;
  font-family: Gilroy-Medium;
  font-size: 26px;
  text-align: center;
  color: ${props => props.theme.twilight};
  min-height: 32px;
  @media (min-width: 832px) {
    font-size: 50px;
    max-width: 692px;
    line-height: 50px;
    margin: 22px auto 0px;
    ${props => props.isTag && `
      text-align: left;
      margin-left: 0;
      margin-bottom: 10px;
      margin-top: 12px;
    `}
  }
  @media (min-width: 1280px) {
    margin-top: 20px;
    max-width: 100%;
    letter-spacing: -1px;
    ${props => props.isTag && `
      margin-top: 12px;
    `}
  }
`;

CategoryPageStyled.Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px 7px;
  flex-wrap: wrap;
  background: #fff;
  padding-top: ${props => props.bannerRef && '5px'};
  @media (min-width: 832px) {
    display: none;
  }
`;

CategoryPageStyled.Content = styled.div`
  padding: 0 8px 16px;
  ${props => !props.showSearchbar && `
    padding-bottom: 50px;
  `}
  position: relative;

  @media (min-width: 832px) {
    padding: 12px 16px;
    padding: 10px 16px 16px;
    overflow: initial;
    background: ${props => props.theme.white};
  }
  @media (min-width: 831px) {
    min-height: 64vh;
  }
  @media (min-width: 1280px) {
    min-height: 73vh;
  }
`;

CategoryPageStyled.MainContent = styled.div`
  .subcategory-list {
    margin-top: 0;
  }
  @media (min-width: 832px) {
    display: flex;
    .subcategory-list {
      margin: 5px 0;
    }
  }
`;

CategoryPageStyled.ListingWrapper = styled.div`
  margin: 0 auto;
  .grid-item {
    ${props => `border-radius: ${props.cusBorderRad !== null ? props.cusBorderRad%10 : 0}px`}
  }
  padding-top: 0;
  @media (min-width: 832px) {
    margin-left: 39px;
    flex: 1;
    width: calc(100% - 239px);
    height: 100%;
    padding-top: 15px;
  }
`;

CategoryPageStyled.Footer = styled.div`
  ${props => props.shouldHide ? 'display: none;' : 'display: block;'}
  .partner-footer {
    ${props => props.shouldHide ? 'display: none;' : 'display: block; padding-top: 20px;'}
  }
  @media (min-width: 832px) {
    display: block;
  }
`;

export default CategoryPageStyled;
