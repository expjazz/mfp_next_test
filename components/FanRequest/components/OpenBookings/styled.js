import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Layout, List, ListItem, Text as TextP, Photo } from '../styled';

export const Wrapper = styled(Layout)``;

export const Ul = styled(List)``;

export const Li = styled(ListItem)`
  background-color: ${props => !props.isRead && props.theme.white};
  .status {
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: ${props => props.theme.errorRed};
  }
`;

export const Image = styled(Photo)``;

export const Content = styled.div`
  margin-left: 9px;
  margin-right: 9px;
  width: 100%;
  ${props =>
    props.bgColor &&
    `margin-left: 0;
     background-color: #f0f3fe;
     border-radius: 0 5px 5px 5px;
     padding: 10px;`}
`;

export const Text = styled(TextP)`
  display: inline;
  .name {
    font-family: Gilroy-Bold;
    padding-right: 5px;
  }
`;
