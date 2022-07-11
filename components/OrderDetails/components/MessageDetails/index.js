import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import DetailItem from 'components/DetailItem';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
import { Layout, Ul, Li } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const MessageDetails = props => {
  const {
    direct_message_details: { conversations },
    language,
  } = props.bookingData;
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const getComment = message => {
    if (!isEmpty(message.comments)) {
      return message.comments;
    } else if (message.fulfilled_date) {
      return moment(message.fulfilled_date).format(entityData?.partnerData?.base_date_format);
    }
    return 'NA';
  };

  return (
    <Layout
      className="message-details-wrapper"
      isStar={props.from === 'star-cancel'}
    >
      <Ul>
        {conversations.length > 0 &&
          conversations.map((message, index) => {
            return (
              <Li className="list-item" key={`message-list-${index}`}>
                <span className="message-num">{t('common.message')} #{index + 1}</span>
                  <DetailItem
                    classes={{
                      detailHead: 'message-detail',
                    }}
                    heading={t('common.orderStatus.purchased')}
                    description={moment(message.created_date).format(entityData?.partnerData?.base_date_format)}
                  />
                  <DetailItem
                    classes={{
                      detailHead: 'message-detail',
                    }}
                    heading={t('common.orderStatus.paid')}
                    description={!isEmpty(message.comments)
                      ? '$0.00'
                      : `$${numberToDecimalWithFractionTwo(message.order_details.amount, false, false)}`}
                  />
                  <DetailItem
                    classes={{
                      detailHead: 'message-detail',
                    }}
                    heading={!isEmpty(message.comments) ? t('common.cancelled') : t('common.replied')}
                    description={getComment(message)}
                  />
                  {
                    !isEmpty(language) &&
                      <DetailItem
                        classes={{
                          detailHead: 'message-detail',
                        }}
                        heading={t('common.orderStatus.language')}
                        description={language.language}
                      />
                  }
                  <DetailItem
                    classes={{
                      detailHead: 'message-detail',
                    }}
                    heading={t('common.orderStatus.order#')}
                    description={message.order_details.order}
                  />
              </Li>
            );
          })}
      </Ul>
    </Layout>
  );
};

MessageDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  starMode: PropTypes.bool,
  from: PropTypes.string,
};
MessageDetails.defaultProps = {
  starMode: false,
  from: '',
};

export default MessageDetails;
