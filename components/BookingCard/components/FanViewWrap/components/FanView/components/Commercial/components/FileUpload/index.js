import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
// import { LinkText } from 'styles/TextStyled';
// import DownloadHandler from 'components/DownloadHandler';
import CommFileItem from '../CommFileItem';
import { downloadCommFile } from '../../../../../../utils';
import { Ul, Li } from '../../styled';
import { Wrapper } from './styled';
import DownloadHandler from '../../../../../../../../../DownloadHandler';

function ImageUpload(props) {
  const { t } = useTranslation();
  const {
    commercial_details: { response_file: files, offering },
    commercial_details: reqDetails = {},
    request_video: requestVideo,
  } = props.bookingData;

  return (
    <Wrapper>
      <span className="sub-head">{offering.title}</span>
      {files && files.length > 0 && (
        <Ul>
          {files.map((file, index) => {
            return (
              <CommFileItem
                fileName={`
                  ${props.bookingData.celebrity_first_name}_
                  ${props.bookingData.booking_id}_${index + 1}.
                  ${file.file_name.split('.')[1]}
                `}
                fileSize={file.file_size}
                fileType={file.file_type}
                fileURL={file.original_file_url || file.processed_file_url}
                onDownload={downloadCommFile(
                  props.bookingData,
                  file,
                  index + 1,
                  props.downloadFunc,
                )}
                t={t}
              />
            );
          })}
        </Ul>
      )}
      {(!files || !files.length) && requestVideo && requestVideo[0] ? (
        <Ul>
          <CommFileItem
            fileName={`
              ${props.bookingData.celebrity_first_name}_
              ${props.bookingData.booking_id}_1.mp4
            `}
            fileType='video'
            fileURL={requestVideo[0].s3_video_url}
            onDownload={downloadCommFile(
              props.bookingData,
              { file_url: requestVideo[0].s3_video_url },
              1,
              props.downloadFunc,
            )}
            t={t}
          />
        </Ul>
      ) : null}
    </Wrapper>
  );
}

ImageUpload.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default DownloadHandler(ImageUpload);
