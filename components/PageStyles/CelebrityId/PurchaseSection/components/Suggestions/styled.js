import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper as Wrap } from '../../styled';

export const Wrapper = styled(Wrap)`
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  .sub-btn {
    padding-top: 15px;
  }
`;

export const Content = styled.div`
  max-width: 830px;
  margin: 0 auto;
  .login-btns {
    text-align: center;
    width: 330px;
    margin: 15px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Left = styled.div`
  width: 50%;
  border-right: 1px solid ${props => props.theme.veryLightPink};
  padding-right: 60px;
`;
