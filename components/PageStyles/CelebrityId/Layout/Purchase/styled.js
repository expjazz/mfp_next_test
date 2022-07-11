
import styled from '@emotion/styled';
import StarProfileStyled from '../../styled';

export const ContentWrap = styled.article`
  @media(min-width: 832px) {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .pay-wrp {
      width: 100%;
      /* flex: 1; */
    }
    hr {
      width: 100%;
    }
  }
`;

export const Wrap = styled.section`
  .payment-heading {
    text-align: left;
    color: ${props => props.theme.greyishBrown};
  }
  @media(min-width: 832px) {
    display: flex;
    flex-direction: column;
    /* min-height: 100vh; */
  }
`;

export const Layout = styled(StarProfileStyled.Wrapper)`
  padding-bottom: 10px;
  margin-top: 20px;
  @media(max-width: 831px) {
    background: ${props => props.theme.pureWhite};
  }
  @media(max-width: 1279px) {
    margin-top: 38px;
  }
`;