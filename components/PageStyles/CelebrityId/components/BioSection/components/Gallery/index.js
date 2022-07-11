import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { useVisibility, useMedia } from 'customHooks/domUtils';
// import HorizontalListing from 'components/HorizontalListing';
// import { galleryImage } from 'services/userManagement';
import CarousalModal from './CarousalModal';
import { ContentWrapper } from '../../styled';
import VideoStyled, { Image, ImageWrap, CarousalContainer } from './styled';
import { Container, SmallHeading } from '../../../../styled';
import { useVisibility } from '../../../../../../../customHooks/domUtils';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import HorizontalListing from '../../../../../../HorizontalListing';
import { getGalleryImage } from '../../../../../../../src/services/myfanpark';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { galleryImage } from 'src/services/myfanpark/celebActions';

const PhotoGallery = props => {
  const [loading, setLoading] = useState(false);
  const [rootNode, setRootNode] = useState(null);
  const router = useRouter()
  const { celebrityId } = router.query

  const { data: galleryImages } = useQuery(['getGalleryImages', celebrityId], () => getGalleryImage(celebrityId))
  const [imageList, updateImageList] = useState(galleryImages ? galleryImages : []);
  const [selectedImg, selectImg] = useState(null);
  const visible = useVisibility(rootNode);
  const isMobile = useMediaQuery('(max-width: 831px)');
  const { t } = useTranslation();

  const callApi = () => {
    setLoading(true);
    const imageResp = galleryImage('list', props.celebId);
    imageResp
      .then(res => {
        if (res.success && res.data && res.data.gallery) {
          updateImageList(
            res.data.gallery.map(image => {
              const width = image.thumbnail
                ? image.thumbnail_width
                : image.width;
              const height = image.thumbnail
                ? image.thumbnail_height
                : image.height;
              const ratio = width / height;
              return {
                ...image,
                key: image.id,
                src: image.thumbnail || image.gallery_image,
                width,
                height,
                ratio,
              };
            }),
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const clearSelected = () => {
    selectImg(null);
  }

  const onSelectImg = (index) => () => {
    selectImg(index);

  }

  useEffect(() => {
    if (props.celebId) {
      callApi();
    }
  }, [props.celebId]);

  if (imageList.length === 0 && !loading) {
    return null;
  }


  return (
    <ContentWrapper paddingBottom="15px">
      <SmallHeading>{t('common.photos')}</SmallHeading>
      <Container className={props.classes.root}>
        <VideoStyled ref={setRootNode}>
          {
            selectedImg !== null ?
              <CarousalModal
                imageList={imageList}
                selected={selectedImg}
                clearSelected={clearSelected}
              />
            : null
          }
          <CarousalContainer>
            <HorizontalListing
              classes={{
                root: 'list-root',
                arrowWrapper: 'slide-arrow',
                listContent: 'scroll-list-wrp',
              }}
              scrollId="gallery-list-scroll"
              showArrows={!isMobile}
              loading={loading}
              dataList={imageList}
              scrollProps={{
                autoHeight: true,
                autoHeightMax: 141,
              }}
              renderContent={(image, index) => (
                <ImageWrap key={image.id}>
                  <Image
                    key={image.key}
                    ratio={image.ratio}
                    onClick={onSelectImg(index)}
                    src={visible ? image.src : ''}
                  />
                </ImageWrap>
              )}
              fixedContent
            />
          </CarousalContainer>
        </VideoStyled>
      </Container>
    </ContentWrapper>
  );
};

PhotoGallery.propTypes = {
  celebId: PropTypes.string.isRequired,
  classes: PropTypes.object,
};

PhotoGallery.defaultProps = {
  classes: {},
};

export default PhotoGallery;
