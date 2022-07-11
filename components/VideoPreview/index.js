import React from 'react';
import PropTypes from 'prop-types';
import { DialogStyled, PreviewContainer, VideoEle } from './styled';
import CloseIcon from '../CloseIcon';

function VideoPreview(props) {

  return (
    <DialogStyled
      classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      open={props.open}
      disableEscapeKeyDown
      onClose={props.onClose}
    >
      <PreviewContainer>
        <div className="video-wrapper scrollbar" id="video-scroll">
          <VideoEle
            src={props.src}
            autoPlay
            controls
            playsInline
          />
        </div>
        <CloseIcon
          onClick={props.onClose}
          className="pre-close"
        />
      </PreviewContainer>
    </DialogStyled>
  );
}

VideoPreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPreview;
