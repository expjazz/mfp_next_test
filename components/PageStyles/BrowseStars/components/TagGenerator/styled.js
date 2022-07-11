import styled from '@emotion/styled';

export const ListItem = styled.li`
  border: 2px solid ${props => props.theme.veryLightPink};
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${props => props.theme.greyishBrown};
  line-height: 20px;
  font-family: Gilroy;
  padding: 2px 12px;
  display: flex;
  padding-right: 0;
  align-items: center;
  justify-content: space-between;
  .close-icon {
    flex: 1;
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
  }
`;

export const List = styled.ul`
  display: flex;
  padding: 0 8px;
  flex-wrap: wrap;
  .edit-icon {
    color: ${props => props.theme.flatBlue};
    margin-top: 4px;
    cursor: pointer;
  }
  @media(min-width: 832px) {
    padding: 0 5px;
    margin-bottom: 13px;
    &:empty {
      display: none;
    }
    .edit-icon {
      display: none;
    }
  }
`;
