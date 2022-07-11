import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  max-width: 830px;
  ${media.largeScreen} {
    max-width: 1090px;
  }
  margin: 0 auto;
  display: flex;
  ${media.mobileScreen} {
    flex-direction: column;
  }
`;

export const Center = styled.div`
  width: 600px;
  margin: 0 auto;
  ${media.mobileScreen} {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    border-right: none;
  }
  .desc-sub {
    padding-bottom: 10px;
  }
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 16px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 22px;
    padding-bottom: 5px;
  }
  .message-wrap {
    padding-bottom: 10px;
  }
  .conv-link {
    text-align: center;
    padding-bottom: 15px;
    display: block;
  }
  .btn-wrp {
    padding-top: 20px;
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
