import React from 'react';
import PropTypes from 'prop-types';
import { ListingStyled } from './styled';
import { withScroll } from '../../../../../../withScroll';

const VideoListing = props => {
  return (
    <ListingStyled>
      {props.dataList.map(data => (
        <li className='list-block-root' key={data.id}>
          {props.renderContent(data)}
        </li>
      ))}
    </ListingStyled>
  );
};

VideoListing.defaultProps = {
  renderContent: () => {}
};

VideoListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  renderContent: PropTypes.func,
};

export default withScroll(VideoListing);
