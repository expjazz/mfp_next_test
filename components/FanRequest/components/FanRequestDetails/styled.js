import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { media } from 'styles/mediaQueries';

const commonStyles = css`
  .success-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .success-title {
      font-family: Gilroy-Semibold;
      color: ${props => props.theme.greyishBrown};
      font-size: 24px;
      text-align: center;
    }
    .success-msg {
      font-size: 16px;
      font-family: Gilroy;
      color: #555555;
      line-height: 22px;
      display: block;
      padding-top: 10px;
      word-break: break-word;
      ${media.mobileScreen} {
        text-align: center;
      }
    }
    .view_req {
      margin-top: 10px;
    }
  }
  .img-content {
    display: flex;
  }
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .fa-download {
      font-size: 24px;
      color: ${props => props.theme.flatBlue};
    }
    .download {
      font-size: 10px;
    }
  }
`;
export const Layout = styled.div`
  .action-parent {
    min-height: auto;
  }
  ${commonStyles}

  .detail-value {
    font-size: 18px;
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy-Bold;
    display: flex;
    justify-content: center;
  }
`;

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  ${media.modalView} {
    height: calc(100% - 135px);
  }
  .action-parent {
    min-height: auto;
  }
  ${commonStyles}
`;
