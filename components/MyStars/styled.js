import styled from '@emotion/styled';
import { css } from '@emotion/react'
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  .title {
    ${media.webView} {
      text-align: left;
      font-size: 24px;
    }
  }
  margin-bottom: 30px;
  height: 100%;
/*
  height: calc(100vh - 170px);
  ${props => props.height && `height: ${props.height}px`}; */
`;

export const Content = styled.div`
  display: flex;
`;

const modalStyle = props => css`
  .name {
    font-family: Gilroy-Bold;
    font-size: 20px;
    color: ${props.theme.flatBlue};
  }
  .exp-wrp {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .count {
      font-family: Gilroy;
      line-height: 21px;
      font-size: 14px;
    }
    .expiry {
      color: #cc0000;
      line-height: 21px;
      font-family: Gilroy-Bold;
    }
  }
`;

export const LeftSection = styled.div`
  ${media.largeScreen} {
    padding-right: 30px;
  }
  ${modalStyle}
  ${media.mobileScreen} {
    width: 100%;
  }
  ${media.mobileScreen} {
    padding: 50px 15px 0;
  }
  .back-header {
    position: absolute;
    top: 80px;
    padding: 0;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  .tab-wrap {
    position: relative;
  }
  .request-content {
    margin-top: 20px;
    height: 100%;
  }
  ${modalStyle}
`;

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  ${media.modalView} {
    height: calc(100% - 150px);
  }
  ${modalStyle}
  .request-content {
    height: 100%;
    ${media.modalView} {
      margin-top: 150px;
    }
  }
`;

export const EmptyText = styled.span`
  display: flex;
  font-family: Gilroy-Medium;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  ${media.mobileScreen} {
    padding-bottom: 20px;
  }
`;
