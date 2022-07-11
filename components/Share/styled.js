import styled from '@emotion/styled';

const ShareStyled = styled.div`
  .action-btn {
    min-width: auto;
    min-height: auto;
    font-size: 14px;
    width: 130px;
    height: 40px;
    margin-right: 7px;
  }
`;

ShareStyled.List = styled.ul`
  padding: 12.3px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  max-width: 280px;
  .list-item {
    color: ${props => props.theme.flatBlue};
    padding: 10px;
    flex: 0 0 84px;
    text-align: center;
    .social-btn {
      cursor: pointer;
      outline: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.highlight {
        color: ${props => props.theme.orangePink};
      }
      .icon {
        font-size: 19px;
      }
      .icon-text {
        font-size: 14px;
        font-family: Gilroy-Regular;
        display: block;
        margin-top: 9px;
      }
    }
  }
  .download-icon {
    font-size: 18px;
  }
`;

ShareStyled.ErrorField = styled.span`
  color: #990000;
  font-size: 12px;
  margin-top: 5px;
  font-family: Gilroy-Medium;
  text-align: left;
`;

ShareStyled.SmsInput = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 12.3px;
  .action-btn {
    min-width: auto;
    min-height: auto;
    font-size: 14px;
    width: auto;
    height: auto;
    border-radius: 4px;
    padding: 2px 10px;
    margin-top: 10px;
  }
  .MuiFormControl {
    width: 100%;
    .input-root {
      background: #fff;
      width: 100%;
      padding: 5px;
      div, input {
        height: 100%;
        font-size: 14px;
        font-family: Gilroy-Regular;
        color: #555;
        text-align: center;
        line-height: 25px;
      }
    }
  }
}
`;

export default ShareStyled;
