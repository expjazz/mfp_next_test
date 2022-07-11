import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { HTMLContentWrapper } from 'styles/CommonStyled';
import { ChildLayout } from '../../styled';

export const Layout = styled(ChildLayout)`
  .time-description {
    text-align: center;
  }
`;

export const ContentWrapper = styled(HTMLContentWrapper)`
  margin: 10px 0;
  width: 100%;
  @media (min-width: 832px) {
    text-align: left;
  }
`;

export const ButtonWrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  .btn {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
