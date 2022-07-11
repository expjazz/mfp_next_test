import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';

const CommStyled = styled(Card)`
  padding: 10px;
  .convert-price {
    display: block;
    margin-bottom: 3px;
    padding-left: 10px;
    font-family: Gilroy;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: ${props => props.theme.greyishBrown};
    &.has-margin {
      margin-top: 0;
      font-size: 11px;
      padding-left: 0;
      margin-bottom: 0;
      line-height: 11px;
      padding-top: 3px;
    }
  }
  .highlight-text {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
  .header {
    font-family: Gilroy-Bold;
    font-size: 14px;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
  ${props =>
    props.isCommercial &&
    `
    .comment-section {
      background: ${props.theme.pureWhite};
    }
  `}
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .alternate-header {
      color: ${props => props.theme.greyishBrown};
      font-family: Gilroy-Bold;
    }
    @media (min-width: 832px) {
      justify-content: flex-start;
      .time-display {
        margin-left: 50px;
      }
    }
  }
  .action-btn {
    margin: 10px 0;
  }
  .deny-btn {
    min-width: auto;
    padding: 0;
    height: auto;
    display: inline-block;
    background: transparent;
    border: none;
    font-size: 13px;
    font-family: Gilroy;
    color: ${props => props.theme.flatBlue};
    text-align: left;
    &:hover {
      box-shadow: none;
    }
  }
  @media (min-width: 1280px) {
    .comment-section {
      background: ${props => props.theme.pureWhite};
    }
  }
  .or-border {
    padding-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      border-bottom: 1px solid ${props => props.theme.headerGrey};
      flex: 1;
    }
    span:first-of-type {
      margin-right: 10px;
    }
    span:last-of-type {
      margin-left: 10px;
    }
  }
  .button-wrp {
    display: flex;
    max-width: 310px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .head-pad {
    padding-top: 10px;
  }
`;

CommStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (min-width: 832px) {
    justify-content: center;
    margin-left: 50px;
  }
`;
CommStyled.CommentWrapper = styled.article`
  margin-top: 12.5px;
  .comment {
    color: ${props => props.theme.greyishBrown};
  }
`;

CommStyled.ActionSection = styled.span`
  display: flex;
  flex-direction: column;
  .title-text {
    font-family: Gilroy-SemiBold;
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 5px;
    color: ${props => props.theme.lightBlack};
  }
  .MuiFormControl {
    margin: 10px 0;
  }
  .price-wrapper {
    display: flex;
    justify-content: flex-end;
    .amount-input,
    action-btn {
      margin-right: 13.5px;
    }
    @media (min-width: 832px) {
      justify-content: center;
    }
  }
`;

CommStyled.StatusDisplay = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  margin-top: 12.5px;
  display: block;
`;

export default CommStyled;
