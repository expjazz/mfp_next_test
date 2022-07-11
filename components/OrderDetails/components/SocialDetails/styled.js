import styled from '@emotion/styled';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  .detail-title {
    min-width: 85px;
    display: inline-block;
  }
  .order-action {
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 15px;
  }
  .support-action {
    display: flex;
    justify-content: flex-end;
  }
`;
