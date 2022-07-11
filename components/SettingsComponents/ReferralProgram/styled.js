import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  ${props =>
    props.isStar
      ? `
    position: relative;
    padding: 20.7px 17.7px;
    .common-header {
      right: 0;
    }
    ${media.webView} {
      padding-top: 0;
      .common-header {
        padding: 0;
        margin-bottom: 10px;
      }
    }
  `
      : `
      ${media.webView} {
        padding-left: 0;
        padding-right: 0;
      }
      ${media.smallScreen} {
        padding-left: 0;
        padding-right: 0;
      }
      @media (max-width: 831px) {
        padding: 15px 15px 90px;
      }
      @media (max-width: 376px) {
        padding-left: 20px;
        padding-right: 20px;
      }
  `}
  .top-heading {
    padding-top: 9px;
    @media (max-width: 832px) {
      font-size: 24px;
    }
  }
  .scroll-container {
    height: auto;
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
  .link {
    color: ${props => props.theme.flatBlue};
  }
  .fan-ref-head {
    top: inherit;
    padding: 0;
    padding-right: 30px;
    ${media.webView} {
      top: inherit;
      padding-bottom: 10px;
      padding-right: 0;
    }
  }
  .bold-code {
    font-family: Gilroy-Bold;
  }
  .usd {
    display: block;
    padding-bottom: 10px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    ${media.mobileScreen} {
      text-align: center;
    }
  }
`;

export const Wrapper = styled.section`
  height: 100%;
  position: relative;
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 1280px) {
    padding: 15px 20px;
  }
  &.star-network {
  }
`;
export const Content = styled.div`
  margin-bottom: 10px;
  background: ${props => props.theme.white};
  .share .share-btn {
    min-width: auto;
    min-height: auto;
    font-size: 14px;
    width: auto;
    height: auto;
    margin-left: 15px;
    border: none;
    outline: none;
    user-select: none;
    padding: 0;
    padding-top: 1px;
    font-size: inherit;
    font-family: inherit;
    line-height: 21px;
    background: none;
    &:hover,
    &:active,
    &:focus {
      color: ${props => props.theme.flatBlue};
      box-shadow: none;
    }
    @media (min-width: 1280px) {
      margin-left: 0;
    }
  }
  ${media.webView} {
    background: ${props => props.theme.white};
  }
`;

export const Heading = styled.span`
  font-size: 18px;
  font-family: Gilroy-Bold;
  margin-top: 28px;
  display: block;
  line-height: 27px;
  color: ${props => props.theme.greyishBrown};
  ${media.mobileScreen} {
    text-align: center;
    color: ${props => props.theme.orangePink};
  }
`;
export const ListHeading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 18px;
  line-height: 27px;
  margin-top: 50px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  ${media.mobileScreen} {
    text-align: center;
    color: ${props => props.theme.orangePink};
  }
`;

Content.DetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;
Content.ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .button {
    margin-top: 10px;
    margin-right: 10px;
  }
`;
Content.ButtonText = styled.span`
  color: ${props => props.theme.greyishBrown};
`;
Content.ButtonLabel = styled.span``;
Content.Label = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  color: ${props => props.theme.lightGreyTwo};
`;
Content.Value = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 26px;
  line-height: 1.15;
  text-align: left;
  color: ${props => props.theme.bold2};
  &.color-orange {
    color: ${props => props.theme.orangePink};
  }
`;
Content.ItemWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 8px;
  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
  }
`;
Content.SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &.profile-actions {
    flex-direction: row;
    align-items: center;
  }
  font-size: 14px;
  font-family: Gilroy-Regular;
  line-height: 21px;
  color: ${props => props.theme.greyishBrown};
  @media (min-width: 1280px) {
    min-height: 42px;
    &.profile-actions {
      flex-direction: column;
    }
    width: 286px;
  }
`;

Content.Item = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  @media (min-width: 1280px) {
    margin-right: 126px;
    margin-bottom: 0;
  }
`;
export const UserImage = styled.span`
  background: ${props =>
    props.userImage
      ? `url(${props.userImage})`
      : 'url(/images/default-cover.jpg)'};
  background-repeat: no-repeat;
  background-position: center center;
  width: 60px;
  height: 60px;
  background-size: cover;
  border-radius: 5px;
`;
Content.Link = styled.div`
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
`;
Content.StarName = styled.div`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: ${props => props.theme.greyishBrown};
`;
Content.ReadMore = styled.span`
  padding: 0;
  height: auto;
  cursor: pointer;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.flatBlue};
`;
