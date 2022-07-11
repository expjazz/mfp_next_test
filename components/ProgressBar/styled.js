import styled from '@emotion/styled';

export const FillerDiv = styled.div`
  width: ${props => `${props.percentage}%`};
  background: ${props => props.theme.green};
  font-family: Gilroy-Light;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`;

export const ProgressBarDiv = styled.div`
  position: relative;
  background-color: #ededed;
  height: 30px;
  width: calc(100% - 35px);
  border-radius: 40px;
  z-index: 1;
`;

export const ProgressBarStarDiv = styled.div`
  width: 56px;
  order: 2;
  padding-left: 28px;
  padding-top: 6px;
  justify-content: center;
  align-self: center;
  border-radius: 40px;
  background-color: #c6c6c6;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  .message-icon {
    color: #fff;
  }
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  position: relative;
`;
