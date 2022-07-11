import { css} from '@emotion/react'
import styled from '@emotion/styled'
const style = css`
  min-width: 100%;
  max-width: 100%;
  border-radius: 0;
  min-height: 64px;
  box-shadow: none;
`;
export const Layout = styled.div`
  position: relative;
  .warning {
    background-color: #ffa000;
    ${style}
  }
  .error {
    background-color: ${props => props.theme.errorBackground};
    ${style}
  }
  .info {
    background-color: #d9edf7;
    ${style}
  }
  .success {
    background-color: ${props => props.theme.confirmBackground};
    ${style}
  }
  .content-msg-wrapper {
    width: calc(100% - 15px);
  }
  .closeBtn {
    position: absolute;
    top: 17px;
    right: 15px;
    color: ${props => props.theme.greyishBrown};
  }
  #client-snackbar {
    display: flex;
    align-items: center;
  }
  .toast-bar {
    top: 0;
    min-width: 100%;
    right: 0;
    left: 0;
  }
  .message {
    padding-left: 5px;
    color: ${props => props.theme.greyishBrown};
    font-size: 16px;
    font-family: Gilroy;
    width: 100%;
    line-height: 20px;
    margin-top: 3px;
  }
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
  .fa-check-circle {
    color: ${props => props.theme.verifyGreen};
    /* color: #42833a; */
  }
  .fa-exclamation-circle {
    color: ${props => props.theme.errorRed};
  }
  .fa-info-circle {
    color: #4d829d;
  }
`;
