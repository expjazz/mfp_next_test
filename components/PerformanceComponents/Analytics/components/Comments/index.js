import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { Heading, DescriptionP, LinkText } from 'styles/TextStyled';
import Dropdown from 'components/Dropdown';
import { getTime } from 'src/utils/timeUtils';
import Pagination from 'components/Pagination';
import BackHeader from 'components/BackHeader';
import { EmptyText } from 'styles/CommonStyled';
import Loader from 'components/Loader';
import { getPerformanceList } from '../../services';
import { filterOptions } from '../../constants';
import { Ul, Li, Image } from '../../styled';
import { Layout, Wrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function Comments(props) {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [filter, setFilter] = useState(props.selectedFilter);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [offSet, setOffset] = useState(0);

  const getData = (type, offset = 0) => {
    setLoader(true);
    setData([]);
    getPerformanceList(offset, 5, 'comment', type)
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

  const visibilityChange = comment => () => {
    props.toggleActivityVisibility(comment.id, onSuccess(comment.id));
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
        <Heading className="heading">{t('common.performance.comments')}</Heading>
        <DescriptionP>
          {t('common.performance.comments_desc', {
            storName: entityData?.partnerData?.partner_name,
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
            <div {...scrollProps} id="comments-scroll" />
          )}
        >
          <Ul>
            {data.length > 0 &&
              data.map(comment => {
                return (
                  <Li public={comment.public_visibility}>
                    <span className="content-wrap">
                      <Image
                        src={
                          comment.fan_image || '/images/default-cover.jpg'
                        }
                      />
                      <span className="content opacity">
                        <span className="comment">
                          <strong>{comment.fan_name}</strong> {comment.comment}
                        </span>
                        <span className="time">
                          {getTime(comment.created_date)}
                        </span>
                      </span>
                    </span>
                    <span className="links">
                      <LinkText onClick={onView(comment)}>
                        {t('common.performance.view_shoutout', {
                          type:
                            comment.request_type ===
                            "Personalized Video Shoutout"
                              ? t('common.shout')
                              : comment.request_type,
                        })}
                      </LinkText>
                      <LinkText onClick={visibilityChange(comment)}>
                        {comment.public_visibility ? t('common.hideCap') : t('common.showCap')}
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

Comments.propTypes = {
  goBack: PropTypes.func.isRequired,
  toggleActivityVisibility: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
};

export default Comments;
