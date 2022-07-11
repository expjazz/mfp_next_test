import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';

const CompactStyled = styled(Card)`
  padding: 18px 10px;
  cursor: pointer;
  ${props =>
    props.selected
      ? `
    border-left: 8.6px solid ${props.theme.orangePink};
  `
      : `
  `}
  @media (max-width: 1279px) {
    ${props => !props.initialSelected && `border-left: 0;`}
  }
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  &:last-child {
    @media (min-width: 1280px) {
      margin-bottom: 0;
    }
  }
  .custom-label-sample {
    justify-content: flex-end;
  }
  .sample-label {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .title-custom {
      flex: 1 0 100%;
      font-family: Gilroy;
      line-height: 21px;
    }
  }
  .duewrp {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .due {
      font-family: Gilroy-Extrabold;
      font-size: 14px;
      color: ${props => props.theme.errorRed};
      padding-left: 5px;
      max-width: 100px;
      text-align: right;
    }
    .title-custom {
      flex: 1;
    }
  }
`;

CompactStyled.UserName = styled.span`
  font-family: Gilroy-Extrabold;
  font-size: 24px;
  color: ${props => props.theme.flatBlue};
  display: block;
  flex: 0 0 65%;
`;

CompactStyled.DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  .tick-text {
    flex-direction: row;
    font-family: Gilroy-Bold;
    padding-right: 10px;
    justify-content: space-between;
  }
  .time {
    &.expiring {
      color: ${props => props.theme.orangePink};
    }
  }
  .time-text {
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: ${props => props.theme.brown};
    text-align: right;
    word-break: break-word;
    flex: 1;
  }
`;

export default CompactStyled;
