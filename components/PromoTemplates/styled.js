import styled from '@emotion/styled';

export const Layout = styled.section`
  ${props => props.selected && `
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
  `}
`;
