import styled from '@emotion/styled'

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 30px 0;
  @media (max-width: 1280px) {
    padding-top: 0;
  }
  .leftArrow {
    position: absolute;
    left: 20px;
    top: 21px;
    background-size: 14px 28px;

    @media (min-width: 1280px){
      display: none;
    }
    @media (min-width: 832px) and (max-width: 1280px) {
      top: 47px;
    }
    @media (max-width: 831px){
      top: 91px;
    }
  }
  .save-button{
    min-height: 60px;
    max-width: 200px;
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
    height: 100%;
    padding: 75px 20px 20px;
    max-width: 620px;
    margin: 0 auto;
  }
  @media(min-width: 832px) {
    height: 100%;
    padding-left: 151px;
    padding-right: 149px;
  }
  input {
    text-align: center;
    font-size: 22px;
    line-height: 25px;
    height: auto;
    font-family: Gilroy-Medium;
    padding: 6px 0 5px;

    &::-webkit-input-placeholder {
      font-size: 18px;
      font-family: Gilroy;
    }
    &:-moz-placeholder {
      font-size: 18px;
      font-family: Gilroy;
    }
    &::-moz-placeholder {
      font-size: 20px;
      font-family: Gilroy;
    }
    &:-ms-input-placeholder {
      font-size: 20px;
      font-family: Gilroy;
    }
  }
  .check-text {
    font-size: 14px;
    line-height: 20px;
    color: #797979;
    margin-top: 5px;
  }
`;

Layout.ButtonWrapper = styled.div`
  margin-top: 25px;
`;

export const Heading = styled.div`
  text-align: center;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  font-family: Gilroy-Medium;
  font-weight: normal;
  padding-top: 0;
  @media (max-width: 831px) {
    padding-top: 17px;
    max-width: 230px;
    margin: 0 auto 20px;
    line-height: 28px;
  }
`;

export const Content = styled.section`
  width: 100%;
  // height: calc(100% - 146px) !important;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;
  @media (max-width: 831px) {
    height: max-content;
    padding-top: 0;
  }
  .MuiFormControl {
    margin-bottom: 20px;
    width: 100%;
    &:first-child {
      margin-bottom: 0;
    }

    @media(max-width: 831px) {
      margin-bottom: 15px;
    }
  }
  .price-wrapper .MuiFormControl {
    margin-bottom: 40px;
    @media(max-width: 831px) {
      margin-bottom: 30px;
    }
  }
`;

Content.SubTitle= styled.div`
  width: 398px;
  height: 55px;
  font-family: Gilroy-Light;
  font-size: 14px;
  text-align: center;
  line-height: 1.14;
  color: ${(props)=>props.theme.greyishBrown}
  @media (max-width: 831px) {
    width:100%;
  }
`;

Content.MiddleSection= styled.div`
  display:flex;
  flex-direction: column;
`;
Content.InputWraper= styled.div`
  display:flex;
  flex-direction: row;
  border-bottom: 2px solid #cccccc;
  height: 83px;
  width: 400px;
  padding-top: 50px;
  .MuiFormControl {
    width: 100%;
    margin-bottom: 11px;
    .input-root {
      &:before, &:after {
        display: none;
      }
    }
  }
  @media (max-width: 831px) {
    width:100%;
  }
`;
Content.InputLabel = styled.div`
  font-family: Gilroy-Light;
  font-size: 18px;
  color: ${props => props.theme.greyishBrown};
  text-align: left;
  color: ${(props)=>props.theme.greyishBrown}
`;
Content.CharityCheckbox = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 0;
`;
Content.ModifyDetails = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
`;
export const SetPriceWrapper = styled.div`
`;
SetPriceWrapper.Description = styled.div`
  font-family: ${props => props.error ? 'Gilroy-Medium': 'Gilroy'};
  font-size: 14px;
  line-height: 18px;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.error ? '#990000': props.theme.greyishBrown};
  margin-bottom: 6px;
  @media(max-width:831px) {
    width: 239.7px;
    margin: 0 auto 10px;
    color: ${props => props.error ? '#990000': '#797979'};
    &.bookings-count {
      width: 100%;
    }
  }
`;
SetPriceWrapper.WrapsInput = styled.div`
  width:100%;
  padding-bottom: 5px;
  input {
    font-family: Gilroy-Medium;
    font-size: 22px;
    line-height: 25px;
    text-align: center;
    color: ${props => props.theme.twilight};
    width: 100%;
    padding: 6px 0 5px;
    @media (max-width: 831px) {
      width: 100%;
    }
  }
  .input-underline.input-error:after {
    border-bottom-color: #990000;
  }
  .adornment {
    position: relative;
    left: 38%;
    p {
    color: rgb(129, 116, 170);
    font-family: Gilroy;
    font-size: 24px;
    margin-top: 8px;
    }
  }
  input:focus::-webkit-input-placeholder { color:transparent; }
  input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
  input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
  input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
  @media(min-width:832px){
    width:100%;
  }

`;
SetPriceWrapper.Label = styled.div`
  font-family: Gilroy-Light;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  color: ${props => props.theme.brownGrey};
  width: 400px;
  margin-bottom: 20px;
  max-width: 100%;
  @media(max-width:831px) {
    text-align: center;
  }

  b {
    font-family: Gilroy-Medium;
  }
`;
