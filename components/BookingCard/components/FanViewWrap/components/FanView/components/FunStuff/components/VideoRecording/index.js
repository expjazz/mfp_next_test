/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import FunList from 'components/FunList';
import VideoRender from '../../../../../../../../../VideoRender';
import FunList from '../../../../../../../../../FunList'
// import { getShortName } from 'src/utils/dataToStringFormatter';
import { VideoWrap } from '../../styled';
import { getShortName } from '../../../../../../../../../../src/utils/dataToStringFormatter';

const VideoRecording = props => {
  const {
    fun_stuff_request_details: funStuffDetails = {},
    fun_stuff_request_details: { request_files: funList },
  } = props.bookingData;

  const recordURL = useMemo(() => {
    if (funList && funList.length > 0) {
      const findFile = funList.find(file => file.recorded);
      return findFile ? findFile.file_url : '';
    }
    return '';
  }, [funList]);

  return (
    <React.Fragment>
      <span className="title">{funStuffDetails.fun_stuff.title}</span>
      {recordURL && (
        <VideoWrap>
          <VideoRender
            variableWidth
            variableHeight
            videoSrc={recordURL}
            classes={{ container: 'player-container' }}
          />
        </VideoWrap>
      )}
      <section className="fun-section">
        <ul className="fun-list">
          {funList &&
            funList.map((funFiles, index) => (
              <FunList
                classes={{ root: 'fun-list-item' }}
                fun={{
                  ...funFiles,
                  file_name: `${
                    props.bookingData.celebrity
                  }_${index}.
                  ${funFiles.file_name.split('.')[1]}`,
                }}
                fileName
                onClick={props.onFunClick(funFiles.processed_file_url)}
                fanView
                starNM={getShortName(
                  props.bookingData.celebrity_nick_name,
                  props.bookingData.celebrity_first_name,
                )}
              />
            ))}
        </ul>
      </section>
    </React.Fragment>
  );
};

VideoRecording.propTypes = {
  bookingData: PropTypes.object.isRequired,
  onFunClick: PropTypes.object.isRequired,
};

export default VideoRecording;
