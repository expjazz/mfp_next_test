import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import UploadItem from './components/UploadItem';
import {
  Wrap,
  MainHeading,
} from './styled';
import { useGeneral } from 'src/context/general';

const UploadList = () => {
  const { t } = useTranslation();
  const state = useGeneral()[0]
  const pendingList = state?.resumableUpload?.pendingQueue || []
  const completedList = state?.resumableUpload?.completedList || []
  return (
    <Wrap>
      {
        pendingList.map(fileItem => (
          <UploadItem fileItem={fileItem} />
        ))
      }
      {
        completedList.length > 0 &&
          <MainHeading>
            {t('common.finished')}
          </MainHeading>
      }
      {
        completedList.map(fileItem => (
          <UploadItem isCompleted fileItem={fileItem} />
        ))
      }
    </Wrap>
  )
}

export default UploadList
