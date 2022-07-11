import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const MainTitle = styled.span`
  font-family: Gilroy-Bold;
  font-size: 15px;
  padding: 7px;
  min-width: 160px;
  background: ${props => props.theme.darkViolet};
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const TopSection = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  padding-top: 0;
  .help-icon, .close-icon {
    cursor: pointer;
    margin-top: 15px;
  }
  ${props => !props.popupMode && `
    @media(min-width: 1280px) {
      justify-content: center;
      .help-icon, .close-icon {
        display: none;
      }
    }
  `}
`;

export const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.orangePink};
  .request-main-heading {
    color: ${props => props.theme.pureWhite};
    padding: 0 15px;
    padding-bottom: 15px;
  }
`;

export const Wrap = styled.section`
  min-height: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: ${props => props.theme.pureWhite};
  .tabs-root {
    background-color: ${props => props.theme.white};
    .tabs-indicator {
      height: 3px;
      background-color: ${props => props.theme.orangePink};
    }
    .tab-root {
      color: ${props => props.theme.greyishBrown};
      font-size: 14px;
      font-family: Gilroy-Regular;
      text-transform: uppercase;
      flex: 1;
      .highlight {
        margin-left: 5px;
        color: ${props => props.theme.orangePink};
      }
      &.tab-selected {
        color: ${props => props.theme.orangePink};
        font-family: Gilroy-Bold;
        margin: 0 -1px !important;

        & > span > span > span > span {
          margin: 0 -1px !important;
        }
      }
    }
  }
`;

export const ChildrenWrap = styled.section`
  margin-top: ${props => `${props.headHeight}px`};
  ${props => props.autoHeight && `
    height: calc(100% - ${props.headHeight + 20}px);
  `}
  @media (max-width: 767px) {
    margin-top: ${props => `${props.headHeight + 15}px`};
    ${props => props.autoHeight && `
      height: calc(100% - ${props.headHeight + 15}px);
    `}
  }

  .scrollbar-content {
      ${media.mobileScreen} {
        position: relative !important;
        margin: 0 !important;
        overflow: initial !important;
        height: auto !important;
        min-height: 100% !important;
        max-height: 100% !important;
      }
    }
`;
