import styled from '@emotion/styled';

const PickerStyled = styled.div`
  display: inline-block;
`;

PickerStyled.Selected = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  cursor: pointer;
  color: ${props => props.theme.flatBlue};
`;

PickerStyled.Arrow = styled.span`
  margin-left: 10px;
`;

PickerStyled.ListWrapper = styled.ul`
  padding: 0;
  cursor: pointer;
`;

PickerStyled.ListItem = styled.li`
  padding: 10px;
  &:hover, &:focus {
    background-color: #F8F8F8;
  }
`;

export default PickerStyled;
