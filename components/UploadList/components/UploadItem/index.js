import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from 'components/SecondaryButton';
import PercentLoader from 'components/PercentLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';
import { status } from 'src/constants/upload';
import {
  Wrap,
  LeftCol,
  RightCol,
  Heading,
  Description,
  StatusPill,
  ActionText,
  MainHeading,
  ConfirmDialog,
} from './styled';
import { completedQueueUpdate, pendingQueueUpdate, useGeneral } from 'src/context/general';

const UploadItem = ({
  fileItem,
  isCompleted,
}) => {
  const { t } = useTranslation();
  const [showConfirm, toggConfirm] = useState(false);
  const dispatch = useGeneral()[1]
  const renderStatus = fStatus => {
    switch (fStatus) {
      case status.processing:
        return t('common.processing');
      case status.failed:
        return t('common.failed');
      case status.cancelled:
        return t('common.cancelledCap');
      case status.completed:
        return t('common.uploaded');
      default:
        return t('common.pending');
    }
  };

  const renderDesc = () => {
    if (isCompleted) {
      if (fileItem.status === status.completed) {
        return moment(fileItem.completed).format(
          `${entity('dateFormat') ? entity('dateFormat') : 'D/M/YYYY'} h:ma`,
        );
      } else if (fileItem.status === status.failed) {
        return t('common.unable_to_upload');
      }
      return t('common.cancelled_upload');
    }
    return fileItem.title;
  };
  const modCompletedQueue = (newFile, type) => {
    completedQueueUpdate(dispatch, {newFile, type})
  }
  const modPendingQueue = (newFile, type) => {
    pendingQueueUpdate(dispatch, {newFile, type})
  }
  const uploadAgain = () => {
    modCompletedQueue(fileItem, 'delete');
    modPendingQueue(
      {
        ...fileItem,
        status: window.navigator.onLine ? status.pending : status.offline,
      },
      'add',
    );
  };

  const onActionClick = action => () => {
    if (
      action === 'pause' ||
      (action === 'cancel' && fileItem.status === status.processing)
    ) {
      fileItem.cancelToken.cancel(action);
    } else if (action === 'cancel') {
      modPendingQueue(fileItem, 'delete');
      modCompletedQueue(
        {
          ...fileItem,
          status: status.cancelled,
        },
        'add',
      );
    } else if (action === 'stop') {
      toggConfirm(true);
    } else {
      modPendingQueue(
        {
          ...fileItem,
          status: status.pending,
        },
        'update',
      );
    }
  };

  return (
    <Wrap
      isProcessing={
        fileItem.status === status.processing ||
        fileItem.status === status.offline
      }
    >
      {
        <ConfirmDialog
          open={showConfirm}
          onClose={() => toggConfirm(false)}
          classes={{ paperScrollPaper: 'confirm-wrap' }}
        >
          <span className="heading">{t('common.cancel_upload')}</span>
          <Button
            secondary
            className="upload-action-btn"
            onClick={() => toggConfirm(false)}
          >
            {t('common.keep_uploading')}
          </Button>
          <Button
            onClick={onActionClick('cancel')}
            className="upload-action-btn"
          >
            {t('common.cancel')}
          </Button>
        </ConfirmDialog>
      }
      {!isCompleted &&
        (fileItem.status === status.processing ||
          fileItem.status === status.offline) && (
          <React.Fragment>
            <MainHeading offline={fileItem.status === status.offline}>
              {fileItem.status === status.offline
                ? 'Please check your internet connection'
                : 'Uploading'}
            </MainHeading>
            <PercentLoader
              offline={fileItem.status === status.offline}
              percentValue={fileItem.progress}
            />
          </React.Fragment>
        )}
      <LeftCol>
        <Heading>
          {isCompleted ? fileItem.title : renderStatus(fileItem.status)}
        </Heading>
        {fileItem.fileName ? (
          <Description className="file-name">{fileItem.fileName}</Description>
        ) : null}
        <Description
          errorStatus={isCompleted && fileItem.status !== status.completed}
        >
          {renderDesc()}
        </Description>
      </LeftCol>
      <RightCol>
        {isCompleted ? (
          <React.Fragment>
            <StatusPill success={fileItem.status === status.completed}>
              {renderStatus(fileItem.status)}
            </StatusPill>
            {fileItem.status !== status.completed && (
              <ActionText onClick={uploadAgain}>
                {t('common.upload_again')}
              </ActionText>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon
              className="action-icon"
              icon={
                fileItem.status === status.processing
                  ? faPauseCircle
                  : faPlayCircle
              }
              onClick={onActionClick(
                fileItem.status === status.processing ? 'pause' : 'start',
              )}
            />
            <FontAwesomeIcon
              className="action-icon"
              icon={faTimesCircle}
              onClick={onActionClick('stop')}
            />
          </React.Fragment>
        )}
      </RightCol>
    </Wrap>
  );
};

UploadItem.propTypes = {
  fileItem: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};


export default UploadItem
