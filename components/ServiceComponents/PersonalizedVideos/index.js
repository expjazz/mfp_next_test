/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/Checkbox';
import { isEqual, cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { FlexCenter } from 'styles/CommonStyled';
import ToolTip from 'components/ToolTip';
import Button from 'components/SecondaryButton';
import Input from 'components/TextInput';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { Heading, Description } from 'styles/TextStyled';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import ConfirmRoute from 'components/ConfirmRoute';
import BoostFans from '../BoostFans';
import { List } from './Constants';
import { Container, Ul, Li, InputContainer, InputWrapper } from '../styled';
import { Wrap } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useRouter } from 'next/router';

const PersonalizedVideos = props => {
  const router = useRouter()
  const [_, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);
  const [promote, showPromote] = useState(false);
  const [formData, updateFormData] = useState({
    amount: props.celbDetails.rate !== '0.00' ? props.celbDetails.rate : '',
    limit: props.celbDetails.weekly_limits
      ? props.celbDetails.weekly_limits
      : 100,
  });
  const [checkList, updateCheckList] = useState(List(t));

  const isEqualPayload = () => {
    const payload = checkList.reduce((accumulator, currentValue) => {
      return { ...accumulator, [currentValue.state]: currentValue.active };
    }, {});

    return isEqual(
      {
        local_currency_amount: Number(props.celbDetails.rate),
        weekly_limits: Number(props.celbDetails.weekly_limits),
        announcement: props.celbDetails.services.announcement,
        question_answer: props.celbDetails.services.question_answer,
        personalised_video: props.celbDetails.services.personalised_video,
      },
      {
        local_currency_amount: Number(formData.amount),
        weekly_limits: Number(formData.limit),
        ...payload,
      },
    );
  };

  const inputChange = state => event => {
    if (event.target.value === '0') {
      return true;
    }
    const regex = new RegExp(`\\USD|\\s|\\$|,`, 'g');
    let value = event.target.value.replace(regex, '');
    if (state === 'limit') {
      value = Math.trunc(value) || '';
    }
    if (/^\d*\.?\d*$/.test(value) && value < 9999999)
      updateFormData({
        ...formData,
        [state]: value,
      });
    return '';
  };

  const handleCheck = state => value => {
    const temp = cloneDeep([...checkList]);
    const index = temp.findIndex(elm => elm.state === state);
    temp[index].active = value;
    updateCheckList(temp);
  };

  const updateService = () => {
    const payload = checkList.reduce((accumulator, currentValue) => {
      return { ...accumulator, [currentValue.state]: currentValue.active };
    }, {});
    if (
      !isEqual(
        {
          announcement: props.celbDetails.services.announcement,
          question_answer: props.celbDetails.services.question_answer,
          personalised_video: props.celbDetails.services.personalised_video,
        },
        payload,
      )
    ) {
      props.messages(payload);
    }
  };

  const onSuccess = () => {
    updateService();
  };

  const updateUserDetails = () => {
    if (
      !isEqual(
        {
          rate: props.celbDetails.rate,
          weekly_limits: Number(props.celbDetails.weekly_limits),
        },
        {
          rate: formData.amount,
          weekly_limits: Number(formData.limit),
        },
      )
    ) {
      props.updateUserDetails(
        props.userDetails.id,
        {
          celebrity_details: {
            rate: formData.amount,
            weekly_limits: Number(formData.limit),
          },
          user_details: {},
        },
        onSuccess,
      );
    } else if (props.celbDetails.rate && props.celbDetails.weekly_limits) {
      updateService();
    }
  };

  const saveChanges = () => {
    setSaved(true);
    updateUserDetails();
  };

  const linkStatus = link => {
    const { services } = props.celbDetails;
    const linkItem = { ...link };
    switch (link.state) {
      case 'personalised_video':
        linkItem.active = services.personalised_video;
        return linkItem;
      case 'announcement':
        linkItem.active = services.announcement;
        return linkItem;
      case 'question_answer':
        linkItem.active = services.question_answer;
        return linkItem;
      default:
        return linkItem;
    }
  };

  const checkBoxClick = state => () => {
    if (state === 'video') {
      props.updateToast({
        value: true,
        message: t('services.shoutout.videoError'),
        variant: 'error',
      });
    }
  };

  const getCheckList = () => {
    return checkList.map(link => {
      return linkStatus(link);
    });
  };

  useEffect(() => {
    updateCheckList(getCheckList());
  }, [
    props.celbDetails.services.announcement,
    props.celbDetails.services.question_answer,
    props.celbDetails.services.personalised_video,
  ]);

  useEffect(() => {
    if (isEqualPayload()) {
      props.confirmSave({ saved: true, route: '' });
    } else {
      props.confirmSave({ saved: false, route: 'personalized-videos' });
    }
  }, [
    JSON.stringify(checkList),
    JSON.stringify(formData),
    JSON.stringify(props.celbDetails.services),
    JSON.stringify(props.celbDetails)
  ]);

  const hasActive = useMemo(() => {
    return checkList.find(item => item.active);
  }, [JSON.stringify(checkList)]);

  const getTextInput = ({
    state,
    value,
    error,
    activeLabel,
    nativeProps,
    label,
    errorMsg,
  }) => {
    return (
      <InputWrapper key={`personalized-videos-${state}`}>
        <Input
          inputProps={{
            nativeProps,
            defaultProps: { value, onChange: inputChange(state) },
            labelObj: {
              label,
              activeLabel,
            },
          }}
        />

        {error && <span className="label-input error-red">{errorMsg}</span>}
      </InputWrapper>
    );
  };

  return (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/services/personalized-videos"
        confirmSave={props.confirmSave}
      />
      <Container>
        <Wrap className="content-wrapper">
          <Heading className="inner-head">{t('services.shoutout.heading')}</Heading>
          <Description className="check-head-text">
            {t('services.allowFollowing')}
          </Description>
          <Ul>
            {checkList.map(link => {
              return (
                <Li className="list-item-msg" key={link.state}>
                  <span role="presentation" onClick={checkBoxClick(link.state)}>
                    <Checkbox
                      onChange={handleCheck(link.state)}
                      checked={link.active}
                    />
                  </span>
                  <Description>
                    <p className="main-text">{link.heading}</p>
                    {link.message}
                  </Description>
                </Li>
              );
            })}
          </Ul>
          <InputContainer className="input-container-vdo">
            {!isEmpty(hasActive) && (
              <React.Fragment>
                {getTextInput({
                  placeholder: '',
                  state: 'amount',
                  value: `${formData.amount ? 'USD $' : ''}${
                    formData.amount
                      ? numberToCommaFormatter(formData.amount)
                      : ''
                  }`,
                  error: '',
                  errorMsg: '',
                  nativeProps: { type: 'text' },
                  label: t('services.funstuff.priceLabel'),
                  activeLabel: t('common.price'),
                })}

                {props.currencyData.abbr !== 'USD' && (
                  <span className="convert-price">
                    {
                      t('common.approxCurrency', {
                        name: props.currencyData.abbr,
                        symbol: props.currencyData.symbol,
                        amount: numberToDecimalWithFractionTwo(
                          getLocalAmount(formData.amount),
                          false,
                          false,
                        )
                      })
                    }
                  </span>
                )}
                {getTextInput({
                  placeholder: '',
                  state: 'limit',
                  value: formData.limit,
                  error: '',
                  errorMsg: '',
                  nativeProps: { type: 'text' },
                  label: t('services.maxOpenReq'),
                })}
              </React.Fragment>
            )}
            <FlexCenter
              className={`btn-wrap ${isEmpty(hasActive) ? 'btn-pad' : ''}`}
            >
              <Button
                disabled={!formData.amount || isEqualPayload()}
                isDisabled={!formData.amount || isEqualPayload()}
                onClick={saveChanges}
              >
                {t('common.save')}
              </Button>
              {!saved &&
                props.entityData.allow_star_share_graphics &&
                props.celebActive &&
                props.adminApproved &&
                props.celbDetails.services.personalised_video && (
                  <ToolTip title={t('services.promoteExperience')}>
                    <Button
                      secondary
                      className="promote-btn"
                      onClick={() => showPromote(!promote)}
                    >
                      {t('services.promote', {
                        purchaser: props.entityData?.purchaser_plural_name
                      })}
                    </Button>
                  </ToolTip>
                )}
            </FlexCenter>
            {props.entityData.allow_star_share_graphics &&
              props.celebActive &&
              props.adminApproved &&
              (saved || promote) &&
              props.celbDetails.services.personalised_video && (
                <BoostFans
                  requestType={requestTypesKeys.shoutout}
                  global={false}
                />
              )}
          </InputContainer>
        </Wrap>
      </Container>
    </React.Fragment>
  );
};

PersonalizedVideos.propTypes = {
  celbDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  messages: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};

PersonalizedVideos.defaultProps = {};

export default PersonalizedVideos;
