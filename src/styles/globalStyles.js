import { Global, css } from '@emotion/react'
import { media } from '../../styles/mediaQueries'
/* eslint-disable */
const GlobalStyle = () => (
  <>
  <Global styles={css`

  html, body {
    width: 100%;
    padding: 0;
    font-family: 'Gilroy-Light';
    color: #333333;
    margin: 0;
  }
  *{
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
	ul,li{
    list-style-type: none;
    padding: 0;
    margin: 0;
	}

	h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
    font-weight: normal;
	}

	a {
    text-decoration: none;
    color: inherit;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }
  #moreoptions-popper {
    @media(max-width: 832px) {
    & > div:nth-child(2){
        width:100%;
        top: initial !important;
        bottom: 10px;
        transition: none !important;
        position: absolute;
        animation-name: animatebottom;
        animation-duration: 0.2s
      }
    }
  }
  @keyframes animatebottom {
    from{ bottom:-100%; opacity:0 }
    to{ bottom:0; opacity:1 }
  }
  #launcher-frame {
    min-width: auto !important;
    max-width: 88px !important;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: -2px;
    left: 0;
    cursor: pointer;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 1px solid #EBEBEB;
    @media(min-width:768px){
      left:0px;
      height: 25px;
      width: 25px;
    }
    @media(min-width: 1025px){
      left:0px;
      height: 24px;
      width: 24px;
      top: -2px;
    }
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
      content: "";
      position: absolute;
      display: none;
  }
  /* Style the checkmark/indicator */
  .react-datepicker__current-month, .react-datepicker-time__header {
    margin-top: 0;
    color: ${props => props.theme.orangePink} !important;
    font-weight: normal !important;
    font-family: 'Avenir-Medium';
    font-size: 0.944rem;
  }
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
    border-radius: 0.3rem;
    background-color: ${props => props.theme.orangePink} !important;
    color: #fff;
  }
  .react-datepicker__portal .react-datepicker__navigation--next {
    border-left-color:  ${props => props.theme.orangePink} !important;
    outline: none !important;
  }
  .react-datepicker__portal .react-datepicker__navigation--previous {
    border-right-color: ${props => props.theme.orangePink} !important;
    outline: none !important;
  }
  .react-datepicker__day-names, .react-datepicker__week {
    white-space: nowrap;
    font-family: 'Avenir-Regular';
  }

  input[type='file']{
    opacity: 0;
    cursor: pointer;
}

.common-button-nobr {
  border: 0;
}
.no-focus {
  &:focus {
    outline: none;
  }
}
.align-center {
  .common-btn {
    margin: 0 auto;
  }
}
.alternate-modal-root {
  padding: 40px 14px !important;
}
.custom-modal{
  padding: 75px 0;
  &.profile-modal {
    @media(max-width: 831px) {
      padding: 0;
      & > div {
        margin: auto;
        min-height: 100%;
      }
    }
  }
}
.pac-container {
  z-index: 1400;
}
.small-mq-img {
    display: none !important;
    ${media.mobileScreen} {
      display: block !important;
    }
  }
.medium-mq-img {
  display: none !important;
  ${media.modalView} {
    display: block !important;
  }
}
.big-mq-img {
  display: none !important;
  ${media.largeScreen} {
    display: block !important;
  }
}
`
    
} 

/>
</>
)


export default GlobalStyle