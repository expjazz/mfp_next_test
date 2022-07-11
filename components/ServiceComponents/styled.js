import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Container = styled(Card)`
  height: 100%;
  width: 100%;
  background: none;

  ${media.modalView} {
    height: calc(100% - 50px);
  }

  .content-wrapper {
    border-radius: 0;
    background: ${props => props.theme.pureWhite};
    box-shadow: none !important;
    display: flex;
    justify-content: center;
    padding: 0 15px 35px 15px;
    flex-direction: column;
    ${media.modalView} {
      padding: 15px 50px 0;
      justify-content: flex-start;
    }
    ${media.largeScreen} {
      background: ${props => props.theme.white};
      padding: 30px 50px 30px;
      margin-top: 0;
      max-width: 661px;
      margin-left: 25px;
      height: auto;
    }

    @media only screen and (min-width: 832px) {
      position: relative;
    }
  }

  .flex-col {
    flex-direction: column;
  }
  .list-ul {
    padding-inline-start: 40px;
    margin: 10px 0 0;
    li {
      list-style-type: disc;
      padding-bottom: 5px;
    }
  }
  .convert-price {
    display: block;
    margin-bottom: 3px;
    padding-left: 10px;
    font-family: Gilroy;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: ${props => props.theme.greyishBrown};
    &.has-margin {
      margin-top: 0;
      font-size: 11px;
      padding-left: 0;
      margin-bottom: 0;
      line-height: 11px;
      padding-top: 3px;
    }
  }
  .promote-btn {
    margin-top: 15px;
  }
  .btn-wrap {
    padding-top: 10px;
    flex-direction: column;
    align-items: center;
  }
  .MuiFormControl .notchedOutline {
    background-color: ${props => props.theme.pureWhite};
  }
  .input-field {
    z-index: 10;
  }
  .c-wrap {
    background-color: ${props => props.theme.pureWhite};
  }
  .arrow-icon {
    top: 50%;
    position: absolute;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  .check-head-text {
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  padding-left: 20px;
  padding-right: 20px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  display: flex;
  .main-text {
    font-family: Gilroy-Bold;
  }
`;

export const InputContainer = styled.section`
  padding-top: 30px;
`;

export const InputWrapper = styled.section`
  text-align: center;
  padding: 5px 0;
  .label-input {
    font-family: Gilroy;
    font-size: 12px;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
  .notchedOutline {
    height: auto;
  }
`;
