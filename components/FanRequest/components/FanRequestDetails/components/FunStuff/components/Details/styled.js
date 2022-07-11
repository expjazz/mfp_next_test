import styled from '@emotion/styled';

export const Link = styled.a`
  font-size: 14px;
  font-family: Gilroy;
  line-height: 21px;
  color: ${props => props.theme.flatBlue};
`;

export const ButtonLink = styled.button`
  font-size: 14px;
  font-family: Gilroy;
  line-height: 21px;
  color: ${props => props.theme.flatBlue};
`;

export const CustomDetailWrap = styled.div``;

export const Image = styled.img`
  width: 62px;
  height: 62px;
  display: block;
  object-fit: cover;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  .support-action {
    display: flex;
    justify-content: flex-end;
  }
  .order-action {
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 15px;
  }
  .detail-title {
    min-width: 85px;
    display: inline-block;
  }
  .has_schedule {
    min-width: 115px;
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

export const UpDetailWrapper = styled.div`
  margin-top: 20px;
`;