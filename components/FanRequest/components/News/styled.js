import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Layout, List, ListItem, Text as TextP, Photo } from '../styled';

export const Wrapper = styled(Layout)``;

export const Ul = styled(List)``;

export const Li = styled(ListItem)`
  background-color: ${props => !props.isRead && props.theme.white};
`;

export const Image = styled(Photo)``;

export const Content = styled.div`
  margin-left: 9px;
  margin-right: 9px;
`;

export const Text = styled(TextP)``;
