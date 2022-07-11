import styled from '@emotion/styled';

const NestedSelectStyled = styled.div`
  .input-label {
    text-align: center;
    font-family: Gilroy-Regular;
    font-size: 18px;
    white-space: pre-line;
    line-height: 25px;
    color: ${props => props.theme.brownGreyTwo};
    top: -10px;
  }
  .input-label-shrink {
    right: 0;
    text-align: center;
    transform: none;
    font-size: 13px;
    line-height: 18px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${props => props.theme.brownGreyTwo} !important;
  }
  .select__menu {
    margin-top: 0;
    .select__menu-list, .select__group {
      padding-top: 0;
    }
    .select__group {
      height: 42px;
      overflow: auto;
    }
  }
  .select__clear-indicator {
    cursor: pointer;
  }
  .select__value-container {
    justify-content: center;
    font-size: 24px;
    padding: 10px 0px 10px !important;
    .select__input {
      color: ${props => props.theme.twilight};
      padding: 0px 0;
      font-size: 18px !important;
      line-height: 18px !important;
    }
    .select__multi-value {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(47, 131, 157);
      border-image: initial;
      background: rgb(255, 255, 255);
      //height: 26.7px;
      margin: 5px 5px 0 0px;
      padding: 0px 3px 0 12px;
      border-radius: 16px;
    }
    .select__multi-value__label {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.greyishBrown};
      font-size: 14px;
      line-height: 15px;
      padding: 5px 5px 5px 0;
    }
    .select__multi-value__remove {
      font-size: 16px;
      color: rgb(47, 131, 157);
      cursor: pointer;
      padding-left: 4px;
      line-height: 16px;
      margin-top: -2px;
      &:hover {
        background: none;
      }
    }
  }
  .select__group {
    padding-bottom: 0;
    .select__group-heading {
      font-family: Gilroy-Medium;
      display: block;
      font-size: 18px;
      background: ${props => props.theme.white};
      color: ${props => props.theme.greyishBrown};
      padding: 10px 17px;
      margin-bottom: 0;
    }
    input {
      display: none;
      &:checked + label {
        font-family: Gilroy-Regular;
        background: #fff;
        & + div .select-option-item {
          display: none;
        }
      }
    }
    .select-option-item {
      color: ${props => props.theme.flatBlue};
      padding-left: 34px;
      padding-bottom: 2px;
      background-color: #fff !important;
      font-family: Gilroy;
      font-size: 18px;
      line-height: 38px;
    }
  }
  .select__dropdown-indicator {
    display: none;
  }
  .select__value-container {
    //border-bottom: 1px solid #aaa;
  }
  .select__value-container > div[role='button'] {
    border: 1px solid ${props => props.theme.flatBlue};
    background: #fff;
    margin: 5px 5px 5px 0;
  }
  .select__indicator-separator {
    display: none;
  }
  #nested-list {
    max-height: 300px;
    overflow-y: auto !important;
    padding-bottom: 4px;
    padding-top: 0;
    position: relative;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }
`;

export { NestedSelectStyled };
