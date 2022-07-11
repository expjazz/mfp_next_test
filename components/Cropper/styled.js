import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  position: relative;
  .save-btn-crop {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .dashed-h,
  .dashed-v {
    display: none;
  }
  .drag {
    display: flex;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    ${media.webView} {
      top: 50%;
    }
    transform: translate(-50%, -50%);
    width: 200px;
    height: 40px;
    border-radius: 5px;
    color: ${props => props.theme.pureWhite};
    background-color: rgba(0, 0, 0, 0.4);
    padding: 10px;
    font-size: 14px;
    font-family: Gilroy;
    .cam-icon {
      margin-right: 15px;
    }
  }
`;
