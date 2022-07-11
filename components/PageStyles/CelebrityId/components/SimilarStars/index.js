import React, { useEffect, useState } from 'react';
// import HorizontalListing from 'components/HorizontalListing';
// // import { Link } from 'react-router-dom';
// import { getUserImage } from 'src/utils/dataformatter';
// import { getStarName } from 'src/utils/dataToStringFormatter';
// import { getSimilarStars } from 'services/userManagement/starDetails';
// import { Container } from '../../styled';
import { Layout } from './styled';
import { useMediaQuery } from '@material-ui/core';
// import { useVisibility } from '../../../../customHooks/domUtils';
import { Container } from '../../../../PageStyles/CelebrityId/styled';
import HorizontalListing from '../../../../HorizontalListing';
import { getUserImage } from '../../../../../src/utils/dataformatter';
import { getStarName } from '../../../../../src/utils/dataToStringFormatter';
import { useVisibility } from '../../../../../customHooks/domUtils';

const SimilarStars = ({ userId, celebId, config, dataList }) => {
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [offset, updateOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataCount, setCount] = useState(0);
  const [rootNode, setRootNode] = useState(null);
  const visible = useVisibility(rootNode);


  const renderContent = dataItem => {
    const data = dataItem.similar_celebrity || {};
    return (
      <section className="star-root">
        <a href={`/${data.user_id}`}>
          <img
            className="star-image"
            src={visible ? getUserImage(data.avatar_photo) : null}
            alt="user"
            width="75"
            height="75"
          />
          <span className="star-name">
            {getStarName(data.nick_name, data.first_name, data.last_name)}
          </span>
        </a>
      </section>
    );
  };

  if (dataList.length === 0 && !loading) {
    return null;
  }

  return (
    <Container white ref={setRootNode}>
      <Layout>
        <HorizontalListing
          classes={{
            root: 'list-root',
            arrowWrapper: 'slide-arrow',
            listContent: 'scroll-list-wrp',
          }}
          scrollId="similar-list-scroll"
          showArrows={!isMobile}
          dataList={dataList}
          loading={loading}
          offset={offset}
          fetchData={() => {}}
          scrollProps={{
            autoHeight: true,
            autoHeightMin: 100,
            autoHeightMax: 600,
          }}
          renderContent={renderContent}
          totalCount={dataCount}
          limit={10}
          config={config}
        />
      </Layout>
    </Container>
  );
};

export default SimilarStars;
