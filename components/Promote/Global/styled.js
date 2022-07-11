import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const PartnerItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background: ${props => props.theme.white};
  border-radius: 5px;
  ${media.largeScreen} {
    background: ${props => props.theme.pureWhite};
  }
  .bold {
    font-family: Gilroy-Bold;
  }
  .left-col {
    margin-right: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    .partner-logo {
      margin-right: 10px;
      width: 94px;
    }
  }
  .right-col {
    .act-icon {
      color: ${props => props.theme.flatBlue};
      font-size: 23px;
      cursor: pointer;
      &.enter-icon {
        margin-right: 15px;
      }
    }
  }
`;

export const PartnerList = styled.ul`

`;

export const Layout = styled.div`
  height: 100%;
  ${media.modalView} {
    height: calc(100% - 130px);
  }
  padding: 0 15px 35px;
  background-color: ${props => props.theme.pureWhite};
  ${media.largeScreen} {
    background-color: ${props => props.theme.white};
    padding: 70px 15px 35px;
    max-width: 700px;
    margin-left: 20px;
  }
  ${media.webView} {
    padding: 35px 50px;
  }
  .check-box {
    margin: 15px 0;
    color: ${props => props.theme.greyishBrown};
  }
  .cat-drop {
    border: 1px solid ${props => props.theme.borderGrey};
    background-color: ${props => props.theme.pureWhite};
    max-width: 100%;
  }
  .title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;
