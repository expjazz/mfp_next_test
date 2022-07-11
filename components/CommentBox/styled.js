import styled from '@emotion/styled';

const BoxStyled = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.brownGrey};
  .message-icon {
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    font-size: 18.8px;
  }
`;

BoxStyled.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

BoxStyled.Reminder = styled.span`
  color:  #555;
  font-size: 12px;
  height: 15px;
  font-family: Gilroy-Bold;
`;

BoxStyled.Input = styled.textarea`
  width: calc(100% - 26.8px);
  height: calc(100% - 6px);
  display: block;
  border-radius: 5px;
  border: none;
  outline: none;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #555;
  padding: 5px 19px;
  margin: 3px;
  resize: none;
  ::placeholder, :-ms-input-placeholder, ::-ms-input-placeholder {
    color: ${props => props.theme.placeHolder};
  }
`;

export default BoxStyled;
