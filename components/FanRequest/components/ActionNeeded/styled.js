import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Layout, List, ListItem, Text as TextP, Photo } from '../styled';

export const Wrapper = styled(Layout)``;

export const Ul = styled(List)``;

export const Li = styled(ListItem)`
  .action {
    display: flex;
    align-items: center;
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: ${props => props.theme.errorRed};
    .svg-inline--fa {
      color: ${props => props.theme.errorRed};
    }
  }
  background-color: ${props => !props.isRead && props.theme.white};
  .align-top {
    align-items: flex-start;
    padding-top: 10px;
  }
`;

export const Image = styled(Photo)``;

export const Content = styled.div`
  background-color: ${props => props.bgColor && `#f0f3fe`};
  width: 100%;
  margin-right: 9px;
  margin-left: 10px;
  ${props => props.bgColor && `padding: 10px; border-radius: 0 5px 5px 5px;`}
`;

export const Text = styled(TextP)`
  color: ${props => props.theme.lightBlack};
  display: inline;
  .name {
    font-family: Gilroy-Bold;
    padding-right: 5px;
  }
`;
