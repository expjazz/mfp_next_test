import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { isEmpty } from 'src/utils/dataStructures';
import DetailItem from 'components/DetailItem';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
import { Layout, Ul, Li } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Details = props => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const {
    direct_message_details: { conversations },
    language,
  } = props.reqDetails;

  const getComment = message => {
    if (!isEmpty(message.comments)) {
      return message.comments;
    } else if (message.fulfilled_date) {
      return moment(message.fulfilled_date).format(entityData?.partnerData?.base_date_format);
    }
    return 'NA';
  };
  const { data: entityData } = useGetPartner()
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
                <span className="message-num">Message #{index + 1}</span>
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
                      ? `${getLocalSymbol()}0.00`
                      : `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
                        getLocalAmount(message.order_details.amount), false, false
                        )}`}
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

Details.propTypes = {
  reqDetails: PropTypes.object.isRequired,
  from: PropTypes.string,
};
Details.defaultProps = {
  from: '',
};

export default Details;
