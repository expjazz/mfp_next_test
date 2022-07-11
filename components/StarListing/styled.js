import styled from '@emotion/styled';

const mobMargin = 10;
const desktopMargin = 20;
const desktopWidth = 174;
const mobileWidth = 140;

const ListingStyled = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  /* margin-left: -10px; */
  height: 100%;
  overflow: hidden;
  justify-content: flex-start;
  margin: auto;
  @media(min-width: 832px) {
    display: flex;
    width: ${props => {
      const childWidth = desktopWidth + desktopMargin;
      return `${childWidth * props.rowCount  + 10}px`;
    }};
    margin-left: -20px;
    padding: 0 5px;
  }
`;

ListingStyled.Content = styled.li`
  display: ${props => props.hidden ? 'none' : 'flex'};
  width: 174px;
  margin-bottom: 10px;
  /* margin-left: ${`${mobMargin}px`}; */
  background: ${props => props.theme.pureWhite};
  border-radius: 6px;
  justify-content: center;
  @media(max-width: 374px) {
    width: 140px;
  }
  &.loading-item {
    padding: 8px 0;
    border: 1px solid ${props => props.theme.veryLightPink};
  }
  @media(min-width: 832px) {
    margin-left: ${`${desktopMargin}px`};
    margin-bottom: 20px;
  }
`;

ListingStyled.RowContent = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  @media only screen and (min-width: 360px) and (max-width: 480px){
    margin-left: 14px;
  }
  @media only screen and (min-width: 481px) and (max-width: 831px){
    margin-left: 25px;
  }
  @media(min-width: 1280px) {
    margin-left: 15px;
    padding-left: 5px;
  }
`;

ListingStyled.NoDataText = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: Gilroy-Medium;
`;

ListingStyled.LoadingIcon = styled.span`
  width: 100%;
  height: 175px;
  display: block;
  background: url('/images/starloader_mobile.png') no-repeat;
  background-size: contain;
  background-position: 26px;
  @media(min-width: 832px) {
    background: url('/images/starloader_web.png') no-repeat;
    background-size: contain;
    width: 200px;
    height: 200px;
    background-position: 8px;
  }
`;

export {ListingStyled as default, mobMargin, desktopMargin, desktopWidth, mobileWidth};
