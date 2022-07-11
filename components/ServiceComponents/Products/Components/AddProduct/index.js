/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { handleProducts } from 'src/services';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import { readDataUrl } from 'customHooks/domUtils';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import { awsKeys } from 'src/constants/';
import { postReactionMedia } from 'src/services/postReaction';
import { FlexCenter, Close, Dashed } from 'styles/CommonStyled';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import Checkbox from 'components/Checkbox';
import Button from 'components/SecondaryButton';
import Input from 'components/TextInput';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import CInput from 'components/CInput';
import { InputWrapper, InputContainer, Ul, Li } from '../../../styled';
import { Layout, CharCount } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const AddProduct = props => {
  useDisableRefetchOnFocus()
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [_, getLocalAmount] = useGetLocalAmount()
  const { t, ready } = useTranslation();
  const [files, setFiles] = useState(null);
  const [baseUrls, setUrl] = useState(null);
  const [formData, setFormData] = useState({
    ...props.selected,
    price: props.selected.price,
  });
  const [checked, setChecked] = useState({
    auto_graphed: props.selected.auto_graphed
      ? props.selected.auto_graphed
      : false,
    allow_customization: props.selected.allow_customization
      ? props.selected.allow_customization
      : false,
    hide: props.selected.hide ? props.selected.hide : false,
  });

  const [confirm, setConfirmDelete] = useState(false);
  const [notSaved, setNotSaved] = useState(false);
  const fileRef = useRef(null);

  const inputChange = state => event => {
    let {
      target: { value },
    } = event;
    if (state === 'price' || state === 'quantity') {
      if (value === '0') return;
      const regex = new RegExp(`\\USD|\\s|\\$|,`, 'g');
      value = value.replace(regex, '');
      if (state === 'quantity') {
        value = Math.trunc(value) || '';
      }
      if (/^\d*\.?\d*$/.test(value) && value < 9999999) {
        setFormData({ ...formData, [state]: value });
        props.confirmSave({ saved: false, route: 'products' });
        return;
      }
      return;
    }
    setFormData({ ...formData, [state]: value });
    props.confirmSave({ saved: false, route: 'products' });
  };

  const valueChange = state => event => {
    setFormData({ ...formData, [state]: event.target.value });
    props.confirmSave({ saved: false, route: 'products' });
  };

  const handleCheck = state => value => {
    setChecked({ ...checked, [state]: value });
    if (state === 'allow_customization' && !value) {
      setFormData({ ...formData, customization_details: '' });
    }
    props.confirmSave({ saved: false, route: 'products' });
  };

  const fileChange = async event => {
    const file = event.target.files;
    if (file && file[0].type.includes('image/')) {
      if (file[0].size > 10485760) {
        props.updateToast({
          value: true,
          message: t('common.fileSize', { size: '10MB' }),
          variant: 'error',
        });
      } else {
        const exifData = await getExifData(file[0]);
        const correctedFile = await imageRotation(file[0], exifData);
        if (correctedFile) {
          await readDataUrl(correctedFile).then(result => {
            setUrl(result);
            setFiles(correctedFile);
          });
        }
        props.confirmSave({ saved: false, route: 'products' });
      }
    }
    if (fileRef?.current) {
      fileRef.current.value = '';
    }
  };

  const removeImage = () => () => {
    setFiles(null);
    setUrl(null);
  };

  const validateForm = () => {
    const hasFile = files || !isEmpty(props.selected.product_image);
    const validate = [
      hasFile,
      !isEmpty(formData.title),
      !isEmpty(formData.description),
      formData.price && formData.price !== '',
      formData.quantity && formData.quantity !== '',
      checked.allow_customization
        ? !isEmpty(formData.customization_details)
        : true,
    ].every(condition => condition);
    return validate;
  };

  const addNew = fileName => {
    const payload = { ...formData };
    if (fileName) {
      payload.product_image = fileName;
    } else {
      delete payload.product_image;
    }
    const res = handleProducts('add', {
      ...payload,
      ...checked,
    });
    res
      .then(resp => {
        props.loaderAction(false);
        if (resp.products) {
          if (!isEmpty(resp.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: resp.services },
            });
          }
          props.updateList(resp.products, 'add');
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'success',
          });
          props.confirmSave({ saved: true, route: '' });
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
          message: t('common.failedAdd'),
          variant: 'error',
        });
      });
  };

  const edit = fileName => {
    const payload = { ...formData };
    if (fileName) {
      payload.product_image = fileName;
    } else {
      delete payload.product_image;
    }
    const result = handleProducts('edit', {
      ...payload,
      ...checked,
      id: props.selected.product_id,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.products) {
          if (!isEmpty(res.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: res.services },
            });
          }
          props.updateList(res.products, 'edit');
          setFiles(null);
          setUrl(null);
          props.updateToast({
            value: true,
            message: res.message,
            variant: 'success',
          });
          props.confirmSave({ saved: true, route: '' });
        } else {
          props.updateToast({
            value: true,
            message: res.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.update_failed'),
          variant: 'error',
        });
      });
  };

  const uploadProducts = (file, fn) => {
    const result = postReactionMedia(
      awsKeys.products,
      file,
      file.type.split('/')[1],
      file.type.split('/')[0],
    );
    result
      .then(res => {
        const response = axios.post(res.url, res.formData);
        response
          .then(() => {
            fn(res.fileName);
          })
          .catch(() => {
            props.loaderAction(false);
            props.updateToast({
              value: true,
              message: t('common.uploadFailed'),
              variant: 'error',
            });
          });
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.uploadFailed'),
          variant: 'error',
        });
      });
  };

  const saveChanges = () => {
    try {
      props.loaderAction(true);
      if (files) {
        uploadProducts(files, addNew);
      } else {
        addNew();
      }
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const updateChanges = () => {
    try {
      props.loaderAction(true);
      if (files) {
        uploadProducts(files, edit);
      } else {
        edit();
      }
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const deleteItem = () => {
    setConfirmDelete(true);
  };

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.goBack();
    }
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.goBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const confirmDelete = () => {
    try {
      props.loaderAction(true);
      const result = handleProducts('delete', {
        id: props.selected.product_id,
      });
      result.then(res => {
        if (!isEmpty(res.services)) {
          props.updateUserData({
            userDetails: props.userDetails,
            celbDetails: { ...props.celbDetails, services: res.services },
          });
        }
        props.updateList(props.selected, 'delete');
        props.loaderAction(false);
        setConfirmDelete(false);
      });
    } catch (e) {
      props.loaderAction(false);
    }
  };
  const closeConfirm = () => {
    setConfirmDelete(false);
  };

  useEffect(() => {
    setFormData(props.selected);
  }, [props.selected.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTextInput = ({
    state,
    value,
    error,
    nativeProps,
    label,
    activeLabel,
    errorMsg,
    rootCls,
  }) => {
    return (
      <InputWrapper
        className={`input-wrapper ${rootCls}`}
        key={`products-${state}`}
      >
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
        {state === 'price' && props.currencyData.abbr !== 'USD' && (
          <span className="convert-price has-margin">
            {
              t('common.approxCurrency', {
                name: props.currencyData.abbr,
                symbol: props.currencyData.symbol,
                amount: numberToDecimalWithFractionTwo(
                  getLocalAmount(formData.price),
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
        validateUrl="/manage/storefront/services/fun-stuff"
        confirmSave={props.confirmSave}
      />
      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}

      <Layout
        hasImage={!isEmpty(props.selected.product_image)}
        customize={checked.allow_customization}
        className="content-wrapper"
      >
        <BackHeader backHandler={backHandler} label={t('services.merch.shortHead')} noHelp />
        <Heading className="inner-head">{t('services.merch.heading')}</Heading>
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="add-product-scroll" />
          )}
        >
          <InputContainer className="input-container">
            <CInput
              containerCls="input-wrapper"
              inputCls="CInput"
              label={t('services.merch.titlePlaceholder')}
              activeLabel={t('common.title')}
              autoSize
              inputProps={{
                onChange: valueChange('title'),
                value: formData.title,
                maxLength: 100,
                rows: 1,
              }}
            ></CInput>

            {(baseUrls || !isEmpty(props.selected.product_image)) && (
              <section className="image-wrapper">
                <span className="image-span">
                  {baseUrls && (
                    <Close
                      className="close"
                      role="presentation"
                      onClick={removeImage()}
                    ></Close>
                  )}
                  <img
                    src={baseUrls || props.selected.product_image[0]}
                    alt=""
                    className="image-preview"
                  />
                </span>
              </section>
            )}
            {isEmpty(baseUrls) && (
              <Dashed htmlFor="evidence" className="dashed-btn">
                <input
                  className="hidden-upload"
                  accept="image/*"
                  id="evidence"
                  onChange={fileChange}
                  type="file"
                  ref={fileRef}
                />
                <FontAwesomeIcon
                  className="upload-icon"
                  icon={faImage}
                  size="3x"
                />
                {!isEmpty(props.selected.product_image)
                  ? t('common.replaceSampleImageRequired')
                  : t('common.uploadSampleImageRequired')}
              </Dashed>
            )}
            <CInput
              containerCls=""
              inputCls="CInput"
              label={t('services.merch.descriptionLabel')}
              activeLabel={t('common.description')}
              autoSize
              inputProps={{
                onChange: valueChange('description'),
                value: formData.description,
                maxLength: 255,
                rows: 1,
              }}
            ></CInput>
            <CharCount>
              {t('common.char_remains', {
                length: 255 - (formData.description ? formData.description.length : 0)
              })}
            </CharCount>

            {getTextInput({
              state: 'price',
              value: `${formData.price ? `USD $` : ''}${
                formData.price ? numberToCommaFormatter(formData.price) : ''
              }`,
              error: '',
              errorMsg: '',
              errorState: '',
              nativeProps: { type: 'text' },
              label: t('services.merch.priceLabel'),
              activeLabel: t('common.price'),
            })}
            {getTextInput({
              state: 'quantity',
              value: formData.quantity,
              error: '',
              errorMsg: '',
              errorState: '',
              nativeProps: { type: 'text' },
              label: t('services.merch.quantityLabel'),
              activeLabel: t('services.merch.quantityActiveLabel'),
              rootCls: 'quantity-wrap',
            })}

            <Description className="remaining">
              {!isEmpty(props.selected) && props.selected.sold > 0
                ? t('services.merch.currentlySold', { sold: props.selected.sold })
                : ''}
            </Description>

            <Ul className="">
              <Li className="list-item-product">
                <Checkbox
                  onChange={handleCheck('auto_graphed')}
                  checked={checked.auto_graphed}
                />
                <Description>
                  <p className="main-text">{t('services.merch.autographed')}</p>
                  {t('services.merch.itemAutograph')}
                </Description>
              </Li>
              <Li className="list-item-product">
                <Checkbox
                  onChange={handleCheck('allow_customization')}
                  checked={checked.allow_customization}
                />
                <Description>
                  <p className="main-text">{t('services.merch.allowCustom')}</p>
                  {t('services.merch.customDescription', {
                    purchaser: entityData?.partnerData?.purchaser_singular_name
                  })}
                </Description>
              </Li>
            </Ul>

            {checked.allow_customization && (
              <CInput
                key="cus-det"
                inputCls="CInput"
                label={t('services.merch.customLabel')}
                containerCls="last-input"
                autoSize
                inputProps={{
                  onChange: valueChange('customization_details'),
                  value: formData.customization_details,
                  maxLength: 255,
                  rows: 1,
                }}
              ></CInput>
            )}
            {!isEmpty(props.selected) && (
              <Ul className="check-ul">
                <Li className="list-item-product">
                  <Checkbox
                    onChange={handleCheck('hide')}
                    checked={checked.hide}
                  />
                  <Description>
                    <p className="main-text">{t('services.hideItemProfile')}</p>
                    {
                      t('services.notVisible', {
                        purchaser: entityData?.partnerData?.purchaser_plural_name
                      })
                    }
                  </Description>
                </Li>
              </Ul>
            )}

            {confirm && (
              <div className="terms-modal confirm-modal">
                <span className="text cus-text">
                  {t('common.confirm_delete')}
                </span>
                <div className="btn-confirm-wrap">
                  <Button onClick={closeConfirm} secondary className="btn-keep">
                    {t('common.keep_for_now')}
                  </Button>
                  <Button onClick={confirmDelete}>{t('common.delete')}</Button>
                </div>
              </div>
            )}

            <FlexCenter>
              {isEmpty(props.selected) ? (
                <Button
                  disabled={!validateForm()}
                  isDisabled={!validateForm()}
                  onClick={saveChanges}
                >
                  {t('services.merch.addProduct')}
                </Button>
              ) : (
                <React.Fragment>
                  <Button secondary className="edit-item" onClick={deleteItem}>
                    {t('common.delete')}
                  </Button>
                  <Button
                    className="edit-item"
                    onClick={updateChanges}
                    disabled={!validateForm()}
                    isDisabled={!validateForm()}
                  >
                    {t('common.update')}
                  </Button>
                </React.Fragment>
              )}
            </FlexCenter>
          </InputContainer>
        </Scrollbars>
      </Layout>
    </React.Fragment>
  );
};

AddProduct.propTypes = {
  updateToast: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
};

export default AddProduct;
