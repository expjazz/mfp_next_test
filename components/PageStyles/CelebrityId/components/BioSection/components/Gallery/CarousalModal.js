import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import { useMedia } from 'customHooks/domUtils';
// import CustomCarousal from 'components/CustomCarousal';
import { renderDots } from './utils';
import { Image, ImageWrap, ImageModal, ModalContainer, Arrows } from './styled';
import { useMediaQuery } from '@material-ui/core';
import CustomCarousal from '../../../../../../CustomCarousal';

const CarousalModal = ({
  imageList,
  selected,
  clearSelected,
}) => {
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [currentSlide, setCurrentSlide] = useState(selected);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const sliderRef = useRef(null);

  const goToSlide = (slide) => () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slide)
    }
  }

  useEffect(() => {
    setLeftActive(currentSlide !== 0);
    setRightActive(currentSlide !== (imageList.length - 1));
  }, [currentSlide])

  return (
    <div>
      <ImageModal
        fullScreen={isMobile}
        open
        onClose={clearSelected}
        classes={{
          paper: 'modal-paper'
        }}
      >
        <ModalContainer>
          <FontAwesomeIcon onClick={clearSelected} icon={faTimes} className="close-icon" />
          <Arrows active={leftActive} icon={faCaretLeft} onClick={goToSlide(currentSlide-1)} />
          <CustomCarousal
            className='carousal'
            carousalProps={{
                dots: true,
                speed: 500,
                ref: sliderRef,
                initialSlide: selected,
                appendDots:renderDots(currentSlide, imageList, sliderRef),
                draggable: true,
                variableWidth: true,
                adaptiveHeight: true,
                beforeChange: (index, newIndex) => {setCurrentSlide(newIndex)},
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }}
          >
            {imageList.map(image => (
              <ImageWrap>
                <Image
                  key={image.key}
                  src={image.src}
                />
              </ImageWrap>
            ))}
          </CustomCarousal>
          <Arrows active={rightActive} icon={faCaretRight} onClick={goToSlide(currentSlide+1)} />
        </ModalContainer>
      </ImageModal>
    </div>
  )
}

export default CarousalModal;
