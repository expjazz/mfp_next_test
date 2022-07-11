/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { handleDigitalGoods } from 'src/services/';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import { readDataUrl } from 'customHooks/domUtils';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import { awsKeys } from 'src/constants/';
import { postReactionMedia } from 'src/services/postReaction';
import Dropdown from 'components/Dropdown';
import { FlexCenter, Close, Dashed } from 'styles/CommonStyled';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import Checkbox from 'components/Checkbox';
import Button from 'components/SecondaryButton';
import Input from 'components/TextInput';
import CInput from 'components/CInput';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import { durationList } from './Constants';
import { InputWrapper, InputContainer, Ul, Li } from '../../../styled';
import { Layout, CharCount } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useRouter } from 'next/router';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const FunItem = props => {
  useDisableRefetchOnFocus()
  const router = useRouter()
  const [_, getLocalAmount] = useGetLocalAmount()
  const { t, ready } = useTranslation();
  const [files, setFiles] = useState(null);
  const [baseUrls, setUrl] = useState(null);
  const [formData, setFormData] = useState({
    ...props.selected,
    price: props.selected.price,
  });
  const [checked, setChecked] = useState(
    props.selected.hide ? props.selected.hide : false,
  );
  const [allowOptions, setAllowOptions] = useState({
    image: props.selected.allow_fan_image
      ? props.selected.allow_fan_image
      : false,
    link: props.selected.allow_fan_url ? props.selected.allow_fan_url : false,
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
        props.confirmSave({ saved: false, route: 'live-call' });
        return;
      }
      return;
    }
    setFormData({ ...formData, [state]: value });
    props.confirmSave({ saved: false, route: 'live-call' });
  };

  const valueChange = state => event => {
    setFormData({ ...formData, [state]: event.target.value });
    props.confirmSave({ saved: false, route: 'live-call' });
  };

  const handleCheck = () => value => {
    setChecked(value);
    props.confirmSave({ saved: false, route: 'live-call' });
  };

  const optionChange = state => value => {
    setAllowOptions({ ...allowOptions, [state]: value });
    props.confirmSave({ saved: false, route: 'live-call' });
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
        props.confirmSave({ saved: false, route: 'live-call' });
      }
    }
    if (fileRef?.current) {
      fileRef.current.value = '';
    }
  };

  const dropChange = state => value => {
    setFormData({ ...formData, [state]: value });
    props.confirmSave({ saved: false, route: 'live-call' });
  };

  const validateForm = () => {
    const validate = [
      !isEmpty(formData.title),
      !isEmpty(formData.description),
      formData.price && formData.price !== '',
      formData.quantity && formData.quantity !== '',
      !isEmpty(formData.meeting_duration),
    ].every(condition => condition);
    return validate;
  };

  const addNew = fileName => {
    const payload = {
      ...formData,
      delivery_method: deliveryMethods.videoCalls,
      allow_fan_image: false,
      meeting_duration: formData.meeting_duration.id,
      allow_fan_url: false,
      required_info: '',
    };
    payload.sample_image = fileName;
    const res = handleDigitalGoods('add', {
      ...payload,
      hide: false,
    });
    res
      .then(resp => {
        props.loaderAction(false);
        if (resp.fun_stuff) {
          if (!isEmpty(resp.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: resp.services },
            });
          }
          props.updateList(resp.fun_stuff, 'add');
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
          message:t('common.failedAdd'),
          variant: 'error',
        });
      });
  };

  const edit = (fileName, deleteImg) => {
    const payload = {
      ...formData,
      delivery_method: deliveryMethods.videoCalls,
      meeting_duration: formData.meeting_duration.id,
      required_info: '',
    };
    payload.sample_image = fileName;
    if (deleteImg) {
      payload.sample_image_delete = true;
    }
    const result = handleDigitalGoods('edit', {
      ...payload,
      hide: checked,
      allow_fan_image: false,
      id: props.selected.fun_stuff_id,
      allow_fan_url: false,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.fun_stuff) {
          if (!isEmpty(res.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: res.services },
            });
          }
          props.updateList(res.fun_stuff, 'edit');
          setUrl(null);
          setFiles(null);
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

  const removeImage = file => () => {
    if (!isEmpty(file)) {
      edit('', true);
    }
    setFiles(null);
    setUrl(null);
  };

  const uploadSample = (file, fn) => {
    const result = postReactionMedia(
      awsKeys.digitalSamples,
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
        uploadSample(files, addNew);
      } else {
        addNew('');
      }
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const updateChanges = () => {
    try {
      props.loaderAction(true);
      if (files) {
        uploadSample(files, edit);
      } else {
        edit('');
      }
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const deleteItem = () => {
    setConfirmDelete(true);
  };

  const confirmDelete = () => {
    try {
      props.loaderAction(true);
      const result = handleDigitalGoods('delete', {
        id: props.selected.fun_stuff_id,
      });
      result.then(res => {
        props.updateList(props.selected, 'delete');
        if (!isEmpty(res.services)) {
          props.updateUserData({
            userDetails: props.userDetails,
            celbDetails: { ...props.celbDetails, services: res.services },
          });
        }
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

  useEffect(() => {
    const deliveryMethod = props.deliveryTypes.find(
      type => type.delivery_type === props.selected.delivery_method,
    );
    let duration = {};
    if (deliveryMethod && deliveryMethod.delivery_type === 7) {
      duration = durationList(t).find(
        type => type.id === props.selected.meeting_duration,
      );
    }
    setFormData({
      ...props.selected,
      delivery_method: deliveryMethod,
      meeting_duration: duration,
    });
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
    className,
  }) => {
    return (
      <InputWrapper
        className={`input-wrapper ${className}`}
        key={`funstuff-${state}`}
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
        validateUrl="/manage/storefront/services/live-call"
        confirmSave={props.confirmSave}
      />
      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}

      <Layout className="content-wrapper" hasImage={isEmpty(baseUrls)}>
        <BackHeader backHandler={backHandler} label={t('services.liveCall.heading')} noHelp />
        <Heading className="inner-head">{t('services.liveCall.heading')}</Heading>
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="add-fun-scroll" />
          )}
        >
          <InputContainer className="input-container">
            <Dropdown
              rootClass="deliver-drop"
              selected={formData.meeting_duration || {}}
              options={durationList(t)}
              labelKey="title"
              valueKey="id"
              onChange={dropChange('meeting_duration')}
              placeHolder={t('services.liveCall.callDuration')}
              secondary
              classes={{ list: 'drop-list' }}
            />
            <CInput
              containerCls="input-wrapper"
              inputCls="CInput"
              label={t('services.liveCall.titleLabel')}
              activeLabel={t('common.title')}
              autoSize
              inputProps={{
                onChange: valueChange('title'),
                value: formData.title,
                maxLength: 100,
                rows: 1,
              }}
            ></CInput>

            {(baseUrls || props.selected.sample_image) && (
              <section className="image-wrapper">
                <span className="image-span">
                  <Close
                    className="close"
                    role="presentation"
                    onClick={removeImage(props.selected.sample_image)}
                  ></Close>
                  <img
                    src={baseUrls || props.selected.sample_image}
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
                {props.selected.sample_image
                  ? t('common.replaceSampleImage')
                  : t('common.uploadSampleImage')}
              </Dashed>
            )}

            <CInput
              containerCls="desc-wrapper"
              inputCls="CInput"
              label={t('services.liveCall.descriptionLabel')}
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

            {formData.delivery_method &&
              formData.delivery_method.delivery_type !== 7 && (
                <CInput
                  containerCls="input-wrapper"
                  inputCls="CInput"
                  label={t('services.liveCall.infoLabel', {
                    purchaser: props.entityData?.purchaser_plural_name
                  })}
                  autoSize
                  inputProps={{
                    onChange: valueChange('required_info'),
                    value: formData.required_info,
                    maxLength: 255,
                    rows: 1,
                  }}
                ></CInput>
              )}
            {formData.delivery_method &&
              formData.delivery_method.delivery_type !== 7 && (
                <div className="check-ul ">
                  <Description className="check-description">
                    {t('services.allowFans', {
                      purchaser: props.entityData?.purchaser_plural_name
                    })}
                  </Description>
                  <Checkbox
                    onChange={optionChange('image')}
                    checked={allowOptions.image}
                    label={t('common.photo')}
                  />
                  <Checkbox
                    onChange={optionChange('link')}
                    checked={allowOptions.link}
                    label={t('common.link')}
                  />
                </div>
              )}

            {getTextInput({
              state: 'price',
              value: `${formData.price ? `USD $` : ''}${
                formData.price ? numberToCommaFormatter(formData.price) : ''
              }`,
              error: '',
              errorMsg: '',
              errorState: '',
              nativeProps: { type: 'text' },
              label: t('services.funstuff.priceLabel'),
              activeLabel: t('common.price'),
            })}
            {getTextInput({
              state: 'quantity',
              value: formData.quantity,
              error: '',
              errorMsg: '',
              errorState: '',
              nativeProps: { type: 'text' },
              label: t("services.funstuff.quantityLabel"),
              activeLabel: t('services.funstuff.quantityActiveLabel'),
              className: 'qnty-input',
            })}

            <Description className="remaining">
              {!isEmpty(props.selected) && props.selected.sold > 0
                ? t('services.funstuff.currentlySold', { sold: props.selected.sold })
                : ''}
            </Description>

            {!isEmpty(props.selected) && (
              <Ul className="check-ul">
                <Li className="list-item-fun">
                  <Checkbox onChange={handleCheck()} checked={checked} />
                  <Description>
                    <p className="main-text">{t('services.hideItemProfile')}</p>
                    {
                      t('services.notVisible', {
                        purchaser: props.entityData?.purchaser_plural_name
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

            <FlexCenter className="add-item">
              {isEmpty(props.selected) ? (
                <Button
                  disabled={!validateForm()}
                  isDisabled={!validateForm()}
                  onClick={saveChanges}
                >
                  {t('common.addItem')}
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

FunItem.propTypes = {
  updateToast: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
};

export default FunItem;
