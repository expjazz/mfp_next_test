/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { arrayIncludesArray } from 'src/utils/dataformatter';
import { FlexCenter } from 'styles/CommonStyled';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import Input from 'components/TextInput';
import MultipleSelect from 'components/MultiselectDropdown';
// import { handleDiscount } from 'services/userManagement/productDiscount';
import Button from 'components/SecondaryButton';
import CInput from 'components/CInput';
import { Layout, InputWrapper } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { handleDiscount } from 'src/services/myfanpark/celebActions';

const AddDiscount = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const [formData, setFormData] = useState({
    active_from: moment(),
    active_to: '',
    title: '',
    product_type: [],
    discount: 10,
    description: '',
  });
  const [confirm, setConfirmDelete] = useState(false);

  const inputChange = state => event => {
    let {
      target: { value },
    } = event;
    if (state === 'discount') {
      if (value === '0' || value > 75) return;
      value = value.replace('%', '');
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [state]: value });
        return;
      }
      return;
    }
    setFormData({ ...formData, [state]: value });
  };

  const dateChange = state => value => {
    setFormData({ ...formData, [state]: value });
  };

  const getValues = state => value => {
    if (
      value &&
      value.length > 1 &&
      value.find(val => val.label === 'All products') &&
      formData.product_type.find(val => val.label === 'All products')
    ) {
      setFormData({
        ...formData,
        [state]: value.filter(val => val.label !== 'All products'),
      });
    } else if (
      !formData.product_type.find(val => val.label === 'All products') &&
      value.find(val => val.label === 'All products')
    ) {
      setFormData({
        ...formData,
        [state]: value.filter(val => val.label === 'All products'),
      });
    } else if (value.length > 0) {
      setFormData({ ...formData, [state]: value });
    }
  };
  const validateForm = () => {
    const validate = [
      !isEmpty(formData.title),
      !isEmpty(formData.active_from),
      !isEmpty(formData.active_to),
      !isEmpty(formData.product_type),
      moment(formData.active_to).diff(moment(formData.active_from)) >= 0,
      formData.discount && formData.discount !== '',
    ].every(condition => condition);
    return validate;
  };

  const saveNew = payload => {
    const result = handleDiscount('post', payload);
    result
      .then(resp => {
        props.loaderAction(false);
        if (resp.discount) {
          props.updateList(resp.discount, 'add');
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'success',
          });
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('promote_page.discount.failed_to_add'),
          variant: 'error',
        });
      });
  };

  const editSelected = payload => {
    const result = handleDiscount('post', payload);
    result
      .then(resp => {
        props.loaderAction(false);
        if (resp.discount) {
          props.updateList(resp.discount, 'edit');
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'success',
          });
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('promote_page.discount.failed_to_update'),
          variant: 'error',
        });
      });
  };

  const buildPayload = fn => {
    let products = [];
    const productList = cloneDeep(props.productList);
    productList.shift();
    const productIds = Array.from(productList, x => x.id);
    const selectedIds = Array.from(formData.product_type, x => x.id);
    if (
      formData.product_type.find(item => item.id === props.productList[0].id)
    ) {
      products.push(props.productList[0].id);
    } else if (arrayIncludesArray(selectedIds, productIds)) {
      products.push(props.productList[0].id);
    } else {
      products = selectedIds;
    }
    const payload = {
      ...formData,
      discount: Number(formData.discount),
      active_from: moment(formData.active_from).format('MMM D YYYY 00:00:00'),
      active_to: moment(formData.active_to).format('MMM D YYYY 00:00:00'),
      products,
    };
    fn(payload);
  };

  const saveChanges = () => {
    try {
      props.loaderAction(true);
      buildPayload(saveNew);
    } catch (e) {
      console.log(e)
      props.loaderAction(false);
    }
  };

  const updateChanges = () => {
    try {
      props.loaderAction(true);
      buildPayload(editSelected);
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const confirmDelete = () => {
    props.loaderAction(true);
    handleDiscount('delete', { id: props.selected.id })
      .then(() => {
        props.updateList(props.selected, 'delete');
        setConfirmDelete(false);
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('promote_page.discount.deleted'),
          variant: 'success',
        });
        props.goBack()
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('promote_page.discount.failed_to_update'),
          variant: 'error',
        });
      });
  };

  const deleteConfirm = () => {
    setConfirmDelete(true);
  };
  const closeConfirm = () => {
    setConfirmDelete(false);
  };

  const getDate = date => {
    if (date) return date.split('T')[0];
    return null;
  };

  useEffect(() => {
    if (props.selected.id) {
      setFormData({
        ...props.selected,
        active_from: moment(getDate(props.selected.active_from)),
        active_to: moment(getDate(props.selected.active_to)),
      });
    }
  }, [props.selected.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      props.productList.length > 0 &&
      !props.selected.id &&
      formData.product_type.length === 0
    ) {
      setFormData({ ...formData, product_type: [{ ...props.productList[0] }] });
    }
  }, [props.productList.length]);

  const CustomInput = ({ value, onClick, label }) => (
    <Input
      inputProps={{
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

  const getTextInput = ({
    state,
    value,
    error,
    nativeProps,
    label,
    errorMsg,
    note,
    className,
  }) => {
    return (
      <InputWrapper key={`disc-${state}`} className={className}>
        <Input
          inputProps={{
            nativeProps,
            defaultProps: { value, onChange: inputChange(state) },
            mInputProps: {
              classes: { rest: {} },
              InputProps: {
                endAdornment: value ? <span className="adornment">%</span> : '',
              },
            },
            labelObj: {
              label,
            },
          }}
        />
        {error && <span className="label-input error-red">{errorMsg}</span>}
        {note && <span className="text note">{note}</span>}
      </InputWrapper>
    );
  };

  return (
    <Layout>
      <BackHeader backHandler={props.goBack} label="Discounts" noHelp />
      <Heading className="sub-head">
        {t('promote_page.discount.create_discount')}
      </Heading>
      <Description>{t('promote_page.discount.description')}</Description>
      <Scrollbars
        autoHide
        renderView={scrollProps => (
          <div {...scrollProps} id="add-discount-scroll" />
        )}
      >
        <div className="input-container">
          <CInput
            containerCls="input-wrapper"
            inputCls="CInput"
            label={t('promote_page.discount.title', {
              purchaser: entityData?.partnerData?.purchaser_plural_name,
            })}
            autoSize
            inputProps={{
              onChange: inputChange('title'),
              value: formData.title,
              maxLength: 52,
              rows: 1,
            }}
          ></CInput>
          <InputWrapper>
            <DatePicker
              dateFormat={props.dateFormat}
              withPortal
              minDate={moment()}
              maxDate={formData.active_to ? formData.active_to : null}
              customInput={
                <CustomInput label={t('promote_page.discount.start_date')} />
              }
              popperPlacement="bottom"
              selected={formData.active_from}
              onChange={dateChange('active_from')}
            />
          </InputWrapper>
          <InputWrapper>
            <DatePicker
              dateFormat={props.dateFormat}
              withPortal
              minDate={formData.active_from ? formData.active_from : moment()}
              customInput={
                <CustomInput label={t('promote_page.discount.end_date')} />
              }
              popperPlacement="bottom"
              selected={
                moment(formData.active_to).isValid() ? formData.active_to : null
              }
              onChange={dateChange('active_to')}
            />
          </InputWrapper>
          <InputWrapper>
            <MultipleSelect
              getValues={getValues('product_type')}
              data={props.productList}
              labelKey="label"
              values={formData.product_type}
            />
          </InputWrapper>
          {getTextInput({
            label: t('promote_page.discount.discount_amount'),
            state: 'discount',
            value: formData.discount
              ? `${parseFloat(formData.discount).toFixed(0)}`
              : '',
            error: '',
            errorMsg: '',
            errorState: '',
            nativeProps: { type: 'text' },
            note: t('promote_page.discount.dis_amnt_note'),
            className: 'adore-input',
          })}
          <TextArea
            className="textarea"
            autoSize
            inputProps={{
              onChange: inputChange('description'),
              value: formData.description,
              maxLength: 500,
              placeholder: t('promote_page.discount.description_place', {
                purchaser: entityData?.partnerData?.purchaser_plural_name,
              }),
            }}
          />
          <FlexCenter className="btn-wrp">
            {isEmpty(props.selected) && (
              <Button
                disabled={!validateForm()}
                isDisabled={!validateForm()}
                onClick={saveChanges}
              >
                {t('promote_page.discount.create_discount')}
              </Button>
            )}
            {!isEmpty(props.selected) && props.type === 'active' && (
              <Button secondary className="edit-item" onClick={deleteConfirm}>
                {t('common.delete')}
              </Button>
            )}
            {!isEmpty(props.selected) && props.type === 'active' && (
              <Button
                className="edit-item update-btn"
                onClick={updateChanges}
                disabled={!validateForm()}
                isDisabled={!validateForm()}
              >
                {t('promote_page.discount.update_discount')}
              </Button>
            )}
          </FlexCenter>
        </div>
      </Scrollbars>
      {confirm && (
        <div className="terms-modal confirm-modal">
          <span className="text cus-text">{t('common.confirm_delete')}</span>
          <div className="btn-confirm-wrap">
            <Button onClick={closeConfirm} secondary className="btn-keep">
              {t('common.keep_for_now')}
            </Button>
            <Button onClick={confirmDelete}>{t('common.delete')}</Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

AddDiscount.propTypes = {
  updateToast: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AddDiscount;
