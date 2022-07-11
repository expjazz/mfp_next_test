/* eslint-disable camelcase */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import { isEmpty } from 'src/utils/dataStructures';
import { sendDigitalGoods } from 'src/services/';
import { LinkText } from 'styles/TextStyled';
import VideoRender from 'components/VideoRender';
import DownloadHandler from 'components/DownloadHandler';
import { EvidenceItem } from '../../../../../../styled';
import { downloadFunItem } from '../../../../../../utils';
import { FunSection, Ul, Li, VideoWrap } from '../../styled';

const VideoRecording = props => {
  const { t } = useTranslation();
  const [edited, setEdited] = useState('');
  const {
    fun_stuff_request_details: { request_files: funList, fun_stuff: funStuff },
    booking_id: bookingId,
    fun_stuff_request_details: reqDetails = {},
  } = props.bookingData;

  const editDesc = reply => {
    props.loaderAction(true);
    setEdited('');
    sendDigitalGoods('edit', bookingId, { celebrity_reply: reply }).then(
      resp => {
        props.loaderAction(false);
        if (resp.booking) {
          setEdited(reply);
          props.updateToast({
            value: true,
            message: t('common.updatedSuccessfully'),
            variant: 'success',
          });
        } else {
          props.loaderAction(false);
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      },
    );
  };

  const recordURL = useMemo(() => {
    if (funList && funList.length > 0) {
      const findFile = funList.find(file => file.recorded);
      return findFile ? findFile.file_url : '';
    }
    return '';
  }, [funList]);

  return (
    <FunSection>
      <span className="sub-head">{funStuff.title}</span>
      {recordURL && (
        <VideoWrap>
          <VideoRender
            variableWidth
            variableHeight
            videoSrc={recordURL}
            classes={{ container: 'player-container' }}
          />
        </VideoWrap>
      )}
      <ul className="fun-list">
        {(funList && funList.length > 0) ||
        !isEmpty(
          props.bookingData.fun_stuff_request_details.celebrity_reply,
        ) ? (
          <React.Fragment>
            <Ul>
              {funList &&
                funList.length > 0 &&
                funList.map((file, index) => (
                  <Li key={index}>
                    <span className="file-details">
                      <span className="file-name">
                        {props.bookingData.celebrity_first_name}_
                        {reqDetails.fun_stuff_request_id}_{index + 1}.
                        {file.file_name.split('.')[1]}
                      </span>
                      <span className="file-size">
                        {t('common.file_size')} - {file.file_size}
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
                ))}
            </Ul>
          </React.Fragment>
        ) : (
          <EvidenceItem className="evidence-item no-evidence">
            {t('common.no_items')}
          </EvidenceItem>
        )}
      </ul>
    </FunSection>
  );
};

VideoRecording.propTypes = {
  bookingData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
};

export default DownloadHandler(VideoRecording);
