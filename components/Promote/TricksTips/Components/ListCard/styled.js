import styled from '@emotion/styled';

export const Layout = styled.article`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.isIdeas && props.image ? 'row' : 'column'};
  margin-top: ${props => props.isIdeas ? '25px' : '15px'};
  align-items: flex-start;
  cursor: pointer;
  &:first-child {
    margin-top: 15px;
  }
  @media(min-width: 832px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Image = styled.img`
  ${
    props => props.isIdeas ? `
      width: 65px;
      height: 65px;
    `
  : `
    width: 269px;
    height: 101px;
  `
  };
  object-fit: cover;
  border-radius: 6px;
  ${props => !props.isIdeas && `
    @media(min-width: 375px) {
      width: 100%;
    }
    @media(min-width: 832px) {
      width: 349px;
    }
  `}
`;

export const Heading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.flatBlue};
`;

export const Content = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  ${props => props.isIdeas && props.image && `
    margin-left: 10px;
    flex: 1;
  `}
  @media(min-width: 832px) {
    margin-top: 0;
    ${props => !props.isIdeas && `
        margin-left: 15.8px;
    `}
    flex: 1;
  }
`;
