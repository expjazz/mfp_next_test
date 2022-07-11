import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { largeHeading } from 'styles/TextStyled';

export const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto 15px;
  .web-back {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    display: ${props => !props?.isVodacom ? 'none' : 'block'};
    ${media.webView} {
      display: block;
    }
  }
  .back-top {
    left: 0;
    top: 0;
  }
  .promo-switch {
    width: 100%;
    text-align: center;
    padding-bottom: 5px;
  }
  .or-text {
    padding-left: 10px;
    padding-right: 10px;
  }
  .login-wrapper {
    min-width: 350px;
  }
  .details-head {
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    font-size: 18px;
    padding-top: 20px;
    display: block;
    padding-bottom: 10px;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const HeadingH1 = styled.h1`
  ${largeHeading};
  font-family: Gilroy-Medium;
  padding-bottom: 18px;
  text-transform:uppercase;
  text-align: center;
  ${media.webView} {
    font-size: 30px;
  }
  color: ${props =>
		props.theme.accent ? props.theme.accent : props.theme.orangePink};
`;

export const HeadingH2 = styled.h2`
  font-size: 20px;
  font-family: Gilroy-Bold;
  line-height: 27px;
  display: block;
  text-align: center;
  font-weight: normal;
  padding-bottom: 5px;
  ${media.mobileScreen} {
    padding-bottom: 5px;
  }
  ${largeHeading};
  font-family: Gilroy-Medium;
  padding-bottom: 10px;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  color: ${props =>
		props.theme.accent ? props.theme.accent : props.theme.orangePink};
`;

export const HeadingH2B = styled.h2`
  ${largeHeading}
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 10px;
  font-family: Gilroy;
`;

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 18px;
  color: ${props => props.theme.greyishBrown};
`;

export const Hr = styled.hr`
  margin-top: 40px;
  display: ${props => (props.mob ? 'block' : 'none')};
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  ${media.webView} {
    display: block;
  }
`;

export const ButtonWrap = styled.div`
  justify-content: space-between;
  display: flex;
  ${media.webView} {
    max-width: 270px;
    margin: 15px auto 0;
  }
  ${media.mobileScreen} {
    padding: 30px;
    justify-content: center;
    background-color: ${props => props.theme.white};
    margin-top: 20px;
  }
`;
