import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card, FlexBoxSB } from 'styles/CommonStyled';
import { Heading } from 'styles/TextStyled';
import { Container, Wrapper } from '../styled';

export const Layout = styled(Container)`
  ${media.modalView} {
    height: calc(100% - 55px);
  }
`;

export const Wrap = styled(Wrapper)`
  width: 100%;
  .heading {
    padding-bottom: 10px;
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
  .list-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 20px;
    .list-item {
      width: 48%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: ${props => props.theme.white};
      border-radius: 5px;
      color: ${props => props.theme.greyishBrown};
      font-size: 14px;
      ${media.largeScreen} {
        background: ${props => props.theme.pureWhite};
      }
    }
  }
  #analytics-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
`;

export const Label = styled.span`
  font-family: Gilroy-Semibold;
`;
export const Value = styled.span`
  font-family: Gilroy-Bold;
  font-size: 26px;
  line-height: 30px;
  .rating-star {
    font-size: 14px;
  }
  .rate-val {
    font-size: 14px;
    padding-left: 10px;
  }
  &.blue-val {
    color: ${props => props.theme.flatBlue};
  }
`;

export const DetailsCard = styled(Card)`
  ${media.largeScreen} {
    background: ${props => props.theme.pureWhite};
  }
  padding: 15px;
  margin-bottom: 10px;
`;

export const SubHead = styled(Heading)`
  color: ${props => props.theme.greyishBrown};
  font-size: 14px;
`;

export const DetailsItem = styled(FlexBoxSB)`
  align-items: center;
  color: ${props => props.theme.greyishBrown};
  font-size: 14px;
  border-bottom: 1px solid ${props => props.theme.brownGreyTwo};
  .details-lbl {
    font-family: Gilroy;
  }
  .details-value {
    font-size: 14px;
    font-family: Gilroy;
  }
  .bold-lbl,
  .bold-value {
    font-family: Gilroy-Bold;
  }
  &.no-border {
    border-bottom: none;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  background-color: ${props => props.theme.white};
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-family: Gilroy;
  font-size: 14px;
  ${media.largeScreen} {
    background-color: ${props => props.theme.pureWhite};
  }
  .content-wrap {
    display: flex;
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    ${media.webView} {
      background: ${props => props.theme.white};
    }
    .card {
      display: flex;
      justify-content: space-between;
      .icon {
        width: 30px;
      }
    }
  }
  .links {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    span {
      font-size: 14px;
    }
  }
  ${props =>
    !props.public &&
    `.icon, .rea-rec, .time, .opacity {
    opacity:.5;
  } `}
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
`;
