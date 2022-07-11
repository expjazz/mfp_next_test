import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/Checkbox';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import Dropdown from 'components/Dropdown';
import Switch from 'components/Switch';
import { Heading, Description } from 'styles/TextStyled';
import timezonez from './timezone.json';
import { Container } from '../styled';
import { Wrap, Timezone, SwitchWrap } from './styled';

const Notification = props => {
  const { t } = useTranslation();
  const [checkValue, updateCheckValue] = useState({
    celebrity_starsona_message: false,
    celebrity_account_updates: false,
    celebrity_starsona_request: false,
  });
  const [timezone, setTimezone] = useState({});

  const checkboxChange = notification => value => {
    updateCheckValue({ ...checkValue, [notification.key]: value });
  };

  const timezoneChange = time => {
    setTimezone(time);
  };

  const handleSave = () => {
    props.handleCheck(checkValue, timezone);
  };

  useEffect(() => {
    if (!props.is_viewed) props.updateNotificationViewed();
  }, []);

  useEffect(() => {
    if (props.notifications && props.notifications.length > 0) {
      const stateObj = [...props.socialNotifications, ...props.notifications].reduce(
        (accumulator, currentValue) => {
          return { ...accumulator, [currentValue.key]: currentValue.value };
        },
        {},
      );
      updateCheckValue(stateObj);
    }
    if (props.notiObj) {
      setTimezone({
        timezone: props.notiObj.timezone,
        text: props.notiObj.timezone_name,
      });
    }
  }, [JSON.stringify(props.notifications), JSON.stringify(props.socialNotifications)]);

  useEffect(() => {
    if (props.notifications && props.notifications.length > 0 && props.resetNotifications) {
      const stateObj = [...props.socialNotifications, ...props.notifications].reduce(
        (accumulator, currentValue) => {
          return { ...accumulator, [currentValue.key]: currentValue.value };
        },
        {},
      );
      updateCheckValue(stateObj);
    }
    if (props.notiObj && props.resetNotifications) {
      setTimezone({
        timezone: props.notiObj.timezone,
        text: props.notiObj.timezone_name,
      });
    }
    props.setResetNotifications(false)
  }, [props.resetNotifications]);

  return (
    <Container className="set-wrap">
      <Wrap>
        <Heading className="inner-head">{props.webHead}</Heading>
        <section className="terms-container">
          <Description className="note">
            {t('star_settings.notification.allow_following')}
          </Description>
          {props.notifications.map(notification => {
            return (
              <div className="termsWrapper" key={notification.mainText}>
                <Checkbox
                  onChange={checkboxChange(notification)}
                  checked={checkValue[notification.key]}
                  notLocal
                />
                <Description>
                  <p className="main-text">{notification.mainText}</p>{' '}
                  {notification.subText}
                </Description>
              </div>
            );
          })}
        </section>
        <SwitchWrap>
          {
            props.socialNotifications.map(notf => (
              <span className='switch-child'>
                <Switch
                  rootClass='alert-switch'
                  value={checkValue[notf.key]}
                  handleChecked={checkboxChange(notf)}
                  activeText=''
                  inActiveText=''
                />
                <span className='main-text'>
                  {notf.mainText}
                </span>
              </span>
            ))
          }

        </SwitchWrap>
        {props.hasTimezone && (
          <Timezone>
            <span className="title">
              {t('star_settings.notification.set_your_time_zone')}
            </span>
            <Dropdown
              rootClass="state-drop"
              selected={timezone}
              options={timezonez || []}
              labelKey="text"
              valueKey="timezone"
              onChange={timezoneChange}
              placeHolder={t(
                'star_settings.notification.select_your_time_zone',
              )}
              className="cus-drop"
              secondary
            />
          </Timezone>
        )}
        <FlexCenter>
          <Button className="save-button" onClick={handleSave}>
            {t('common.save')}
          </Button>
        </FlexCenter>
      </Wrap>
    </Container>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleCheck: PropTypes.func,
  webHead: PropTypes.string,
  socialNotifications: PropTypes.array,
  updateNotificationViewed: PropTypes.func.isRequired,
  is_viewed: PropTypes.bool,
  hasTimezone: PropTypes.bool,
  notiObj: PropTypes.object.isRequired,
  setResetNotifications: PropTypes.func,
  resetNotifications: PropTypes.bool,
};

Notification.defaultProps = {
  handleCheck: () => {},
  webHead: '',
  is_viewed: false,
  socialNotifications: [],
  hasTimezone: false,
  setResetNotifications: () => {},
  resetNotifications: false
};

export default Notification;
