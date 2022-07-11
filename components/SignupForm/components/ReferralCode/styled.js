import styled from '@emotion/styled';
import { media } from "styles/mediaQueries";
import { largeHeading, descStyles } from 'styles/TextStyled';

const ReferralCodeWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1280px) {
    height: calc(100% - 55px);
  }
`;

ReferralCodeWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

ReferralCodeWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:768px){
    padding: 10px 29px;
  }
`;

ReferralCodeWrapper.HeaderText = styled.div`
  padding-top: 30px;
  ${largeHeading};
  padding-bottom: 10px;
  margin: 0 auto;
  ${media.mobileScreen} {
    padding-bottom: 30px;
  }
  .dots-container {
    margin-top: 11px;
  }
`;

ReferralCodeWrapper.Description = styled.div`
  ${descStyles};
  text-align: left;
`;

ReferralCodeWrapper.WrapsInput = styled.div`
  width:100%;
  padding-top: 20px;
  .input-root .input-field {
    text-align: left;
  }
`;

ReferralCodeWrapper.ButtonWrapper = styled.div`
  text-align:center;
  padding-bottom: 20px;
  @media(min-width: 832px){
    position: absolute;
    bottom: 73px;
    margin: auto;
    left: 0;
    right: 0;
    padding-bottom: 0;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    bottom: 24px
  }
`;

export default ReferralCodeWrapper;
