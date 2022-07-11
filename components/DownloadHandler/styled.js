import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

export const DialogStyled = styled(Dialog)`
  .body {
  }
  .paperScroll {
    max-width: 350px;
    overflow-y: inherit;
    padding: 25px;
    margin: 25px;
    .info {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.greyishBrown};
    }
    .close {
      right: 15px;
      top: 15px;
    }
  }
`;
