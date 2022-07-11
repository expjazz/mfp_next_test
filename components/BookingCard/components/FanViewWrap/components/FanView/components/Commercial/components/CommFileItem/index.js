import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
// import ImagePreview from 'components/ImagePreview';
// import VideoPreview from 'components/VideoPreview';
// import { LinkText } from 'styles/TextStyled';
import { Li } from '../../styled';
import ImagePreview from '../../../../../../../../../ImagePreview';
import VideoPreview from '../../../../../../../../../VideoPreview';
import { LinkText } from '../../../../../../../../../../styles/TextStyled';

const CommFileItem = ({
  fileName,
  fileSize,
  fileType,
  fileURL,
  onDownload,
  t,
}) => {

  const [viewFile, toggViewFile] = useState(false);

  const onView = () => {
    toggViewFile(!viewFile)
  }

  return (
    <Li>
      {
        fileType === 'image' &&
          <ImagePreview
            open={viewFile}
            onClose={() => toggViewFile(false)}
            src={fileURL}
          />
      }
      {
        fileType === 'video' &&
          <VideoPreview
            open={viewFile}
            src={fileURL}
            onClose={() => toggViewFile(false)}
          />
      }
      <span className="file-details">
        <span className="file-name">
          {fileName}
        </span>
        {
          fileSize ?
            <span className="file-size">
              {t('common.file_size')} - {fileSize}
            </span>
          : null
        }
      </span>
      <span
        className="links"
      >
        <span
          className='request-cta-wrap'
          onClick={onView}
          role="presentation"
        >
          <LinkText className="download">
            {t('common.view')}
          </LinkText>
        </span>
        <span
          className='request-cta-wrap'
          onClick={onDownload}
          role="presentation"
        >
          <FontAwesomeIcon className='comm-download-icon' icon={faDownload} />
          <LinkText className="download">
            {t('common.download')}
          </LinkText>
        </span>
      </span>
    </Li>
  )
}

CommFileItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileURL: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default CommFileItem;
