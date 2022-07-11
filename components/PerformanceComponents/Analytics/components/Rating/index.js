import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { Heading, LinkText } from 'styles/TextStyled';
import { getTime } from 'src/utils/timeUtils';
import Dropdown from 'components/Dropdown';
import Pagination from 'components/Pagination';
import { EmptyText } from 'styles/CommonStyled';
import StarRating from 'components/StarRating';
import BackHeader from 'components/BackHeader';
import Loader from 'components/Loader';
import { getPerformanceList } from '../../services';
import { filterOptions } from '../../constants';
import { Ul, Li, Image } from '../../styled';
import { Layout, Wrap } from './styled';

function Rating(props) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(props.selectedFilter);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [offSet, setOffset] = useState(0);

  const getData = (type, offset = 0) => {
    setData([]);
    setLoader(true);
    getPerformanceList(offset, 5, 'rating', type)
      .then(res => {
        setLoader(false);
        if (res && res.data && res.data.data) {
          setData(res.data.data.components);
          setCount(res.data.data.count);
          setOffset(offset);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const onView = comment => () => {
    props.toggleBookingModal(
      true,
      { ...comment, id: comment.request_id },
      true,
    );
  };

  const handleFilter = option => {
    setFilter(option);
    getData(option.id);
  };

  const fetchNext = offset => {
    getData(filter.id, offset);
  };

  useEffect(() => {
    getData(filter.id, 0);
  }, []);

  return (
    <Layout>
      <BackHeader
        backHandler={props.goBack}
        label={t('common.performance.performance')}
        heading=""
        headerCls="header-label"
        rootClass="child-back-header"
        noHelp
      />
      <Wrap>
        <Heading className="heading">{t('common.performance.ratings')}</Heading>
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
        <Pagination
          classes={{ root: 'pagination-wrapper', pageDisplay: 'page-display' }}
          offset={offSet}
          count={count}
          limit={5}
          dataLoading={false}
          onChange={fetchNext}
        />
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="rating-scroll" />
          )}
        >
          <Ul>
            {data.length > 0 &&
              data.map(rate => {
                return (
                  <Li>
                    <span className="content-wrap">
                      <Image
                        src={
                          rate.fan_image || '/images/default-cover.jpg'
                        }
                      />
                      <span className="content">
                        <span className="title">
                          {t('common.performance.rated_view', { name: rate.fan_name })}
                        </span>
                        <StarRating
                          readOnly
                          ratingClass="star-item"
                          rating={rate.rating}
                        />
                        <span className="time">
                          {' '}
                          {getTime(rate.created_date)}
                        </span>
                      </span>
                    </span>
                    <span className="links">
                      <LinkText onClick={onView(rate)}>
                        {t('common.performance.view_shoutout', {
                          type:
                            rate.request_type === 'Personalized video shoutout'
                              ? t('common.shout')
                              : rate.request_type,
                        })}
                      </LinkText>
                    </span>
                  </Li>
                );
              })}
            {!loader && !data.length ? (
              <EmptyText noPadding>
                {t('common.performance.no_data_comment')}
              </EmptyText>
            ) : null}
          </Ul>
          {loader && <Loader class="custom-loader" />}
        </Scrollbars>
      </Wrap>
    </Layout>
  );
}

Rating.propTypes = {
  goBack: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
};

export default Rating;
