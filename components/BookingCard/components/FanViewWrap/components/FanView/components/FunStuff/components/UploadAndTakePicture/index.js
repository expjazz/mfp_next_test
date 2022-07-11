import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
// import { Image } from 'styles/CommonStyled';
// import { LinkText } from 'styles/TextStyled';
// import ImagePreview from 'components/ImagePreview';
import DownloadHandler from '../../../../../../../../../DownloadHandler';
import { downloadFunItem } from '../../../../../../utils';
import { Ul, Li } from '../../styled';
import { Wrapper } from './styled';
import { Image } from '../../../../../../../../../../styles/CommonStyled';
import { LinkText } from '../../../../../../../../../../styles/TextStyled';
import ImagePreview from '../../../../../../../../../ImagePreview';

function ImageUpload(props) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const {
    fun_stuff_request_details: { request_files: files },
    fun_stuff_request_details: funStuffDetails = {},
  } = props.bookingData;

  const previewImage = src => () => {
    setPreview(src);
  };

  const modalClose = () => {
    setPreview(null);
  };

  return (
    <Wrapper>
      <span className="sub-head">{funStuffDetails.fun_stuff.title}</span>
      {files && files.length > 0 && (
        <Ul>
          {files.map((file, index) => {
            return (
              <Li>
                {file.file_url && (
                  <Image
                    image={file.processed_file_url || file.file_url}
                    className="image"
                  ></Image>
                )}
                <span className="file-details">
                  <span className="file-name">
                    {props.bookingData.celebrity}_
                    {funStuffDetails.fun_stuff_request_id}_{index + 1}.
                    {file.file_name.split('.')[1]}
                  </span>
                  <span className="file-size">
                    {t('common.file_size')} - {file.file_size}
                  </span>
                  <span className="links">
                    <LinkText
                      onClick={previewImage(
                        file.processed_file_url || file.file_url,
                      )}
                    >
                      {t('common.view')}
                    </LinkText>
                  </span>
                </span>
                <span
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
                </span>
              </Li>
            );
          })}
        </Ul>
      )}

      {preview && (
        <ImagePreview
          src={preview}
          open={preview !== null}
          onClose={modalClose}
        />
      )}
    </Wrapper>
  );
}

ImageUpload.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default DownloadHandler(ImageUpload);
