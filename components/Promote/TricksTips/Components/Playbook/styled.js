import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  height: 100%;
  ${media.mobileScreen} {
    padding: 15px 15px 35px;
  }
  ${media.largeScreen} {
    padding: 30px 50px 35px;
  }
  ${media.webView} {
    padding: 30px 50px 35px;
    max-width: 661px;
    margin-left: 25px;
  }
  .scroll-root {
    ${media.largeScreen} {
      position: static !important;
      overflow: initial !important;
    }
    ${media.mobileScreen} {
      position: static !important;
      overflow: initial !important;
      margin-top: 20px;
    }
    #inner-scroll {
      ${media.largeScreen} {
        position: static !important;
        overflow: hidden !important;
        margin: 0 !important;
      }
      ${media.mobileScreen} {
        position: static !important;
        overflow: hidden !important;
        margin: 0 !important;
      }
    }
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.img`
  width: 100%;
  margin-bottom: 10px;
  @media (min-width: 832px) {
    width: 400px;
  }
`;

export const ModalWrap = styled.div`
  ${media.webView} {
    position: relative;
    height: 100%;
  }
`;

export const ListKicker = styled.span`
  font-size: 14px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.brownGrey};
`;

export const ListDescription = styled.span`
  font-family: ${props => (props.bold ? 'Gilroy-Bold' : 'Gilroy')};
  font-size: 14px;
  line-height: 23px;
  color: ${props => props.theme.greyishBrown};
`;

export const ListHeading = styled.span`
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 27px;
  color: ${props => props.theme.flatBlue};
`;

export const PlayList = styled.ul`
  width: 100%;
`;

export const PlayListItem = styled.li`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:first-child {
    margin-top: 12px;
  }
`;

export const SmallHeading = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 20px;
  display: block;
`;

export const ChildLayout = styled.section`
  width: 100%;
  height: 100%;
  ${media.webView} {
    padding-top: 0;
  }
  ${media.modalView} {
    padding-top: 50px;
  }
  ${media.largeScreen} {
    margin-top: 20px;
  }
  .back-header {
    padding: 0;
    position: absolute;
    top: 80px;
    left: 15px;
    width: calc(100% - 30px);
    ${media.webView} {
      top: -10px;
      left: -25px;
    }
    ${media.modalView} {
      top: 0;
      left: 0;
    }
    ${media.mobileScreen} {
      .header-wrp {
        padding-top: 0;
      }
    }
    .right-section {
      display: none;
      ${media.mobileScreen} {
        display: block;
      }
    }
    .back-lbl-wrp {
      ${media.webView} {
        display: flex;
      }
    }
  }
  .sub-head {
    padding-bottom: 10px;
  }
`;
