import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import Button from 'components/SecondaryButton';
import TextArea from 'components/TextArea';
import FunList from 'components/FunList';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import RequestHeader from 'components/RequestHeader';
import { LinkText, DescriptionP, Description } from 'styles/TextStyled';
import { bytesToSize } from 'customHooks/domUtils';
// import { commercialBooking } from 'services/index';
import { awsKeys } from 'src/constants/';
import Clarifications from '../Clarifications';
import CommercialDetails from './CommercialDetails';
import SuccessView from './SuccessView';
import {
  maxUploadSize,
  maxFileLength,
  fileRegex,
  fileTypes,
} from './constants';
import { getTabsList, getSelectedTab } from '../../utils';
import { Layout, Ul, ListWrapper, CharCount, AlertDialogStyled, PlanContent } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { commercialBooking } from 'src/services/myfanpark/bookingActions';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const Commercial = ({ booking, updateToast, completeUpload, ...props }) => {
  useDisableRefetchOnFocus()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [size, updateSize] = useState(0);
  const isMounted = useRef(null);
  const [response, updateResponse] = useState('');
  const [files, setFiles] = useState([]);
  const [showHide, setShowHide] = useState(false);
  const [showFiletype, showHideFiletype] = useState(false);
  const [completeSuccess, setComplete] = useState(false);
  const fileRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const showHideDetails = () => {
    setShowHide(!showHide);
  };

  const viewFileTypes = () => {
    showHideFiletype(!showFiletype);
  };

  const showLang = lang => {
    return !isEmpty(lang) && props.defLangId !== lang.id ? lang.language : null;
  };

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const denyRequest = () => {
    props.toggleUpdateBooking(true, booking.booking_id, true, booking);
  };

  const completeCommercial = payload => {
    if (isMounted.current) {
      props.loaderAction(true);
    }
    commercialBooking(payload)
      .then(resp => {
        props.loaderAction(false);
        if (resp && resp.data && resp.data.stargramz_response) {
          props.updateBookingList(booking.booking_id);
          if (isMounted.current) {
            setComplete(true);
          } else {
            props.removeBooking(booking.booking_id);
          }
        } else {
          updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        updateToast({
          value: true,
          message: t('open_bookings.failedCompletionError'),
          variant: 'error',
        });
      });
  };

  const onComplete = () => {
    if (!files.length && !response) {
      setAlert(true);
      return;
    }
    const request = [];
    if (files.length) {
      let uploadDet = {
        onSuccess: (processedFiles) => {
          window.scrollTo(0, 0);
          processedFiles.forEach((processFile, index) => {
            request.push({
              file_name: processFile.fileName,
              file_type: files[index].file_type,
              recorded: files[index].type !== 'upload',
              file_size: files[index].file_size,
            });
          })
          const payload = {
            type: 'complete',
            booking_id: booking.booking_id,
            response_file: request,
            star_final_response: response,
          };
          completeCommercial(payload);
        },
        files: [],
      }
      const re = /(?:\.([^.]+))?$/;
      files.forEach(file => {
        uploadDet = {
          ...uploadDet,
          id: booking.booking_id,
          files: [...uploadDet.files, {
            title: t('open_bookings.commercial_request',{fan_first_name:booking.fan_first_name}),
            fileName: file.file_name,
            key: awsKeys.responseFile,
            file: file.file,
            extension: re.exec(file.file_name) ? re.exec(file.file_name)[1] : '',
            type: file.file_type,
            bookingId: booking.booking_id
          }]
        }
      });
      props.onAddResumeUpload(uploadDet, booking.booking_id);
    } else {
      props.loaderAction(true);
      completeCommercial({
        type: 'complete',
        booking_id: booking.booking_id,
        star_final_response: response,
      });
    }
  };

  const removeImage = index => () => {
    const tFiles = [...files];
    tFiles.splice(index, 1);
    setFiles(tFiles);
  };

  const fileChange = async event => {
    const file = event.target.files;
    const regex = new RegExp(fileRegex);

    if (
      files.length < maxFileLength &&
      file &&
      regex.test(file[0].name.toLowerCase())
    ) {
      if (file[0].size / 1024 + size > maxUploadSize) {
        updateToast({
          value: true,
          message: t('open_bookings.fileLimitError'),
          variant: 'error',
        });
      } else {
        const tFiles = [...files];
        tFiles.push({
          file: file[0],
          file_name: file[0].name,
          type: 'upload',
          file_size: bytesToSize(file[0].size),
          file_type: file[0].type.split('/')[0],
        });
        setFiles(tFiles);
        updateSize(file[0].size / 1024);
      }
    } else if (files.length >= maxFileLength) {
      updateToast({
        value: true,
        message: t('open_bookings.fileLimitError'),
        variant: 'error',
      });
    } else {
      updateToast({
        value: true,
        message: t('open_bookings.unSupportedFormat'),
        variant: 'error',
      });
    }
    fileRef.current.value = '';
  };

  const closeSuccess = () => {
    props.nextRequestHandler(booking.booking_id, true);
  };

  const nextRequest = () => {
    props.nextRequestHandler(booking.booking_id, true);
  };

  const clearStates = () => {
    updateResponse('');
    setFiles([]);
    updateSize(0);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])

  useEffect(() => {
    clearStates();
  }, [booking.booking_id]);

  const getRequest = () => {
    return (
      <div className="flex-col">
        <span className="sub-head">{t('open_bookings.for')}</span>
        <span className="text capitalize">{booking.fan_first_name}</span>
        <span className="sub-head head-pad">
          {t('open_bookings.interactionRequested')}
        </span>
        <span className="text capitalize">
          {booking.commercial_details.offering.title}
        </span>
        <LinkText onClick={showHideDetails}>
          {showHide
            ? t('open_bookings.hideCallDetailsProduct')
            : t('open_bookings.showCallDetailsProduct')}
        </LinkText>
        {showHide && (
          <DescriptionP>
            {booking.commercial_details.offering.description}
          </DescriptionP>
        )}
        <span className="sub-head head-pad">
          {t('open_bookings.preferences', {
            purchaser: entityData?.partnerData?.purchaser_singular_name,
          })}
        </span>
        <DescriptionP>{booking.commercial_details.fan_request}</DescriptionP>
        <span className="sub-head head-pad">
          {t('open_bookings.commercial.initialBudget')}
        </span>
        <Description>${booking.commercial_details.fan_budget}</Description>
        {booking.commercial_details.star_reply && (
          <React.Fragment>
            <span className="sub-head head-pad">
              {t('open_bookings.commercial.terms')}
            </span>
            <DescriptionP>{booking.commercial_details.star_reply}</DescriptionP>
          </React.Fragment>
        )}

        {booking.commercial_details.star_price && (
          <React.Fragment>
            <span className="sub-head head-pad">
              {t('open_bookings.commercial.agreedPrice')}
            </span>
            <Description>${booking.commercial_details.star_price}</Description>
          </React.Fragment>
        )}

        <span className="sub-head head-pad">
          {t('open_bookings.commercial.uploadOptionalFile')}
        </span>
        <Description>
          {t('open_bookings.commercial.uptoFive')}
          <LinkText onClick={viewFileTypes}>
            {showFiletype
              ? t('open_bookings.hide')
              : t('open_bookings.commercial.viewSupported')}{' '}
          </LinkText>
        </Description>

        {showFiletype && (
          <DescriptionP>
            {t('open_bookings.supportedFiles')} {fileTypes}
          </DescriptionP>
        )}

        <ListWrapper>
          <Ul>
            {files.map((file, index) => {
              return (
                <FunList
                  key={index}
                  close
                  removeImage={removeImage(index)}
                  fun={{
                    ...file,
                  }}
                  fileName
                  classes={{ root: 'commercial-list' }}
                />
              );
            })}
          </Ul>
        </ListWrapper>
        {size <= maxUploadSize && (
          <div className="req-sec">
            <Dashed htmlFor="fileUpload">
              <input
                className="hidden-upload"
                id="fileUpload"
                accept={fileTypes}
                onChange={fileChange}
                type="file"
                ref={fileRef}
              />
              {t('open_bookings.commercial.uploadBtnLbl')}
            </Dashed>
          </div>
        )}
        <TextArea
          autoSize
          inputProps={{
            onChange: responseChange,
            value: response,
            maxLength: 1000,
            placeholder: t('open_bookings.commercial.textPlaceholder'),
            className: 'textarea',
          }}
        />
        <CharCount>
          {1000 - response.length} {t('common.charRemaining')}
        </CharCount>
        <FlexCenter className="buttons">
          <Button
            className="fun-btns"
            onClick={onComplete}

            // disabled={!files.length}
            // isDisabled={!files.length}
          >
            {t('open_bookings.completeOrder')}
          </Button>
          <LinkText
            onClick={denyRequest}
            role="presentation"
            className="link-btn"
          >
            {t('open_bookings.declineRequest')}
          </LinkText>
        </FlexCenter>
      </div>
    );
  };

  const renderView = tab => {
    switch (tab) {
      case 'details':
        return <CommercialDetails bookDetails={booking} />;
      case 'clarify':
        return <Clarifications bookItem={booking} rootclass="cla-root" />;
      default:
        return getRequest();
    }
  };

  if (completeSuccess) {
    return (
      <SuccessView
        closeHandler={closeSuccess}
        nextRequest={nextRequest}
        templateDet={props.templateDet}
        bookItem={booking}
      />
    );
  }

  return (
    <Layout>
      <RequestHeader
        renderHeading={() => (
          <React.Fragment>
            {t('open_bookings.commercial.heading', {
              from: booking.fan_first_name,
            })}
          </React.Fragment>
        )}
        tabsList={getTabsList(booking, booking.request_status, entityData?.partnerData)}
        selected={getSelectedTab(booking, entityData?.partnerData)}
        fixedTitle={showLang(booking.language)}
        onClose={props.closeHandler}
      >
        {selectedTab => (
          <React.Fragment>{renderView(selectedTab)}</React.Fragment>
        )}
      </RequestHeader>
      <AlertDialogStyled
        open={alert}
        onClose={() => setAlert(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
        <PlanContent>
          <span className="small-head">
            <Description>
             {t('open_bookings.commercial.commercial_modal_confirm')}
            </Description>
          </span>

          <Button className="action-btn" onClick={() => setAlert(false)}>
            {t('common.close')}
          </Button>
        </PlanContent>
      </AlertDialogStyled>
    </Layout>
  );
};

Commercial.propTypes = {
  completeUpload: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  nextRequestHandler: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
};

export default Commercial;
