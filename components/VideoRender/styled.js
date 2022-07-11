import styled from '@emotion/styled';

const VideoRenderDiv = styled.div`
  width: ${props => (props.variableWidth ? '100%' : 'auto')};
  height: ${props => (props.variableHeight ? '100%' : 'auto')};
  cursor: pointer;
  display: flex;
`;

VideoRenderDiv.Container = styled.div`
  display: inline-block;
  border-radius: ${props => (props.noPlay ? '5px' : '15px')};
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: ${props => !props.noBorder && '19px'};
  width: ${props => (props.variableWidth ? '100%' : '197px')};
  height: ${props => (props.variableHeight ? '100%' : '300px')};
  max-height: 417px;
  @media (min-width: 375px) {
    width: ${props => (props.variableWidth ? '100%' : '274px')};
    height: ${props => (props.variableHeight ? '100%' : '380px')};
    max-height: 600px;
  }
`;

VideoRenderDiv.CustomText = styled.span`
  display: none;
  @media (min-width: 832px) {
    font-family: Gilroy-Regular;
    font-size: 18px;
    color: #fff;
    display: block;
    width: 100%;
    margin-top: 14.7px;
    line-height: 26px;
    text-align: center;
  }
`;

VideoRenderDiv.Content = styled.div`
  border-radius: ${props => (props.noPlay ? '5px' : '5px')};
  width: 100%;
  height: 100%;
  background-image: ${props =>
    props.imageUrl
      ? `url(${props.imageUrl})`
      : 'url(images/default-cover.jpg)'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  .status-indicator {
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    font-family: Gilroy-Medium;
    background: #000;
    font-size: 16px;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  ${props =>
    props.noPlay &&
    `
    pointer-events: none;  
  `}
`;

VideoRenderDiv.Duration = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  color: ${props => props.theme.pureWhite};
  @media (min-width: 832px) {
    top: 15px;
    right: 15px;
  }
`;

VideoRenderDiv.ReactionImage = styled.span`
  background-image: ${props => props.imageUrl && 'url(' + props.imageUrl + ')'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 38px;
  display: block;
  height: 100%;
  width: 100%;
`;

export default VideoRenderDiv;
