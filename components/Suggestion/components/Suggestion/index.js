import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { Heading, DescriptionP } from 'styles/TextStyled';
import { getTime } from 'src/utils/timeUtils';
import Pagination from 'components/Pagination';
import Loader from 'components/Loader';
import { FlexCenter } from 'styles/CommonStyled';
import ShareButton from 'components/ShareButton';
// import { getSuggestionsList } from 'services/suggestions';
import { ShareContent } from '../constants';
import { Layout, Wrap, Ul, Li, Image } from './styled';
import { getSuggestionsList } from 'src/services/myfanpark/celebActions';
import { capitalize } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function Suggestion(props) {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [offSet, setOffset] = useState(0);
  const [data, setData] = useState([]);

  const getData = (offset = 0) => {
    setData([]);
    setLoader(true);
    getSuggestionsList(offset, 5)
      .then(res => {
        setLoader(false);
        if (res && res.data && res.data.data) {
          setData(res.data.data.suggestions);
          setCount(res.data.data.count);
          setOffset(offset);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const fetchNext = offset => {
    getData(offset);
  };

  useEffect(() => {
    getData(0);
  }, []);

  return (
    <Layout>
      <Wrap>
        <Heading className="heading">
          {t('common.suggestion.suggestions_heading', {
            purchaser: capitalize(entityData?.partnerData?.purchaser_singular_name),
          })}
        </Heading>
        <DescriptionP>
          {t('common.suggestion.suggestions_desc', {
            purchaser: entityData?.partnerData?.purchaser_plural_name,
          })}
        </DescriptionP>
        <FlexCenter className="btn-wrp">
          <ShareButton
            secondary
            buttonText={t('common.suggestion.sharebtn_lbl', {
              purchaser: entityData?.partnerData?.purchaser_plural_name,
            })}
            classes={{
              button: `share-btn`,
            }}
            shareUrl={`${window.location.origin}/${props.userDetails.user_id}/suggest`}
            content={ShareContent(
              props.celbDetails.nick_name,
              `${window.location.origin}/${props.userDetails.user_id}/suggest`,
            )}
          />
        </FlexCenter>
        {data.length > 0 && (
          <Pagination
            classes={{
              root: 'pagination-wrapper',
              pageDisplay: 'page-display',
            }}
            offset={offSet}
            count={count}
            limit={5}
            dataLoading={false}
            onChange={fetchNext}
          />
        )}
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="suggestion-scroll" />
          )}
        >
          <Ul>
            {data.length > 0 &&
              data.map(suggestion => {
                return (
                  <Li newSuggest={!suggestion.read} public={suggestion.public_visibility}>
                    {!suggestion.read && (
                      <span className="new-sug">
                        {t('common.suggestion.new_suggestion')}
                      </span>
                    )}
                    <span className="content-wrap">
                      <Image
                        src={
                          suggestion.fan_image ||
                          '/images/default-cover.jpg'
                        }
                      />
                      <span className="new-wrp">
                        <span className="content">
                          <DescriptionP>
                            <span className="fan-name">{suggestion.fan} </span>
                            {suggestion.suggestion}
                          </DescriptionP>
                          <span className="time">
                            {getTime(suggestion.created_date)}
                          </span>
                        </span>
                      </span>
                    </span>
                  </Li>
                );
              })}
          </Ul>
          {loader && <Loader class="custom-loader" />}
        </Scrollbars>
      </Wrap>
    </Layout>
  );
}

Suggestion.propTypes = {
  goBack: PropTypes.func.isRequired,
  toggleActivityVisibility: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

export default Suggestion;
