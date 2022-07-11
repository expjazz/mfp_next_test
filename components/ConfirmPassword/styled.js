import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
}`;

export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 40px;
  ${media.webView} {
    max-width: 400px;
  }
  .firstTitle {
    color: ${props => props.theme.orangePink};
    padding-bottom: 3px;
    padding-top: 15px;
    font-size: 20px;
    ${media.webView} {
      padding-top: 50px;
    }
  }
  .alignPassword{
    flex-direction: column;
    margin-top: 10px;

    & > form > div:first-child,
    & > form > div:last-child {
      padding-left: 0;
      padding-right: 0;
      margin-bottom: 20px;
    }
    & > form > div:last-child {
      .error-msg {
        margin-bottom: 0;
      }
    }
    label {
      font-family: Gilroy;
      font-size: 18px;
      color: #aaa;

      &.input-label-shrink {
        font-size: 14px;
        line-height: 18px;
        color: #555;
      }
    }
  }
  .orderSuccess {
    color: ${props => props.theme.orangePink};
    font-size: 20px;
    line-height: 24px;
    width: 220px;
    margin: 0 auto;
    padding-bottom: 15px;
    ${media.webView} {
      width: 100%;
      font-size: 20px;
    }
  }
  .note {
    font-family: Gilroy;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: rgb(85, 85, 85);
    width: 100%;
    margin: 0px auto;
  }
  .browseBtn {
    width: 300px;
    height: 60px;
  }
  .skip {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    color: ${props => props.theme.twilight};
    cursor: pointer;
    font-family: Gilroy;
    font-size: 14px;
  }
`;

Content.Terms = styled.span`
  font-size: 16px;
  font-family: Gilroy-Regular;
  margin-top: 20px;
  display: block;
  @media screen and (max-width: 831px) {
    margin-top: 10px;
  }
  .link {
    color: ${props => props.theme.flatBlue};
  }
`;

Layout.ButtonWrapper = styled.div`
  margin-top: ${(props)=> props.completeUserDetails ? '20px' : '65%'};
  @media screen and (min-width: 832px) and (max-height: 720px) {
    margin-top: ${(props)=> props.completeUserDetails ? '20px' : '65%'};
  }
  @media screen and (max-width: 831px) {
    margin-top: ${(props)=> props.completeUserDetails ? '20px' : '65%'};
  }
`;

Content.WrapsInput = styled.div`
width:100%;
> div {
  width: 100%;
  @media(max-width: 832px) {
    &:first-child {
      margin-bottom: 0;
      &.no-space {
        margin-bottom: 0;
      }
    }
  }
}
.input-label {
  right: 0;
}
.input-label-shrink {
  text-align: center;
  transform: none;
  color: #555 !important;
}
input {
  font-family: Gilroy;
  font-size: 18px;
  line-height: 1.14;
  text-align: center;
  color: #555;
  text-align: center;
  &.input-label-email {
    &::-webkit-input-placeholder { font-size: 16px;}
    &:-moz-placeholder { font-size: 16px;}
    &::-moz-placeholder {  font-size: 16px;}
    &:-ms-input-placeholder { font-size: 16px;}
  }
}
input::-webkit-input-placeholder { color:#aaaaaa; opacity: 1; }
input:-moz-placeholder { color:#aaaaaa; opacity: 1; } /* Firefox 18- */
input::-moz-placeholder { color:#aaaaaa; opacity: 1; } /* Firefox 19+ */
input:-ms-input-placeholder { color:#aaaaaa; opacity: 1; } /* oldIE ;) */

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
@media(min-width:768px){
  width:100%;

  &:first-child {
    padding-right: 10px;
  }
  &:last-child {
    padding-left: 10px;
  }
  &:only-child {
    padding-left: 0;
    padding-right: 0;
  }
}
@media(min-width:1025){
  width:352px;
  font-size: 22px;
  padding-bottom: 3px;
}
.error-field {
  &:after {
    border-bottom-color: #980100 !important;
  }
}

`;

Layout.ErrorMsg = styled.div`
  color:#990000;
  font-size: 12px;
  margin-top:4px;
  font-family: Gilroy-Medium;
  text-align:left;
  margin-top: -15px;
  margin-bottom: 20px;
  min-height: 1px
  @media(max-width:831px){
    margin-top: -10px;
  }
  &.error-msg {
    min-height: 0;
    margin-bottom: 0;
  }
`;

export const FormContainer = styled.form`
`;
