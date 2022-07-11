import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import DownloadHandler from 'components/DownloadHandler';
import { readDataUrl } from 'customHooks/domUtils';
import Button from 'components/SecondaryButton';
import BackHeader from 'components/BackHeader';
import TextArea from 'components/TextArea';
import RequestHeader from 'components/RequestHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import CloseIcon from 'components/CloseIcon';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { awsKeys } from 'src/constants/';
// import { sendSocialShoutout } from 'services/';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import SuccessScreen from 'components/SuccessScreen';
import Clarifications from '../Clarifications';
import { getTabsList, getSelectedTab } from '../../utils';
import { Layout, Image } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { sendSocialShoutout } from 'src/services/myfanpark/bookingActions';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const SocialShoutout = props => {
  useDisableRefetchOnFocus()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const {
    fan_first_name: fanFirstName,
    booking_id: bookingId,
    social_request_details: socialDetails,
  } = props.booking;

  const [files, setFiles] = useState([]);
  const [baseUrls, setUrl] = useState([]);
  const isMounted = useRef(null);
  const [completed, setCompleted] = useState(false);
  const [response, updateResponse] = useState('');
  const fileRef = useRef(null);

  const fileChange = async event => {
    const file = event.target.files;
    if (files.length < 5 && file && file[0].type.includes('image/')) {
      if (file[0].size > 10485760) {
        props.updateToast({
          value: true,
          message: t('open_bookings.socialshoutout.fileSizeError'),
          variant: 'error',
        });
      } else {
        const tFiles = [...files];
        const urls = [...baseUrls];
        const exifData = await getExifData(file[0]);
        const correctedFile = await imageRotation(file[0], exifData);
        if (correctedFile) {
          await readDataUrl(correctedFile).then(result => {
            urls.push(result);
            setUrl(urls);
            tFiles.push(correctedFile);
            setFiles(tFiles);
          });
        }
      }
    }
    fileRef.current.value = '';
  };

  const removeImage = index => () => {
    const tFiles = [...files];
    const urls = [...baseUrls];
    tFiles.splice(index, 1);
    urls.splice(index, 1);
    setFiles(tFiles);
    setUrl(urls);
  };

  const submitSocialCompleted = payload => {
    if (isMounted.current) {
      props.loaderAction(true);
    }
    sendSocialShoutout('common.response', bookingId, payload)
      .then(resp => {
        props.loaderAction(false);
        if (resp.booking) {
          if (isMounted.current) {
            setCompleted(true);
          } else {
            props.removeBooking(bookingId);
          }
          props.updateBookingList(bookingId);
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('open_bookings.failedCompletionError'),
          variant: 'error',
        });
      });
  };

  const uploadEvidence = () => {
    const fileName = [];
    let uploadDet = {
      onSuccess: processedFiles => {
        window.scrollTo(0, 0);
        processedFiles.forEach(processFile => {
          fileName.push(processFile.fileName);
        });
        const payload = {
          type: 'response',
          booking_id: bookingId,
          celebrity_reply: response,
          evidence_files: fileName.join(),
        };
        submitSocialCompleted(payload);
      },
      files: [],
    };
    files.forEach(file => {
      uploadDet = {
        ...uploadDet,
        id: bookingId,
        files: [
          ...uploadDet.files,
          {
            title: `Social shoutout for ${fanFirstName}`,
            fileName: file.file_name,
            key: awsKeys.evidence,
            file,
            extension: file.type.split('/')[1],
            type: file.type.split('/')[0],
            bookingId,
          },
        ],
      };
    });
    props.onAddResumeUpload(uploadDet, bookingId);
  };

  const uploadFiles = async () => {
    try {
      if (files.length > 0) {
        uploadEvidence();
      } else {
        props.loaderAction(true);
        const payload = {
          type: 'response',
          celebrity_reply: response,
          booking_id: bookingId,
        };
        submitSocialCompleted(payload);
      }
    } catch (e) {
      props.loaderAction(false);
      props.updateToast({
        value: true,
        message: t('common.commonApiError'),
        variant: 'error',
      });
    }
  };

  const denyRequest = () => {
    props.toggleUpdateBooking(true, bookingId, true, props.booking);
  };

  const nextRequest = () => {
    props.nextRequestHandler(bookingId, true);
    setCompleted(false);
    setFiles([]);
    setUrl([]);
  };

  const downloadImage = url => () => {
    props.downloadFunc(url);
  };

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const socialRedirectURL = webUrl => {
    let newWebUrl = webUrl;
    const urlTest = /^((https|http):\/\/)(www.)?/;
    if (!urlTest.test(webUrl)) {
      newWebUrl = `https://${webUrl}`;
    }
    return newWebUrl;
  };

  const successGoToOpen = () => {
    nextRequest();
    props.backArrowHandler();
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setUrl([]);
    setFiles([]);
    setCompleted(false);
    updateResponse('');
  }, [props.booking.booking_id]);

  if (completed) {
    return (
      <React.Fragment>
        <BackHeader
          backHandler={successGoToOpen}
          closeHandler={nextRequest}
          label={t('open_bookings.openRequests')}
        />
        <SuccessScreen
          title={t('open_bookings.socialshoutout.successtitle')}
          successMsg=""
          note={t('open_bookings.socialshoutout.note', {
            type:
              props.booking.request_type === requestTypesKeys.promotion
                ? t('open_bookings.socialshoutout.promComplete')
                : t('open_bookings.socialshoutout.intComplete'),
            name: fanFirstName,
          })}
          btnLabel={t('open_bookings.nextReq')}
          shareProps={
            props.templateDet.id
              ? {
                  shareUrl: `
              ${window.location.origin}/${props.booking.celebrity_vanity}?tid=${props.templateDet.id}
            `,
                  starName:
                    props.booking.celebrity_nick_name ||
                    props.booking.celebrity_first_name,
                  shareImage: props.templateDet.template,
                  beforeShare: props.templateDet.beforeShare,
                }
              : {}
          }
          buttonHandler={nextRequest}
        />
      </React.Fragment>
    );
  }

  const renderView = tab => {
    switch (tab) {
      case 'request':
        return (
          <React.Fragment>
            <span className="flex-col req-sec">
              <span className="sub-head">
                {props.booking.request_type === requestTypesKeys.promotion
                  ? t('open_bookings.socialshoutout.promotionalRequest')
                  : t('open_bookings.interactionRequested')}
              </span>
              {props.booking.request_type === requestTypesKeys.promotion &&
                socialDetails.promotional_file && (
                  <span className="download-wrap">
                    <span className="text">{t('open_bookings.file')}</span>
                    <span className="img-download">
                      <Image image={socialDetails.promotional_file} />
                      <span
                        className="download-btn"
                        role="presentation"
                        onClick={downloadImage(socialDetails.promotional_file)}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="download-icon"
                        ></FontAwesomeIcon>
                        <span className="text icon-text">
                          {t('common.download')}
                        </span>
                      </span>
                    </span>
                  </span>
                )}

              {!isEmpty(socialDetails.social_media_title) && (
                <span className="text">
                  <span className="capitalize">
                    {socialDetails.social_media_title.social_media}
                  </span>
                </span>
              )}
              <span className="text">
                {socialDetails.social_media_title.title}
              </span>
              <span className="text">
                {t('open_bookings.socialshoutout.publicLink')}{' '}
                <a
                  href={socialRedirectURL(socialDetails.fan_social_media_link)}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialDetails.fan_social_media_link}
                </a>
              </span>
            </span>
            {socialDetails.description && (
              <span className="flex-col req-sec">
                <span className="sub-head">
                  {t('open_bookings.requestDetails')}
                </span>
                <span className="text">{socialDetails.description}</span>
              </span>
            )}
            <section>
              <span className="sub-head">
                {t('open_bookings.completeOrder')}
              </span>
              <Dashed htmlFor="evidence">
                <input
                  className="hidden-upload"
                  accept="image/*"
                  id="evidence"
                  onChange={fileChange}
                  type="file"
                  ref={fileRef}
                />
                {t('open_bookings.socialshoutout.uploadEvidence')}
              </Dashed>
              <section className="image-wrapper">
                {baseUrls.map((image, index) => {
                  return (
                    <span key={index} className="image-span">
                      <CloseIcon
                        className="close-btn-icon"
                        onClick={removeImage(index)}
                      />
                      <img src={image} alt="" className="image-preview" />
                    </span>
                  );
                })}
              </section>
              <span className="text or-text">{t('open_bookings.or')}</span>
              <TextArea
                className="textarea"
                autoSize
                inputProps={{
                  onChange: responseChange,
                  value: response,
                  maxLength: 500,
                  placeholder: t('open_bookings.socialshoutout.placeholder'),
                }}
              />
            </section>
            <FlexCenter className="buttons">
              <Button className="fun-btns" onClick={uploadFiles}>
                {t('open_bookings.socialshoutout.markDelivered')}
              </Button>
              <span
                onClick={denyRequest}
                role="presentation"
                className="link-btn"
              >
                {t('open_bookings.declineRequest')}
              </span>
            </FlexCenter>
          </React.Fragment>
        );
      default:
        return <Clarifications bookItem={props.booking} {...props} />;
    }
  };

  return (
    <React.Fragment>
      <RequestHeader
        key={props.booking.booking_id}
        renderHeading={() => (
          <React.Fragment>
            {props.booking.request_type === requestTypesKeys.promotion
              ? t('open_bookings.socialmedia_fan_promo', { fan: fanFirstName })
              : t('open_bookings.socialmedia_interaction', {
                  fan: fanFirstName,
                })}
          </React.Fragment>
        )}
        fixedTitle={props.showLang(props.booking.language)}
        onClose={props.closeHandler}
        tabsList={getTabsList(props.booking, undefined, entityData?.partnerData)}
        selected={getSelectedTab(props.booking, entityData?.partnerData)}
      >
        {selectedTab => <Layout>{renderView(selectedTab)}</Layout>}
      </RequestHeader>
    </React.Fragment>
  );
};

SocialShoutout.propTypes = {
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  nextRequestHandler: PropTypes.func.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

export default DownloadHandler(SocialShoutout);
