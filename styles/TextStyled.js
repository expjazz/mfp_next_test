import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { media } from './mediaQueries';

export const headingStyle = props => css`
  font-size: 20px;
  font-family: Gilroy-Bold;
  color: ${
    props.theme.accent ? props.theme.accent : props.theme.orangePink};
  line-height: 27px;
  display: block;
  text-align: center;
  font-weight: normal;
  padding-bottom: 5px;
  ${media.mobileScreen} {
    padding-bottom: 5px;
  }
`;

export const smallHead = css`
  font-size: 16px;
  font-family: Gilroy-Bold;
  line-height: 22px;
`;

export const largeHeading = props => css`
  ${headingStyle(props)};
  font-size: 24px;
`;

export const LinkStyles = props => css`
  font-size: 15px;
  font-family: Gilroy-Medium;
  color: ${props.theme.flatBlue};
`;

export const Heading = styled.span`
  ${props => headingStyle(props)}
`;
export const HeadingH2 = styled.h2`
  ${props => headingStyle(props)}
`;

export const descStyles = props => css`
  font-size: 16px;
  font-family: Gilroy;
  color: ${props.theme.greyishBrown};
  line-height: 22px;
  display: block;
  width: 100%;
  word-break: break-word;
`;

export const Description = styled.span`
  ${descStyles}
  ${props => props.center && 'text-align:center'};
`;

export const DescriptionP = styled.p`
  ${descStyles}
`;

export const Label = styled(Description)`
  font-size: 18px;
  font-family: Gilroy-Medium;
`;

export const LinkText = styled(Description)`
  display: inline-block;
  width: auto;
  cursor: pointer;
  color: ${props => props.theme.flatBlue};
  font-size: 15px;
  ${props => props.disabled ? `
    opacity: 0.6;
  `: `
  `}
`;

export const LinkEle = styled.a`
  ${LinkStyles};
`;

export const InputHeading = styled(Description)`
  color: ${props => props.theme.greyishBrown};
  font-size: 12px;
  text-align: center;
  line-height: 25px;
`;
