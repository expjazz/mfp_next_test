import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  numberToCommaFormatter,
  commaToNumberFormatter,
} from 'src/utils/dataformatter';
import Input from 'components/TextInput';
import Button from 'components/SecondaryButton';
import { defaultStartDate, defaultEndDate } from '../../constants';
import FormStyled from './styled';

const FormSection = ({ formObject, ...props }) => {
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

  const [errors, setError] = useState({
    goalAmount: '',
    charityName: '',
  });

  const disableSave = useMemo(() => {
    if (formObject.type === 'fundraiser') {
      return (
        formData.charityName === '' ||
        formData.goalAmount === '' ||
        formData.startDate === '' ||
        formData.endDate === ''
      );
    }
    return formData.charityName === '';
  }, [
    formData.charityName,
    formData.goalAmount,
    formData.startDate,
    formData.endDate,
    formObject.type,
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
      const errorMsg = t('common.goal_amount_error');
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
        goalAmount: t('common.goal_amount_number'),
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
        charityName: t('common.charity_name_error'),
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

  const CustomInput = ({value, onClick, label}) => (
    <Input
      inputProps={{
        rootClass: 'input-container',
        nativeProps: { readOnly: true },
        defaultProps:{
          value,
          onClick,
        },
        labelObj: {
          label,
        },
      }}
    />
  )

  return (
    <FormStyled>
      <Input
        inputProps={{
          rootClass: 'input-container',
          nativeProps:{
            disabled: formObject.readOnly || formObject.started,
          },
          defaultProps: {
            value:formData.charityName,
            onChange: handleFormChange('charityName'),
            fullWidth: true,
          },
          labelObj: {
            label: t('common.charity_name'),
          },
        }}
      />
      <Input
        inputProps={{
          rootClass: 'input-container',
          nativeProps:{
            disabled: formObject.readOnly || formObject.started,
          },
          defaultProps: {
            value:formData.charityWebsite,
            onChange: handleFormChange('charityWebsite'),
            fullWidth: true,
          },
          labelObj: {
            label: t('common.charity_website'),
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
                label={t('common.start_date')}
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
                label="End Date"
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
              nativeProps:{
                pattern: '\\d*',
                disabled: formObject.ended,
              },
              defaultProps: {
                value:`${formData.goalAmount !== '' ? '$' : ''}${
                  formData.goalAmount
                }`,
                error: !!errors.goalAmount,
                onChange: handleFormChange('goalAmount'),
                fullWidth: true,
              },
              labelObj: {
                label: "Goal amount",
              },
            }}
          />
        </div>
      )}
      <Button
        isDisabled={disableSave}
        className="save-button"
        onClick={saveFormData}
      >
        {formObject.ended ? 'Back' : 'Save'}
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
