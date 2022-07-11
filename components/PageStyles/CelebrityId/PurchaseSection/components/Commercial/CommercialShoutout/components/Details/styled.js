import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  max-width: 830px;
  margin: 0 auto;
  display: flex;
  ${media.mobileScreen} {
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const Left = styled.div`
  width: 100%;
  .desc-sub {
    padding-bottom: 10px;
  }
  .sub-head {
    font-family: Gilroy-Bold;
  }
  .cus-drop {
    width: 100%;
    ${media.largeScreen} {
      max-width: 220px;
    }
  }
  .send-btn {
    padding-top: 20px;
  }
  .muiInput {
    width: 220px;
  }
  .login-btns {
    text-align: center;
    width: 330px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .desc-pad {
    padding-top: 10px;
  }
  .subtitile {
    margin-top: 10px;
  }
  ${props =>
    props.disabled &&
    `opacity: .4;
     pointer-events: none;
     textarea {
      background: ${props.theme.white};
     }
     .lang-dop-cls {
      background: ${props.theme.white};
     }
  `}
`;
