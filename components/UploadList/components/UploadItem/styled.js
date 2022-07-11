import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

export const Heading = styled.h5`
  font-size: 14px;
  font-family: Gilroy-Bold;
  text-transform: capitalize;
  color: ${props => props.theme.greyishBrown};
`;

export const MainHeading = styled.h4`
  font-size: 18px;
  font-family: Gilroy-Bold;
  text-align: center;
  line-height: 27px;
  width: 100%;
  color: ${props => props.offline ? props.theme.errorRed : props.theme.orangePink};
`;

export const Description = styled.span`
  font-size: 14px;
  font-family: Gilroy-Regular;
  color: ${props => props.errorStatus ? props.theme.errorRed : props.theme.greyishBrown};
  &.file-name {
    display: block;
    font-family: Gilroy-Medium;
    word-break: break-all;
  }
`;

export const StatusPill = styled.span`
  color: ${props => props.theme.greyishBrown};
  background-color: ${props => props.success ? props.theme.successGreen : props.theme.errorRed};
  border-radius: 40px;
  width: 96px;
  padding: 5px 0;
  font-size: 14px;
  color: ${props => props.theme.pureWhite};
  font-family: Gilroy-Bold;
  line-height: 21px;
  display: flex;
  justify-content: center;
`;

export const ActionText = styled.span`
  font-size: 14px;
  font-family: Gilroy-Regular;
  display: block;
  margin-top: 5px;
  cursor: pointer;
  text-align: center;
  color: ${props => props.theme.errorRed};
`;

export const LeftCol = styled.article`
  flex: 1;
  padding-right: 10px;
`;

export const RightCol = styled.article`
  .action-icon {
    font-size: 24px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Wrap = styled.section`
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  background: ${props => props.isProcessing ? props.theme.pureWhite : props.theme.white};
  ${props => props.isProcessing && `
    border: 1px solid ${props.theme.veryLightPink};
  `}
  .wrap-progress-bar {
    .value {
      left: 20px;
      top: 18px;
    }
  }
`;

export const ConfirmDialog = styled(Dialog)`
  .heading {
    font-size: 20px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    line-height: 25px;
  }
  .confirm-wrap {
    padding: 20px;
    background: ${props => props.theme.white};
  }
  .upload-action-btn {
    margin: 10px auto;
  }
`;
