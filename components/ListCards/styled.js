import styled from '@emotion/styled';
import { FlexBoxSB } from 'styles/CommonStyled';

export const HeadingBold = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: ${props => props.theme.greyishBrown};
  line-height: 23px;
`;

export const BoldTextM = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  color: #6a6a6a;
  line-height: 16px;
`;

export const MediumText = styled.span`
  font-family: Gilroy-Regular;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
  line-height: 30px;
  @media (max-width: 831px) {
    line-height: 23px;
  }
`;

export const FlexBox = styled(FlexBoxSB)`
  align-items: center;
`;

export const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

export const LeftContent = styled.span`
  width: 35px;
  height: 35px;
  min-width: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const CardContainer = styled(FlexBox)`
  padding: 9px 20.5px;
  margin-bottom: 12px;
  @media (max-width: 831px) {
    padding: 9px 10px;
  }
`;

export const LightHeading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #7e7e7e;
`;

export const MediumHeading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #6a6a6a;
`;

export const NewBanner = styled.span`
  position: absolute;
  cursor: pointer;
  background: ${props => props.theme.orangePink};
  left: 0;
  top: 0;
  right: 0;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  min-width: 40px;
  .highlight {
    margin-right: 10px;
    font-size: 15px;
    color: ${props => props.theme.pureWhite};
  }
  .new-text {
    display: block;
    font-family: Gilroy-Extrabold;
    line-height: 30px;
    font-size: 16px;
    padding-top: 2px;
    color: ${props => props.theme.pureWhite};
    text-align: center;
  }
  ${props => props.willRotate && `
    @media (min-width: 1280px) {
      bottom: 0;
      right: initial;
      border-top-right-radius: 0;
      height: auto;
      border-bottom-left-radius: 10px;
      .new-text {
        // transform: rotateZ(-451deg);
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        padding: 5px;
        line-height: 20px;
        max-height: 105px;
        word-break: break-word;
      }
    }
  `}
`;
