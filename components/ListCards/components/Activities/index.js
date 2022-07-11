import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import { Card, FlexCenter, TickText } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUsdCircle } from '@fortawesome/pro-solid-svg-icons';
import Button from '../../../SecondaryButton';
import { Layout } from './styled';
import { HeadingBold, BoldTextM, FlexColumn, FlexBox } from '../../styled';
import { ctaList } from './constants';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const elmStyles = [
  {
    flexClass: 'todo-padding',
    btnClass: 'button-booking',
  },
  {
    flexClass: 'web-padding',
    btnClass: 'button-activity',
  },
];

const ActivityCard = props => {
  const { data: entityData } = useGetPartner()
  const { t, ready } = useTranslation();
  const [recentList, updateRecent] = useState([]);
  const [earningsList, updateEarnings] = useState([]);

  const Tick = <TickText className="tick-text">{t('common.toDo')}</TickText>;
  const Heart = <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />;
  const Dollar = (
    <FontAwesomeIcon icon={faUsdCircle} className="icons icon-dollar" />
  );

  useEffect(() => {
    const activityList = [];
    const recentCount =
      props.data.recent_comment_count +
      props.data.recent_reaction_video_count +
      props.data.recent_rating_count;
    if (activityList.length < 3 && props.data.commercial_request.length) {
      activityList.push({
        style: elmStyles[0],
        secondary: false,
        icon: Tick,
        card: {
          heading: t('dashboard.recentActivityList.commercial.heading', {
            length: props.data.commercial_request.length,
          }),
          value_sub: '',
          btnTextPrimary: t(
            'dashboard.recentActivityList.commercial.btnTextPrimary',
          ),
          btnTextSecondary: t(
            'dashboard.recentActivityList.commercial.btnTextSecondary',
          ),
          url: '/manage/bookings',
        },
      });
    }
    if (props.data.open_booking_count > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[0],
        secondary: false,
        icon: Tick,
        card: {
          heading: t('dashboard.recentActivityList.openBooking.heading', {
            count: props.data.open_booking_count,
          }),
          value_main:
            props.data.expiring_bookings > 0
              ? t('dashboard.recentActivityList.openBooking.valueMain', {
                  count: props.data.expiring_bookings,
                })
              : '',
          value_sub: '',
          btnTextPrimary: t(
            'dashboard.recentActivityList.openBooking.btnTextPrimary',
          ),
          btnTextSecondary: t(
            'dashboard.recentActivityList.openBooking.btnTextSecondary',
          ),
          url: '/manage/bookings?type=open',
        },
      });
    }
    if (recentCount > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Heart,
        card: {
          heading: t('dashboard.recentActivityList.activities.heading', {
            count: recentCount,
          }),
          value_main: t('dashboard.recentActivityList.activities.valueMain', {
            comCount: props.data.recent_comment_count,
            vidCount: props.data.recent_reaction_video_count,
          }),
          value_sub: t('dashboard.recentActivityList.activities.valueSub', {
            count: props.data.recent_rating_count,
          }),
          btnTextPrimary: t(
            'dashboard.recentActivityList.activities.btnTextPrimary',
          ),
          btnTextSecondary: t(
            'dashboard.recentActivityList.activities.btnTextSecondary',
          ),
          url: '/manage/recent-activity',
        },
      });
    }
    if (props.data.recent_tip_count > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Dollar,
        card: {
          heading: t('dashboard.recentActivityList.tip.heading', {
            count: props.data.recent_tip_count,
          }),
          value_main: t('dashboard.recentActivityList.tip.valueMain', {
            amount: props.data.recent_tip_amount,
          }),
          value_sub: '',
          btnTextPrimary: t('dashboard.recentActivityList.tip.btnTextPrimary'),
          btnTextSecondary: t(
            'dashboard.recentActivityList.tip.btnTextSecondary',
          ),
          url: '/manage/bookings?type=completed&filter=tips',
        },
      });
    }

    if (props.data.recent_deposit_amount > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Dollar,
        card: {
          heading: t('dashboard.recentActivityList.deposite.heading'),
          value_main: t('dashboard.recentActivityList.deposite.valueMain', {
            amount: props.data.recent_deposit_amount,
            date: moment(props.data.recent_deposit_date).format('MM/DD'),
          }),
          value_sub: '',
          btnTextPrimary: t('dashboard.recentActivityList.deposite.btnTextPrimary'),
          btnTextSecondary: t(
            'dashboard.recentActivityList.deposite.btnTextSecondary',
          ),
          url: '/manage/performance/earnings',
        },
      });
    }
    updateRecent(activityList);

    const earnings = [];

    if (activityList.length < 3 && earnings.length < 3) {
      if (!props.data.social_promotion) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList(t, entityData?.partnerData)[1],
        });
      }
      if (!props.data.condider_pricing && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList(t, entityData?.partnerData)[3],
        });
      }

      if (!props.data.has_biography && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList(t, entityData?.partnerData)[4],
        });
      }
      if (!props.data.update_welcome_video && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList(t, entityData?.partnerData)[6],
        });
      }
    }

    updateEarnings(earnings);
  }, [JSON.stringify(props.data)]);

  const buttonClick = card => () => {
    props.buttonClick({ data: card, ...props.callBackProps });
  };

  const getCard = (
    elmProps,
    btnType,
    icon,
    card,
    index,
    customFlexCls,
    btnClsCustom,
  ) => {
    return (
      <Card
        className="activityCard"
        onClick={() => props.cardClick({ data: card, ...props.callBackProps })}
        key={index}
      >
        <FlexBox className={`activityCard-inner ${customFlexCls}`}>
          <span className="web-icons">
            {icon}
            <FlexColumn className={elmProps.flexClass}>
              <HeadingBold className="heading-bold">{card.heading}</HeadingBold>
              <BoldTextM>
                {card.value_main}
                {card.value_sub && (
                  <React.Fragment>
                    <span className="bar-separator">&nbsp;|&nbsp;</span>
                    {card.value_sub}
                  </React.Fragment>
                )}
              </BoldTextM>
            </FlexColumn>
          </span>
          <Button
            secondary={btnType}
            className={`${elmProps.btnClass} ${btnClsCustom}`}
            onClick={buttonClick(card)}
          >
            {card.btnTextPrimary}
            <span className="btn-extra">&nbsp;{card.btnTextSecondary}</span>
          </Button>
        </FlexBox>
      </Card>
    );
  };

  const getRecentActivity = () => {
    if (recentList.length > 0)
      return (
        <React.Fragment>
          <h2 className="head2">{t('dashboard.recentActivity')}</h2>
          {recentList.map((activity, index) => {
            return getCard(
              activity.style,
              activity.secondary,
              activity.icon,
              activity.card,
              index,
              '',
              '',
            );
          })}
        </React.Fragment>
      );

    return <React.Fragment />;
  };

  const getEarnings = () => {
    if (recentList.length < 3 && earningsList.length > 0) {
      return (
        <React.Fragment>
          <h2 className="head2">
            {t('dashboard.activityCard.earningsIncreaseHeading')}
          </h2>
          {earningsList.map((earning, index) => {
            return getCard(
              earning.style,
              earning.secondary,
              earning.icon,
              earning.card,
              index,
              'custom-flex',
              'custom-button',
            );
          })}
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  };

  return ready && (
    <Layout>
      {getRecentActivity()}
      {getEarnings()}
      <FlexCenter className="button-margin">
        <Button
          secondary
          className="button-promote"
          onClick={props.promoteClick}
        >
          {t('dashboard.activityCard.promoteBtnLbl')}
        </Button>
      </FlexCenter>
    </Layout>
  );
};

ActivityCard.propTypes = {
  buttonClick: PropTypes.func,
  cardClick: PropTypes.func,
  callBackProps: PropTypes.object,
  data: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  promoteClick: PropTypes.func.isRequired,
};

ActivityCard.defaultProps = {
  buttonClick: () => {},
  cardClick: () => {},
  callBackProps: {},
};
export default ActivityCard;
