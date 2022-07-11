import styled from '@emotion/styled';

const CancelledStyled = styled.div`
  .pagination-wrapper {
    margin: 13px 0;
    .left-arrow,
    .right-arrow {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .cancel-count-notification {
    margin: 0 auto;
    margin-bottom: 18px;
  }
  @media (min-width: 832px) {
    padding-bottom: 41px;
    .pagination-wrapper {
      justify-content: flex-start;
    }
    .empty-text, .loader-wrapper {
      margin-top: 13px;
    }
  }
  @media (max-width: 1280px) and (min-width: 832px) {
    .inner-top {
      margin-bottom: 0;
    }
  }
  .scroll-message-details {
    top: 40px;
  }
`;

CancelledStyled.FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .drop-down {
    margin-bottom: 13px !important;
  }
  .search-root {
    height: 50px;
    border-radius: 10px;
    .search-input-container {
      background: #fff;
    }
  }
  @media (min-width: 832px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0;
    .drop-down {
      margin-right: 16.4px;
      margin-bottom: 0 !important;
      &.filter,
      &.sort-by {
        min-width: 200px;
        width: auto;
      }
    }
  }
`;

export default CancelledStyled;
