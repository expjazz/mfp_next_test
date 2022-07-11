import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/utils/dataStructures';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getUserImage } from 'src/utils/dataformatter';
import { useMedia, useResizeObserver } from 'customHooks/domUtils';
import { Heading } from 'styles/TextStyled';
import { Wrap, TopSection, Container, ChildrenWrap } from './styled';
import { useMediaQuery } from '@material-ui/core';

const RequestHeader = ({ selected = {}, ...props }) => {
  const isMobile = useMediaQuery('(max-width: 831px)');

  const getSelected = () => {
    if (!isEmpty(selected)) {
      return (
        props.tabsList.find(tab => tab.value === selected.value) ||
        props.tabsList[0] ||
        {}
      );
    }
    return props.tabsList[0] || {};
  };
  const [tabSelected, selectTab] = useState(getSelected());
  const [headHeight, setHeadHeight] = useState(0);
  const eleRef = useRef(null);

  const setTab = (event, tabVal) => {
    selectTab(props.tabsList.find(tabItem => tabItem.value === tabVal));
  };

  const getHeaderHeight = size => {
    if (headHeight !== size.height && size.height) {
      setHeadHeight(size.height);
    }
  };

  useResizeObserver(eleRef, getHeaderHeight);

  useEffect(() => {
    selectTab(getSelected());
  }, [selected.label]);

  return (
    <React.Fragment>
      <Wrap ref={eleRef} id="tab-id-wrap">
        <Container>
          <TopSection className="head-top" popupMode={props.popupMode}>
            <FontAwesomeIcon className="help-icon" icon={faQuestionCircle} />
            <span className="avatar-wrp">
              {isMobile && (
                <img
                  src={getUserImage(props.avatar)}
                  alt="avatar"
                  className="avatar"
                />
              )}
              <Heading className="request-main-heading">
                {props.renderHeading ? props.renderHeading() : props.title}
              </Heading>
            </span>
            <FontAwesomeIcon
              className="close-icon"
              icon={faTimes}
              onClick={props.onClose}
            />
          </TopSection>
        </Container>
        {props.tabsList.length ? (
          <React.Fragment>
            <Tabs
              value={tabSelected.value || props.tabsList[0].value}
              onChange={setTab}
              variant="fullWidth"
              disableFocusRipple
              disableRipple
              classes={{
                root: 'tabs-root',
                indicator: 'tabs-indicator',
              }}
              aria-label="icon label tabs example"
            >
              {props.tabsList.map(tabItem => (
                <Tab
                  label={
                    <span>
                      {tabItem.label}
                      {tabItem.highlight && (
                        <FontAwesomeIcon
                          className="highlight"
                          icon={faExclamationCircle}
                        />
                      )}
                    </span>
                  }
                  value={tabItem.value}
                  classes={{
                    root: 'tab-root',
                    selected: 'tab-selected',
                  }}
                />
              ))}
            </Tabs>
          </React.Fragment>
        ) : null}
      </Wrap>
      <ChildrenWrap
        autoHeight={props.autoHeight}
        className="request-content"
        headHeight={headHeight}
      >
        {tabSelected.value
          ? props.children(tabSelected.value)
          : props.children()}
      </ChildrenWrap>
    </React.Fragment>
  );
};

RequestHeader.defaultProps = {
  title: '',
  fixedTitle: '',
  renderHeading: false,
  selected: {},
  tabsList: [],
  popupMode: false,
  autoHeight: false,
  onClose: () => {},
};

RequestHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  selected: PropTypes.object,
  fixedTitle: PropTypes.string,
  tabsList: PropTypes.array,
  autoHeight: PropTypes.bool,
  popupMode: PropTypes.bool,
  renderHeading: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default RequestHeader;
