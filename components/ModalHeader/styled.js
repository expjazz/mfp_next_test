import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries';

export const HeaderDiv = styled.section`
  min-height: 111px;
  background: ${props => props.theme.greyishBrown};
  padding: 2px 30px 0;
  position: relative;

  :after {
    content: '';
    position: absolute;
    top: 99%;
    left: 50%;
    width: 0;
    height: 0;
    border-top: solid 20px ${props => props.theme.greyishBrown};
    border-left: solid 20px transparent;
    border-right: solid 20px transparent;
    transform: translateX(-50%);
    z-index: 1;
  }

  &.headerGlobal {
    min-height: 111px;
    margin-bottom: 35px;
    border: 10px solid #555;
    border-bottom: 0;
  }
  .back-header {
    padding: 0px 15px;
    top: 5px;
    ${media.webView} {
      padding: 12px 18px;
      top: 0;
    }
    color: ${props => props.theme.pureWhite};
    position: absolute;
    .back-lbl-wrp {
      display: block;
    }
    .header-wrp {
      ${props => !props.isBack && 'justify-content: flex-end'};
    }
    .right-section {
      .help-text {
        display: none;
      }
    }
  }
`;

export const Image = styled.span`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 8px 13px 0 rgba(0, 0, 0, 0.28);
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
