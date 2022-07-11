import styled from '@emotion/styled';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  ${props => props.isCommercial && 'display:block'};
  .content-data,
  .paymet-view {
    ${props => props.isCommercial && 'display:block'};
  }
  height: calc(100% - 40px);
  .detail-title {
    min-width: 85px;
    display: inline-block;
  }
  .support-action {
    display: flex;
    justify-content: flex-end;
  }
  .payment-header-wrapper {
    padding-top: 10px;
  }
  .order-action {
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 15px;
  }
  .commercial-actions {
    align-items: center;
    flex-direction: column;
    margin: 10px 0;
    height: 41px;
  }
`;

export const CheckboxWrapper = styled.section`
  display: flex;
  margin-top: 20px;
  margin-bottom: 25px;
  .check-box {
    margin-bottom: 22px;
  }
  .check-text {
    padding-top: 5px;
    font-size: 14px;
  }
`;
