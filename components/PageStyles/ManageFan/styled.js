import styled from '@emotion/styled';
import { css } from '@emotion/react'
import { Heading } from 'styles/TextStyled';
import { media } from 'styles/mediaQueries';

const visiblity = props => css`
  display: ${props.hidden ? 'none' : 'block'};
  @media (min-width: 832px) {
    display: block;
  }
`;

const ManageStyled = styled.div`
  ${props => {
    const topOffset = props.headerHeight;
    return `margin-top: ${topOffset}px;
      min-height: calc(100vh - ${topOffset}px);
    `;
  }}
  background: ${props => props.theme.pureWhite};

  display: flex;
  flex-direction: column;

  .manage-header {
    top: 77px;
    .header-wrp {
      justify-content: flex-end;
    }
  }
  @media (min-width: 832px) {
    height: auto;
  }
  .head1 {
    padding-top: 4px;
    padding-bottom: 32px;
    @media (min-width: 1280px) {
      padding-top: 9px !important;
      padding-bottom: 0 !important;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
      font-size: 24px;
    }
  }
  .popstyle-wrap {
    margin-top: 8px;
    @media (max-width: 831px) {
      margin-top: 0;
    }
    .popstyle-inner {
      padding-top: 35px;
      padding-bottom: 0;
      @media (max-width: 831px) {
        padding: 17px 30px 20px;
      }
      .sub-head {
        padding-bottom: 35px;
        font-size: 24px;
        font-family: Gilroy-Medium;
        font-weight: normal;
        line-height: 28px;
        @media (max-width: 831px) {
          padding-top: 0;
          padding-bottom: 20px;
        }
      }
      .row-wrap {
        padding-bottom: 14px;
      }
      .common-btn {
        margin-top: 37px;
      }

      &.password-update {
        padding-top: 35px;

        @media (max-width: 831px) {
          padding-top: 17px;
        }

        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;
          line-height: 28px;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
          }
        }
        .inputWrapper {
          margin-bottom: 40px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        .note {
          padding-top: 7px;
        }
        .common-btn {
          margin-top: 32px;
        }
      }

      &.payment {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
          }
        }
        .note {
          line-height: 22px;
        }
      }

      &.notification {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;
          line-height: 28px;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
            font-weight: normal;
          }
        }

        .terms-container {
          @media (max-width: 831px) {
            max-width: 620px;
            margin: 0 auto;
          }
        }
        .head-text {
          margin-bottom: 16px;
        }
      }
    }
  }
  .manage-user-header {
    @media (max-width: 831px) {
      box-shadow: 0 0 20px 0 #00000029;
    }
  }
`;

ManageStyled.Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  ${props => !props.headerHeight && `display: none`};
  @media (min-width: 832px) {
    flex-direction: row;
    ${props => {
      const topOffset = props.headerHeight + 90;
      if (props.headerHeight) {
        return `min-height: calc(100vh - ${topOffset}px);`;
      }
      return `display: none`;
    }}
    padding: 25px 10px 50px;
    max-width: 800px;
  }
  @media (min-width: 1280px) {
    max-width: 1246px;
    padding: 47px 36px 25px;
    padding-right: 10px;
    padding-left: 0;
  }
`;

ManageStyled.CardWrapper = styled.section`
  ${visiblity};
  padding: 0 13.5px;
`;

ManageStyled.MobileHeading = styled(Heading)`
  font-size: 24px;
  padding: 17px 0 15px;
  margin: 0 auto;
  ${visiblity};
  @media (min-width: 832px) {
    display: none;
  }
`;

ManageStyled.SidebarWrapper = styled.div`
  @media (min-width: 832px) {
    max-width: 22%;
  }
  @media (min-width: 1280px) {
    max-width: 20%;
  }
  ${visiblity};
  .sidebar-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      flex: 1;
    }
    .sidebar-arrow {
      display: block;
      @media (min-width: 832px) {
        display: none;
      }
    }
  }
`;

ManageStyled.RightContent = styled.div`
  ${visiblity};
  flex: 1;
  @media (min-width: 832px) {
    flex: auto;
    padding-left: 75px;
    width: calc(78% - 75px);
  }
  .back-header {
    padding: 15px 15px 0px;
    ${media.webView} {
      padding: 0 0 10px;
    }
  }
`;

export default ManageStyled;
