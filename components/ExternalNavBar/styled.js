import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';


export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
  width: 100%;
  @media (max-width: 992px) {
    width: 100%;
    /* padding: 0 15px; */
  }
`;

export const HeaderSection = styled.header`
  position: relative;
  transform: translate3d(0, 0, 200px);
  -webkit-transform:translate3d(0,0,200px);
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.customBlack};
  height: auto;
  z-index: 12;
  display: flex;
  justify-content: center;
  .starsona-logo {
    /* position: relative; */
    /* width: 100%; */
    height: auto;
    min-width: 100px;
    min-heigth: 18px;
    ${media.webView} {
      min-height: 35px;
      min-width: 160px;
    }
      ${props =>
		props.small
			? `
      width: 36px;
      height: auto;
    `
			: `
      height: 22px;
    `}
    ${props => props.isSuperSport ? 'width: 100px !important; height: auto !important;' : ''}
    /* @media (min-width: 1280px) {
      height: 35px;
    } */
  }


`;

export const ImgLogo = styled.img`
  ${props =>
		props.small
			? `
    width: 36px;
    height: auto;
  `
			: `
    height: 32px;
  `}
  ${props => props.isSuperSport ? 'width: 100px !important; height: auto !important;' : ''}
  @media (min-width: 1280px) {
    height: 35px;
  }
`;