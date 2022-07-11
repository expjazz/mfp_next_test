import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Container = styled(Card)`
  height: 100%;
  width: 100%;
  border-radius: 0;
  background: ${props => props.theme.pureWhite};
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  padding: 0 15px 35px 15px;

  ${media.modalView} {
    padding: 15px 50px 35px;
    height: calc(100% - 60px);
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    position: relative;
    padding: 30px 50px 35px;
    margin-top: 8px;
    max-width: 661px;
    margin-left: 25px;
  }

  #discount-list-scroll {
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
  }

  .child-back-header {
    padding: 0;
    position: absolute;
    top: 80px;
    left: 15px;
    width: calc(100% - 30px);
    ${media.webView} {
      top: 25px;
      left: 25px;
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
`;

export const Wrapper = styled.section`
  .text {
    color: ${props => props.theme.greyishBrown};
    line-height: 20px;
    font-family: Gilroy;
    font-size: 14px;
  }
  .note {
    font-size: 12px;
    line-height: 16px;
    padding-top: 5px;
    display: block;
  }

  .title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;

export const Wrap = styled(Wrapper)`
  position: relative;
  width: 100%;
  height: 100%;
  ${media.modalView} {
    height: calc(100% - 85px);
    ${props => props.edit} {
      height: calc(100% - 100px);
    }
  }
  .description {
    padding-bottom: 10px;
  }
  .blue-text {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-bold;
  }
  .dashed-button {
    ${props => !props.active && `pointer-events:none; opacity: .5`};
    margin-bottom: 20px;
  }
`;

export const ModalWrap = styled(Container)`
  ${media.webView} {
    position: relative;
  }
  ${media.modalView} {
    ${props => props.isForm && 'height: calc(100% - 15px)'};
  }

  ${media.modalView} {
    ${Wrap} {
      ${props => props.edit} {
        height: calc(100% - 10px);
      }
    }
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  background: ${props => props.theme.white};
  padding: 13px;
  border-radius: 5px;
  margin-bottom: 10px;
  ${media.largeScreen} {
    background: ${props => props.theme.pureWhite};
  }
`;

export const SectionHead = styled.span`
  font-size: 14px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  line-height: 21px;
  display: block;
  width: 100%;
`;
