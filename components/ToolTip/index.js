import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: '50%',
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: '50%',
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
  };
}


const styles = () => ({
  arrowPopper: arrowGenerator('#000000'),
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  toolTip: {
    backgroundColor: '#000000',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Gilroy-Regular',
    padding: '15px',
    margin: 0,
    marginTop: '5px',
  }
});

const ToolTip = (props) => {

  const arrowRef = useRef(null);

  if (props.title === '') {
    return props.children;
  }

  return (
    <Tooltip
      {...props}
      title={
        <React.Fragment>
          { props.title }
          <span className={props.classes.arrow} ref={arrowRef} />
        </React.Fragment>
      }
      classes={{ popper: props.classes.arrowPopper, tooltip: props.classes.toolTip }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef.current),
              element: arrowRef.current,
            },
          },
        },
      }}
    >
      { props.children }
    </Tooltip>
  );
}

ToolTip.defaultProps = {
  classes: {},
  title: '',
}

ToolTip.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object,
  title: PropTypes.string,
}

export default withStyles(styles)(ToolTip);

