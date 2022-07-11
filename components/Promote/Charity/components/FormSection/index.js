import React, { useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  numberToCommaFormatter,
  commaToNumberFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import Input from 'components/TextInput';
import { completeURL } from 'src/constants/regex/urlRegex';
import Button from 'components/SecondaryButton';
import { defaultStartDate, defaultEndDate } from '../../constants';
import FormStyled from './styled';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';

const FormSection = ({ formObject, ...props }) => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const currencyData = useCurrencyData()
  const { t } = useTranslation();
  const [formData, updateFormData] = useState({
    charityName: formObject.charityName || '',
    charityWebsite: formObject.charityWebsite || '',
    goalAmount: formObject.goalAmount
      ? numberToCommaFormatter(formObject.goalAmount)
      : '',
    startDate: formObject.startDate || defaultStartDate,
    endDate: formObject.endDate || defaultEndDate,
  });
  const [validUrl, setValidUrl] = useState(true);

  const [errors, setError] = useState({
    goalAmount: '',
    charityName: '',
  });

  function isUrlValid(value) {
    const expression = completeURL;
    const regexp = new RegExp(expression);
    return regexp.test(value);
}

  const handleBlur = event => {
    if (event.target.value !== '' && !isUrlValid(event.target.value)) {
      setValidUrl(false);
    } else {
      setValidUrl(true);
    }
  };

  const disableSave = useMemo(() => {
    if (formObject.type === 'fundraiser') {
      return (
        formData.charityName === '' ||
        formData.goalAmount === '' ||
        formData.startDate === '' ||
        formData.endDate === ''
      );
    }
    return formData.charityName === '' || !isUrlValid(formData.charityWebsite);
  }, [
    formData.charityName,
    formData.goalAmount,
    formData.startDate,
    formData.endDate,
    formObject.type,
    formData.charityWebsite,
  ]);

  const handleFormChange = type => event => {
    if (type === 'goalAmount') {
      const pattern = /^[1-9][0-9]*$/;
      const dollarpattern = /^\$.*$/;
      const value = dollarpattern.test(event.target.value)
        ? event.target.value.substr(1)
        : event.target.value;
      if (value !== '') {
        updateFormData({
          ...formData,
          [type]: pattern.test(commaToNumberFormatter(value))
            ? numberToCommaFormatter(commaToNumberFormatter(value))
            : formData.goalAmount,
        });
      } else {
        updateFormData({
          ...formData,
          [type]: '',
        });
      }
    } else if (type === 'startDate' || type === 'endDate') {
      updateFormData({
        ...formData,
        [type]: event,
      });
    } else if (type === 'charityWebsite') {
      if (event.target.value === '' || isUrlValid(event.target.value)) {
        setValidUrl(true);
      }
      updateFormData({
        ...formData,
        [type]: event.target.value.trim(''),
      });
    } else {
      updateFormData({
        ...formData,
        [type]: event.target.value,
      });
    }
  };

  const checkGoalAmount = () => {
    const pattern = /^[1-9][0-9]*$/;
    const priceEmpty = !formData.goalAmount;
    if (priceEmpty) {
      const errorMsg = t('promote_page.charity.amount_blank');
      updateFormData({
        ...formData,
        goalAmount: formData.goalAmount,
      });
      setError({
        ...errors,
        goalAmount: errorMsg,
      });
      return false;
    }
    if (!pattern.test(commaToNumberFormatter(formData.goalAmount))) {
      updateFormData({
        ...formData,
        goalAmount: formData.goalAmount,
      });
      setError({
        ...errors,
        goalAmount: t('promote_page.charity.amount_number'),
      });
      return false;
    }
    updateFormData({
      ...formData,
      goalAmount: formData.goalAmount,
    });
    setError({
      ...errors,
      goalAmount: '',
    });
    return true;
  };

  const saveFormData = () => {
    if (formData.charityName === '') {
      setError({
        ...errors,
        charityName: t('promote_page.charity.name_blank'),
      });
    } else if (formObject.type === 'fundraiser') {
      if (checkGoalAmount()) {
        props.onSave({
          ...formObject,
          ...formData,
          goalAmount: commaToNumberFormatter(formData.goalAmount),
        });
      }
    } else if (formData.charityName !== '') {
      props.onSave({ ...formObject, ...formData });
    }
  };

  const CustomInput = ({ value, onClick, label }) => (
    <Input
      inputProps={{
        rootClass: 'input-container',
        nativeProps: { readOnly: true },
        defaultProps: {
          value,
          onClick,
        },
        labelObj: {
          label,
        },
      }}
    />
  );

  return (
    <FormStyled>
      <Input
        inputProps={{
          rootClass: 'input-container',
          nativeProps: {
            disabled: formObject.readOnly || formObject.started,
          },
          defaultProps: {
            value: formData.charityName,
            onChange: handleFormChange('charityName'),
            fullWidth: true,
          },
          labelObj: {
            label: t('promote_page.charity.charity_name'),
          },
        }}
      />
      <Input
        inputProps={{
          rootClass: 'input-container',
          nativeProps: {
            disabled: formObject.readOnly || formObject.started,
          },
          defaultProps: {
            value: formData.charityWebsite,
            onChange: handleFormChange('charityWebsite'),
            onBlur: handleBlur,
            fullWidth: true,
            error: formData.charityWebsite !== '' && !validUrl,
          },
          labelObj: {
            label: t('promote_page.charity.charity_website'),
            errorMsg: t('common.invalid_url'),
          },
        }}
      />
      {formObject.type === 'fundraiser' && (
        <div className="fund-fields">
          <DatePicker
            dateFormat={props.dateFormat}
            withPortal
            minDate={defaultStartDate}
            disabled={formObject.readOnly || formObject.started}
            calendarClassName="date-picker"
            className="datepicker-wrp"
            customInput={
              <CustomInput
                label={t('promote_page.discount.start_date')}
                nativeProps={{
                  readOnly: true,
                  disabled: formObject.readOnly || formObject.started,
                  placeholder: props.dateFormat,
                }}
              />
            }
            customInputRef="dt"
            popperPlacement="bottom"
            selected={formData.startDate}
            onChange={handleFormChange('startDate')}
          />

          <DatePicker
            dateFormat={props.dateFormat}
            withPortal
            minDate={defaultEndDate}
            disabled={formObject.ended}
            calendarClassName="date-picker"
            className="datepicker-wrp"
            customInput={
              <CustomInput
                label={t('promote_page.discount.end_date')}
                nativeProps={{
                  readOnly: true,
                  disabled: formObject.ended,
                  placeholder: props.dateFormat,
                }}
              />
            }
            customInputRef="dt"
            popperPlacement="bottom"
            selected={formData.endDate}
            onChange={handleFormChange('endDate')}
          />

          <Input
            inputProps={{
              rootClass: 'input-container',
              nativeProps: {
                pattern: '\\d*',
                disabled: formObject.ended,
              },
              defaultProps: {
                value: `${formData.goalAmount !== '' ? '$' : ''}${
                  formData.goalAmount
                }`,
                error: !!errors.goalAmount,
                onChange: handleFormChange('goalAmount'),
                fullWidth: true,
              },
              labelObj: {
                label: t('promote_page.charity.goal_amount')
              },
            }}
          />
          <span className="convert-price has-margin">
            {
              t('common.approxCurrency', {
                name: currencyData?.abbr,
                symbol: getLocalSymbol(),
                amount: numberToDecimalWithFractionTwo(
                  getLocalAmount(commaToNumberFormatter(formData.goalAmount)),
                  false,
                  false,
                )
              })
            }
          </span>
        </div>
      )}
      <Button
        isDisabled={disableSave}
        className="save-button"
        onClick={saveFormData}
      >
        {formObject.ended ? t('promote_page.charity.back'): t('common.save')}
      </Button>
    </FormStyled>
  );
};

FormSection.defaultProps = {
  onSave: () => {},
};

FormSection.propTypes = {
  formObject: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};

export default FormSection;
