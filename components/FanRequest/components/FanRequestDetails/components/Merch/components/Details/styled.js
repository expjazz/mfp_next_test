import styled from '@emotion/styled';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
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
`;

export const DetailHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  line-height: 20px;
`;

export const DetailDesc = styled.span`
  font-family: Gilroy;
  font-size: 16px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  line-height: 21px;
  overflow-wrap: break-word;
  &.capitalise {
    text-transform: capitalize;
  }
`;

export const DetailWrapper = styled.div`
  margin-bottom: 20px;
`;
