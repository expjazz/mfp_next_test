import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  width: 100%;
  padding: 0 15px 15px;
  ${media.modalView} {
    height: calc(100% - 55px);
    padding: 30px 50px 35px;
    max-width: 661px;
    margin-left: 25px;
  }
  ${media.largeScreen} {
    padding: 35px 50px 35px;
    background: ${props => props.theme.white};
  }
  .share-btn {
    height: 44px;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  ${media.modalView} {
    height: calc(100% - 175px);
  }
  .time {
    font-family: Gilroy-Medium;
    font-size: 10px;
    color: ${props => props.theme.lightGrey};
  }
  #suggestion-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }

    li {
      border-radius: 0 5px 5px 5px;
      margin-top: 10px;
      padding-bottom: 0;
      ${media.mobileScreen} {
        background: none;
        .new-wrp {
          background: #f6f6f6;
          border-radius: 0 5px 5px 5px;

          p {
            font-size: 14px;
            line-height: 21px;
          }
        }
      }
    }
  }
  .pagination-wrapper {
    padding-top: 20px;
    .left-arrow,
    .right-arrow {
      order: unset;
    }
  }
  .btn-wrp {
    padding-top: 20px;
  }

  .heading {
    ${media.mobileScreen} {
      padding-bottom: 5px;
    }
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  background-color: ${props => props.theme.white};
  margin-top: 10px;
  display: flex;
  position: relative;
  flex-direction: column;
  font-family: Gilroy;
  font-size: 14px;
  padding-top: 10px;
  ${props => props.newSuggest && `
    padding-top: 30px;
  `}
  ${media.largeScreen} {
    background-color: ${props => props.theme.pureWhite};
  }
  .content-wrap {
    position: relative;
    display: flex;
    padding-bottom: 10px;
    ${media.webView} {
      padding-left: 10px;
      padding-right: 10px;
      ${props => props.read && `padding-top: 10px`};
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-family: Gilroy;
    .fan-name {
      font-family: Gilroy-Bold;
    }
  }
  .new-sug {
    font-family: Gilroy-bold;
    font-size: 15px;
    text-align: center;
    color: ${props => props.theme.pureWhite};
    background-color: ${props => props.theme.orangePink};
    padding: 2px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .new-wrp {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
`;
