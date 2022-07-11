import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading, DescriptionP, LinkText } from 'styles/TextStyled';
import Dropdown from 'components/Dropdown';
import { getTime } from 'src/utils/timeUtils';
import Pagination from 'components/Pagination';
import { EmptyText } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import BackHeader from 'components/BackHeader';
import Loader from 'components/Loader';
import { getPerformanceList } from '../../services';
import { filterOptions } from '../../constants';
import { Ul, Li, Image } from '../../styled';
import { Layout, Wrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function Reaction(props) {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [filter, setFilter] = useState(props.selectedFilter);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [offSet, setOffset] = useState(0);
  const [data, setData] = useState([]);

  const getData = (type, offset = 0) => {
    setData([]);
    setLoader(true);
    getPerformanceList(offset, 5, 'reaction', type)
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

  const onSuccess = id => () => {
    setData(
      data.map(item => {
        if (item.id === id) {
          return { ...item, public_visibility: !item.public_visibility };
        }
        return item;
      }),
    );
  };

  const onView = comment => () => {
    props.toggleBookingModal(
      true,
      { ...comment, id: comment.request_id },
      true,
    );
  };

  const visibilityChange = reaction => () => {
    props.toggleActivityVisibility(reaction.id, onSuccess(reaction.id));
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
        <Heading className="heading">{t('common.performance.reactions')}</Heading>
        <DescriptionP>
          {t('common.performance.reaction_desc', {
            storeName: entityData?.partnerData?.partner_name,
          })}
        </DescriptionP>

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
            <div {...scrollProps} id="reaction-scroll" />
          )}
        >
          <Ul>
            {data.length > 0 &&
              data.map(reaction => {
                return (
                  <Li public={reaction.public_visibility}>
                    <span className="content-wrap">
                      <Image
                        src={
                          reaction.fan_image ||
                          '/images/default-cover.jpg'
                        }
                      />
                      <span className="content">
                        <span className="card">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="heart-icon"
                          />
                          <span className="rea-rec">
                            <span>{t('common.reactionRecorded')}:</span>
                            <span className="date">
                              {moment(reaction.created_date).format('MMMM DD')}
                              th
                            </span>
                          </span>
                          <Button
                            className="view-btn"
                            onClick={onView(reaction)}
                          >
                            {t('common.view')}
                          </Button>
                        </span>
                        <span className="time">
                          {' '}
                          {getTime(reaction.created_date)}
                        </span>
                      </span>
                    </span>
                    <span className="links">
                      <LinkText onClick={onView(reaction)}>
                        {t('common.performance.view_shoutout', {
                          type:
                            reaction.request_type ===
                            'Personalized video shoutout'
                              ? t('common.shout')
                              : reaction.request_type,
                        })}
                      </LinkText>
                      <LinkText onClick={visibilityChange(reaction)}>
                        {reaction.public_visibility ? t('common.hideCap') : t('common.showCap')}
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

Reaction.propTypes = {
  goBack: PropTypes.func.isRequired,
  toggleActivityVisibility: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
};

export default Reaction;
