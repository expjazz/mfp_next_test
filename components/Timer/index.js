import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Timer = props => {
  const [state, setState] = useState({
    day: undefined,
    hour: undefined,
    min: undefined,
    sec: undefined,
    timestamp: 0,
  });

  useEffect(() => {
    const { endDate, dtFormat } = props;
    const deadline = moment(endDate, dtFormat);
    const interval = setInterval(() => {
      const now = moment();
      const timestamp = deadline - now;
      const day = Math.floor(timestamp / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const min = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((timestamp % (1000 * 60)) / 1000);
      setState({ day, hour, min, sec, timestamp });
      if (timestamp < 0) {
        setState({ day: '00', hour: '00', min: '00', sec: '00', timestamp: 0 });
        clearInterval(interval);
        if (props.callBack) {
          props.callBack();
        }
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const { displayFormat } = props;
  const getTimer = () => {
    let text = '';
    if (displayFormat) {
      const elm = displayFormat.split(':');
      elm.forEach(element => {
        if (state[element]) {
          if ((element === 'hour' || element === 'day') && state[element] > 1) {
            text = `${text} ${state[element]} ${element}s`;
          } else {
            text = `${text} ${state[element]} ${element}`;
          }
        }
      });
    }
    return text;
  };

  return (
    <React.Fragment>
      {state.timestamp > 0 && (
        <span className="countdown-timer">{getTimer()}</span>
      )}
    </React.Fragment>
  );
};

Timer.propTypes = {
  displayFormat: PropTypes.string.isRequired,
  callBack: PropTypes.func,
};
Timer.defaultProps = {
  callBack: () => {},
};
export default Timer;
