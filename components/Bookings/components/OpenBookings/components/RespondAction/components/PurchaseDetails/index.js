import React from 'react';
// import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';
import dompurify from 'dompurify';
import moment from 'moment';
import { getFor, checkFromName } from 'src/utils/dataformatter';
import PropTypes from 'prop-types';
import DetailItem from 'components/DetailItem';
import { getOccasion } from '../../../../constants';
import { Layout, SectionWrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const PurchaseDetails = ({ bookDetails, ...props }) => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const dateFormat = entityData?.partnerData?.base_date_format
  const {
    request_details: requestDetails = {},
    order_details: orderDetails = {},
    request_type: requestType,
    occasion,
  } = bookDetails;

  const getRelation = () => {
    if (
      bookDetails.request_details.relationship &&
      typeof bookDetails.request_details.relationship === 'object'
    ) {
      return `${bookDetails.request_details.relationship.title}`;
    } else if (bookDetails.request_details.relationship) {
      return `${bookDetails.request_details.relationship}`;
    }
  };

  const getScriptDetails = () => {
    const date = bookDetails.request_details.date
      ? bookDetails.request_details.date.split('T')[0]
      : null;
    return `<span class="script-details">
        <span>
        ${t('common.occasion')}
          ${!isEmpty(bookDetails.occasion) ? bookDetails.occasion : ''}
        </span>
        ${
          date
            ? `<span>
          ${t('common.date')} ${moment(date).format(entityData?.partnerData?.base_date_format)}
          </span>`
            : ''
        }
        ${
          getFor(bookDetails)
            ? `<span>${t('common.for')} ${getFor(bookDetails)}</span>`
            : ''
        }
        ${
          checkFromName(bookDetails)
            ? `<span>
          ${t('common.from')} ${checkFromName(bookDetails)}
            ${getRelation() && `<span> (${getRelation()})</span>`}
          </span>`
            : ''
        }
        ${
          bookDetails.request_details.for_what
            ? `<span>
          ${t('common.for_what')}: ${bookDetails.request_details.for_what}
          </span>`
            : ''
        }
        ${
          bookDetails.request_details.event_title
            ? `<span>
          ${t('common.event')}: ${bookDetails.request_details.event_title}
          </span>`
            : ''
        }
      </span>`;
  };

  const getScript = () => {
    if (requestDetails.templateType === 'other') {
      return requestDetails.booking_statement;
    }
    return getScriptDetails();
  };

  let bookingDate =
    (requestDetails && requestDetails.date) || bookDetails.active_to;
  if (bookingDate) {
    [bookingDate] = bookingDate.split('T');
  }

  return (
    <Layout>
      <DetailItem
        classes={{
          root: 'section-wrap',
        }}
        heading="Ordered item"
        description={getOccasion(occasion)[requestType]}
      />
      {requestDetails && (
        <React.Fragment>
          {getScript() && (
            <SectionWrap>
              <span className="sub-head">{t('common.request')}:</span>
              <span
                className="text"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(getScript()),
                }}
              />
            </SectionWrap>
          )}
          {requestDetails.important_info ? (
            <DetailItem
              classes={{
                root: 'section-wrap',
              }}
              heading={t('common.additional_information')}
              description={requestDetails.important_info}
            />
          ) : null}
        </React.Fragment>
      )}
      <SectionWrap>
        <span className="row">
          <span className="sub-head row-style">
            {t('open_bookings.purchased')}
          </span>
          <span className="text">
            {moment(bookDetails.created_date).format(props.dateFormat)}
          </span>
        </span>
        <span className="row">
          <span className="sub-head row-style">{t('open_bookings.paid')}</span>
          <span className="text">{t('open_bookings.pending')}</span>
        </span>
        <span className="row">
          <span className="sub-head row-style">
            {t('open_bookings.recorded')}
          </span>
          <span className="text">{t('open_bookings.pending')}</span>
        </span>
        {orderDetails.order && (
          <span className="row">
            <span className="sub-head row-style">
              {t('open_bookings.order#')}
            </span>
            <span className="text">{orderDetails.order}</span>
          </span>
        )}
        {bookingDate && (
          <span className="row">
            <span className="sub-head row-style due">{t('due_by')}</span>
            <span className="text due">
              {moment(bookingDate).format(props.dateFormat || 'MM/DD/YYYY')}
            </span>
          </span>
        )}
      </SectionWrap>
    </Layout>
  );
};

PurchaseDetails.defaultProps = {
  bookDetails: {},
};

PurchaseDetails.propTypes = {
  bookDetails: PropTypes.object,
};

const mapStateToProps = state => ({
  dateFormat: state.entity.data.base_date_format,
});

export default PurchaseDetails
