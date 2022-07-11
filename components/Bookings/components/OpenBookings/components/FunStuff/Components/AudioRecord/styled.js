// import styled from '@emotion/styled'
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

const horizontalSpacing = css`
  margin-bottom: 15px;
`;

export const RecordWrap = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.greyishBrown};
  line-height: 25px;
  .record-time {
    font-size: 21px;
    text-align: center;
  }
`;

export const Wrap = styled.section`
  .record-icon {
    margin-right: 5px;
    font-size: 17px;
  }
  .horiz-btns {
    ${horizontalSpacing};
  }
  .recording-time {
    padding: 0;
    ${horizontalSpacing};
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  padding: 10px;
  background: ${props => props.theme.white};
  border-radius: 5px;
  margin-top: 10px;
  .image {
    display: block;
    margin-top: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  .file-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .file-name {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
    }
    .file-size {
      padding: 5px 0;
      font-family: Gilroy;
      color: ${props => props.theme.greyishBrown};
    }
    .link-btn {
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy-Bold;
      cursor: pointer;
    }
  }
  .close {
    top: 10px;
    right: 10px;
    ::before,
    ::after {
      background-color: ${props => props.theme.flatBlue};
    }
  }
`;
