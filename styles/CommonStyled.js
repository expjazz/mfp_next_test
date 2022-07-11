import { css} from '@emotion/react';
import styled from '@emotion/styled';
import AvatarContainer from 'components/StarBlock/styled';
import { media } from './mediaQueries';
import HomeStyled from 'components/PageStyles/V3Home/styled';

export const FlexBoxSB = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: ${props => props.theme.links};
  }
`;

export const Loading = styled.section`
  position: fixed;
  justify-content: center;
  display: flex;
  z-index: 9999;
  width: 100%;
  flex-direction: column;
  background: #bdbcbc;
  opacity: 0.8;
  min-height: 100%;
  top: 0;
  left: 0;
`;

export const BackArrow = styled.span`
  background: ${props =>
		props.white
			? 'url(\'..//images/previcon-white.svg\') no-repeat'
			: 'url(\'..//images/previcon.svg\') no-repeat'};
  content: '';
  background-size: 14px 28px;
  position: absolute;
  left: 15px;
  top: 39px;
  cursor: pointer;
  padding: 15px;
  ${media.webView} {
    left: 50px;
    top: 50px;
    padding: 0;
    width: 14px;
    height: 28px;
  }
`;

export const CloseButton = styled.span`
  background: ${props =>
		props.white
			? 'url(\'/images/closeicon-white.svg\') no-repeat'
			: 'url(\'/images/closeicon.svg\') no-repeat'};
  content: '';
  background-size: 23px 23px;
  position: absolute;
  right: 11px;
  top: 40px;
  cursor: pointer;
  padding: 15px;
  ${media.webView} {
    width: 23px;
    height: 33px;
    right: 50px;
    top: 50px;
    padding: 0;
  }
`;

export const NotificationCount = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-family: Gilroy-Medium;
  font-size: 16px;
  background-color: ${props => props.theme.flatBlue};
`;

export const Card = styled.div`
  border-radius: 5px;
  background-color: ${props => props.theme.white};
`;

export const TickText = styled.span`
  color: ${props => props.theme.orangePink};
  font-size: 14px;
  font-family: Gilroy-Medium;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  :before {
    content: '';
    display: inline-block;
    height: 6px;
    width: 10px;
    border-right: 2px solid ${props => props.theme.orangePink};
    border-top: 2px solid ${props => props.theme.orangePink};
    transform: rotate(130deg);
    margin-bottom: 8px;
    margin-right: 7px;
  }
`;

export const SectionHead = styled.span`
  font-size: 18px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.boldBrown};
`;

export const EmptyText = styled.span`
  display: flex;
  font-family: Gilroy-Medium;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  ${props =>
		!props.noPadding &&
    `
    padding-bottom: 80px;
    ${media.mobileScreen} {
      padding-bottom: 20px;
    }
  `}
`;

export const PopupHeading = styled.span`
  font-family: Gilroy-Regular;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
`;

export const Strike = styled.strong`
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 14px;
  ::before {
    position: absolute;
    content: '';
    left: 0;
    top: 43%;
    right: 0;
    border-top: 2px solid;
    border-color: inherit;

    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -o-transform: rotate(-5deg);
    transform: rotate(-18deg);
  }

  ${AvatarContainer.Price} & {
    font-weight: normal;
    font-size: 11px;
    padding-left: 0;
    ::before {
      position: absolute;
      content: '';
      left: 0;
      top: 43%;
      right: 0;
      border-top: 1px solid;
      border-color: inherit;
      width: 37px;
      -webkit-transform: rotate(-5deg);
      -moz-transform: rotate(-5deg);
      -ms-transform: rotate(-5deg);
      -o-transform: rotate(-5deg);
      transform: rotate(-18deg);
    }
  }
  ${HomeStyled} & {
    font-weight: normal;
    font-size: 11px;
    padding-left: 0;
    ::before {
      position: absolute;
      content: '';
      left: 0;
      top: 43%;
      right: 0;
      border-top: 1px solid;
      border-color: inherit;
      width: 37px;
      -webkit-transform: rotate(-5deg);
      -moz-transform: rotate(-5deg);
      -ms-transform: rotate(-5deg);
      -o-transform: rotate(-5deg);
      transform: rotate(-18deg);
    }
  }
`;

export const Close = styled.span`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 14px;
  height: 14px;
  opacity: 1;
  cursor: pointer;
  z-index: 10;
  :before,
  :after {
    position: absolute;
    left: 8px;
    content: ' ';
    height: 14px;
    width: 2px;
    background-color: ${props => props.theme.orangePink};
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export const Image = styled.span`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  background: ${props =>
		props.image ? `url(${props.image})` : props.theme.darkGrey};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const styles = props => css`
  font-family: Gilroy;
  font-size: 16px;
  opacity: 1;
  color: ${props.error ? props.theme.errorRed : props.theme.brownGreyTwo};
`;

export const TextArea = styled.textarea`
  resize: none;
  padding: 10px 10px;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.twilight};
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  min-height: 90px;
  border-width: 0;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-appearance: none;
  ${props => props.autoSize && 'overflow:hidden'};
  &:focus {
    outline: none;
  }
  &::placeholder {
    ${styles};
  }
  &::-webkit-input-placeholder {
    ${styles};
  }
  &::-moz-placeholder {
    ${styles};
  }
  &:-ms-input-placeholder {
    ${styles};
  }
  &:-moz-placeholder {
    ${styles};
  }
`;

export const InputWrapper = styled.div`
  padding-bottom: 30px;
  text-align: center;
  .cus-drop {
    background: ${props => props.theme.pureWhite};
    border-bottom: none;
    height: 59px;
    padding: 0;
    max-width: 100%;
    .drop-icon {
      margin-top: 10px;
      position: absolute;
      right: 4px;
      width: 13px;
      height: 13px;
    }
    .input-field {
      width: calc(100% - 40px);
      font-size: 22px;
      margin: 0 auto;
    }
  }
`;

export const Dashed = styled.label`
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy;
  font-size: 16px;
  margin: 0 auto;
  display: block;
  width: 100%;
  padding: 12px;
  min-height: 44px;
  background-color: white;
  text-align: center;
  border: dashed 1px ${props => props.theme.greyishBrown};
  cursor: pointer;
  .hidden-upload {
    display: none;
  }
`;

export const Layout = styled.div`
  padding: 15px;
  ${media.webView} {
    padding: 25px;
  }
  ${media.largeScreen} {
    padding: 35px 50px;
  }
`;

export const LinkButton = styled.span`
  font-size: 13px;
  cursor: pointer;
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy;
`;

export const HTMLContentWrapper = styled.article`
  * {
    font-family: Gilroy;
    font-size: 14px;
  }
  a {
    color: ${props => props.theme.flatBlue};
  }
  strong {
    font-family: Gilroy-Bold;
  }
  ul,
  ol {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;

export const CommonCharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 11px;
  padding-top: 3px;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 10px;
`;