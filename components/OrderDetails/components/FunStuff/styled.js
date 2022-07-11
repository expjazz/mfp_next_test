import styled from '@emotion/styled';
import { DetailWrapper, DetailHead } from '../../styled';

export const Link = styled.a`
  font-size: 14px;
  font-family: Gilroy;
  line-height: 21px;
  color: ${props => props.theme.flatBlue};
`;

export const CustomDetailWrap = styled(DetailWrapper)`
  ${props => props.reduceMargin && `
    margin-bottom: 5px;
  `}
  ${props => props.sameLine && `
    display: flex;
  `}
  ${DetailHead} {
    min-width: ${props => props.sameLine ? '40px' : 'initial'};
  }
`;

export const Image = styled.img`
  width: 62px;
  height: 62px;
  display: block;
  object-fit: cover;
`;

export const Layout = styled.section`
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
`;
