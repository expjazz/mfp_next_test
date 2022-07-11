import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { EPanel, EDetails, ESummary } from './styled';

export const Panel = props => {
  return (
    <EPanel
      id={props.id}
      expanded={props.expanded === props.tag}
      onChange={props.triggerAccordian}
      classes={{
        root: `panel-container ${props.classes.base.root}`,
        expanded: `panel-expanded ${props.classes.base.expanded}`,
        ...props.classes.rest,
      }}
    >
      <ESummary
        expandIcon={<FontAwesomeIcon className="right" icon={faChevronRight} />}
        className="panel-summary-head"
        classes={{
          expandIcon: 'arrow-icon',
          expanded: `expand-summary`,
          ...props.classes.summary,
        }}
        expanded={props.expanded === props.tag}
      >
        {props.component && props.component}
        {props.label === 'linkedin' ? 'LinkedIn' : props.label}
      </ESummary>
      {props.children}
    </EPanel>
  );
};
Panel.propTypes = {
  expanded: PropTypes.string,
  tag: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  triggerAccordian: PropTypes.func,
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
  component: PropTypes.node,
};

Panel.defaultProps = {
  expanded: '',
  tag: '',
  id: '',
  label: '',
  triggerAccordian: () => {},
  classes: { base: {} },
  component: null,
};

export const Content = props => {
  return (
    <EDetails
      classes={{
        root: `panel-summary-head ${props.classes.base.root}`,
        ...props.classes.rest,
      }}
    >
      {props.children}
    </EDetails>
  );
};
Content.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

Content.defaultProps = {
  classes: { base: {} },
  component: null,
};
