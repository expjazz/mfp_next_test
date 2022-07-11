import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/pro-light-svg-icons';
import Scrollbars from 'react-custom-scrollbars';
// import { useVisibility } from 'customHooks/domUtils';
// import ImagePreview from 'components/ImagePreview';
// import VideoPreview from 'components/VideoPreview';
// import BlockContent from 'components/BlockContent';
// import FollowButton from '../../../FollowButton';
import VideoListing from './VideoListing';
import { Wrap, MainSection, VideoEle, ListWrap, RightWrap } from './styled';
import { useMediaQuery } from '@material-ui/core';
import HorizontalListing from '../../../../../../HorizontalListing';
import ImagePreview from '../../../../../../ImagePreview';
import VideoPreview from '../../../../../../VideoPreview';
import BlockContent from '../../../../../../BlockContent';
import { useVisibility } from '../../../../../../../customHooks/domUtils';
import FollowButton from '../../../FollowButton';

const ListComp = ({
  list,
  featuredItem,
  toggleBookingModal,
  renderFooterCTA,
  onFetch,
  isFollow,
}) => {
  const getMainItem = () => {
    if (featuredItem) {
      return featuredItem;
    } else if (list.data.length) {
      return list.data[0];
    }
    return {};
  }
  const mainItem = getMainItem()
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  // const [mainItem, setMainItem] = useState(getMainItem());
  const [imagePreview, setImagePreview] = useState('');
  const [videoPlay, setVideoPlay] = useState(null);
  const videoRef = useRef(null);
  const [rootNode, setRootNode] = useState(null);
  const visible = useVisibility(rootNode);

  const getDuration = duration => {
    if (duration) {
      return duration.slice(3, duration.length);
    }
    return null;
  };

  const openFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      /* Firefox */
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      /* IE/Edge */
      videoRef.current.msRequestFullscreen();
    }
  };

  const onItemClick = item => () => {
    if (item.isWelcome) {
      setVideoPlay({
        src: item.s3_video_url || item.reaction_file_url || item.url,
      });
      if (!isDesktop) {
        openFullscreen();
      }
    } else {
      toggleBookingModal(
        true,
        {
          id: item.booking_id,
          isPublic: true,
          autoPlay: true,
          ...(item.reaction_file_url ? { reactionData: item } : {}),
        },
        false,
      );
    }
  };

  const renderContent = item => {
    return (
      <BlockContent
        key={item.reaction_id || item.booking_id || item.type}
        playIcon={item.file_type === 2 || item.file_type !== 1}
        classes={{
          root: 'block-root',
          heading: 'video-head',
          image: 'block-image',
          title: 'video-title',
        }}
        imageLazy
        onClick={onItemClick(item)}
        image={
         item.thumbnail || item.s3_thumbnail_url || item.reaction_thumbnail_url
        }
        title={getDuration(item.duration)}
        heading={item.occasion || item.user_name}
      />
    );
  };

  const onFullScreenChange = () => {
    if (
      !isDesktop &&
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setVideoPlay(null);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    document.addEventListener('mozfullscreenchange', onFullScreenChange);
    document.addEventListener('MSFullscreenChange', onFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        onFullScreenChange,
      );
      document.removeEventListener('mozfullscreenchange', onFullScreenChange);
      document.removeEventListener('MSFullscreenChange', onFullScreenChange);
    };
  }, []);


  const followList = list.data.slice(featuredItem ? 0 : 1, 5);
  const renderList = () => {
    let { data: listData } = list;
    if (!featuredItem) {
      listData = listData.slice(1, listData.length);
    }
    if (listData.length <= 0) return null;
    return isDesktop ? (
      <ListWrap>
        <Scrollbars
          renderView={scrollProps => (
            <div {...scrollProps} id="videos-scroll-target" />
          )}
        >
          <VideoListing
            dataList={listData}
            loading={list.loading}
            scrollTarget="videos-scroll-target"
            offset={list.offset}
            fetchData={onFetch}
            totalCount={list.count}
            limit={10}
            renderContent={renderContent}
          />
        </Scrollbars>
      </ListWrap>
    ) : (
      <HorizontalListing
        classes={{
          root: 'list-root',
          arrowWrapper: 'slide-arrow',
          listContent: 'scroll-list-wrp',
        }}
        scrollId="video-list-scroll"
        showArrows={false}
        dataList={listData}
        loading={list.loading}
        offset={list.offset}
        fetchData={onFetch}
        renderContent={renderContent}
        totalCount={list.count}
        limit={10}
      />
    );
  };

  return (
    <Wrap ref={setRootNode}>
      {imagePreview && (
        <ImagePreview
          src={imagePreview}
          open={imagePreview !== null}
          onClose={() => setImagePreview('')}
        />
      )}
      <MainSection
        imageUrl={
          visible ? (mainItem.reaction_thumbnail_url ||
          mainItem.s3_thumbnail_url ||
          mainItem.thumbnail) : null
        }
        onClick={onItemClick(mainItem)}
      >
        {mainItem.type === 'video' || mainItem.file_type === 2 || mainItem?.video_id ? (
          <FontAwesomeIcon className="play-icon" icon={faPlayCircle} />
        ) : null}
      </MainSection>
      {!isDesktop ? (
        <VideoEle
          autoPlay
          src={videoPlay ? videoPlay.src : ''}
          isPlaying={videoPlay}
          ref={videoRef}
        />
      ) : (
        <VideoPreview
          open={videoPlay && videoPlay.src}
          src={videoPlay && videoPlay.src}
          onClose={() => setVideoPlay(null)}
        />
      )}
      <RightWrap>
        <section>
          {isFollow ? (
            renderList()
          ) : (
            <React.Fragment>
              {followList.length > 0 && (
                <section className="list-root follow-list">
                  {followList.map(listItem => renderContent(listItem))}
                  {list.data.length > 5 && (

                    <FollowButton
                      className="follow-btn"
                      followText={t('star_profile.videoFollow')}
                    />
                  )}
                </section>
              )}
            </React.Fragment>
          )}
        </section>

        <section className="video-btn-wrap">{renderFooterCTA()}</section>
      </RightWrap>
    </Wrap>
  );
};

ListComp.defaultProps = {
  list: {
    data: [],
    loading: false,
  },
  renderFooterCTA: () => {},
};

ListComp.propTypes = {
  list: PropTypes.object,
  renderFooterCTA: PropTypes.func,
};

export default ListComp;
