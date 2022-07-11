import styled from '@emotion/styled';
import { Description } from 'styles/TextStyled';
import BookingStyled from '../../../../../../styled';

export const Wrapper = styled(BookingStyled)`
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 14px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 21px;
  }
  .date-time {
    font-family: Gilroy;
    font-size: 14px;
    display: block;
    padding-top: 5px;
  }
  .d-link {
    word-break: break-all;
  }
  @media(min-width: 832px) {
    height: calc(100% - 50px);
  }
`;
export const DetailsWrap = styled.span`
  width: 100%;
  padding-bottom: 15px;
  display: block;
`;

export const LineDesc = styled(Description)`
  display: inline-block;
`;
