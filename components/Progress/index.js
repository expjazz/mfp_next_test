import React from 'react';
import PropTypes from 'prop-types';
import { Progress, Loading } from './styled';
import { withGeneral } from 'src/context/general';

const LoaderProgress = props => {
  const getLoader = () => {
    if (props.generalContext[0].commonReducer.progress.loader) {
      return <Progress variant="static" value={props.progress.value} />;
    }
    return <Progress />;
  };
  return (
    <React.Fragment>
      {props.generalContext[0].commonReducer.loader && (
        <Loading>{getLoader()}</Loading>
      )}
    </React.Fragment>
  );
};

LoaderProgress.propTypes = {
  loader: PropTypes.bool.isRequired,
  progress: PropTypes.object.isRequired,
};

// const mapState = state => ({
//   loader: state.commonReducer.loader,
//   progress: state.commonReducer.progress,
// });

export default withGeneral(LoaderProgress)
