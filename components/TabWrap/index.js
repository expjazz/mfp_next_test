import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Tabs from '../Tabs';
// import Tabs from 'components/Tabs';

const TabWrap = ({ tabsList, selected, autoSelect, onTabChange, showTabs, children, tabProps, tabPortal }) => {
  const getSelected = (defaultTab) => {
    if (selected && typeof selected === 'object' && Object.keys(selected).length) {
      return tabsList.find(tab => tab.value === selected.value) || defaultTab || {};
    }
    return defaultTab || {};
  }
  const [tabSelected, selectTab] = useState(getSelected(tabsList[0]));

  const setTab = (tab) => () => {
    selectTab(tab);
  }

  useEffect(() => {
    if (!autoSelect) {
      selectTab(getSelected(tabSelected))
    }
  }, [selected?.value])

  const renderTabs = () => {
    return showTabs && (
      <Tabs
        tabsList={tabsList}
        selected={tabSelected && tabSelected.value}
        onTabClick={(tab) => {onTabChange(tab); selectTab(tab)}}
        {...tabProps}
      />
    )
  }

  return (
    <React.Fragment>
      {
        tabPortal && showTabs ?
          createPortal(renderTabs(), document.getElementById(tabPortal))
        :
          renderTabs()
      }
      {
        children(tabSelected.value, setTab)
      }
    </React.Fragment>
  )
}

TabWrap.defaultProps = {
  tabsList: [],
  selected: {},
  tabPortal: '',
  showTabs: true,
  autoSelect: true,
  onTabChange: () => {},
  tabProps: {},
}

TabWrap.propTypes = {
  tabsList: PropTypes.array,
  tabPortal: PropTypes.string,
  showTabs: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onTabChange: PropTypes.func,
  autoSelect: PropTypes.bool,
  selected: PropTypes.object,
  tabProps: PropTypes.object,
}

export default TabWrap;
