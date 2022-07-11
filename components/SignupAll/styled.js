import styled from '@emotion/styled';

export const Layout = styled.div`
  width: 100%;
  .social-wrapper {
    display: flex;
    justify-content: center;
    justify-content: space-between;
    max-width: 90px;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .heading {
    color: #525252;
    font-size: 16px;
  }
  .or-text {
    text-align: center;
  }
  .info-head {
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    font-size: 20px;
    padding-top: 20px;
    display: block;
  }
`;
