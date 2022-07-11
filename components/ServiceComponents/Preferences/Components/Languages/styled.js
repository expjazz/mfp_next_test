import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const ListEle = styled.span`
  font-size: 16px;
  ${props => props.head ? `
    font-family: Gilroy-Bold;
    line-height: 23px;
    width: 50%;
  ` : `
    font-family: Gilroy;
    line-height: 22px;
    flex: 1;
  `};
  ${props => props.close && `
    flex: initial;
  `};
  ${props => props.highlight ? `
    color: ${props.theme.flatBlue};
  ` : `
    color: ${props.theme.greyishBrown};
  `}
  ${props => props.clickable && `
    cursor: pointer;
  `};
  .close-icon {
    font-size: 18px;
  }
`;

export const ListItem = styled.li`
  background: ${props => props.theme.white};
  padding: 12px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  @media(min-width: 832px) {
    background: ${props => props.theme.pureWhite};
  }
`;

export const List = styled.ul`

`;

export const Wrap = styled.section`
  .loader {
    height: auto;
    margin-top: 10px;
  }
  .lang-drop {
    margin-top: 5px;
    .cus-drop {
      background: transparent;
      padding: 0px;
      height: auto;
    }
    .drop-icon {
      position: absolute;
      right: 10px;
    }
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
`;
