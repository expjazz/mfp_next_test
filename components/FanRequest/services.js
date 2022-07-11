import React, { useRef } from 'react';

export const withFeedSubscription = (Component) => {
  return (props) => {
    const feedDataProps = useRef(null);
    const customDoFeedRequest = (client, feedGroup, userId, options) => {
      const feed = client.feed(feedGroup, userId);
      if (!feedDataProps.current) {
        feed.subscribe(subsData => {
          if (subsData && subsData.deleted && feedDataProps.current && feedDataProps.current.onRemoveActivity) {
            feedDataProps.current.onRemoveActivity(subsData.deleted[0]);
          }
        });
      }
      const feedPromise = feed.get(options);
      return feedPromise;
    };

    const setFeedDataProps = (feedProps) => {
      if (feedDataProps && !feedDataProps.current) {
        feedDataProps.current = feedProps;
      }
    }

    return <Component handleFeedRequest={customDoFeedRequest} setFeedDataProps={setFeedDataProps} {...props} />;
  };
};
