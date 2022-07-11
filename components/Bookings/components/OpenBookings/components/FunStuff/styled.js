import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 0;
  ${media.largeScreen} {
    padding-left: 35px;
    padding-right: 35px;
    margin-top: 12px;
  }
  .capitalize::first-letter {
    text-transform: uppercase;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .platform-sec {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
  .req-sec {
    padding-bottom: 15px;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .upload-desp {
    margin-top: 8px;
    font-size: 12px;
    line-height: 17px;
  }
  .note {
    display: block;
    margin-bottom: 15px;
  }
  .info {
    font-family: Gilroy-Medium;
    text-align: center;
    padding-top: 10px;
    display: block;
  }
  .close-btn {
    top: 10px;
    display: block;
    cursor: pointer;
  }
  .deliver-wrp {
    .cancel-deli {
      padding-top: 10px;
    }
  }
  .text-pad {
    padding-bottom: 15px;
    display: block;
  }
  .fan-image {
    display: flex;
    align-items: center;
  }
  .deliveryBtn {
    padding-bottom: 15px;
  }
`;

export const Ul = styled.ul`
  width: 100%;
`;

export const ListWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 18px;
  color: ${props => props.theme.greyishBrown};
`;
