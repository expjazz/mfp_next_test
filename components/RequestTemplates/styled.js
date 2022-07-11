import styled from '@emotion/styled';

const Templates = styled.div``;

Templates.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;

  .react-datepicker__input-container {
    width: 100%;
  }
  .datepickerWrapper {
    width: 100%;
  }
  .datepickerWrapper > div {
    width: 100%;
  }
  .relationship-text {
    padding-top: 5px;
    text-align: center;
    width: 100%;
    display: block;
    font-size: 14px;
    color: #aaa;
    font-family: Gilroy;
  }
  .recText {
    font-size: 12px;
    font-family: Gilroy-Semibold;
    line-height: 20px;
    margin-left: 5px;
  }
  .recText, .mic-icon {
    cursor: pointer;
  }
`;

Templates.Myself = styled.span`
  width: 100%;
  font-size: 12px;
  color: ${props => props.theme.flatBlue};
  padding-top: 5px;
  cursor: pointer;
  font-family: Gilroy-Semibold;
  text-align: right;
`;

Templates.WrapsAudioInput = styled.div`
  width: 100%;
  display: flex;
  color: ${props => props.theme.flatBlue};
  align-items: center;
  justify-content: flex-end;
  padding-top: 5px;
`;

export { Templates };

export const FlexBox = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
