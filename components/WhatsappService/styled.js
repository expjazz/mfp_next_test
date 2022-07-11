import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    text-align: center;
    .heading {
      margin-bottom: 15px;
    }
    @media (min-width: 832px) {
      max-height: 700px;
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
    @media (max-width: 831px) {
      max-height: none;
      margin: 0;
    }
  }
`;
