import styled from '@emotion/styled';

const CommercialStyled = styled.section`
  .list-item {
    margin-bottom: 20px;
    @media(min-width: 832px) {
      .comment-section {
        background: ${props => props.theme.pureWhite};
      }
    }
  }
  .pagination-wrapper {
    margin: 13px 0;
    .left-arrow, .right-arrow {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  @media(min-width: 832px) {
    padding-bottom: 54px;
    .pagination-wrapper {
      justify-content: flex-start;
    }
    .empty-text, .loader-wrapper {
      margin-top: 13px;
    }
  }
`;

CommercialStyled.FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .drop-down {
    margin-bottom: 13px!important;
  }
  .search-root {
    height: 50px;
    border-radius: 10px;
    .search-input-container {
      background: #fff;
    }
  }
  @media(min-width: 832px) {
    flex-direction: row;
    margin-bottom: 0;
    .drop-down {
      margin-right: 16.4px;
      margin-bottom: 0 !important;
      &.filter, &.sort-by {
        min-width: 200px;
        width: auto;
      }
    }
  }
`;

export default CommercialStyled;
