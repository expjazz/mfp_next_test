import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const TopSection = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  .help-icon,
  .close-icon {
    cursor: pointer;
    font-size: 20px;
  }
  ${media.webView} {
    .help-icon {
      visibility: hidden;
    }
  }
  .avatar-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .avatar {
      width: 80px;
      border-radius: 50%;
      object-fit: contain;
      margin-bottom: 10px;
      box-shadow: 0 8px 13px 0 rgba(0, 0, 0, 0.28);
    }
  }
`;

export const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.orangePink};
  .request-main-heading {
    color: ${props => props.theme.pureWhite};
  }
`;

export const Wrap = styled.section`
  min-height: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
      }
    }
  }
`;

const getHeight = headHeight => {
  if (headHeight) return `height: calc(100% - ${headHeight}px)`;
  return 'height: 100%';
};

export const ChildrenWrap = styled.section`
  margin-top: 20px;
  ${media.webView} {
    height: 100%;
  }
  ${media.mobileScreen} {
    ${props => getHeight(props.headHeight)};
  }
`;
