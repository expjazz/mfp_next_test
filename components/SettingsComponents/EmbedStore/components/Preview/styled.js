import styled from "@emotion/styled";
import { Dialog } from "@material-ui/core";

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100% !important;
    @media (min-width: 832px) {
      /* max-height: 700px; */
      max-width: 100% !important;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      /* max-height: 650px; */
      max-width: 100% !important;
    }
    @media (max-width: 831px) {
      max-width: 100% !important;
      max-height: none;
      margin: 0;
    }
  }
`;