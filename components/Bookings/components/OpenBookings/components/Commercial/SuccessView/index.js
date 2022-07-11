import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import BackHeader from 'components/BackHeader';
// import { withRouter } from 'react-router-dom';
import { requestTypes } from 'src/constants/requestTypes';
import SuccessScreen from 'components/SuccessScreen';
import { isEmpty } from 'src/utils/dataStructures';
import { useRouter } from 'next/router';

const SuccessView = props => {
  const router = useRouter()
  const { t } = useTranslation();
  const { stargramto, stargramfrom } = props.bookItem.request_details
    ? props.bookItem.request_details
    : '';
  const getName = (name, prefix = 'for') => {
    if (!isEmpty(name)) {
      return ` ${prefix} ${name}`;
    }
    return '';
  };

  const getMessage = () => {
    let message = t('bookings.completed_answer')
    if (requestTypes[props.bookItem.request_type] === 'Shout-out' ||
      requestTypes[props.bookItem.request_type] === 'Event') {
      message = `You completed the ${props.bookItem.occasion}
      ${props.bookItem.request_type === 1 ? 'shoutout' : 'announcement'}${getName(stargramto, 'for')} ${getName(stargramfrom, 'from')}`
    } else if (props.bookItem.request_type === 4) {
      message = t('bookings.completed_commercial_request');
    }
    return t('bookings.added_earnings',{message:message});
  };

  return (
    <React.Fragment>
      <BackHeader
        backHandler={props.closeHandler}
        closeHandler={props.closeHandler}
        label={t('bookings.open_bookings')}
      />
      <SuccessScreen
        title={t('common.perfect')}
        successMsg=""
        note={getMessage()}
        btnLabel={t('common.next_request')}
        shareProps={props.templateDet.id ? {
          ...props.templateDet,
          shareUrl: `
            ${window.location.origin}/${props.bookItem.celebrity_vanity}?tid=${props.templateDet.id}
          `,
          starName: props.bookItem.celebrity_nick_name || props.bookItem.celebrity_first_name,
          shareImage: props.templateDet.template,
          beforeShare: props.templateDet.beforeShare,
        } : {}}
        buttonHandler={props.nextRequest}
      />
    </React.Fragment>
  );
};

SuccessView.propTypes = {
  nextRequest: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  bookItem: PropTypes.object.isRequired,
};

export default SuccessView
