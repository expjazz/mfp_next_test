import styled from '@emotion/styled'

const FilterStyled = styled.div`
  padding: 12px 0;
  padding-top: 0;
  background: #fff;
  @media (min-width: 832px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: transparent;
  }
  .fixed-filter & {
    @media (min-width: 832px) {
      max-width: 1246px;
      margin: 0 auto;
    }
  }
  .fill-icon {
    font-size: 16px;
    min-width: 25px;
    margin-right: 5px;
    color: ${props => props.theme.brownGreyTwo};
  }
  .cus-icon {
    margin-left: 4px;
    svg {
      width: 20px;
      margin-right: 6px;
      path {
        fill: ${props => props.theme.brownGreyTwo};
      }
    }
  }
`;

FilterStyled.Header = styled.div`
  padding: 0 0 12px;
  @media (min-width: 832px) {
    display: none;
  }
  .filter-header {
    height: auto !important;
    padding: 5px 9px 7px;
    div:last-child {
      margin-top: -3px;
      max-height: 25px;
      flex: 1 0 0;
      justify-content: flex-end;
    }
    .filter-logo {
      margin-top: 0;
    }
  }
`;

FilterStyled.CloseButton = styled.span`
  font-size: 30px;
  color: ${props => props.theme.flatBlue};
`;

FilterStyled.Heading = styled.span`
  padding: 0 30px;
  font-family: Gilroy-Bold;
  font-size: 20px;
  color: ${props => props.theme.twilight};
  display: ${props => (props.mobileOnly ? 'block' : 'none')};
  text-transform: ${props => (props.mobileOnly ? 'uppercase' : 'none')};
  &.filter-heading {
    color: ${props => props.theme.flatBlue};
    @media (max-width: 832px) {
      margin-bottom: 10px;
      padding: 0 15px;
    }
  }
  @media (min-width: 832px) {
    display: ${props => (props.mobileOnly ? 'none' : 'block')};
    font-size: 16px;
    padding: 0;
    margin-top: 20px;
    color: ${props => props.theme.brownGrey};
  }
`;

FilterStyled.Content = styled.div`
  padding: 0;
  height: calc(100vh - 100px);
  ${props => props.height && `height: ${props.height + 30}px`};
  overflow: auto;
  width: 100%;
  @media (min-width: 832px) {
    height: auto;
    overflow: initial;
  }
  @media (max-width: 832px) {
    padding: 0 0 25px;
  }
`;

FilterStyled.SubCategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  ${props =>
    !props.listFilter
      ? `
    justify-content: center;
  `
      : `
    flex-direction: column;
  `}
  margin-top: 7px;
  padding: 0;
  @media (min-width: 832px) {
    flex-direction: column;
    margin-bottom: 15px;
  }
  .icon-label {
    font-family: Gilroy-Medium;
  }
`;

FilterStyled.SubCategoryItem = styled.li`
  color: ${props =>
    props.selected || props.checkedItem
      ? props.theme.greyishBrown
      : props.theme.flatBlue};
  display: flex;
  font-family: ${props => (props.selected ? 'Gilroy-Bold' : 'Gilroy-Regular')};
  font-size: 12px;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  &::last-child {
    margin-bottom: 5px;
  }
  .check-box {
    margin-bottom: 21px;
    pointer-events: none;
  }
  @media (max-width: 831px) {
    .subcategory-list-item {
      padding: 1px 15px 0;
      border-radius: 15px;
      line-height: 20px;
      font-family: ${props =>
        props.selected ? 'Gilroy-Bold' : 'Gilroy-Regular'};
      color: ${props => (props.selected ? '#fff' : props.theme.greyishBrown)};
      background-color: ${props =>
        props.selected ? props.theme.flatBlue : '#fff'};
      border: ${props => `1px solid ${props.theme.flatBlue}`};
      justify-content: center;
    }
  }
`;

FilterStyled.ApplyButton = styled.span`
  .controlButton {
    width: 151px;
    min-width: 151px;
    border-radius: 5px;
    height: 41px;
    padding: 0;
    min-height: inherit;
  }
  text-align: center;
  margin: 0 auto;

  @media (min-width: 832px) {
    display: none;
  }
`;

FilterStyled.SecondaryFilterWrapper = styled.div`
  margin: 0 15px 0;
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    margin: 0;
  }
`;

FilterStyled.SecondaryFilter = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  @media (min-width: 832px) {
    margin-bottom: 0;
  }
  .phone-number {
    vertical-align: top;
    margin-top: 4px;
    margin-left: 10px;
    display: inline-block;
    .phone-icon {
      font-size: 24px;
      transform: rotate(-20deg);
    }
  }
  .what-icon {
    width: 35px;
    cursor: pointer;
  }
  .region-checkbox {
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    @media(max-width: 831px) {
      margin-top: 10px;
    }
  }
  .form-control {
    margin-top: 10px;
    .input-root {
      margin-top: 0;
    }
  }
  .select-menu {
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy-Regular;
    line-height: 21px;
  }
  @media (min-width: 832px) {
    margin-top: 0;
    .form-control {
      max-width: 163px;
      margin-bottom: 15px;
      margin-top: 5px;
    }
  }
`;

FilterStyled.FilterHeading = styled.span`
  font-family: Gilroy-Bold;
  color: ${props => props.theme.brownGrey};
  font-size: 14px;
  display: block;
  margin-right: 10px;
  &.questions-head {
    vertical-align: top;
    margin-top: 6px;
  }
  @media (min-width: 832px) {
    padding: 0;
    margin-top: 10px;
    &.questions-head {
      margin-top: 0;
      line-height: 21px;
    }
    font-family: Gilroy-Bold;
    line-height: 31px;
    color: ${props => props.theme.brownGrey};
  }
`;

FilterStyled.SortHeading = styled(FilterStyled.FilterHeading)`
  display: inline-block;
  @media(min-width: 832px) {
    display: block;
  }
`;

export default FilterStyled;
