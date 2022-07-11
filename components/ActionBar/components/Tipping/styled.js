import styled from '@emotion/styled';

const TippingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  .tipping-list {
    display: flex;
    margin-top: 10px;
    .tipping-item {
      padding: 10px;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: solid 1px #cccccc;
      background-color: #ffffff;
      margin-right: 7px;
      font-family: Gilroy-Regular;
      font-size: 12px;
      color: #3c3c3c;
    }
  }
`;

TippingStyled.CustomTipWrapper = styled.div`
  background: #f6f6f6;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .custom-tip-wrapper {
    width: 138px;
    height: 34px;
    border-radius: 5px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .MuiFormControl {
      margin-left: 2px;
      .input-root {
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }
`;

export default TippingStyled;
