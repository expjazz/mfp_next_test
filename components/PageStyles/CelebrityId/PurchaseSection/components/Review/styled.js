import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Description } from 'styles/TextStyled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.white};
  margin-top: 40px;
  padding: 15px;
  .list-li {
    padding-bottom: 14px;
  }
  ${media.webView} {
    width: 330px;
    margin-left: 64px;
    margin-top: 0;
    background-color: ${props => props.theme.pureWhite};
  }
`;

export const RateWrap = styled.div`
  padding-bottom: 10px;
  display: flex;
  ${media.mobileScreen} {
    justify-content: center;
  }

  align-items: center;
  .rating-star {
    color: #615195;
    margin-right: 3px;
  }
  .review-text {
    font-family: Gilroy;
    font-size: 13px;
    padding-left: 10px;
  }
`;

export const Desc = styled(Description)`
  font-family: Gilroy-LightItalic;
  font-size: 14px;
  span {
    font-family: Gilroy-Medium;
  }
`;

export const ButtonWrap = styled.div`
  width: 260px;
  margin: 15px auto 0;
  justify-content: space-between;
  display: flex;
  ${media.webView} {
    display: none;
  }
  .share-page {
    min-width: 122px;
    min-height: 30px;
  }
`;
