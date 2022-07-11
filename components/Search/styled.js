import styled from '@emotion/styled';
import { animated } from 'react-spring';

const SearchSection = styled(animated.div)`
  display: block;
  height: 50px;
  background: #fff;
  border-radius: inherit;
  font-family: Gilroy-light;
  @media (min-width: 832px) {
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
    height: 100%;
    min-width: 500px;
    max-width: 500px;
  }
  @media (min-width: 1280px) and (max-width: 1800px) {
    min-width: 375px;
  }
  @media (max-width: 831px) {
    height: 41px;
    margin-top: 3px;
    .search-icon {
      font-size: 22px;
    }
  }
`;

SearchSection.ClearButton = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  background-image: url('/images/close-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

SearchSection.AutoSuggest = styled.div`
  height: 100%;
  @media (min-width: 1025px) {
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  }
  display: flex;
  flex-direction: column;
  .search-lookup {
    font-family: ${props => props.darkMode ? 'Poppins-Medium' : 'Gilroy-Medium'};
    font-size: 13px;
    text-align: left;
    padding: 15px 30px 15px 30px;
    color: ${props => props.darkMode ? props.theme.white : props.theme.orangePink};
    cursor: pointer;
    @media (max-width: 831px) {
      padding: 15px;
    }
    .add-search {
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy-Semibold;
      @media (max-width: 831px) {
        display: block;
        line-height: 24px;
      }
    }
    .add-search-without-color {
      font-family: Gilroy-Semibold;
      cursor: pointer;
      @media (max-width: 831px) {
        display: block;
        line-height: 24px;

      }
    }
  }
  .search-list-wrap {
    ${props => !props.disableUserSuggest && `
      height: 85% !important;
    `}
  }
`;
SearchSection.SuggestionListWrapper = styled.div`
  font-family: Gilroy-light;
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 1;
  height: calc(100vh - 150px);
  @media(min-width: 832px) {
    box-shadow: ${props => props.darkMode ? 'none' : '0px 6px 6px 0px #cccccc'};
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: auto;
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
    height: 300px;
    bottom: initial;
    box-shadow: none;
  }
  @media(min-width: 1025px) {
    width: auto;
    top: 47px;
    right: 0;
    height: 320px;
    box-shadow: ${props => props.darkMode ? 'none' : '0px 6px 6px 0px #cccccc'};
  }
`;
SearchSection.SuggestionList = styled.div`
  padding: 16px;
  @media (min-width: 832px) {
    padding: 16px 0;
  }
`;
SearchSection.noDataWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  color: #333;
`;
SearchSection.noDataText = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
`;
SearchSection.SuggestionListItem = styled.div`
  width: 100%;
  margin-top: 12px;
  cursor: pointer;
  font-size: 18px;
  line-height: 23px;
  color: #333;
  &:hover,
  &:focus {
    background-color: ${props => props.darkMode ? props.theme.darkGrey : '#f8f8f8'};
  }
  &:first-child {
    margin-top: 0;
  }
  @media (min-width: 832px) {
    padding: 0 30px;
  }
`;
SearchSection.SuggestionListContent = styled.span`
  color: #333333;
  display: flex;
  width: 100%;
  align-items: center;
`;

SearchSection.StarHeading = styled.p`
  color: ${props => props.theme.customGrey};
  font-size: 13px;
  font-family: Gilroy-SemiBold;
  text-transform: uppercase;
  margin-top: 10px;
  font-weight: 600;
  text-align: left;
  @media (min-width: 832px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

SearchSection.CategoryList = styled.div`
  padding: 5px 0 5px 0;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 832px) {
    padding: 5px 0 5px 30px;
  }
`;

SearchSection.CategoryItem = styled.span`
  border: 1px solid ${props => props.darkMode ? props.theme.v3LightGray : '#58b0cb' };
  ${props =>
		props.isTag &&
    `
    border-color: ${props.darkMode ? props.theme.v3LightGray : props.theme.orangePink};
  `}
  border-radius: 15px;
  display: inline-block;
  margin: 5px 5px 5px 0;
  span {
    color: ${props => props.darkMode ? props.theme.v3LightGray : props.theme.greyishBrown};
    cursor: pointer;
    padding: 3px 15px 1px;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: Gilroy-Medium;
    line-height: 20px;
    ${props => !props.isTag && `
      text-transform: capitalize;
    `};
    white-space: pre;
  }
`;

SearchSection.SuggestionDetails = styled.p`
  font-size: 13px;
  font-family: Gilroy-Medium;
  color: ${props => props.darkMode ? props.theme.v3LightGray : props.theme.greyishBrown};
  word-break: break-word;
  line-height: 19px;
  font-weight: normal;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

SearchSection.SuggestionListImage = styled.span`
  width: 50px;
  height: 50px;
  display: block;
  background-image: ${props =>
		props.imageUrl
			? `url(${props.imageUrl})`
			: 'url(/images/profile.png)'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;
SearchSection.SuggestionListName = styled.span`
  margin-left: 10px;
  color: ${props => props.darkMode ? props.theme.white : props.theme.flatBlue};
  font-family: Gilroy-Bold;
  font-size: 17px;
  text-align: left;
`;

SearchSection.InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: ${props => (props.alternate ? '13px' : '10px')};
  border-radius: inherit;
  display: flex;
  align-items: center;
  background-color: ${props => (props.alternate ? 'transparent' : '#F8F8F8')};
  border: ${props =>
		props.alternate ? `solid 1px ${props.theme.flatBlue}` : 'none'};
  color: ${props => props.theme.fadedOrange};
  font-size: 18px;
  @media (min-width: 1280px) {
    width: 100%;
    height: 100%;
  }
`;
SearchSection.Input = styled.input`
  padding-left: 15px;
  width: calc(100% - 55px);
  outline: none;
  height: 100%;
  font-family: Gilroy-Light;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: ${props => props.theme.brownGrey};
  @media (min-width: 832px) {
    font-size: 18px;
  }
`;
SearchSection.SignIn = styled.button`
  background-color: #fff;
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-family: 'Avenir-Bold';
  display: inline-block;
  border: none;
  outline: none;
  cursor: pointer;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    padding: 6px 10px;
    padding-bottom: 10px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
SearchSection.Join = styled.button`
  background-color: #fff;
  color: ${props => props.theme.orangePink};
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-family: 'Avenir-Bold';
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: 2px solid ${props => props.theme.orangePink};
  @media (max-width: 767px) {
    display: none;
  }
`;
SearchSection.SignInIcon = styled.img`
  display: none;
  width: 25px;
  height: 25px;
  position: relative;
  top: 7px;
  @media (min-width: 768px) {
    display: inline-block;
    margin-right: 13px;
  }
`;

export default SearchSection;
