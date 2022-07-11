import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Image } from 'styles/CommonStyled';
import { ListItem } from '../styled';

export const Li = styled(ListItem)`
  cursor: auto;
  .follow-head {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.greyishBrown};
  }
  .list-root {
    height: 140px;
    .list-content {
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  padding-right: 13px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  .follow-btn {
    min-height: 16px;
    min-width: 50px;
    border-radius: 0;
    font-size: 10px;
    margin-top: 5px;
  }
  .name {
    font-family: Gilroy;
    font-size: 11px;
    color: ${props => props.theme.greyishBrown};
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

export const Photo = styled(Image)`
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin: 0;
  min-width: 75px;
`;
