import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

export const DialogStyled = styled(Dialog)`
  .body {
    border-radius: 5px;
    max-height: 100%;
    max-width: 100%;
    margin: 20px;
  }
`;

export const VideoEle = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .pre-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: ${props => props.theme.pureWhite};
    box-shadow: 0px 0px 5px 2px rgb(0 0 0 / 50%);
    width: 30px;
  }
  .expand-icon {
    position: absolute;
    top: 43px;
    right: 13px;
    cursor: pointer;
    font-size: 27px;
    color: white;
    z-index: 1;
  }
  .video-wrapper {
    width: 600px;
    height: 600px;
    max-height: calc(100vh - 70px);
    max-width: 100%;
    font-size: 0;
  }
`;
