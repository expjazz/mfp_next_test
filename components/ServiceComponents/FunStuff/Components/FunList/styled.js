import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  ${media.modalView} {
    height: calc(100% - 204px);
  }
  #funlist-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      margin: 0 !important;
    }
  }
`;

export const Ul = styled.ul`
  width: 100%;
  height: 100%;
`;

export const Li = styled.li`
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  ${media.largeScreen} {
    background-color: ${props => props.theme.pureWhite};
  }
  margin: 10px auto;
  min-height: 90px;
  padding: 15px;
  margin-bottom: 10px;
  ${media.modalView} {
    z-index: 10001;
  }
  &:hover {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  }
  .content-wrap {
    display: flex;
    align-items: center;
    .right-content {
      display: flex;
      flex-direction: column;
      width: calc(100% - 70px);
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
    }
    .head {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
      font-size: 14px;
      line-height: 21px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .text {
      font-family: Gilroy;
      font-size: 14px;
      line-height: 21px;
      color: ${props => props.theme.greyishBrown};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hidden {
      color: #990000;
      font-family: Gilroy-Semibold;
    }
    .amount {
      font-family: Gilroy-Bold;
    }
    .amt-wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
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
`;

export const Image = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
  background: ${props => (props.image ? `url(${props.image})` : '#333')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const PlaceholderImage = styled.span`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  text-align: center;
  color: #ccc;
`;

export const NoImageText = styled.div`
  font-size: 12px;
`;
