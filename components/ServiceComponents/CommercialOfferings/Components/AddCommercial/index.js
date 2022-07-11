/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
// import { handleCommercialOfferings } from 'services/';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import { awsKeys } from 'src/constants/index';
import { postReactionMedia } from 'src/services/postReaction';
import { FlexCenter, Close, Dashed } from 'styles/CommonStyled';
import BackHeader from 'components/BackHeader';
import { Heading, Description, LinkText } from 'styles/TextStyled';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import Button from 'components/SecondaryButton';
import Input from 'components/TextInput';
import CInput from 'components/CInput';
import Dropdown from 'components/Dropdown';
import { InputWrapper, InputContainer } from '../../../styled';
import { Layout, CharCount } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { readDataUrl } from 'customHooks/domUtils';
import { handleCommercialOfferings } from 'src/services';
import { useRouter } from 'next/router';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const AddCommercial = props => {
  useDisableRefetchOnFocus()
  const router = useRouter()
  const [_, getLocalAmount] = useGetLocalAmount()
  const currencyData = useCurrencyData()
  const { t, ready } = useTranslation();
  const [files, setFiles] = useState(null);
  const [baseUrls, setUrl] = useState(null);
  const [formData, setFormData] = useState({
    ...props.selected,
    price: props.selected.price || props.minPrice,
  });
  const [checked, setChecked] = useState({
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
        props.confirmSave({ saved: false, route: 'commercial-offer' });
        return;
      }
      return;
    }
    setFormData({ ...formData, [state]: value });
    props.confirmSave({ saved: false, route: 'commercial-offer' });
  };

  const valueChange = state => event => {
    setFormData({ ...formData, [state]: event.target.value });
    props.confirmSave({ saved: false, route: 'commercial-offer' });
  };

  const fileChange = async event => {
    const file = event.target.files;
    if (file && file[0].type.includes('image/')) {
      if (file[0].size > 10485760) {
        props.updateToast({
          value: true,
          message: t('common.fileSize', { size: '10Mb' }),
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
        props.confirmSave({ saved: false, route: 'commercial-offer' });
      }
    }
    if (fileRef && fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const validateForm = () => {
    const validate = [
      !isEmpty(formData.title),
      !isEmpty(formData.description),
    ].every(condition => condition);
    return validate;
  };

  const addNew = fileName => {
    const payload = { ...formData, price: formData.price || 0 };
    if (fileName) {
       // Checking for extra image uploaded by the user
      payload.sample_image = fileName;
    } else {
      delete payload.sample_image;
    }
    if (formData.sample_image) {
      payload.sample_image = formData.sample_image;
    }
    const res = handleCommercialOfferings('add', {
      ...payload,
      ...checked,
    });
    res
      .then(resp => {
        props.loaderAction(false);
        if (resp.commercial_offering) {
          if (!isEmpty(resp.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: resp.services },
            });
          }
          props.updateList(resp.commercial_offering, 'add');
          props.confirmSave({ saved: true, route: '' });
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
          message: t('common.failedAdd'),
          variant: 'error',
        });
      });
  };

  const edit = (fileName, deleteImg) => {
    const payload = { ...formData };
    payload.sample_image = fileName || '';
    if (deleteImg) {
      payload.sample_image_delete = true;
    }
    const result = handleCommercialOfferings('edit', {
      ...payload,
      ...checked,
      id: props.selected.commercial_offering_id,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.commercial_offering) {
          props.updateList(res.commercial_offering, 'edit');
          if (!isEmpty(res.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: { ...props.celbDetails, services: res.services },
            });
          }
          props.confirmSave({ saved: true, route: '' });
          setFiles(null);
          setUrl(null);
          props.updateToast({
            value: true,
            message: res.message,
            variant: 'success',
          });
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

  const uploadSample = (file, fn) => {
    const result = postReactionMedia(
      awsKeys.commercialImages,
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
        uploadSample(files, edit);
      } else {
        edit();
      }
    } catch (e) {
      props.loaderAction(false);
    }
  };

  const removeImage = file => () => {
    if (!isEmpty(file)) {
      edit('', true);
    }
    setFormData({...formData, sample_image})
    setFiles(null);
    setUrl(null);
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

  const optionsList = useMemo(() => {
    return [...props.commercialTemplates].map(item => ({
      label: item.title,
      key: item.id,
      value: item.title,
      title: item.title,
      image: item.sample_image_thumbnail ? item.sample_image_thumbnail : item.sample_image,
      description: item.description,
    }));
  }, [props.commercialTemplates.length]);

  const confirmDelete = () => {
    try {
      props.loaderAction(true);
      const result = handleCommercialOfferings('delete', {
        id: props.selected.commercial_offering_id,
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

  useEffect(() => {
    setFormData({
      ...props.selected,
      price: props.selected.price || props.minPrice
    });
  }, [props.selected.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDropdown = obj => {
    const currentChoice = props.commercialTemplates.find(
      row => row.id === obj.key,
    );
    const fileNameArr = currentChoice.sample_image.split('/');
    const fileName = fileNameArr[fileNameArr.length - 1];
    setFormData({
      ...formData,
      title: currentChoice.title,
      description: currentChoice.description,
      sample_image: fileName,
    });
    setUrl(currentChoice.sample_image);
    props.setTemplateState(true);
  };

  const onDropListRender = (list, remProps) => {
    return (
      <React.Fragment>
        {list.map((item, index) => {
          return (
            <React.Fragment key={item.value}>
              <remProps.Component
                tabIndex="0"
                className="dropdown-list-container"
                onClick={remProps.onClick(item)}
                onKeyUp={remProps.onKeyUp(item)}
                key={item.value}
              >
                <span>
                  <img src={optionsList[index].image} alt="" />
                </span>
                <div className="">
                  <p className="title">{item.label}</p>
                  <p className="description">
                    {optionsList[index].description}
                  </p>
                </div>
              </remProps.Component>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

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
        key={`commercial_offering-${state}`}
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
        {state === 'price' && currencyData?.abbr !== 'USD' && (
          <span className="convert-price has-margin">
            {t('common.approxCurrency', {
              name: currencyData?.abbr,
              symbol: currencyData?.symbol,
              amount: numberToDecimalWithFractionTwo(
                getLocalAmount(formData.price),
                false,
                false,
              ),
            })}
          </span>
        )}
        {error && <span className="label-input error-red">{errorMsg}</span>}
      </InputWrapper>
    );
  };

  return (
    ready && (
      <React.Fragment>
        <ConfirmRoute
          when={!props.saved?.saved}
          history={router}
          validateUrl="/manage/storefront/services/commercial/video-shoutout"
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
          className="content-wrapper"
          hasImage={!isEmpty(props.selected.sample_image)}
        >
          <BackHeader backHandler={backHandler} label="Commercial" noHelp />
          <Heading className="inner-head">
            {t('services.commercial.heading')}
          </Heading>

          {!props.templateState ? (
            <React.Fragment>
              <Dropdown
                options={optionsList}
                labelKey="label"
                // showList
                valueKey="key"
                placeHolder={t('services.commercial.offeringTemplate')}
                className="custom"
                listRender={onDropListRender}
                classes={{ scrollbar: 'scroll-wrap', list: 'drop-list' }}
                onChange={occasion => handleDropdown(occasion)}
                secondary
              />
              {getTextInput({
                state: 'price',
                value: `${formData.price ? `USD $` : ''}${
                  formData.price ? numberToCommaFormatter(formData.price) : ''
                }`,
                error: '',
                errorMsg: '',
                errorState: '',
                nativeProps: { type: 'text' },
                label: t('services.commercial.startingPriceTitle'),
                nativeProps: {
                  'data-cy': 'commercial-price'
                },
                activeLabel: t('min_price'),
                rootCls: 'pt-08',
              })}

              <Description className="desc-note">
                {t('services.commercial.clientDescription')}
              </Description>

              <LinkText
                className="custom-blue"
                onClick={() => props.setTemplateState(true)}
              >
                {t('services.commercial.customOffering')}
              </LinkText>
            </React.Fragment>
          ) : (
            <Scrollbars
              autoHide
              renderView={scrollProps => (
                <div {...scrollProps} id="add-commercial-scroll" />
              )}
            >
              <InputContainer className="input-container">
                <CInput
                  containerCls="input-wrapper"
                  inputCls="CInput"
                  label={t('services.commercial.addCommercial')}
                  activeLabel={t('common.title')}
                  autoSize
                  inputProps={{
                    onChange: valueChange('title'),
                    value: formData.title,
                    maxLength: 100,
                    rows: 1,
                  }}
                ></CInput>

                {(baseUrls ||
                  props.selected.sample_image ||
                  props.selected.sample_image_original) && (
                  <section className="image-wrapper">
                    <span className="image-span">
                      <Close
                        className="close"
                        role="presentation"
                        onClick={removeImage(props.selected.sample_image)}
                      ></Close>

                      <img
                        src={
                          baseUrls ||
                          props.selected.sample_image ||
                          props.selected.sample_image_original
                        }
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
                    {t('common.uploadSampleImage')}
                  </Dashed>
                )}
                <CInput
                  containerCls=""
                  inputCls="CInput"
                  label={t('services.commercial.describeFans')}
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
                    length:
                      255 -
                      (formData.description ? formData.description.length : 0),
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
                  label: t('services.commercial.startingPriceTitle'),
                  nativeProps: {
                  'data-cy': 'commercial-price'
                },
                  activeLabel: t('min_price'),
                })}

                <Description className="desc-note">
                  {t('services.commercial.clientDescription')}
                </Description>

                {confirm && (
                  <div className="terms-modal confirm-modal">
                    <span className="text cus-text">
                      {t('common.confirm_delete')}
                    </span>
                    <div className="btn-confirm-wrap">
                      <Button
                        onClick={closeConfirm}
                        secondary
                        className="btn-keep"
                      >
                        {t('common.keep_for_now')}
                      </Button>
                      <Button onClick={confirmDelete}>
                        {t('common.delete')}
                      </Button>
                    </div>
                  </div>
                )}
                <div className='bottom-btns'>
                  <FlexCenter>
                    {isEmpty(props.selected) ? (
                      <Button
                        disabled={!validateForm()}
                        isDisabled={!validateForm()}
                        onClick={saveChanges}
                      >
                        {t('common.create')}
                      </Button>
                    ) : (
                      <React.Fragment>
                        <Button
                          secondary
                          className="edit-item"
                          onClick={deleteItem}
                        >
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
                </div>
              </InputContainer>
            </Scrollbars>
          )}
        </Layout>
      </React.Fragment>
    )
  );
};

AddCommercial.propTypes = {
  updateToast: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setTemplateState: PropTypes.func.isRequired,
  templateState: PropTypes.bool.isRequired,
  commercialTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddCommercial;
