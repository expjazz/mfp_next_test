import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -12px;
  padding-left: 12px;
  padding-right: 12px;

  a {
    background-color: ${props => props.theme.white};
    margin-bottom: 12px;
    margin-left: 12px;
    width: calc(50% - 12px);
    max-width: 180px;
    border-radius: 10px;
  }

  &:after {
    content: '';
    flex: 0 1 calc(50% - 12px);
    max-width: 180px;
    margin-left: 12px;
  }
`;

export const Li = styled.li`
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${media.mobileScreen} {
    padding: 14px 10px;
    height: 100%;
    justify-content: flex-start;
    ${props => props.center && 'justify-content: center'}
  }
  .svg-inline--fa {
    font-size: 24px;
    color: ${props => props.theme.greyishBrown};
    margin-bottom: 11px;
  }
  /* :before {
    ${props =>
      props.indicator &&
      `    content: '';
    border-style: solid;
    border-width: 3px 13px 9px 0;
    border-color: transparent ${props.theme.headerGrey} transparent
      transparent;
    position: absolute;
    top: 2px;
    right: 2px;`}
  } */
  .cus-icon {
    svg {
      ${media.mobileScreen} {
        margin-bottom: 7px;
      }
    }
  }
`;

export const Text = styled.span`
  width: 100%;
  text-align: left;
  font-family: gilroy-Bold;
  color: ${props => props.theme.flatBlue};
  font-size: 16px;
  line-height: 19px;
  ${props => props.center && 'text-align: center'}
`;

export const Note = styled.span`
  width: 100%;
  text-align: left;
  font-family: gilroy;
  color: ${props => props.theme.greyishBrown};
  font-size: 12px;
  line-height: 18px;
`;
