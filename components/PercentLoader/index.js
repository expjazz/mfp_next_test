import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle
} from '@fortawesome/pro-solid-svg-icons';
import { PercentStyled, Dot } from './styled';

const dotArray = new Array(20).fill('');

const PercentLoader = ({
  percentValue,
  offline,
}) => {
  return (
    <PercentStyled>
      <div className="wrap-progress-bar">
        <ul className="circle-container">
          {
            dotArray.map((dot, index) => (
              <li>
                <Dot
                  offline={offline}
                  active={parseInt(percentValue*20, 0) - 1 >= index}
                />
              </li>
            ))
          }
        </ul>
        <span className="value">
          {
            offline ?
              <FontAwesomeIcon className='caution-icon' icon={faExclamationTriangle} />
            : <React.Fragment>{parseInt(percentValue*100, 0)}%</React.Fragment>
          }
        </span>
      </div>
    </PercentStyled>
  );
};

PercentLoader.defaultProps = {
  percentValue: 0,
  offline: false,
}

PercentLoader.propTypes = {
  percentValue: PropTypes.number,
  offline: PropTypes.bool,
}

export default PercentLoader;
