import styled from '@emotion/styled';
import { css } from '@emotion/react';
const verticalSpace = css`
  margin-top: 5px;
`;

export const SmallDescription = styled.span`
  font-size: 14px;
  ${verticalSpace};
`;

export const DiscountHeading = styled.span`
  font-size: 24px;
  font-family: Gilroy-Regular;
  ${verticalSpace};
  margin-bottom: 5px;
  text-transform: uppercase;
`;

export const DiscountTitle = styled.span`
  font-family: Gilroy-Bold;
  font-size: 39px;
  line-height: 32px;
`;

export const MainTitle = styled.h3`
  font-family: Gilroy-Semibold;
  font-size: 20px;
  line-height: 22px;
  @media (min-width: 832px) {
    display: inline-block;
    font-size: 30px;
    margin-right: 10px;
  }
`;

export const Pop = styled.section`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 15;
  padding: 17px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  font-family: Gilroy-Regular;
  cursor: auto;
  background: ${props => props.theme.white};
  color: ${props => props.theme.greyishBrown};
  isolation: isolate;
  z-index: ${props => props?.zIndex || 1};
  @media (min-width: 832px) {
    width: 375px;
    left: 50%;
    right: initial;
  }
`;

export const Wrap = styled.section`
  width: 100%;
  position: relative;
  background: ${props =>
		props.theme.links ? props.theme.links : props.theme.flatBlue};
  color: ${props => props.theme.white};
  padding: 5px 10px;
  text-align: center;
  font-family: Gilroy-Regular;
  cursor: pointer;
  font-size: 11px;
  .view-details {
    font-size: 14px;
    margin-left: 5px;
    margin-top: 2px;
  }
  @media (min-width: 832px) {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
