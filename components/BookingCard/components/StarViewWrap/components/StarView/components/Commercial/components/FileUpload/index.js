import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import { LinkText } from 'styles/TextStyled';
import DownloadHandler from 'components/DownloadHandler';
import { downloadCommFile } from '../../../../../../utils';
import { Ul, Li } from '../../styled';
import { Wrapper } from './styled';

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
              <Li>
                <span className="file-details">
                  <span className="file-name">
                    {props.bookingData.celebrity_first_name}_
                    {props.bookingData.booking_id}_{index + 1}.
                    {file.file_name.split('.')[1]}
                  </span>
                  <span className="file-size">
                    {t('common.file_size')} - {file.file_size}
                  </span>
                </span>

                <span
                  className="links"
                  onClick={downloadCommFile(
                    props.bookingData,
                    file,
                    index + 1,
                    props.downloadFunc,
                  )}
                  role="presentation"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  <LinkText className="download">
                    {t('common.download')}
                  </LinkText>
                </span>
              </Li>
            );
          })}
        </Ul>
      )}
      {(!files || !files.length) && requestVideo && requestVideo[0] ? (
        <Ul>
          <Li>
            <span className="file-details">
              <span className="file-name">
                {props.bookingData.celebrity_first_name}_
                {reqDetails.fun_stuff_request_id}_1.mp4
              </span>
            </span>

            <span
              className="links"
              onClick={downloadCommFile(
                props.bookingData,
                { file_url: requestVideo[0].s3_video_url },
                1,
                props.downloadFunc,
              )}
              role="presentation"
            >
              <FontAwesomeIcon icon={faDownload} />
              <LinkText className="download">{t('common.download')}</LinkText>
            </span>
          </Li>
        </Ul>
      ) : null}
    </Wrapper>
  );
}

ImageUpload.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default DownloadHandler(ImageUpload);
