import styled from '@emotion/styled';

export const Content = styled.article`
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.veryLightPink};
  }
  &.bottom-border {
    border-bottom: none;
    padding-bottom: 0;
  }
  @media (max-width: 1279px) {
    &.post-section {
      padding-top: 0 !important;
    }
  }
  .video-btn-wrap {
    display: flex;
    align-items: center;
    margin: 10px 0;
    margin-top: 0;
    flex-direction: column;
    .sh-btn {
      border-radius: 0;
      padding: 0 20px;
      padding-top: 2px;
      min-height: 36px;
      margin-top: 10px;
      font-size: 14px;
      font-family: Gilroy-Bold;
    }
    .how-works {
      margin-top: 11px;
      color: ${props => props.theme.links};
      cursor: pointer;
    }
  }
  .card-display {
    max-width: 374px;
    margin: 0 auto;
    background-color: ${props => props.theme.pureWhite};
  }
  .main-heading {
    padding: 0 10px;
  }
  &:not(:first-child) {
    ${props =>
      !props.noTopPadding &&
      `
        padding-top: 10px;
    `};
  }
  @media (min-width: 1280px) {
    padding-top: 10px;
    .main-heading {
      padding: 0;
    }
    .video-btn-wrap {
      display: block;
      margin-left: auto;
      margin-bottom: 15px;
      .sh-btn {
        margin-top: 0;
      }
      .how-works {
        display: block;
        text-align: center;
      }
    }
  }
`;

export const ContentWrap = styled.section`
  .left-section {
    display: none;
    padding-top: 13px;
  }
  @media (min-width: 1280px) {
    display: flex;
    .left-section {
      display: block;
      width: 235px;
      .featured-heading {
        padding-left: 0;
        font-size: 15px;
        line-height: 22px;
      }
      .req-card-li {
        width: calc(100% - 10px);
        margin-left: 0;
        margin-right: 10px;
      }
    }
    .right-section {
      width: calc(100% - 235px);
      border-left: 1px solid ${props => props.theme.veryLightPink};
      padding: 0 10px;
      padding-top: 13px;
    }
  }
  .pagination-wrapper {
    padding-top: 10px;
    .left-arrow {
      order: initial;
    }
  }
`;

export const Wrap = styled.section`
  .bottom-cta {
    margin-top: 10px;
  }
`;
