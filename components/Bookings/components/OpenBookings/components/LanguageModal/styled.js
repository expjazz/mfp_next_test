import Dialog from '@material-ui/core/Dialog';
import styled from '@emotion/styled'

export const DialogStyled = styled(Dialog)`
  .paper-body {
    padding: 18px;
    color: ${props => props.theme.pureWhite};
    width: 320px;
    display: flex;
    align-items: center;
    font-family: Gilroy-Medium;
    font-size: 20px;
    line-height: 25px;
    background: ${props => props.theme.darkViolet};
    .button-wrap {
      margin-top: 20px;
      max-width: 151px;
    }
  }
`;
