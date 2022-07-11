import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Ul, Li, SectionHead } from '../styled';
import { Wrap } from './styled';

function DiscontList(props) {
  const { t } = useTranslation();
  const cardClick = discount => () => {
    props.cardClick(discount, props.type);
  };

  const getDate = date => {
    if (date) return date.split('common.T')[0];
    return null;
  };

  return (
    <Wrap>
      <SectionHead>{props.title}</SectionHead>
      <Ul>
        {props.discountList.map(discount => (
          <Li
            className="list-item"
            key={discount.id}
            onClick={cardClick(discount)}
          >
            <p className="text blue-text">{discount.title}</p>
            <span className="text">
              {parseFloat(discount.discount).toFixed(0)}%{' '}
              {t('promote_page.discount.discount_on')}{' '}
              {discount.product_type
                .reduce((acc, cur) => {
                  return `${acc}, ${cur?.label?.toLowerCase()}`;
                }, '')
                .replace(/^,|,$/g, '')
                .trim()}
            </span>
            <span className="text">
              {t('promote_page.discount.from')}{' '}
              {moment(getDate(discount.active_from)).format(props.dateFormat)}{' '}
              {t('promote_page.discount.to')}{' '}
              {moment(getDate(discount.active_to)).format(props.dateFormat)}
            </span>
          </Li>
        ))}
      </Ul>
    </Wrap>
  );
}

DiscontList.propTypes = {
  discountList: PropTypes.array.isRequired,
  cardClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DiscontList;
