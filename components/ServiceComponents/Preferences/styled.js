import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 0;
  background-color: ${props => props.theme.pureWhite};
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${media.modalView} {
    height: calc(100% - 60px);
    padding-top: 0;
  }
  ${media.largeScreen} {
    /* background-color: ${props => props.theme.white}; */
    position: relative;
    margin-top: 8px;
    padding-top: 0;
    max-width: 700px;
    justify-content: flex-start;
  }
  .title {
    ${media.mobileScreen} {
      padding-bottom: 5px;
      padding-top: 15px;
      font-size: 24px;
    }
  }
`;
