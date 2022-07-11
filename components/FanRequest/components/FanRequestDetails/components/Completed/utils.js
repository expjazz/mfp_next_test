import { isEmpty } from 'src/utils/dataStructures';
import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';

const i18n = {
  t: value => value
}
export const getFileName = (deliveryMethod, file) => {
  if (deliveryMethod === deliveryMethods.audio && file.processed_file_name) {
    return file.processed_file_name;
  }
  return file.file_name;
};

export const downloadCommFile = (reqDetails, funFiles, index, fn) => () => {
  if (!isEmpty(reqDetails.commercial_details)) {
    const url = {
      downloadNM: `${reqDetails.celebrity.replace(' ', '_')}_${
        reqDetails.booking_id
      }_${index}`,
    };

    fn(funFiles.processed_file_url || funFiles.file_url, url.downloadNM);
  }
};

export const downloadFunItem = (downloadUrl, fn) => () => {
  if (downloadUrl) {
    fn(downloadUrl);
  }
};

export const getSelectedTab = (
  { message_status: messageStatus },
  showDetails,
) => {
  if (showDetails) {
    return {
      label: i18n.t('common.details'),
      value: 'details',
    };
  } else if (messageStatus === 2) {
    // Awaiting Clarification
    return {
      label: i18n.t('common.clarifications'),
      value: 'clarify',
      highlight: clarifyStatus[messageStatus] === 'await_clarify', // Awaiting Clarification
    };
  }
  return null;
};
