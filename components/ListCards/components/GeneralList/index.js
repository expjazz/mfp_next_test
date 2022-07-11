import React from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
import { Card, TickText } from 'styles/CommonStyled';
import { getFor } from 'src/utils/dataformatter';
import SampleLabel from 'components/SampleLabel';
import { Description } from 'styles/TextStyled';
import PrimaryButton from '../../../PrimaryButton';
import { requestTypes } from 'src/constants/requestTypes';
import { getTime } from 'src/utils/timeUtils';
import { HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const GeneralList = props => {
  const { t } = useTranslation();
  const checkOther = occasion => {
    if (props.data.occasion_id !== 18 && props.data.occasion_id !== 24) {
      return (
        <HeadingBold className="description-text">
          {
            t('common.bookingPopup.titleGenerator1', {
              occasion: props.data.occasion,
              type: occasion,
              for: getFor(props.data),
            })
          }
        </HeadingBold>
      );
    }
    let occasionCaps = '';
    if (!isEmpty(occasion))
      occasionCaps = occasion.charAt(0).toUpperCase() + occasion.slice(1);
    return (
      <HeadingBold className="description-text">
        {
          t('common.bookingPopup.titleGenerator2', {
            type: occasionCaps,
            for: getFor(props.data),
          })
        }
      </HeadingBold>
    );
  };

  const getDescription = (text) => {
    return (
      <HeadingBold className="description-text">
        {text}
      </HeadingBold>
    );
  };

  const renderDescription = () => {
    switch (requestTypes[props.data.request_type]) {
      case 'Q&A':
        return getDescription(t('general_list.title.question', {
          fan: props.data.fan_first_name,
        }));
      case 'Shout-out':
        return checkOther(t('bookings.shoutout'));
      case 'Commercial':
        return getDescription(t('general_list.title.commercial', {
          fan: props.data.fan_first_name,
        }));
      case 'Message':
        return getDescription(t('general_list.title.dm', {
          fan: props.data.fan_first_name,
        }));
      case 'Social Shout-out':
        return getDescription(t('general_list.title.socialInteraction', {
          fan: props.data.fan_first_name,
        }));
      case 'Social Promotion':
        return getDescription(t('general_list.title.socialProm', {
          fan: props.data.fan_first_name,
        }));
      case 'digitalGoods':
        return getDescription(t('general_list.title.funItem', {
          fan: props.data.fan_first_name,
        }));
      case 'Products':
        return getDescription(t('general_list.title.merch', {
          fan: props.data.fan_first_name,
        }));
      default:
        return checkOther(t('bookings.announcement'));
    }
  };
  const renderTime = time => {
    const actualTimeObject = moment();
    const currentTimeObject = moment(time).add(
      parseInt(props.expiration, 0),
      'days',
    );
    const timeDifference = currentTimeObject.diff(actualTimeObject, 'hours');
    if (timeDifference > 48) {
      // does not expires in 48 hours
      return (
        <span className="time">
          <span className="time-head">{t('bookings.requested')}</span>{' '}
          {getTime(time)}
        </span>
      );
    }
    return <span className="time expiring">{t('common.expiring_soon')}</span>;
  };

  const onCardClick = () => {
    if (
      document.body.getBoundingClientRect().width < 832 ||
      window.innerWidth < 832
    ) {
      props.onPrimaryClick();
    }
  };

  const getButtonLabel = () => {
    if (requestTypes[props.data.request_type] === 'Message') {
      return t('common.reply');
    } else if (
      requestTypes[props.data.request_type] === 'Social Shout-out' ||
      requestTypes[props.data.request_type] === 'Social Promotion'
    ) {
      return t('general_list.respond');
    } else if (
      requestTypes[props.data.request_type] === 'digitalGoods' ||
      requestTypes[props.data.request_type] === 'Products'
    ) {
      return t('common.view_req');
    }
    return t('common.make_video');
  };

  return (
    <Card onClick={onCardClick}>
      <GeneralStyled isOpen={props.isOpen}>
        <section className="inner-wrapper">
          <GeneralStyled.Section className="inner-top">
            <LeftContent className="left-content">
              <TickText className={!props.isOpen && 'close-icon'}>
                {props.isOpen
                  ? requestTypes[props.data.request_type] === 'Products' &&
                    (props.data.complete_status === 'in_progress' ||
                      props.data.complete_status === 'almost_finished')
                    ? t('general_list.need_to_ship')
                    : t('common.toDo')
                  : null}
              </TickText>
            </LeftContent>
            <GeneralStyled.Description isOpen={props.isOpen}>
              {!props.isOpen && (
                <span className="cancel-heading">{t('common.cancelled')}</span>
              )}
              {renderDescription()}
              {!props.isOpen && <Description>{props.data.comment}</Description>}
            </GeneralStyled.Description>
          </GeneralStyled.Section>
          {props.data.practice_booking && <SampleLabel />}
        </section>
        <GeneralStyled.Section className="details-wrapper">
          <GeneralStyled.Details
            isOpen={props.isOpen}
            buttonLabel={getButtonLabel()}
            isSample={props.data.practice_booking}
          >
            {props.isOpen ? (
              <React.Fragment>
                {!props.data.practice_booking && (
                  <React.Fragment>
                    {renderTime(props.data.created_date)} |{' '}
                  </React.Fragment>
                )}
                <span
                  className="action"
                  onClick={props.onPrimaryClick}
                  role="presentation"
                />
              </React.Fragment>
            ) : null}
          </GeneralStyled.Details>

          {props.isOpen ? (
            <PrimaryButton
              className="action-button"
              onClick={props.onPrimaryClick}
            >
              {t('general_list.respond_now')}
            </PrimaryButton>
          ) : (
            <span
              className="view-action"
              onClick={props.onPrimaryClick}
              role="presentation"
            >
              {t('common.view_details')}
            </span>
          )}
        </GeneralStyled.Section>
      </GeneralStyled>
    </Card>
  );
};

GeneralList.defaultProps = {
  isOpen: true,
};

GeneralList.propTypes = {
  data: PropTypes.object.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  expiration: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

export { GeneralList };
