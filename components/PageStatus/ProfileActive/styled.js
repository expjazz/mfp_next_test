import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  .back-header {
    position: absolute;
    z-index: 10;
    right: 15px;
    top: 15px;
    .header-wrp {
      justify-content: flex-end;
    }
    ${media.webView} {
      position: absolute;
      right: 25px;
      top: 25px;
    }
    ${media.largeScreen} {
      position: absolute;
    }
  }

  .heading {
    padding-bottom: 20px;
  }
  .react-datepicker__input-container {
    width: 100%;
    min-width: 260px;
    background: #fff;
    border-radius: 10px;
  }
  .active-btn {
    margin-top: 20px;
  }

  .dt-wrap {
    position: relative;
    .input-underline {
      border: 1px solid ${props => props.theme.borderGrey};
      border-radius: 5px;
      height: 45px;
      ::before,
      ::after {
        border-bottom: none !important;
      }
    }
    .input-field {
      text-align: left;
    }
    .cal-icon {
      right: 15px;
      position: absolute;
      top: 9px;
      font-size: 26px;
      pointer-events: none;
    }
  }
`;
