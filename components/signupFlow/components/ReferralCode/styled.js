import styled from '@emotion/styled';
import { media } from "styles/mediaQueries"

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
  font-family: Gilroy;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${props => props.theme.orangePink};
  padding-bottom: 30px;
  margin: 0 auto;
  ${media.mobileScreen} {
    padding-bottom: 30px;
  }
  .dots-container {
    margin-top: 11px;
  }
`;

ReferralCodeWrapper.Description = styled.div`
  font-family: Gilroy;
  font-size: ${props => (props.error ? '12px' : '14px')};
  line-height: 1.57;
  letter-spacing: normal;
  text-align: center;
  color: ${props => (props.error ? '#990000' : '#7c7c7c')};
`;

ReferralCodeWrapper.WrapsInput = styled.div`
  width:100%;
  padding-top: 20px;
  input {
    font-family: Gilroy;
    font-size: 22px;
    text-align: center;
    color: ${props => props.theme.twilight};
    width: 100%;
    &::-webkit-input-placeholder {
      font-size: 18px;
    }
    &:-moz-input-placeholder {
      font-size: 18px;
    }
    &::-moz-input-placeholder {
      font-size: 18px;
    }
    &:-ms-input-placeholder {
      font-size: 18px;
    }
  }
  input:focus::-webkit-input-placeholder { color:transparent; }
  input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
  input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
  input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
`;

ReferralCodeWrapper.ButtonWrapper = styled.div`
  text-align:center;
  margin-top: 85px;
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
