import styled from '@emotion/styled';
import { smallHead, descStyles } from 'styles/TextStyled';

export const LeftCol = styled.span`
  flex: 1;
`;

export const RightCol = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .view-btn {
    min-width: 80px;
    margin-left: 15px;
  }
`;

export const UploadBar = styled.span`
  z-index: 1400;
  bottom: 0;
  position: fixed;
  background: ${props => props.uploadFail ? props.theme.errorRed : `linear-gradient(
    to right,
    ${props.theme.twilight} 0%,
    ${props.theme.twilight} ${props.totalPercent}%,
    ${props.theme.greyishBrown} ${props.totalPercent}%,
    ${props.theme.greyishBrown} 100%
  )`};
  color: ${props => props.theme.pureWhite};
  display: flex;
  left: 0;
  right: 0;
  padding: 10px;
  .head {
    ${smallHead};
    text-transform: uppercase;
  }
  .description {
    ${descStyles};
    color: ${props => props.theme.pureWhite};
  }
`;
