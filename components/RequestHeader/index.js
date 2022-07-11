import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Heading } from 'styles/TextStyled';
import { Wrap, TopSection, MainTitle, Container, ChildrenWrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const RequestHeader = ({ selected = {}, ...props }) => {
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

  const openHelp = () => {
    if (window.FreshworksWidget) {
      window.FreshworksWidget('open');
    }
  };

  useEffect(() => {
    if (eleRef.current) {
      setHeadHeight(eleRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    selectTab(getSelected());
  }, [selected.label]);

  return (
    <React.Fragment>
      <Wrap ref={eleRef} className="tab-wrap" id="tab-wrapper">
        <Container className="tab-container">
          <TopSection className="head-top" popupMode={props.popupMode}>
            <FontAwesomeIcon
              className="help-icon"
              icon={faQuestionCircle}
              onClick={openHelp}
            />
            {props.fixedTitle ? (
              <MainTitle>{props.fixedTitle}</MainTitle>
            ) : null}
            <FontAwesomeIcon
              className="close-icon"
              icon={faTimes}
              onClick={props.onClose}
            />
          </TopSection>
          <Heading className="request-main-heading">
            {props.renderHeading ? props.renderHeading() : props.title}
          </Heading>
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
