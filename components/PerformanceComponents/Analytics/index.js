import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from 'src/utils/dataStructures';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import Loader from 'components/Loader';
import { Heading } from 'styles/TextStyled';
import Dropdown from 'components/Dropdown';
import Comments from './components/Comments';
import Reaction from './components/Reactions';
import Rating from './components/Rating';
import { filterOptions, detailsOptions } from './constants';
import { Ul, Li } from '../styled';
import {
  Layout,
  Wrap,
  Label,
  Value,
  DetailsCard,
  SubHead,
  DetailsItem,
} from './styled';
import { getAnalytics } from 'src/services/myfanpark/celebActions';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

const Analytics = props => {
  const [getCurrencySymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const [filter, setFilter] = useState(filterOptions(t)[0]);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState('');

  const getTotal = (values, twoDec) => {
    if (!isEmpty(values)) {
      const amount = Object.values(values).reduce((acc, cur) => {
        return acc + Number(cur);
      }, 0);

      if (amount && twoDec) {
        return parseFloat(amount).toFixed(2);
      }
      return amount;
    }
    return '';
  };

  const goBack = () => {
    setSelected('');
    props.modalBackHandler(true);
  };

  const updateSelected = type => () => {
    setSelected(type);
    props.modalBackHandler(false);
  };

  const getData = type => {
    const result = getAnalytics(type);
    result.then(res => {
      setData(res);
    });
  };

  const handleFilter = option => {
    setFilter(option);
    getData(option.id);
  };

  useEffect(() => {
    getData('');
  }, []);

  if (selected && selected === 'comments') {
    return <Comments selectedFilter={filter} goBack={goBack} {...props} />;
  } else if (selected && selected === 'reactions') {
    return <Reaction selectedFilter={filter} goBack={goBack} {...props} />;
  } else if (selected && selected === 'rating') {
    return <Rating selectedFilter={filter} goBack={goBack} {...props} />;
  }

  return (
    <Layout>
      <Wrap>
        <Heading className="heading">{t('common.performance.performance')}</Heading>
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="analytics-scroll" />
          )}
        >
          <Dropdown
            rootClass="drop-down"
            secondary
            selected={filter}
            options={filterOptions(t)}
            labelKey="title"
            valueKey="id"
            onChange={handleFilter}
            placeHolder=""
          />

          {!isEmpty(data) && (
            <React.Fragment>
              <Ul className="list-ul">
                <Li className="list-item">
                  <Label>{t('common.complete_rate')}</Label>
                  <Value>{data.basic_details.completed_percentage}%</Value>
                </Li>
                <Li className="list-item">
                  <Label>{t('common.conversion_rate')}</Label>
                  <Value>{data.basic_details.conversion_rate}%</Value>
                </Li>
                <Li
                  className="list-item clickable"
                  onClick={updateSelected('comments')}
                >
                  <Label>{t('common.comments')}</Label>
                  <Value className="blue-val">
                    {data.basic_details.comments_count}
                  </Value>
                </Li>
                <Li
                  className="list-item clickable"
                  onClick={updateSelected('reactions')}
                >
                  <Label>{t('common.reactions')}</Label>
                  <Value className="blue-val">
                    {data.basic_details.reaction_count}
                  </Value>
                </Li>
                <Li
                  className="list-item clickable"
                  onClick={updateSelected('rating')}
                >
                  <Label>{t('common.rating')}</Label>
                  <Value className="blue-val">
                    {data.basic_details.rating_count}
                  </Value>
                </Li>
                <Li className="list-item">
                  <Label>{t('common.followers')}</Label>
                  <Value>{data.basic_details.followers_count}</Value>
                </Li>
              </Ul>
              {!isEmpty(data.number_of_requests) && (
                <DetailsCard className="details-card">
                  <SubHead>{t('common.request_by_product')}</SubHead>
                  {detailsOptions(t).map(option => (
                    <DetailsItem key={option.key}>
                      <Label className="details-lbl">{option.label}</Label>
                      <Value className="details-value">
                        {data.number_of_requests[option.key]}
                      </Value>
                    </DetailsItem>
                  ))}
                  <DetailsItem className="no-border">
                    <Label className="details-lbl bold-lbl">{t('common.total')}</Label>
                    <Value className="details-value bold-value">
                      {getTotal(data.number_of_requests)}
                    </Value>
                  </DetailsItem>
                </DetailsCard>
              )}
              {!isEmpty(data.revenue_of_requests) && (
                <DetailsCard className="details-card">
                  <SubHead>{t('common.revenue_breakdown')}</SubHead>
                  {detailsOptions(t).map(option => (
                    <DetailsItem key={option.key}>
                      <Label className="details-lbl">{option.label}</Label>
                      <Value className="details-value">
                        {getCurrencySymbol()}
                        {numberToDecimalWithFractionTwo(
                          getLocalAmount(data.revenue_of_requests[option.key]),
                          false,
                          false,
                        )}
                      </Value>
                    </DetailsItem>
                  ))}
                  <DetailsItem className="no-border">
                    <Label className="details-lbl bold-lbl">{t('common.total')}</Label>
                    <Value className="details-value bold-value">
                      {getCurrencySymbol()}
                      {numberToDecimalWithFractionTwo(
                        getLocalAmount(getTotal(data.revenue_of_requests, true)),
                        false,
                        false,
                      )}
                    </Value>
                  </DetailsItem>
                </DetailsCard>
              )}
            </React.Fragment>
          )}
          {isEmpty(data) && <Loader class="custom-loader" />}
        </Scrollbars>
      </Wrap>
    </Layout>
  );
};

Analytics.propTypes = {
  modalBackHandler: PropTypes.func.isRequired,
};

Analytics.defaultProps = {};

export default Analytics;
