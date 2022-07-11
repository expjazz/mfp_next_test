import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Scrollbars from 'react-custom-scrollbars';
import ScrollList from './ScrollList';
import HorizontalStyled from './styled';
import { useResizeObserver } from '../../customHooks/domUtils';
import { registerDragScroll } from '../../src/utils/scrollUtils';

const HorizontalListing = ({
  showArrows,
  dataList,
  totalCount,
  classes,
  fixedContent,
  scrollProps,
  icons,
  getItem,
  customVisibility,
  ...props
}) => {
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(true);
  const [arrowVisible, setArrowVis] = useState(true);

  const scrollbarRef = useRef(null);
  const listRef = useRef(null);

  const onResize = () => {
    const scrollEle = scrollbarRef.current;
    if (dataList.length && scrollEle) {
      const Child = scrollEle.view.children[0];
      const leftVis = scrollEle.view.scrollLeft !== 0;
      const rightVis =
        dataList.length < totalCount ||
        Math.round(scrollEle.view.scrollLeft + scrollEle.view.clientWidth) < scrollEle.view.scrollWidth;
      if (
        Child.clientWidth < scrollEle.view.scrollWidth ||
        (!leftVis && !rightVis)
      ) {
        setArrowVis(!!customVisibility);
      } else {
        setArrowVis(true);
        setLeftActive(leftVis);
        setRightActive(rightVis);
      }
    }
  };

  useResizeObserver(listRef, onResize);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [dataList.length]);

  useEffect(() => {
    if (scrollbarRef.current) {
      registerDragScroll(scrollbarRef.current)
    }
  }, [])

  const scroll = type => () => {
    const scrollEle = scrollbarRef.current;
    const scrollView = scrollEle.view;
    if (props.onScroll) {
      props.onScroll(type, scrollEle, scrollView, leftActive, rightActive);
    } else if (leftActive && type === 'left') {
      scrollEle.scrollLeft(
        scrollEle.getScrollLeft() - scrollView.offsetWidth / 2,
      );
    } else if (rightActive && type !== 'left') {
      scrollEle.scrollLeft(
        scrollEle.getScrollLeft() + scrollView.offsetWidth / 2,
      );
    }
  };

  const onScroll = event => {
    const { target } = event;
    setRightActive(
      dataList.length < totalCount ||
        Math.round(target.scrollLeft + target.clientWidth) < target.scrollWidth,
    );
    setLeftActive(target.scrollLeft !== 0);
  };
  return (
    <HorizontalStyled className={classes.root}>
      {showArrows && arrowVisible && (!customVisibility || (customVisibility && leftActive)) && (
        <HorizontalStyled.ArrowWrapper
          className={`${classes.arrowWrapper} ${
            leftActive ? 'arrow-active' : ''
          }` }
          active={leftActive}
          customColor={props.customColor}
          customCss={props.customCss}
          onClick={scroll('left')}
        >
          {icons && icons.left ? (
            icons.left
          ) : (
            <FontAwesomeIcon icon={faCaretLeft} className="arrow-icon" />
          )}
        </HorizontalStyled.ArrowWrapper>
      )}
      <HorizontalStyled.Listing
        hasArrows={showArrows && arrowVisible}
        className={classes.listContent}
        ref={listRef}
      >
        <Scrollbars
          ref={scrollbarRef}
          onScroll={onScroll}
          renderView={scrollViewProps => (
            <div
              {...scrollViewProps}
              id={props.scrollId}
              className="list-scroll"
            />
          )}
          renderTrackHorizontal={scrollViewProps => (
            <div {...scrollViewProps} className="track-horizontal" />
          )}
          renderTrackVertical={scrollViewProps => <div {...scrollViewProps} className="track-vertical"/>}
          {...scrollProps}
        >
          {
            getItem ? props.children : (

          <ScrollList
            {...props}
            dataList={dataList}
            totalCount={totalCount}
            scrollTarget={props.scrollId}
          />
            )
          }
        </Scrollbars>
      </HorizontalStyled.Listing>
      {showArrows && arrowVisible && (!customVisibility || (customVisibility && rightActive)) && (
        <HorizontalStyled.ArrowWrapper
          className={`${classes.arrowWrapper} ${
            rightActive ? 'arrow-active' : ''
          }`}
          active={rightActive}
          customColor={props.customColor}
          onClick={scroll('right')}
          customCss={props.customCss}
        >
          {icons && icons.right ? (
            icons.right
          ) : (
            <FontAwesomeIcon icon={faCaretRight} className="arrow-icon" />
          )}
        </HorizontalStyled.ArrowWrapper>
      )}
    </HorizontalStyled>
  );
};

HorizontalListing.defaultProps = {
  showArrows: true,
  dataList: [],
  totalCount: 0,
  classes: {},
  scrollId: 'list-scroll-item',
  fixedContent: false,
  scrollProps: {},
  onScroll: null,
  icons: null,
  customColor: false,
  getItem: false,
  middle: false,
  customVisibility: false,
};

HorizontalListing.propTypes = {
  showArrows: PropTypes.bool,
  dataList: PropTypes.array,
  getItem: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.func,
  ]),
  totalCount: PropTypes.number,
  middle: PropTypes.bool,
  classes: PropTypes.object,
  customColor: false,
  scrollId: PropTypes.string,
  fixedContent: PropTypes.bool,
  scrollProps: PropTypes.object,
  onScroll: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  icons: PropTypes.oneOfType([PropTypes.object, null]),
  customVisibility: PropTypes.bool,
};

export default HorizontalListing;
