import styled from '@emotion/styled';

const MultiSelectStyled = styled.div`
  .input-field {
    padding: 18.5px 14px !important;
    height: auto;
  }
  .select__placeholder {
    display: none;
  }
  .select__dropdown-indicator {
    display: none;
  }

  .select__value-container > div[role='button'] {
    border: 1px solid ${props => props.theme.flatBlue};
    background: #fff;
  }
  .select__value-container {
    .select__multi-value {
      border-width: 1px;
      border-style: solid;
      border-color: ${props => props.theme.paleSkyBlue};
      border-image: initial;
      background: rgb(255, 255, 255);
      margin: 0 5px 5px 0px;
      padding: 0px 3px 0 15px;
      border-radius: 15px;
    }
    .select__multi-value__label {
      padding: 0 4px 0 0;
      font-family: Gilroy-Medium;
      font-size: 14px;
      padding: 5px 5px 5px 0;
      line-height: 15px;
      color: ${props => props.theme.greyishBrown};
    }
    .select__multi-value__remove {
      font-size: 16px;
      color: ${props => props.theme.paleSkyBlue};
      cursor: pointer;
      line-height: 16px;
      align-items: center;
      padding-left: 4px;
      margin-top: -2px;
      &:hover {
        background: none;
      }
    }
  }

  .select__indicator-separator {
    display: none;
  }
  .category-pill {
    margin: 0 5px 5px 0px;
    padding: 0px 3px 0 12px;
    span {
      padding-left: 0;
      padding-right: 19px;
    }
  }
  .select__menu {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    .select__menu-list {
      & > div {
        height: auto;
        line-height: 18px !important;
      }
    }
    &:after {
      position: absolute;
      content: '';
      top: -15px;
      left: 47%;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid #fff;
    }
  }
  .select__indicators {
    display: none;
  }
  .chip-delete-icon {
    font-size: 16.9px;
    width: 20px;
    height: 20px;
    color: ${props => props.theme.flatBlue};
    &:hover {
      color: ${props => props.theme.flatBlue};
    }
  }
  .input-label {
    font-size: 14px;
    color: ${props => props.theme.brownGreyTwo};
  }
  .input-label-shrink {
    padding-top: 6px;
    font-size: 10px;
    color: ${props => props.theme.brownGrey} !important;
  }
  .notchedOutline {
    height: auto !important;
  }
`;

export { MultiSelectStyled };
