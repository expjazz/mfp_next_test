import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Ul = styled.ul`
  width: 272px;
  ${media.mobileScreen} {
    width: 100%;
  }
`;

export const Li = styled.li`
  min-height: 70px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  cursor: pointer;
  background-color: ${props => props.theme.white};
  padding: 15px 10px;
  border-radius: 5px;
  ${props =>
    props.selected && `border-left: 8.6px solid ${props.theme.orangePink}`}
`;
