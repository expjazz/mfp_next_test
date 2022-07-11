import styled from '@emotion/styled'
import { media } from '../../../../../../../styles/mediaQueries';
// import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  .list-root {
    height: 230px;
  }
  padding: 0 10px;
  .scroll-list-wrp {
    ${media.mobileScreen} {
      width: 100%;
    }
  }
  @media(min-width: 832px) {
    ${props => props.centerList && `
      .scroll-container {
        width: 100%;
        justify-content: center;
      }
    `};
  }
`;
export const Content = styled.div`
  position: relative;
  border: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background: ${props => props.theme.pureWhite};
  padding: 15px;
  width: 151px;
  height: 190px;
  min-width: 151px;
  margin-right: 16px;
  ${props => props.clickabel && 'cursor: pointer'};
  .svg-inline--fa {
    font-size: 28px;
  }
  .desc {
    padding-top: 5px;
    font-size: 16px;
    line-height: 22px;
  }
  .product-img {
    margin: 0;
    width: 62px;
    height: 62px;
    background-position: center;
  }
  :last-child {
    margin-right: 0;
  }
`;
export const RequestButton = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -12px;
  .book-btn {
    border-color: ${props => props.theme.links ? props.theme.links : props.theme.flatBlue};
    color: ${props => props.theme.links ? props.theme.links : props.theme.flatBlue};
    text-transform: uppercase;
    font-size: 14px;
    font-family: Gilroy-Regular;
    border-radius: 0;
    min-height: 30px;
    max-width: 150px;
    min-width: 120px;
    opacity: 1;
    background: #fff;
  }
`;
