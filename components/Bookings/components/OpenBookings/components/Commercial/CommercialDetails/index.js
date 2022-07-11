import React from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DescriptionP } from 'styles/TextStyled';
import { Layout, SectionWrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const CommercialDetails = ({ bookDetails, ...props }) => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const dateFormat = entityData?.partnerData?.base_date_format
  return (
    <Layout>
      <SectionWrap>
        <span className="row row-pad">
          <span className="sub-head row-style">
            {t('open_bookings.interactionRequested')}
            <DescriptionP>
              {bookDetails.commercial_details.offering.title}
            </DescriptionP>
          </span>
        </span>

        <span className="row row-pad">
          <span className="sub-head row-style">
            {t('open_bookings.requestDetails')}
            <DescriptionP>
              {bookDetails.commercial_details.fan_request}
            </DescriptionP>
          </span>
        </span>

        <span className="row">
          <span className="sub-head row-style">
            {t('open_bookings.purchased')}
          </span>
          <span className="text">
            {moment(bookDetails.created_date).format(dateFormat)}
          </span>
        </span>
        <span className="row">
          <span className="sub-head row-style">{t('open_bookings.paid')}</span>
          <span className="text">
            ${bookDetails.commercial_details.star_price}
          </span>
        </span>
        {bookDetails.order_details.order && (
          <span className="row">
            <span className="sub-head row-style">{t('open_bookings.order#')}</span>
            <span className="text">{bookDetails.order_details.order}</span>
          </span>
        )}
      </SectionWrap>
    </Layout>
  );
};

CommercialDetails.defaultProps = {
  bookDetails: {},
};

CommercialDetails.propTypes = {
  bookDetails: PropTypes.object,
};

// const mapStateToProps = state => ({
//   dateFormat: state.entity.data.base_date_format,
// });

export default CommercialDetails
