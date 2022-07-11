import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1444;
  padding: 10px;
  margin-top: 10px;
  background-color: ${props => props.theme.white};
  ${media.largeScreen} {
    background-color: ${props => props.theme.pureWhite};
  }
  .close {
    right: 10px;
    top: 10px;
    z-index: 0;
    ::after,
    ::before {
      background-color: ${props => props.theme.flatBlue};
    }
  }
  .drag-wrper {
    padding-right: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .drag-icon {
      font-size: 30px;
      margin-right: 3px;
      color: ${props => props.theme.brownGrey};
    }
  }

  .img-wrp {
    display: flex;
    align-items: center;
    .img-star {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin: 0;
      margin-right: 10px;
      ${media.mobileScreen} {
        width: auto;
        min-width: 44px;
      }
    }
    .img-wrp {
      display: flex;
      align-items: center;
    }
    .content {
      display: flex;
      flex-direction: column;
      .cat {
        font-family: Gilroy-Medium;
        font-size: 13px;
        color: ${props => props.theme.greyishBrown};
      }
      .name {
        font-family: Gilroy-Bold;
        font-size: 17px;
        color: ${props => props.theme.flatBlue};
      }
    }
  }
`;
