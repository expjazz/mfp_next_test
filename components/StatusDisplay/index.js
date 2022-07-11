import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';

import {
  StatusWrap,
  StatusLine,
  StatusItem,
  StatusIndicator,
  StatusText,
  Spacer,
} from './styled';

const StatusDisplay = ({ list, selected, onSelect }) => {

  const contRef = useRef(null);
  const statRef = useRef(null);
  const isDragActive = useRef(null);
  let currentX;
  let initialX;
  const updateSelected = selectValue => () => {
    onSelect(selectValue)
  }

  const getSelectedIndex = () => {
    if (list.length) {
      return list.findIndex(item => item.value === selected.value);
    }
    return 0;
  }

  const dragStart = (e) => {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX;
    } else {
      initialX = e.clientX;
    }
    if (statRef.current.contains(e.target)) {
      isDragActive.current = true;
    }
  }

  const setTranslate = (xPos, el) => {
    let tranVal = xPos < 0 ? 0 : xPos;
    tranVal = xPos > contRef.current.clientWidth - 50 ? contRef.current.clientWidth -50 : tranVal;
    el.style.transform = `translateX(${tranVal}px)`;
  }

  const dragEnd = (e) => {
    initialX = currentX;
    const contWidth = contRef.current.clientWidth - 50;
    const xVal = initialX;
    const divis = contWidth / (list.length - 1);
    const selectIndex = getSelectedIndex();
    if (xVal > (divis/2)) {
      updateSelected(list[selectIndex+1])();
    } else {
      setTranslate(selectIndex*divis,statRef.current);
    }
    isDragActive.current = false;
  }

  const drag = (e) => {
    if (isDragActive.current) {
      e.preventDefault();
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
      } else {
        currentX = e.clientX - initialX;
      }
      const contWidth = contRef.current.clientWidth - 50;
      const selectIndex = list.findIndex(item => item.value === selected.value);
      const divis = contWidth / (list.length - 1);
      if (currentX >= 0) {
        setTranslate(selectIndex*divis + currentX, statRef.current);
      }
    }
  }


  useEffect(() => {
    if (contRef.current && statRef.current) {
      window.addEventListener("touchstart", dragStart, false);
      window.addEventListener("touchend", dragEnd, false);
      window.addEventListener("touchmove", drag, false);

      window.addEventListener("mousedown", dragStart, false);
      window.addEventListener("mouseup", dragEnd, false);
      window.addEventListener("mousemove", drag, false);
    }
    return () => {
      window.removeEventListener("touchstart", dragStart, false);
      window.removeEventListener("touchend", dragEnd, false);
      window.removeEventListener("touchmove", drag, false);

      window.removeEventListener("mousedown", dragStart, false);
      window.removeEventListener("mouseup", dragEnd, false);
      window.removeEventListener("mousemove", drag, false);
    }
  }, [selected])

  useEffect(() => {
    if (list.length) {
      const contWidth = contRef.current.clientWidth - 50;
      const selectIndex = getSelectedIndex();
      const divis = contWidth / (list.length - 1);
      setTranslate(selectIndex*divis, statRef.current);
    }
  }, [selected.value])

  return (
    <StatusWrap ref={contRef}>
      <StatusLine>
        <StatusItem visible>
          <StatusIndicator ref={statRef}>
            {
              getSelectedIndex() < (list.length - 1) &&
                <FontAwesomeIcon icon={faChevronRight} className='icon' data-cy="change-status" />
            }
          </StatusIndicator>
        </StatusItem>
        {
          list.map((listItem, index) => (
            <StatusItem
              visible={selected.value === listItem.value}
              disabled={listItem.disabled}
              onClick={selected.value !== listItem.value && updateSelected(listItem)}
            />
          ))
        }
      </StatusLine>
      <Spacer>
        {
          list.map(listItem => (
            <StatusText
              selected={selected.value === listItem.value}
              disabled={listItem.disabled}
              onClick={updateSelected(listItem)}
              data-cy={listItem.value}
            >
              { listItem.label }
            </StatusText>
          ))
        }
      </Spacer>
    </StatusWrap>
  )
}

StatusDisplay.defaultProps = {
  list: [],
  selected: {},
  onSelect: () => {},
}

StatusDisplay.propTypes = {
  list: PropTypes.array,
  selected: PropTypes.object,
  onSelect: PropTypes.func,
}

export default StatusDisplay;
