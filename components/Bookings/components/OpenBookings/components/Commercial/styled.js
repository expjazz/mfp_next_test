import Dialog from '@material-ui/core/Dialog';
import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';
import { headingStyle, smallHead, LinkStyles } from 'styles/TextStyled';

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
    padding-bottom: 10px;
    padding-top: 10px;
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
  .head-pad {
    padding-top: 10px;
  }
`;

export const Ul = styled.ul`
  width: 100%;
`;

export const ListWrapper = styled.section`
  display: flex;
  justify-content: center;
  .commercial-list {
    margin-bottom: 0;
    margin-top: 10px;
  }
`;

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 18px;
  color: ${props => props.theme.greyishBrown};
`;

export const AlertDialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      max-height: 700px;
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
    @media (max-width: 831px) {
      max-height: none;
      margin: 0;
    }
  }
`;

export const PlanContent = styled.section`
  padding: 15px;
  display: flex;
  flex-direction: column;
  .heading {
    ${props => headingStyle(props)};
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    text-align: left;
    margin-bottom: 10px;
  }
  .small-head {
    ${smallHead};
  }
  .link-desc {
    margin-top: 15px;
  }
  .link {
    ${LinkStyles};
  }
  .action-btn {
    max-width: 150px;
    margin: 0 auto;
    margin-top: 10px;
  }
`;
