/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Heading, DescriptionP } from 'styles/TextStyled';
import { getCallTime } from 'src/utils/videoCall';
import BookingStyled from '../../../../../../styled';
import { Wrapper, DetailsWrap, LineDesc } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const BaseStuff = props => {
  const { t } = useTranslation();
  const { fun_stuff_request_details: funStuffDetails = {} } = props.bookingData;
  const { data: entityData } = useGetPartner()
  return (
    <React.Fragment>
      <Wrapper starMode={false}>
        <BookingStyled.LeftSection className="left-section">
          <Heading>
            {funStuffDetails.fun_stuff.title} -{' '}
            {funStuffDetails.fun_stuff.meeting_duration} {t('common.minutes')}
          </Heading>
          <DetailsWrap>
            <span className="sub-head">{t('common.scheduled')}</span>
            <span className="date-time">
              {getCallTime(funStuffDetails.meeting_date, entityData?.partnerData)}
            </span>
          </DetailsWrap>
          {funStuffDetails.celebrity_reply && (
            <DetailsWrap>
              <span className="sub-head">{t('common.comments_to_fan')}</span>
              <DescriptionP>{funStuffDetails.celebrity_reply}</DescriptionP>
            </DetailsWrap>
          )}
          {props.bookingData.off_limit_topics && (
            <DetailsWrap>
              <span className="sub-head">
                {t('common.off_limit_topics')}
                <LineDesc>{props.bookingData.off_limit_topics}</LineDesc>
              </span>
            </DetailsWrap>
          )}
          <DescriptionP>
            {t('common.fun_stuff_text.call-note',{siteName:entityData?.partnerData?.siteName})}
          </DescriptionP>
        </BookingStyled.LeftSection>
      </Wrapper>
    </React.Fragment>
  );
};

BaseStuff.propTypes = {
  bookingData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
};

export default BaseStuff;
