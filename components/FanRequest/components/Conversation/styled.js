import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Layout, List, ListItem, Text as TextP, Photo } from '../styled';

export const Wrapper = styled(Layout)``;

export const Ul = styled(List)``;

export const Li = styled(ListItem)`
  background-color: ${props => !props.isRead && props.theme.white};
  .time {
    padding-left: 49px;
  }
  .align-top {
    align-items: flex-start;
  }
`;

export const Image = styled(Photo)``;

export const Content = styled.div`
  margin-left: 9px;
  background-color: #f0f3fe;
  width: 100%;
  margin-right: 9px;
  padding: 10px;
  border-radius: 0 5px 5px 5px;
`;

export const Text = styled(TextP)`
  color: ${props => props.theme.lightBlack};
  display: inline;
  .name {
    font-family: Gilroy-Bold;
    padding-right: 5px;
  }
`;
