import React from 'react';
import PropTypes from 'prop-types';
import { Ul, Li } from './styled';

function StarList(props) {
  return (
    <Ul>
      {props.stars.map(star => {
        return (
          <Li
            key={star.id}
            onClick={() => props.onStarClick(star)}
            selected={star.id === props.selected.id}
          >
            <span className="name">{star.first_name} {star.last_name}</span>
            <span className="exp-wrp">
              <span className="count">
                {props.t('fan_manage.myStars.open', {
                  count: star.pending_request_count,
                  request: star.pending_request_count > 1 ? props.t('common.requests') : props.t('common.request')
                })}
              </span>
              {star.expiring_request && (
                <span className="expiry">{props.t('common.expiring')}</span>
              )}
            </span>
          </Li>
        );
      })}
    </Ul>
  );
}

StarList.propTypes = {
  stars: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  onStarClick: PropTypes.array.isRequired,
  selected: PropTypes.object,
};

StarList.defaultProps = {
  selected: {},
};

export default StarList;
