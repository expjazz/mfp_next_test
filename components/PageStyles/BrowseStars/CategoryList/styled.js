import styled from '@emotion/styled';

export const Layout = styled.section`
  padding-top: 120px;
  padding-bottom: 30px;
  .cat-heading {
    font-family: Gilroy-Medium;
    font-size: 23px;
    color: ${props => props.theme.flatBlue};
    padding-bottom: 0;
    padding-left: 0;
    @media (min-width: 832px) {
      padding-left: 20px;
      padding-bottom: 5px;
    }
  }
  .title-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 831px) {
      padding: 0 9px 7px;
    }
  }
`;

export const List = styled.ul`
  li:last-child {
    border-bottom: 1px solid ${props => props.theme.veryLightPink};
  }
`;

export const ListItem = styled.li`
  border-top: 1px solid ${props => props.theme.veryLightPink};
  padding: 5px 9px;
  @media (min-width: 832px) {
    padding: 5px 20px;
  }
  cursor: pointer;
  .cat-img {
  }
  .cat-item {
    font-family: Gilroy-Light;
    font-size: 16px;
    padding-left: 10px;
  }
`;

export const FlexItem = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.span`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.brownGrey};
  border-radius: 5px;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const HighlightText = styled.span`
  font-family: Gilroy-Medium;
  font-size: 12px;
  color: ${props => props.theme.flatBlue};
  
  @media (min-width: 832px) {
    padding-right: 20px;
  }
`;
