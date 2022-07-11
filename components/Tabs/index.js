import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabList, TabItem } from './styled';
import { registerDragScroll } from '../../src/utils/scrollUtils';

export const Tabs = ({ tabsList, selected, onTabClick, listClass, listItemClass, hasScroll, scrollProps }) => {

  const scrollbarRef = useRef(null);


  const tabClick = (tabItem) => () => {
    onTabClick(tabItem);
  }

  const renderTabItems = () => {
    return tabsList.map(tabItem => (
      <TabItem
        id={`tab-${tabItem.value}`}
        key={tabItem.value}
        selected={tabItem.value === selected}
        onClick={tabClick(tabItem)}
        className={`${listItemClass}${tabItem.value === selected ? ' tab-highlight' : ''}`}
      >
        {tabItem.label}
        {tabItem.highlight && <FontAwesomeIcon icon={faExclamationCircle} className='highlight' />}
      </TabItem>
    ))
  }

  useEffect(() => {
    if (document.getElementById(`tab-${selected}`) && scrollbarRef.current) {
      const leftOff = document.getElementById(`tab-${selected}`).offsetLeft;
      scrollbarRef.current.scrollLeft(leftOff-10);
    }
  }, [selected]);

  useEffect(() => {
    if (scrollbarRef.current) {
      registerDragScroll(scrollbarRef.current)
    }
  }, [])

  return (
    <React.Fragment>
      {
        tabsList.length > 0 && 
        <TabList className={listClass}>
          {
            hasScroll ?
              <Scrollbars
                ref={scrollbarRef}
                className='scroll-tab-root'
                renderView={scrollerProps => (
                  <div {...scrollerProps} className="tabs-scrollbar-content" />
                )}
                renderTrackHorizontal={props => <div {...props} className="tabs-track-horizontal"/>}
                autoHide
                {...scrollProps}
              >
                {
                  renderTabItems(tabsList)
                }
              </Scrollbars>
            : renderTabItems(tabsList)
          }
        </TabList>
      }
    </React.Fragment>
  )
}

Tabs.defaultProps = {
  tabsList: [],
  selected: '',
  scrollProps: {},
  hasScroll: false,
  onTabClick: () => {},
  listClass: '',
  listItemClass: '',
}

Tabs.propTypes = {
  tabsList: PropTypes.array,
  selected: PropTypes.string,
  onTabClick: PropTypes.func,
  scrollProps: PropTypes.object,
  hasScroll: PropTypes.bool,
  listClass: PropTypes.string,
  listItemClass: PropTypes.string,
}

export default Tabs;
