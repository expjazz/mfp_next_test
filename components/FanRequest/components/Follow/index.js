import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { follow } from 'services/follow';
import HorizontalListing from 'components/HorizontalListing';
import Button from 'components/SecondaryButton';
import { Li, Content, Photo } from './styled';
import { follow } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { generalLoader, useGeneral } from 'src/context/general';

function Follow(props) {
  const { t } = useTranslation();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [dataList, updateDataList] = useState([]);
  const dispatch = useGeneral()[1]
  const loaderAction = bool => generalLoader(dispatch, bool)
  const callApi = (method, payload, loader) => {
    setLoading(true);
    if (loader) {
      loaderAction(true);
    }
    follow(payload, method)
      .then(res => {
        setLoading(false);
        if (res.data) {
          updateDataList(res.data);
        }
        if (loader) {
          loaderAction(false);
        }
      })
      .catch(() => {
        setLoading(false);
        if (loader) {
          loaderAction(false);
        }
      });
  };

  const followApi = data => {
    callApi('post', { celebrity: data.id }, true);
  };

  const goToProfile = item => {
    router.push(`/${item.user_id}`);
  };

  useEffect(() => {
    callApi('get');
  }, []);

  const renderContent = item => {
    return (
      <Content key={item.id}>
        <Photo
          image={
            item.avatar_photo &&
            (item.avatar_photo.thumbnail_url || item.avatar_photo.image_url)
          }
          onClick={() => goToProfile(item)}
        />
        <span
          className="name"
          onClick={() => goToProfile(item)}
          role="presentation"
        >
          {item.first_name} {item.last_name}
        </span>
        <Button
          secondary
          className="follow-btn"
          onClick={() => followApi(item)}
        >
          {t('common.followtext')}
        </Button>
      </Content>
    );
  };

  return (
    <React.Fragment>
      {dataList.length > 0 && (
        <Li key={props.key}>
          <span className="follow-head">{t('talent_follow')}</span>
          <HorizontalListing
            classes={{ root: 'list-root', listContent: 'list-content' }}
            scrollId="video-list-scroll"
            showArrows={false}
            dataList={dataList}
            loading={loading}
            offset={1}
            fetchData={() => {}}
            renderContent={renderContent}
            totalCount={dataList.length}
            limit={25}
          />
        </Li>
      )}
    </React.Fragment>
  );
}

Follow.propTypes = {
  key: PropTypes.string.isRequired,
  loaderAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Follow

    // loaderAction: state => dispatch(loaderAction(state)),