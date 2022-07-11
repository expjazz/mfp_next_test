import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import {
  faQuestionCircle,
  faArrowLeft,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons';
// import { useMedia, openHelp } from 'customHooks/domUtils';
// import { Heading } from 'styles/TextStyled';
import { Wrapper, Header } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { Heading } from '../../styles/TextStyled';
import { isWebView, openHelp } from 'customHooks/domUtils';

const BackHeader = props => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 832px)');
  const renderHeading = () => {
    return (
      props.heading && (
        <Heading className={`heading-top ${props.headerCls}`}>
          {props.heading}
        </Heading>
      )
    );
  };
  return (
    <Wrapper className={`back-header ${props.rootClass}`}>
      <Header className="header-wrp">
        {props.backHandler && (
          <span
            className={isWebView() ? '' : "back-lbl-wrp"}
            onClick={props.backHandler}
            role="presentation"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />{' '}
            <span className="back-label">{props.label}</span>
          </span>
        )}
        {isDesktop && renderHeading()}
        <span className="right-section">
          {
            props.rightLabel &&
              <span
                role='presentation'
                className="back-label right-label"
                onClick={props.rightLabelClick}
              >
                {props.rightLabel}
              </span>
          }
          {!props.noHelp && (
            <span
              className="freshworks-btn"
              role="presentation"
              onClick={openHelp}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />{' '}
              <span className="help-text">{t('common.help')}</span>
            </span>
          )}
          {props.closeHandler && (
            <FontAwesomeIcon
              onClick={props.closeHandler}
              icon={faTimes}
              className="close-icon"
            />
          )}
        </span>
      </Header>
      {!isDesktop && renderHeading()}
    </Wrapper>
  );
};

BackHeader.propTypes = {
  backHandler: PropTypes.func,
  closeHandler: PropTypes.func,
  label: PropTypes.string,
  heading: PropTypes.string,
  headerCls: PropTypes.string,
  rightLabel: PropTypes.string,
  rootClass: PropTypes.string,
  rightLabelClick: PropTypes.func,
  noHelp: PropTypes.bool,
};
BackHeader.defaultProps = {
  backHandler: null,
  closeHandler: null,
  rightLabelClick: () => {},
  label: '',
  rightLabel: '',
  rootClass: '',
  heading: '',
  headerCls: '',
  noHelp: false,
};

export default BackHeader;
