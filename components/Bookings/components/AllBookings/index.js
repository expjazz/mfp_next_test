import React from 'react';
import { useTranslation, Trans } from 'next-i18next';
import PropTypes from 'prop-types';
import { SectionHead, EmptyText } from 'styles/CommonStyled';
import { options } from '../../constants';
import { GeneralList, LatestCard } from '../../../../components/ListCards';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import BookingsStyled from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import Link from 'next/link';
import { accountStatus } from 'src/constants/stars/accountStatus';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const AllBookings = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  return (
    <React.Fragment>
      <Dropdown
        rootClass="drop-down"
        secondary
        selected={props.dropValue}
        options={options}
        labelKey="title"
        valueKey="id"
        onChange={props.handleCategoryChange}
        placeHolder={t('open_bookings.request_type_drop')}
      />
      <BookingsStyled.SectionHeader>
        <SectionHead>{t('open_bookings.openRequests')}</SectionHead>
        {props.bookingsList.data.length > 0 && (
          <span
            role="presentation"
            className="info-text"
            onClick={props.setRequestType({
              title: t('open_bookings.openBookings'),
              id: 'open',
            })}
          >
            {t('common.viewAll')} <strong>{props.bookingsList.count}</strong>{' '}
            {t('open_bookings.openRequests')}
          </span>
        )}
      </BookingsStyled.SectionHeader>

      {!props.bookingsList.loading && props.bookingsList.data.length === 0 && (
        <EmptyText className="empty-text">
          You currently do not have any requests. {
                  (userData?.user?.talent_status === accountStatus.live || userData?.user?.talent_status === accountStatus.paused) && (
                    <>
                    {"Visit"}
                      <Link href="/manage/promote/promo-share" shallow={true}>
                        <a>
                          {' '} {t('open_bookings.promote_yourself')} {' '}
                        </a>
                      </Link>
                      {"to get those requests."}
                    </>
                  )
                }
          </EmptyText>
      )}
      {props.bookingsList.data.slice(0, 2).map(bookItem => (
        <GeneralList
          expiration={
            bookItem.payment_type === 'in_app'
              ? props.config.request_expiration_days_in_app
              : bookItem.expiry_days
          }
          onPrimaryClick={props.onOpenClick(bookItem.booking_id)}
          key={bookItem.booking_id}
          data={bookItem}
        />
      ))}
      {props.bookingsList.data.length > 0 && (
        <span
          role="presentation"
          className="info-text"
          onClick={props.setRequestType({
            title: t('open_bookings.openBookings'),
            id: 'open',
          })}
        >
          <Trans
            i18nKey="open_bookings.view_all_open_req"
            values={{ count: props.bookingsList.count }}
          >
            View all <strong>{props.bookingsList.count}</strong> open requests
          </Trans>
        </span>
      )}
      {props.recentActivity.loading ||
      props.recentActivity.activityList.length !== 0 ? (
        <BookingsStyled.SectionHeader>
          <SectionHead className="latest-activity">
            {' '}
            {t('open_bookings.latest_activity')}
          </SectionHead>
        </BookingsStyled.SectionHeader>
      ) : null}

      {props.recentActivity.activityList.map(activity => (
        <LatestCard
          activity={activity}
          key={activity.id}
          type={activity.activity_type}
          starMode
        />
      ))}
      {props.bookingsList.loading && <Loader />}
      {props.recentActivity.loading && <Loader />}
    </React.Fragment>
  );
};

AllBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  onOpenClick: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  updateBookingsList: PropTypes.func.isRequired,
  setRequestType: PropTypes.func.isRequired,
  recentActivity: PropTypes.object.isRequired,
};

export default AllBookings;
