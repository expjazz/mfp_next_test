/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import { LinkText } from 'styles/TextStyled';
import VideoRender from 'components/VideoRender';
import DownloadHandler from 'components/DownloadHandler';
import { downloadFunItem, getFileName } from '../../../../../../utils';
import { FunSection, Ul, Li } from '../../styled';
import { AudioWrap } from './styled';

const AudioRecord = props => {
  const { t } = useTranslation();
  const {
    fun_stuff_request_details: {
      request_files: funList,
      fun_stuff: funStuff,
      delivery_method: delMethod,
    },
    fun_stuff_request_details: reqDetails = {},
  } = props.bookingData;

  const recordURL = useMemo(() => {
    if (funList && funList.length > 0) {
      const findFile = funList.find(file => file.recorded) || {};
      return findFile.processed_file_url || findFile.file_url;
    }
    return '';
  }, [funList]);

  return (
    <FunSection>
      <span className="sub-head">{funStuff.title}</span>
      {recordURL && (
        <AudioWrap>
          <VideoRender
            variableWidth
            variableHeight
            hidePlay
            playView
            videoSrc={recordURL}
            classes={{ container: 'player-container' }}
          />
        </AudioWrap>
      )}
      {funList && funList.length > 0 && (
        <Ul>
          {funList.map((file, index) => {
            return (
              <Li>
                <span className="file-details">
                  <span className="file-name">
                    {props.bookingData.celebrity_first_name}_
                    {reqDetails.fun_stuff_request_id}_{index + 1}.
                    {getFileName(delMethod, file).split('.')[1]}
                  </span>
                  <span className="file-size">
                    {t('common.file_size')} -{' '}
                    {file.processed_file_size || file.file_size}
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
    </FunSection>
  );
};

AudioRecord.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default DownloadHandler(AudioRecord);
