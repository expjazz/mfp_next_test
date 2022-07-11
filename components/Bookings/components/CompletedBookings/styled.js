import styled from '@emotion/styled';

const CompletedStyled = styled.div`
  .pagination-wrapper {
    margin: 13px 0;
  }
  @media (min-width: 832px) {
    .pagination-wrapper {
      margin: 28px 0;
      justify-content: initial;
      &.bottom {
        display: none;
      }
    }
    .loader-wrap {
      margin-top: 28px;
    }
  }
  @media(min-width: 1280px) {
    .empty-completed-text {
      margin-top: 28px;
    }
  }
`;

CompletedStyled.FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 831px) {
    margin-bottom: 10px;
  }
  .drop-down {
    @media(max-width: 831px) {
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
    @media(min-width: 1280px) {
      margin-bottom: 10px !important;
    }
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
    flex-wrap: wrap;
    .drop-down {
      margin-right: 16.4px;
      &:last-child {
        margin-right: 0;
      }
      &.filter, &.sort-by {
        min-width: 200px;
        width: auto;
      }
      &.filter {
        min-width: 170px;
      }
    }
  }
  @media (min-width: 1280px) {
    flex-wrap: nowrap;
  }
`;

CompletedStyled.ListSection = styled.div`
  display: flex;
  flex-direction: column;
  .list-item {
    margin-bottom: 10px;
    @media (min-width:832px) and (max-width: 1279px) {
      min-width: 200px;
    }
  }
  @media (min-width: 832px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 16px;
    margin-left: -40px;
    justify-content: flex-start;
    .list-item {
      width: auto;
      margin-right: 0;
      margin-bottom: 41px;
      margin-left: 40px;
      flex: 0 0 calc(25% - 40px);
    }
  }

  @media (min-width:1280px) {
    .list-item {
      min-width: 210px;
    }
  }
`;

export default CompletedStyled;
