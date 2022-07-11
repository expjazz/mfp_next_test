import styled from '@emotion/styled';

const getTextColor = (props) => {
  if (props.selected) {
    return props.theme.flatBlue;
  } else if (props.disabled) {
    return props.theme.brownGrey;
  }
  return props.theme.greyishBrown;
}

export const Spacer = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const StatusText = styled.span`
  margin-top: 20px;
  text-align: center;
  max-width: 54px;
  font-size: 14px;
  ${props => props.disabled || props.selected ? `
    pointer-events: none;
  `: `
    cursor: pointer;
  `}
  line-height: 17px;
  font-family: Gilroy-Bold;
  color: ${props => getTextColor(props)};
`;

export const StatusIndicator = styled.span`
  width: 29px;
  height: 29px;
  top: -11px;
  left: -11px;
  background: ${props => props.theme.flatBlue};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  .icon {
    color: ${props => props.theme.pureWhite};
  }
`;

export const StatusItem = styled.span`
  position: relative;
  ${props => props.disabled ? `
    pointer-events: none;
  `: `
    cursor: pointer;
  `}
  opacity: ${props => props.visible ? 'initial' : 0};
`;

export const StatusLine = styled(Spacer)`
  height: 10px;
  border: 1px solid ${props => props.theme.veryLightPink};
  margin: 0 20px;
  border-radius: 20px;
`;

export const StatusWrap = styled.div`
  width: 300px;
  margin: 0 auto;
`;
