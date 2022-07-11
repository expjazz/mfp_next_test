import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DOMPurify from 'dompurify';
import moment from 'moment';
// import { isEmpty } from 'src/utils/dataStructures';
// import Timer from 'components/Timer';
import BannerStyled from './styled';
import { useMediaQuery } from '@material-ui/core';
import { isEmpty } from '../../src/utils/dataStructures';
import Timer from '../Timer';

const BannerMessage = React.forwardRef((props, forwardRef) => {
  const [bgImg, setImage] = useState(props.config.banner_web_bg_image);
  const [showTime, setShowTimer] = useState(true);
  const isMobile = useMediaQuery('(max-width: 831px)');
  const getBanner = () => {
    if (isMobile) {
      return props.config.banner_mobile_template;
    }
    return props.config.banner_web_template;
  };

  const timerEnd = () => {
    setShowTimer(false);
    if (props.timerUpdate) props.timerUpdate();
  };
  useEffect(() => {
    if (isMobile) {
      setImage(props.config.banner_mobile_bg_image);
    } else {
      setImage(props.config.banner_web_bg_image);
    }
  }, [isMobile]);

  const getTimer = () => {
    if (
      !isEmpty(props.config.active_from) &&
      !isEmpty(props.config.active_to)
    ) {
      const from = moment(props.config.active_from);
      const to = moment(props.config.active_to);
      const cur = moment();
      const start = cur.diff(from, 'days') >= 0;
      const end = cur.diff(to, 'days') <= 0;
      if (start && end)
        return (
          <span className="banner-timer">
            <Timer
              endDate={props.config.active_to}
              dtFormat="YYYY/MM/DD HH:mm:ss"
              displayFormat="day:hour:min"
              callBack={timerEnd}
            />
          </span>
        );
    }
    return '';
  };

  return (
    <BannerStyled
      className={`${props.rootClass}`}
      ref={forwardRef}
      bgImg={bgImg}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: getBanner(),
        }}
      />{' '}
      {props.config.show_timer && showTime && getTimer()}
    </BannerStyled>
  );
});

BannerMessage.defaultProps = {
  rootClass: '',
  timerUpdate: () => {},
};

BannerMessage.propTypes = {
  rootClass: PropTypes.string,
  config: PropTypes.object.isRequired,
  timerUpdate: PropTypes.func,
};

export default BannerMessage;
