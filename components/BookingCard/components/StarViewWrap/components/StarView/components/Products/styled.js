import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import StarViewStyled from '../../styled';

export const Wrapper = styled(StarViewStyled)`
  .left-section {
    min-width: 50%;
  }
  .layout {
    @media (min-width: 832px) {
      height: auto;
      flex: 1;
      flex-direction: column;
    }
  }
  .left-wrapper {
    width: 100%;
  }
  .image {
    width: 80px;
    height: 80px;
    display: block;
    margin-top: 0;
  }
  .flex-box {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .flex-col {
    flex-direction: column;
    display: flex;
  }
  .text {
    font-family: Gilroy;
    font-size: 14px;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
  .details {
    width: calc(100% - 90px);
  }
  .inpt-wrap {
    padding-top: 30px;
    padding-bottom: 30px;
    .input-wrapper {
      padding-bottom: 10px;
    }
    .common-btn {
      width: 140px;
      min-width: 140px;
      height: 30px;
      min-height: 40px;
      border-radius: 5px;
    }
  }
  .btn-wrp {
    padding-top: 10px;
  }
`;

export const ProductSection = styled.section`
  height: 100%;
  width: 100%;
`;
