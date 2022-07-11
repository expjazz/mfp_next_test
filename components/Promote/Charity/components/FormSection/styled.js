import styled from '@emotion/styled';

const FormStyled = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-container {
    margin-bottom: 10px;
  }
  .drop-down {
    width: 100%;
    @media (min-width: 1280px) {
      width: 275px;
    }
    @media (max-width: 831px) {
      margin-bottom: 15px;
    }
  }
  .fund-fields {
    width: 100%;
    .react-datepicker__input-container {
      width: 100%;
    }
  }
  .notchedOutline {
    height: auto;
  }
`;

FormStyled.DataField = styled.span`
  display: block;
  font-size: 22px;
  color: ${props => props.theme.twilight};
  font-family: Gilroy-Medium;
  margin-bottom: 15px;
  padding: 6px 0 5px;
  text-align: center;
  @media (max-width: 831px) {
    margin-bottom: 30px;
  }
`;

FormStyled.CheckBox = styled.span`
  display: flex;
  margin-bottom: 15px;
  margin-top: 0;
  justify-content: center;
`;

export default FormStyled;
