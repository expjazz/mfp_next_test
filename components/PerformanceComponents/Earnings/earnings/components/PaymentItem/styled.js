import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const CardItem = styled.section`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.veryLightPink};
  padding: 7.5px 0;
  &:last-child {
    border-bottom: 0;
  }
  ${media.largeScreen} {
    flex-direction: row;
    font-size: 14px;
  }
  line-height: 18px;
  .image_event {
    display: flex;
    margin-bottom: 5px;
    ${media.largeScreen} {
      padding-right: 30px;
      align-items: center;
      margin-bottom: 0;
      width: 355px;
    }
  }
`;

export const Status = styled.span`
  padding: 0 10px;
  @media (max-width: 1279px) {
    display: none;
  }
`;

export const StatusMob = styled(Status)`
  display: inline;
  font-size: 13px;
  color: ${props => (props.status ? '#a0a0a0' : '#32d39b')};
  ${props => props.failed && `color:${props.theme.errorRed}`};
  padding: 0;
  background: none;
  padding-left: 10px;
  ${media.largeScreen} {
    display: none;
  }
`;

export const DateCol = styled.div`
  @media (min-width: 1280px) {
    width: 80px;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  @media (max-width: 1279px) {
    justify-content: space-between;
  }
  line-height: 21px;
  .highlight {
    color: ${props => props.theme.verifyGreen};
    /* margin-right: 16px; */
  }
  @media (min-width: 1280px) {
    .amount {
      text-align: right;
      flex: 1;
    }
    .pay-name {
      width: 262px;
    }
  }
  .fa-plus-circle,
  .fa-minus-circle {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    margin-left: 16px;
  }
`;

export const DetailCol = styled.div`
  @media (min-width: 1280px) {
    margin-left: calc(15% - 80px);
    flex: 1;
  }
  .sub-row {
    margin-right: 30px;
  }
`;
