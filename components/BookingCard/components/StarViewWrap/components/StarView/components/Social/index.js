/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import DownloadHandler from 'components/DownloadHandler';
import { readDataUrl } from 'customHooks/domUtils';
import { awsKeys } from 'src/constants/';
import { Dashed } from 'styles/CommonStyled';
import Loader from 'components/Loader';
import { postReactionMedia } from 'src/services/postReaction';
import { sendSocialShoutout } from 'src/services/';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import CommentBox from 'components/CommentBox';
import QuickComment from 'components/QuickComment';
import BookingStyled, { EvidenceItem } from '../../../../styled';
import StarViewStyled from '../../styled';
import { Wrapper, EvidenceList, ImageSection } from './styled';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const SocialMedia = props => {
  useDisableRefetchOnFocus()
  const { t } = useTranslation();
  const [baseUrls, setUrl] = useState([]);
  const fileRef = useRef(null);
  const {
    social_request_details: socialDetails = {},
    booking_id: bookingId,
  } = props.bookingData;

  const downloadEvidence = evidence => () => {
    props.downloadFunc(evidence);
  };

  const fileChange = async event => {
    const file = event.target.files;
    const evidenceLength = socialDetails.evidence_files
      ? socialDetails.evidence_files.length
      : 0;
    if (
      baseUrls.length + evidenceLength < 5 &&
      file &&
      file[0].type.includes('image/')
    ) {
      if (file[0].size > 10485760) {
        props.updateToast({
          value: true,
          message: t('common.file_size_10'),
          variant: 'error',
        });
      } else {
        try {
          props.loaderAction(true);
          const exifData = await getExifData(file[0]);
          const correctedFile = await imageRotation(file[0], exifData);
          const fileData = await postReactionMedia(
            awsKeys.evidence,
            correctedFile,
            file[0].type.split('/')[1],
            'image',
          );
          const upload = await axios.post(fileData.url, fileData.formData);
          if (upload.status === 201) {
            const payload = {
              type: 'evidence',
              booking_id: bookingId,
              celebrity_reply: socialDetails.celebrity_reply,
              evidence_files: fileData.fileName,
            };
            sendSocialShoutout('common.response', bookingId, payload).then(
              resp => {
                props.loaderAction(false);
                if (resp.booking) {
                  props.updateToast({
                    value: true,
                    message: t('common.evidence_upload'),
                    variant: 'success',
                  });
                  if (correctedFile) {
                    const urls = [...baseUrls];
                    readDataUrl(correctedFile).then(result => {
                      urls.push(result);
                      setUrl(urls);
                    });
                  }
                } else {
                  props.updateToast({
                    value: true,
                    message: resp.message,
                    variant: 'error',
                  });
                }
              },
            );
          } else {
            props.loaderAction(false);
            props.updateToast({
              value: true,
              message: t('common.uploadFailed'),
              variant: 'error',
            });
          }
        } catch (e) {
          props.loaderAction(false);
          props.updateToast({
            value: true,
            message: t('common.uploadFailed'),
            variant: 'error',
          });
        }
      }
    }
    fileRef.current.value = '';
  };

  return (
    <Wrapper>
      <BookingStyled.Layout starMode className="layout">
        <BookingStyled.LeftSection>
          <ImageSection
            hasEvidence={socialDetails.evidence_files || baseUrls.length}
            hasReply={!isEmpty(socialDetails.celebrity_reply)}
          >
            {!isEmpty(socialDetails.celebrity_reply) && (
              <span className="text box">{socialDetails.celebrity_reply}</span>
            )}

            <EvidenceList
              isScrollable={socialDetails.evidence_files || baseUrls.length}
            >
              {socialDetails.evidence_files || baseUrls.length ? (
                <React.Fragment>
                  {socialDetails.evidence_files &&
                    socialDetails.evidence_files.map(evidence => (
                      <EvidenceItem
                        className="evidence-item"
                        imageUrl={evidence}
                        key={evidence}
                      >
                        <FontAwesomeIcon
                          className="download-icon"
                          icon={faDownload}
                          onClick={downloadEvidence(evidence)}
                        />
                      </EvidenceItem>
                    ))}

                  {baseUrls.map((evidence, index) => (
                    <EvidenceItem
                      className="evidence-item"
                      imageUrl={evidence}
                      key={index}
                    />
                  ))}
                </React.Fragment>
              ) : (
                <EvidenceItem className="evidence-item no-evidence">
                  {t('common.evidence_note', {
                    purchaserPlural: entity('purchaserPlural'),
                  })}
                </EvidenceItem>
              )}
            </EvidenceList>
            {(!socialDetails.evidence_files ||
              baseUrls.length + socialDetails.evidence_files.length < 5) && (
              <Dashed htmlFor="evidence">
                <input
                  className="hidden-upload"
                  accept="image/*"
                  id="evidence"
                  onChange={fileChange}
                  type="file"
                  ref={fileRef}
                />
                {t('common.evidence_completion')}
              </Dashed>
            )}
          </ImageSection>
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection className="right-section">
          {props.renderCommentList()}
          <StarViewStyled.CommentWrapper>
            <CommentBox
              maxLength={104}
              thresholdLimit={97}
              classes={{ root: 'comment-box' }}
              onSubmit={props.submitComment}
            />
            <QuickComment
              bookingId={props.bookingData.booking_id}
              fanName={props.bookingData.fan_first_name}
              onSubmit={props.onQuickComment}
              classes={{ root: 'quick-comment' }}
            />
          </StarViewStyled.CommentWrapper>
          {props.loading && <Loader />}
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};

SocialMedia.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  onQuickComment: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DownloadHandler(SocialMedia);
