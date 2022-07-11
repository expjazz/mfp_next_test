import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import BackHeader from 'components/BackHeader';
// import VideoRender from 'components/VideoRender';
import { ReactionWrapper, HeaderText, ImagePreview } from './styled';
import BackHeader from '../../../../BackHeader';
import VideoRender from '../../../../VideoRender';

const ReactionView = ({reaction, closeReactionView}) => {
  const { t } = useTranslation();
  const onBackClick = () => {
    closeReactionView();
  }

  return (
    <ReactionWrapper>
      <BackHeader
        rootClass='book-modal-header'
        backHandler={onBackClick}
        closeHandler={onBackClick}
        label={t('common.reqDetails')}
      />
      <HeaderText>{t('common.reaction')}</HeaderText>
      {
        reaction.file_type === 1 ? // Image reaction
          <ImagePreview src={reaction.reaction_file_url} />
        :
          <VideoRender
            classes={{
              container: 'video-container',
            }}
            variableWidth
            variableHeight
            type={reaction.type}
            videoStatus={reaction.status}
            noBorder
            autoPlay={reaction.autoPlay}
            videoSrc={reaction.s3_video_url}
            cover={reaction.s3_thumbnail_url}
          />
      }
    </ReactionWrapper>
  )
}

ReactionView.propTypes = {
  reaction: PropTypes.isRequired,
  closeReactionView: PropTypes.func.isRequired,
}

export default ReactionView;
