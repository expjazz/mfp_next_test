import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import DownloadHandler from '../../../../../../../../../DownloadHandler';
import { downloadFunItem } from '../../../../../../utils';
import { Ul, Li } from '../../styled';
import { Wrapper } from './styled';
import { LinkText } from '../../../../../../../../../../styles/TextStyled';

function ImageUpload(props) {
  const { t } = useTranslation();
  const {
    fun_stuff_request_details: { request_files: files, fun_stuff: funStuff },
    fun_stuff_request_details: reqDetails = {},
  } = props.bookingData;

  return (
    <Wrapper>
      <span className="sub-head">{funStuff?.title || ''}</span>
      {files && files.length > 0 && (
        <Ul>
          {files.map((file, index) => {
            return (
              <Li>
                <span className="file-details">
                  <span className="file-name">
                    {/* {props.bookingData.celebrity}_ */}
                    {/* {reqDetails.fun_stuff_request_id}_{index + 1}. */}
                    {/* {file.file_name.split('.')[1]} */}
                  </span>
                  <span className="file-size">
                    {t('common.file_size')} - {file.file_size}
                  </span>
                </span>
                {/* <span
                  className="links"
                  onClick={downloadFunItem(
                    file.processed_file_url,
                    props.downloadFunc,
                  )}
                  role="presentation"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  <LinkText className="download">
                    {t('common.download')}
                  </LinkText>
                </span> */}
              </Li>
            );
          })}
        </Ul>
      )}
    </Wrapper>
  );
}

ImageUpload.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default DownloadHandler(ImageUpload);
