/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/Checkbox';
import Input from 'components/TextInput';
import ToolTip from 'components/ToolTip';
import { FlexCenter } from 'styles/CommonStyled';
import { Heading, Description } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import { calcMessageAmt } from 'src/utils/dataToStringFormatter';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import ConfirmRoute from 'components/ConfirmRoute';
import { requestTypesKeys } from 'src/constants/requestTypes';
import BoostFans from '../BoostFans';
import { Container, Ul, Li, InputContainer, InputWrapper } from '../styled';
import { Wrap } from './styled';
import { isEmpty, isEqual } from 'src/utils/dataStructures';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const DirectMessages = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [_, getLocalAmount] = useGetLocalAmount()
  const currencyData = useCurrencyData()
  const { t, ready } = useTranslation();
  const [saved, setSaved] = useState(false);
  const [promote, showPromote] = useState(false);
  const [checked, setChecked] = useState(
    props.celbDetails.services.direct_message,
  );

  const [formData, updateFormData] = useState({
    amount: numberToCommaFormatter(calcMessageAmt(props.celbDetails.rate)),
    limit: 500,
  });

  const [errorAmt, setError] = useState(false);
  const [success, updateSuceess] = useState(false);

  const serviceUpdateSuccess = value => () => {
    setChecked(value);
  };

  const handleCheck = () => value => {
    if (props.celbDetails.services.direct_message && !value) {
      props.messages({ direct_message: value }, serviceUpdateSuccess(value));
    } else {
      setChecked(value);
      setSaved(false);
      props.confirmSave({ saved: false, route: 'direct-messages' });
    }
    updateSuceess(false);
  };

  const inputChange = state => event => {
    let {
      target: { value },
    } = event;
    if (value !== '0') {
      if (state === 'amount') {
        const regex = new RegExp(`\\USD|\\s|\\$|,`, 'g');
        value = value.replace(regex, '');
        if (value < 2) {
          setError(true);
        } else {
          setError(false);
        }
      } else if (state === 'limit') {
        value = Math.trunc(value) || '';
      }
      if (/^\d*\.?\d*$/.test(value) && value < 9999999)
        updateFormData({
          ...formData,
          [state]: value,
        });
      updateSuceess(false);
      props.confirmSave({ saved: false, route: 'direct-messages' });
    }
  };

  const validate = () => {
    return (
      !formData.limit || !formData.amount || formData.amount < 2 || success
    );
  };

  const userUpdateSuccess = () => {
    setSaved(true);
    updateSuceess(true);
    props.confirmSave({ saved: true, route: '' });
  };

  const triggerApi = () => {
    props.updateUserDetails(
      props.userDetails.id,
      {
        celebrity_details: {
          rate_limit: {
            type: requestTypesKeys.message,
            rate: formData.amount,
            limit: formData.limit,
          },
        },
        user_details: {},
      },
      userUpdateSuccess,
    );
  };

  const saveChanges = () => {
    const rateObj = props.celbDetails.rate_limit.find(
      limit => limit.type === requestTypesKeys.message,
    );
    if (rateObj) {
      if (
        !isEqual(
          {
            rate: rateObj.rate,
            limit: Number(rateObj.limit),
            checked: props.celbDetails.services.direct_message,
          },
          {
            rate: formData.amount,
            limit: Number(formData.limit),
            checked,
          },
        )
      ) {
        triggerApi();
      }
    } else {
      triggerApi();
    }
  };

  const updateRateLimit = () => {
    if (
      !isEmpty(props.celbDetails) &&
      props.celbDetails.rate_limit.length > 0
    ) {
      const rateObj = props.celbDetails.rate_limit.find(
        limit => limit.type === requestTypesKeys.message,
      );
      if (rateObj)
        updateFormData({
          amount: rateObj.rate,
          limit: rateObj.limit ? rateObj.limit : 500,
        });
    }
  };

  useEffect(() => {
    updateRateLimit();
  }, [JSON.stringify(props.celbDetails.rate_limit)]);

  useEffect(() => {
    updateRateLimit();
  }, []);

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
      <InputWrapper key={`directmessages-${state}`}>
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
        {state === 'amount' && currencyData.abbr !== 'USD' && (
          <span className="convert-price has-margin">
            {
              t('common.approxCurrency', {
                name: currencyData.abbr,
                symbol: currencyData.symbol,
                amount: numberToDecimalWithFractionTwo(
                  getLocalAmount(formData.amount),
                  false,
                  false,
                )
              })
            }
          </span>
        )}
        {error && <span className="label-input error-red">{errorMsg}</span>}
      </InputWrapper>
    );
  };
  return ready && (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/services/direct-messages"
        confirmSave={props.confirmSave}
      />

      <Container>
        <Wrap className="content-wrapper">
          <Heading className="inner-head">{t('services.messaging.heading')}</Heading>
          <Description className="check-head-text">
            { t('services.allowFollowing') }
          </Description>
          <Ul>
            <Li className="list-item-msg">
              <Checkbox onChange={handleCheck()} checked={checked} notLocal />
              <Description>
                <p className="main-text">{t('services.messaging.heading')}</p>
                {
                  t('services.messaging.description', {
                    purchaser: entityData?.partnerData.purchaser_plural_name
                  })
                }
              </Description>
            </Li>
          </Ul>
          {checked && (
            <InputContainer className="input-container">
              {getTextInput({
                placeholder: '',
                state: 'amount',
                value: `${formData.amount ? `USD $` : ''}${
                  formData.amount ? numberToCommaFormatter(formData.amount) : ''
                }`,
                error: errorAmt,
                errorMsg: t('services.messaging.amountError'),
                errorState: 'amonut',
                nativeProps: { type: 'text' },
                label: t('services.messaging.amountLabel', {
                  rate: numberToCommaFormatter(
                    calcMessageAmt(props.celbDetails.rate),
                  )
                }),
                activeLabel: t('common.price'),
              })}
              {getTextInput({
                placeholder: '',
                state: 'limit',
                value: formData.limit,
                error: '',
                errorState: 'limit',
                nativeProps: { type: 'text' },
                label: t('services.maxOpenReq'),
              })}
              <FlexCenter className="btn-wrap">
                <Button
                  disabled={validate()}
                  isDisabled={validate()}
                  onClick={saveChanges}
                >
                  {t('common.save')}
                </Button>
                {entityData?.partnerData.allow_star_share_graphics &&
                  props.celebActive &&
                  props.adminApproved &&
                  props.celbDetails.services.direct_message &&
                  !saved && (
                    <ToolTip title={t('services.promoteExperience')}>
                      <Button
                        secondary
                        className="promote-btn"
                        onClick={() => showPromote(!promote)}
                      >
                        {
                          t('services.promote', {
                            purchaser: entityData?.partnerData.purchaser_plural_name
                          })
                        }
                      </Button>
                    </ToolTip>
                  )}
              </FlexCenter>
              {entityData?.partnerData.allow_star_share_graphics &&
                props.celebActive &&
                props.adminApproved &&
                (saved || promote) &&
                props.celbDetails.services.direct_message && (
                  <BoostFans
                    requestType={requestTypesKeys.message}
                    global={false}
                  />
                )}
            </InputContainer>
          )}
        </Wrap>
      </Container>
    </React.Fragment>
  );
};

DirectMessages.propTypes = {
  celbDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  messages: PropTypes.func.isRequired,
};

DirectMessages.defaultProps = {};

export default DirectMessages;
