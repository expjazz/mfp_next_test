import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  z-index: 100001;
  position: fixed;
  bottom: 15px;
  background: #fff;
  width: 100%;
  font-size: 18px;
  line-height: 23px;
  box-shadow: 1px 0px 10px 2px rgba(0, 0, 0, 0.28);
  padding: 25px;
  width: 95%;
  transform: translateX(-50%);
  left: 50%;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 830px;
    margin: 0 auto;
    ${media.mobileScreen} {
      flex-direction: column;
    }
    a {
      font-family: Gilroy-Semibold;
      color: ${props => props.theme.flatBlue};
    }
    p {
      max-width: 620px;
      ${media.mobileScreen} {
        padding-bottom: 10px;
      }
    }
  }
`;
