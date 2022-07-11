import styled from '@emotion/styled';
import { Dialog } from '@material-ui/core';
import { media } from 'styles/mediaQueries';
import { Description, headingStyle, LinkStyles, LinkText, smallHead } from 'styles/TextStyled';
import { Wrapper } from '../styled';

export const CheckWrapper = styled.span`
  display: flex;
  padding-bottom: 4px;
  ${Description} {
    margin-top: 5px;
  }
`;

export const Link = styled(LinkText)`
  display: inline;
`.withComponent('a');

export const ColCode = styled.span`
  width: 20px;
  height: 20px;
  display: block;
  margin-top: 8px;
  background-color: ${props => props.colorCode};
`;

export const SectionWrap = styled.section`
  padding-bottom: 20px;
  .input-underline {
    display: inline-flex;
    justify-content: center;
    .input-field {
      max-width: 100px;
      text-align: left;
    }
  }
  .action-btn {
    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }
  }

  .send-btn {
    display: block;
    margin: 10px auto;
  }
  .copy-btn {
    padding-top: 15px;
  }
  .deliver-drop {
    ul {
      z-index: 10;
    }
  }
  &.drop-wrp {
    padding-bottom: 10px;
  }
  ${props => props.isolate ? 'isolation: isolate;': ''}
`;

export const Wrap = styled(Wrapper)`
  width: 100%;
  .note {
    line-height: 15px;
    padding-bottom: 20px;
    font-size: 12px;
    padding-top: 7px;
  }
  .error-msg {
    font-size: 12px;
    font-family: Gilroy-Medium;
    color: #980100;
    margin-top: 5px;
    display: block;
  }
  .following {
    padding-top: 5px;
  }
  .btns {
    padding-bottom: 20px;
    .action-btn {
      margin-left: 10px;
    }
  }
  .note-text {
    font-size: 12px;
    a {
      font-size: 12px;
    }
  }
  .bold-text {
    font-weight: 700;
  }
`;

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      /* max-height: 700px; */
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      /* max-height: 650px; */
    }
    @media (max-width: 831px) {
      max-height: none;
      margin: 0;
    }
  }
`;

export const PlanContent = styled.section`
  padding: 15px;
  display: flex;
  flex-direction: column;
  .heading {
    ${props => headingStyle(props)};
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    text-align: left;
    margin-bottom: 10px;
  }
  .small-head {
    ${smallHead};
  }
  .link-desc {
    margin-top: 15px;
  }
  .link {
    ${LinkStyles};
  }
  .action-btn {
    max-width: 150px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .terms-modal {
    background: ${props => props.theme.white};
    ${media.webView} {
      background: ${props => props.theme.pureWhite};
    }
    .cus-text {
      font-size: 20px;
      line-height: 25px;
      margin-bottom: 20px;
    }
  }
  .btn-confirm-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }
  .btn-keep {
    margin-bottom: 10px;
  }
`;