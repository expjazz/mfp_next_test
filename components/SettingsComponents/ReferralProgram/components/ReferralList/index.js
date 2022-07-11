import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import ReferralItem from '../ReferralItem';
import { withScroll } from 'components/withScroll';
import { useConfigPartner } from 'customHooks/reactQueryHooks';

const OpenListing = (props) => {
  const { data: configData } = useConfigPartner()
  return (
    <React.Fragment>
      {
        props.dataList.map((referralItem, index) => (
          <ReferralItem
            data={referralItem}
            history={() => {}}
            configData={configData}
            key={index}
          />
        ))
      }
      {
        props.loading && props.dataList.length > 0 &&
          <Loader />
      }
    </React.Fragment>
  )
}

OpenListing.defaultProps = {
}

OpenListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  configData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStates = state => ({
  configData: state.config.data,
});

export default withScroll(OpenListing)
