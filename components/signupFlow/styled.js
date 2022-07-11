import { css } from '@emotion/react';
import styled from '@emotion/styled'

const modalPadding = css`
  padding: 20px;
  padding-top: 10px;
  height: 100%;
  .back-header {
    padding-left: 0;
    padding-right: 0;
  }
  @media(min-width: 832px) {
    height: auto;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 60px;
  }
`;

const LoginContainer = styled.div`
  height: 100%;
  .back-header {
    left: 0;
    right: 0;
    .close-icon {
      margin-left: 15px;
    }
    @media(min-width: 832px) {
      position: absolute;
      .back-lbl-wrp {
        display: block;
      }
      right: 25px;
      left: 25px;
      width: auto;
      top: 20px;
    }
  }
`;

LoginContainer.SignupFlow = styled.div`
  height: 100%;
`;

LoginContainer.SignupContainer = styled.section`
  ${modalPadding};
  @media(min-width: 832px) {
    height: 100%;
  }
`;

const HeaderSection = styled.div`
  padding: 3px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export { LoginContainer, HeaderSection, modalPadding };
