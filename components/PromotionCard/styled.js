import styled from '@emotion/styled';

export const Layout = styled.section`
  text-align: center;
  .header-sec {
    width: 265px;
    margin: 0 auto;
    padding-bottom: 20px;
    .promotion-head {
      font-size: 24px;
      color: ${props => props.theme.orangePink};
      text-align: center;
      font-family: Gilroy-Bold;
      line-height: 28px;
      margin-bottom: 4px;
    }
    .note-sec {
      font-size: 14px;
      color: #888;
      font-family: Gilroy-Light;
      text-align: center;
      padding-bottom: 10px;
      line-height: 21px;
    }
    .share-link {
      text-decoration: underline;
      cursor: pointer;
    }
    .template-card {
      position: relative;
      margin-bottom: 13px;
    }
  }
  .share-text {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.brownGrey};
    line-height: 27px;
  }
  .social-wrap {
    font-size: 59px;
    padding-top: 15px;
    display: flex;
    justify-content: center;
    width: 245px;
    margin: 0 auto;
    .icon-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      &:not(:last-child) {
        margin-right: 15px;
      }
      &.twitter {
        font-size: 61px;
        .social-name {
          padding-top: 11px;
        }
      }
      .social-icon {
        color: ${props => props.theme.flatBlue};
        cursor: pointer;
        height: 35px;
      }
      .social-name {
        font-family: Gilroy-Medium;
        font-size: 14px;
        line-height: 20px;
        color: ${props => props.theme.flatBlue};
        padding-top: 13px;
      }
    }
  }

  .contanier-wrap {
    width: 265px !important;
    height: 265px !important;
  }
  .temp_wrap,
  .temp-wrap {
    width: 265px !important;
    height: 265px !important;
    /* temp three */
    .temp_three_bkimg {
      width: 265px !important;
      height: 265px !important;
    }
    .temp_three_proimg {
      width: 102px !important;
      height: 102px !important;
      left: 76px !important;
      top: 120px !important;
      transform: none !important;
    }
    .temp_three_name {
      left: 0 !important;
      top: 70px !important;
      font-size: 21px !important;
      font-weight: normal !important;
    }
    .temp_three_sname {
      left: 0;
      width: 100% !important;
      top: 98px !important;
      font-size: 15px !important;
      color: #555;
      font-family: Gilroy-Semibold;
    }

    /* temp two */
    .temp_two_bkimg {
      width: 265px !important;
      height: 265px !important;
    }
    .temp_two_proimg {
      width: 118px !important;
      height: 118px !important;
      left: 74px !important;
      top: 43px !important;
      border-radius: 50%;
      transform: none !important;
    }

    /* temp one */
    .temp_one_bkimg {
      width: 265px !important;
      height: 265px !important;
    }
    .temp_one_proimg {
      width: 118px !important;
      height: 118px !important;
      left: 74px !important;
      top: 65px !important;
      transform: none !important;
    }
    .temp_one_name {
      left: 0 !important;
      width: 100% !important;
      bottom: 50px !important;
      font-size: 18px !important;
      color: ${props => props.theme.orangePink};
      font-family: Gilroy;
    }
  }
`;
