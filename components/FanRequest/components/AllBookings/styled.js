import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Layout, List, ListItem, Text as TextP, Photo } from '../styled';

export const Wrapper = styled(Layout)``;

export const Ul = styled(List)``;

export const Li = styled(ListItem)`
  .follow-head {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.greyishBrown};
  }
`;

export const Image = styled(Photo)``;

export const Content = styled.div`
  margin-left: 9px;
  margin-right: 9px;
`;

export const Text = styled(TextP)``;
