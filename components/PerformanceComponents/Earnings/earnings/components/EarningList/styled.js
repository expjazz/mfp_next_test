import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const CardItem = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 15px;
  ${media.largeScreen} {
    padding: 0;
  }
`;

export const TableHead = styled.li`
  font-size: 14px;
  font-family: Gilroy-Bold;
  &.Date {
    width: 15%;
  }
  &.Status {
    padding: 0 10px;
  }
  &.Item {
    width: 262px;
  }
  &.Price {
    flex: 1;
    margin-right: 30px;
  }
  &:last-child {
    text-align: right;
  }
`;

export const Table = styled.ul`
  display: flex;
  padding-bottom: 8.7px;
  border-bottom: 1px solid ${props => props.theme.veryLightPink};
`;
