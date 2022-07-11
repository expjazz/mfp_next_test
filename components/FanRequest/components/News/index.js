import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  StreamApp,
  FlatFeed,
  InfiniteScrollPaginator,
  NewActivitiesNotification,
} from 'react-activity-feed';
import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import 'react-activity-feed/dist/index.css';
import EmptyPlaceholder from '../EmptyPlaceholder';
import Details from './Details';
import { withFeedSubscription } from '../../services';
import { Wrapper, Ul } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function News(props) {
  const containerRef = useRef(null);
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Ul ref={containerRef}>
        <React.Fragment>
          <StreamApp
            apiKey={process.env.NEXT_PUBLIC_STREAMIO_API_KEY}
            appId={process.env.NEXT_PUBLIC_STREAMIO_APP_ID}
            token={props.streamTocken}
          >
            <FlatFeed
              feedGroup="newsuserfeedone" // or timeline
              notify
              LoadingIndicator={Loader}
              Placeholder={() => {
                return (<EmptyPlaceholder
                  text={t('my_videos.requestEmpty.news', {talent: entityData?.partnerData?.talentSingleCap})}
                  imageURL='/images/empty_asleep.svg'
                  buttonText={t('common.browseTalent', {talent: entityData?.partnerData?.talentSingleCap})}
                />)
              }}
              doFeedRequest={props.handleFeedRequest}
              Paginator={feedProps => (
                <InfiniteScrollPaginator {...feedProps} Loader={Loader} />
              )}
              options={{
                limit: 25,
              }}
              Notifier={data => {
                if (data.adds.length > 0) {
                  return (
                    <NewActivitiesNotification
                      onClick={(clickProps) => {
                        data.onClick(clickProps);
                        props.onFeedUpdate();
                      }}
                      labelFunction={() => {
                        return data.adds.length > 1
                          ? t('unread_notification_plural', {
                              count: data.adds.length,
                            })
                          : t('unread_notification', {
                              count: data.adds.length,
                            });
                      }}
                    />
                  );
                }
                return null;
              }}
              Activity={activity => {
                props.setFeedDataProps(activity);
                return <Details {...activity} {...props} isRead />;
              }}
            />
          </StreamApp>
        </React.Fragment>
      </Ul>
    </Wrapper>
  );
}

News.propTypes = {
  getSelected: PropTypes.func.isRequired,
  streamTocken: PropTypes.string.isRequired,
  handleFeedRequest: PropTypes.func.isRequired,
  setFeedDataProps: PropTypes.func.isRequired,
};

export default withFeedSubscription(News);
