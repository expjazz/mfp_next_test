import styled from '@emotion/styled';

const SwitchStyled = styled.label`
  position: relative;
  display: inline-block;
  height: 38px;
  width: 139px;
  .switch-input {
    opacity: 0;
    width: 0;
    height: 0;
    &:not(:checked) + .slider:before {
      transform: translateX(58%);
      background-color: #cc0000;
      color: #fff;
      font-family: Gilroy-Semibold;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 139px;
    background-color: #dddddd;
    transition: 0.4s;
    border-radius: 40px;
    &:before {
      content: ${props => `"${props.content}"`};
      font-family: Gilroy-Semibold;
      line-height: 26px;
      position: absolute;
      height: 26px;
      left: 7px;
      border-radius: 40px;
      padding: 0 10px;
      bottom: 6px;
      background-color: ${props => props.theme.flatBlue};
      transition: 0.4s;
      color: #fff;
    }
  }
`;

export default SwitchStyled;
