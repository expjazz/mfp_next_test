import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const List = styled.ul`
  padding: 0 11.8px;
  background: ${props => props.theme.white};
  @media (min-width: 1280px) {
    padding: 0;
  }
`;

export const Li = styled.li`
  padding-bottom: 11.7px;
  padding-top: 15.8px;
  border-bottom: 1px solid ${props => props.theme.borderGrey};
  &:last-child {
    border-bottom: 0;
  }
`;

export const ListEle = styled.span`
  display: block;
  line-height: 18px;
  margin-bottom: 7px;
  ${props =>
    props.isEmail
      ? `
    word-break: break-all;
  `
      : `
    overflow-wrap: break-word;
  `}
  ${props =>
    props.highlight &&
    `
    cursor: pointer;
    color: ${props.theme.flatBlue};
  `}
  &:last-child {
    margin-bottom: 0;
  }
  &.follower {
    ${media.mobileScreen} {
      width: 87px;
    }
  }
`;

export const Col = styled.article`
  max-width: 35%;
  display: inline-block;
  padding-right: 10px;
  &:last-child {
    max-width: 65%;
    text-align: right;
    padding-right: 0;
  }
`;

export const ColWrap = styled.section`
  display: flex;
  justify-content: space-between;
`;
