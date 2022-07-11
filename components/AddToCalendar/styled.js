import styled from '@emotion/styled';
import Popper from '@material-ui/core/Popper';

export const Dropdown = styled(Popper)`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.pureWhite};
  box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.14);
  min-width: 149px;
  z-index: 1400;
  .cal-links {
    padding: 10px;
    font-family: Gilroy-Medium;
    font-size: 18px;
    cursor: pointer;
    color: ${props => props.theme.greyishBrown};
    :hover {
      background: ${props => props.theme.veryLightPinkTwo};
    }
  }
`;

export const Wrapper = styled.div`

`;
