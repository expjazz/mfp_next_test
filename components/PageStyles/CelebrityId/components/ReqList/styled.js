import styled from '@emotion/styled';

export const Wrap = styled.section`
  background: ${props => props.theme.white};
  .request-items {
    background-color: transparent;
    .svg-inline--fa {
      color: ${props => props.theme.links ? props.theme.links : props.theme.flatBlue};
    }
    .cus-icon {
      path {
        fill: ${props => props.theme.links ? props.theme.links : props.theme.flatBlue};
      }
    }
  }
`;
