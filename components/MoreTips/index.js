import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/pro-light-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Heading, DescriptionP } from 'styles/TextStyled';
import HorizontalListing from 'components/HorizontalListing';
// import { updateCelebrityShare } from 'src/services/index';
import { LinkButton } from 'styles/CommonStyled';
import ShareButton from 'components/ShareButton';
import Button from 'components/SecondaryButton';
import DownloadHandler from 'components/DownloadHandler';
import Loader from 'components/Loader';
import { getMoreTips } from './service';
import {
  Layout,
  ContentWrap,
  Content,
  Photo,
  VideoEle,
  VideoWrap,
  Play,
} from './styled';
import { useMediaQuery } from '@material-ui/core';

function MoreTips(props) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataList, updateDataList] = useState([]);
  const [vanity, setVanity] = useState('');
  const [playing, setPlaying] = useState(false);

  const callApi = method => {
    setLoading(true);
    getMoreTips({}, method)
      .then(res => {
        setLoading(false);
        if (res.data) {
          updateDataList(res.data.request_tips);
          setVanity(res.data.vanity_id);
          if (!res.data.request_tips.length) {
            props.onClose();
          }
        } else if (!res.data || !res.data.request_tips || !res.data.request_tips.length) {
          props.onClose();
        }
      })
      .catch(() => {
        setLoading(false);
      });
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

  const onEleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const videos = document.getElementsByTagName('video');
        Array.from(videos).forEach(vid => {
          vid.pause();
        });
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  const onFullScreenChange = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setPlaying(false);
      videoRef.current.pause();
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

  useEffect(() => {
    if (!vanity) callApi('get');
  }, []);

  const onFunClick = downloadUrl => () => {
    if (downloadUrl) {
      props.downloadFunc(downloadUrl);
    }
  };

  const onShareTip = tid => type => {
    updateCelebrityShare('celebrity', { type, tid });
  };

  const renderContent = item => {
    const services = {};
    if (item.promotion_template && item.share_options.length > 0) {
      item.share_options.forEach(element => {
        services[element.channel] = true;
      });
    }
    return (
      <Content key={item.id}>
        <DescriptionP className="desc">{item.description}</DescriptionP>
        {item.file && item.file_type !== 2 && <Photo image={item.file} />}
        {item.file && item.file_type === 2 && (
          <VideoWrap>
            <VideoEle
              src={item.file}
              ref={videoRef}
              preload="auto"
              onClick={() => onEleClick(item)}
              onEnded={() => setPlaying(false)}
            />
            <FontAwesomeIcon icon={faExpand} onClick={openFullscreen} />
            {!playing && (
              <Play>
                <FontAwesomeIcon icon={faPlay} />
              </Play>
            )}
          </VideoWrap>
        )}
        {!item.promotion_template && item.cta_link && (
          <a href={item.cta_link} onClick={props.onClose}>
            <Button secondary className="tip-btn">
              {item.cta_name}
            </Button>
          </a>
        )}
        {item.promotion_template && item.share_options.length > 0 && (
          <React.Fragment>
            <ShareButton
              secondary
              buttonText={t('common.share')}
              classes={{
                button: `share-btn`,
              }}
              shareUrl={`${window.location.origin}/${vanity}?tid=${item.promotion_template}`}
              content=""
              services={services}
              popperProps={{
                disablePortal: false,
              }}
              onInstaClick={onFunClick(item.file)}
              onStoryClick={onFunClick(item.file)}
              beforeShare={onShareTip(item.promotion_template)}
            />
            <a
              href={item.cta_link}
              className="view-more"
              onClick={props.onClose}
            >
              <LinkButton>{item.cta_name}</LinkButton>
            </a>
          </React.Fragment>
        )}
      </Content>
    );
  };

  if (loading) return <Loader />;
  if (dataList.length === 0) return null;

  return (
    <Layout className="moretip-layout">
      <Heading>{t('more_tips_head')}</Heading>
      <DescriptionP>{t('more_tips_info')}</DescriptionP>
      <ContentWrap>
        <HorizontalListing
          classes={{ root: 'list-root', listContent: 'list-content' }}
          scrollId="more-tips-scroll"
          showArrows={!isMobile}
          dataList={dataList}
          loading={loading}
          offset={1}
          fetchData={() => {}}
          renderContent={renderContent}
          totalCount={dataList.length}
          limit={25}
          scrollProps={{
            autoHeight: true,
            autoHeightMax: 900,
          }}
        />
      </ContentWrap>
    </Layout>
  );
}

MoreTips.defaultProps = {
  onClose: () => {},
}

MoreTips.propTypes = {
  downloadFunc: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default DownloadHandler(MoreTips);
