import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { useTranslation,Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { bytesToSize } from 'customHooks/domUtils';
// import {
//   recordTrigger,
//   updateMediaStore,
//   playPauseMedia,
// } from 'store/shared/actions/commonActions';
import Button from 'components/SecondaryButton';
import TextArea from 'components/TextArea';
import StatusDisplay from 'components/StatusDisplay';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { FlexCenter } from 'styles/CommonStyled';
import VideoRec from './VideoRecording';
import { CharCount } from '../../styled';
import { useGeneral } from 'src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { capitalize } from '@material-ui/core';

const VideoRecording = props => {
  const { data: entityData } = useGetPartner()
  const [state, dispatch] = useGeneral()
  const videoFile = state.commonReducer.file
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);

  const {
    booking_id: bookingId,
    complete_status: completeStatus,
  } = props.booking;

  const [response, updateResponse] = useState('');

  const clearStates = () => {
    props.updateMediaStore({
      videoSrc: '',
      superBuffer: '',
      recordedTime: null,
      recorded: false,
    });
    props.playPauseMedia(false);
    props.recordTrigger(false);
  };

  const updateFiles = fileList => {
    setFiles(fileList);
  };

  const uploadFiles = async () => {
    let recordVideo = null;
    if (videoFile) {
      if (videoFile.name && typeof videoFile.name === 'string') {
        recordVideo = videoFile;
      } else {
        recordVideo = new File([videoFile], 'funvideo.mp4');
      }
    }
    const recordFile = recordVideo
      ? [
          {
            file: recordVideo,
            file_type: 'video',
            file_name: recordVideo.name,
            file_size: bytesToSize(recordVideo.size),
          },
        ]
      : [];
    props.completeUpload(
      {
        celebrity_reply: response,
      },
      [...recordFile, ...files],
    );
  };

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  useEffect(() => {
    // clearStates();
    updateResponse('');
  }, [props.booking.booking_id]);

  useEffect(() => {
    return () => {
      clearStates();
    };
  }, []);

  const renderView = () => {
    return (
      <React.Fragment>
        <span className="flex-col req-sec">
          <span className="sub-head">{t('common.status')}</span>
          <span className="text">
            {t('open_bookings.recording_status',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name,purchaserPlural:capitalize(entityData?.partnerData?.purchaser_plural_name)})}
          </span>
        </span>
        <StatusDisplay
          key={bookingId}
          list={getStatusList(completeStatus)}
          onSelect={props.updateStatusVal}
          selected={getDelivStatus(completeStatus)}
        />
        <div className="flex-col req-sec">
          <VideoRec
            {...props}
            recordTrigger={props.recordTrigger}
            updateMediaStore={props.updateMediaStore}
            playPauseMedia={props.playPauseMedia}
            updateFiles={updateFiles}
            files={files}
            updateToast={props.updateToast}
            editDelivery={props.editDelivery}
            deliveryTypes={props.deliveryTypes}
          />
          <TextArea
            autoSize
            inputProps={{
              onChange: responseChange,
              value: response,
              maxLength: 500,
              placeholder: t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
              className: 'textarea',
            }}
          />
          <CharCount>{t('common.char_remains', {length:500 - response.length})}</CharCount>
          <FlexCenter className="buttons">
            <Button
              className="fun-btns"
              onClick={uploadFiles}
              disabled={!(videoFile || files.length > 0)}
              isDisabled={!(videoFile || files.length > 0)}
            >
              {t('open_bookings.completeOrder')}
            </Button>
          </FlexCenter>
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderView()}</React.Fragment>;
};

VideoRecording.propTypes = {
  booking: PropTypes.object.isRequired,
  updateStatusVal: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
  videoFile: PropTypes.oneOfType([PropTypes.object, null]),
  editDelivery: PropTypes.func.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
};

VideoRecording.defaultProps = {
  videoFile: null,
};

// function mapDispatchToProps(dispatch) {
//   return {
//     recordTrigger: value => {
//       dispatch(recordTrigger(value));
//     },
//     updateMediaStore: payload => {
//       dispatch(updateMediaStore(payload));
//     },
//     playPauseMedia: () => {
//       dispatch(playPauseMedia());
//     },
//   };
// }

// state => ({ videoFile: state.commonReducer.file }),
export default VideoRecording
