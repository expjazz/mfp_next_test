import styled from '@emotion/styled';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  ${props => props.isCommercial && 'display:block'};
  .content-data,
  .paymet-view {
    ${props => props.isCommercial && 'display:block'};
  }
  .image-wrapper {
    display: flex;
    justify-content: space-between;
  }
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
    margin-bottom: 10px;
  }
  .image {
    margin: 0;
    border-radius: 5px;
  }
  .commercial-actions {
    align-items: center;
    flex-direction: column;
    margin: 10px 0;
    height: 41px;
  }
`;
