import styled from '@emotion/styled';

export const Layout = styled.div`
  .btn-wrapper {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    button {
      margin-bottom: 10px;
    }
  }
  .inputWrapper {
    padding-top: 11px;
  }
  .error-msg {
    font-family: Gilroy;
    font-size: 14px;
    padding-top: 5px;
    display: block;
    color: ${props => props.theme.errorRed};
  }
  .social-error {
    text-align: center;
  }
  .heading {
    color: #525252;
    font-size: 16px;
  }
  .reset-msg {
    max-width: 400px;
    margin: 0 auto;
  }
  .bar {
    padding-left: 5px;
    padding-right: 5px;
  }
  .links {
    font-size: 14px;
  }
  .social_link {
    color: ${props => props.theme.flatBlue};
    margin-top: 10px;
    font-family: Gilroy;
    cursor: pointer;
  }
  .forgot-btn {
    padding-top: 15px;
  }
  .reset-wrp {
    padding-top: 10px;
  }
`;
