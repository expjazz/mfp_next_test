import styled from '@emotion/styled';
import { media } from '../../../../styles/mediaQueries';
// import { media } from 'styles/mediaQueries';

const MessageStyled = styled.section`
  height: calc(100% - 30px);
  flex: 1;
  .msg-submit {
    margin-top: 10px;
  }
  .promo-wrap {
    margin-top: 10px;
  }
  .msg-contnet-wrp {
    background-color: ${props => props.theme.pureWhite};
    .msgTxtArea{
      ${media.mobileScreen}{
        min-height: 115px;
      }
    }
  }
  .heading-back{
    background: ${props => props.theme.pureWhite};
  }
  .card-back {
    background: url('../images/previcon-white.svg') no-repeat;
    top: -104px;
    @media(min-width: 832px) {
      top: -95px;
    }
  }
  .pay-container{
    background: ${props => props.theme.pureWhite};
    padding-top: 20px;
  }
  .scroll-section-payment {
    height: 100%;
    .scrollRenderView {
      position: static !important;
      margin: 0 !important;
      overflow: hidden !important;
      .payment-layout {
        padding-top: 10px;
        padding-bottom: 0;
      }
      .stripe-logo{
        padding-bottom: 20px;
      }
    }
  }
  .payment-header-wrapper {
    padding-top: 0;
    .payment-back {
      top: 12px;
    }
  }
  .bottom-bg{
    height: 32px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: ${props => props.theme.white};
    z-index: 1;
  }
  .con-head {
    font-size: 24px;
    font-family: Gilroy-Medium;
  }
  @media(min-width: 832px) {
    #category-list-scroll {
      .msg-contnet-wrp {
        padding-bottom: 0;
      }
    }
  }
  .unavailable{
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy-Bold;
    font-size: 16px;
    display: block;
    padding-top: 10px;
    text-align: center;
  }
`;

MessageStyled.CharCount = styled.span`
  display: block;
  text-align: right;
  margin-top: 5px;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 18px;
  color: ${props => props.theme.greyishBrown};
`;

MessageStyled.ErrorMessage = styled.div`
  color: ${props => props.theme.errorRed};
  font-family: Gilroy;
  font-size: 12px;
  @media(max-width: 831px){
    padding-bottom: 10px;
  }
`;

export default MessageStyled;
