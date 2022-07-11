import styled from '@emotion/styled';

const ListingStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px 0;
`;

ListingStyled.Content = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-self: flex-start;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  ${props => props.sentComment && `
    justify-content: flex-end;
  `}
  &:last-child {
    margin-bottom: 0;
  }
`;

export default ListingStyled;
