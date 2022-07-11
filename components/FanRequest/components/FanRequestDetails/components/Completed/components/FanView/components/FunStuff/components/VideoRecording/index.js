/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FunList from 'components/FunList';
import VideoRender from 'components/VideoRender';
import { getShortName } from 'src/utils/dataToStringFormatter';
import DownloadHandler from 'components/DownloadHandler';
import { downloadFunItem } from '../../../../../../utils';
import { VideoWrap } from '../../styled';

const VideoRecording = props => {
  const {
    fun_stuff_request_details: funStuffDetails = {},
    fun_stuff_request_details: { request_files: funList },
  } = props.bookingData;

  const recordURL = useMemo(() => {
    if (funList && funList.length > 0) {
      const findFile = funList.find(file => file.recorded);
      return findFile ? findFile.processed_file_url || findFile.file_url : '';
    }
    return '';
  }, [funList]);

  return (
    <React.Fragment>
      <span className="title videoTitle">
        {funStuffDetails.fun_stuff.title}
      </span>
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
                    props.bookingData.celebrity_first_name
                  }_${index}.
                  ${funFiles.file_name.split('.')[1]}`,
                }}
                fileName
                onClick={
                  funFiles.processed_file_url
                    ? downloadFunItem(
                        funFiles.processed_file_url,
                        props.downloadFunc,
                      )
                    : null
                }
                processing={!funFiles.processed_file_url}
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

export default DownloadHandler(VideoRecording);
