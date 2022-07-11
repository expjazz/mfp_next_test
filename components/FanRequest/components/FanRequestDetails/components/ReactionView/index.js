import React from 'react';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import VideoRender from 'components/VideoRender';
import { ReactionWrapper, HeaderText } from './styled';

const ReactionView = ({reaction, closeReactionView}) => {

  const onBackClick = () => {
    closeReactionView();
  }

  return (
    <ReactionWrapper>
      <BackHeader
        rootClass='book-modal-header'
        backHandler={onBackClick}
        closeHandler={onBackClick}
        label='Request details'
      />
      <HeaderText>Reaction</HeaderText>
      <VideoRender
        classes={{
          container: 'video-container',
        }}
        variableWidth
        variableHeight
        type={reaction.type}
        videoStatus={reaction.status}
        noBorder
        videoSrc={reaction.s3_video_url}
        cover={reaction.s3_thumbnail_url}
      />
    </ReactionWrapper>
  )
}

ReactionView.propTypes = {
  reaction: PropTypes.isRequired,
  closeReactionView: PropTypes.func.isRequired,
}

export default ReactionView;
