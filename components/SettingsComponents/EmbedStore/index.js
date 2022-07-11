/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/Checkbox';
import { withTheme } from '@emotion/react';
import { generalLoader, updateToast, useGeneral } from 'src/context/general'
import copy from 'copy-to-clipboard';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from 'components/TextInput';
import Dropdown from 'components/Dropdown';
import TextArea from 'components/TextArea';
import { colorCode as colorRegex } from 'src/constants/regex/colorRegex';
import { Heading, Description } from 'styles/TextStyled';
import { description, checkValues, fontList } from './constants';
import { generateCode, getProductList, generatePreviewUrl } from './utils';
import { Container } from '../styled';
import { Wrap, CheckWrapper, SectionWrap, ColCode, DialogStyled, PlanContent } from './styled';
import { handleExternal } from 'src/services/myfanpark/celebActions';
import { emailRegex } from 'src/constants/regex/emailRegex';
import PreviewES from './components/Preview'
const EmbedStore = props => {
  const { t } = useTranslation();
  const [checkList, setCheckList] = useState({});
  const [selectedFont, updateFont] = useState(fontList[0]);

  const [code, setCode] = useState({ script: '', html: '' });
  const [apiKey, setApiKey] = useState('');
  const [colorCode, setColorCode] = useState(props.theme.flatBlue);
  const [colorError, setColError] = useState('');
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [state, dispatch] = useGeneral()
  const [css, setCss] = useState('')
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const callApi = async type => {
    const prodArray = getProductList(checkList);
    loaderAction(true);
    try {
      const resp = await handleExternal(
        type === 'list'
          ? {}
          : {
              request_type: prodArray,
              font: selectedFont.value,
              color: colorCode,
              css,
            },
      );
      if (resp && resp.api_data && resp.api_data.api_key) {
        if (type !== 'list') {
          localUpdateToast({
            value: true,
            message: t('common.saved_successfull'),
            global: false,
            variant: 'success'
          })
        }
        setCode(generateCode(resp.api_data));
        setApiKey(resp.api_data.api_key);
        setColorCode(resp.api_data.color);
        setCss(resp.api_data.css || '')
        updateFont(
          fontList.find(font => font.label === resp.api_data.font) || {},
        );
        if (resp.api_data.products) {
          let checkObj = {};
          resp.api_data.products.forEach(prodItem => {
            const foundProd = checkValues.find(
              checkVal => checkVal.value.indexOf(prodItem.request_type) >= 0,
            );
            if (foundProd) {
              checkObj[foundProd.label] = true;
            }
          });
          setCheckList(checkObj);
        }
      }
    } catch (e) {
      localUpdateToast({
        value: true,
        message:
          type === 'list'
            ? t('common.failed_settings')
            : t('common.failed_update_settings'),
        variant: 'error',
        global: false,
      });
    }
    loaderAction(false);
  };

  const onCheckboxChange = checkData => value => {
    setCheckList({
      ...checkList,
      [checkData.label]: value,
    });
  };

  const onCopy = copyContent => () => {
    copy(copyContent);
    localUpdateToast({
      value: true,
      message: t('common.copied_clipboard'),
      variant: 'success',
      global: false,
    });
  };

  const onColorChange = event => {
    setColorCode(event.target.value);
    if (!colorRegex.test(event.target.value)) {
      setColError('Invalid web color code');
    } else {
      setColError('');
    }
  };

  const onEmailChange = event => {
    setEmail(event.target.value)
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Invalid email')
    } else {
      setEmailError('')
    }
  }

  const renderCodeSection = (textDesc, textContent) => {
    return (
      <SectionWrap>
        <Description>{textDesc}</Description>
        <TextArea
          autoSize
          inputProps={{
            className: 'code-area',
            placeholder: '',
            value: textContent,
            readOnly: true,
            onChange: () => {},
          }}
        />
        <FlexCenter className="copy-btn">
          <Button secondary onClick={onCopy(textContent)}>
            {t('common.copy_code')}
          </Button>
        </FlexCenter>
      </SectionWrap>
    );
  };

  useEffect(() => {
    callApi('list');
  }, []);
  const colors = [
    {label: "Red", value: 'red',},
    {label: 'Blue', value: 'blue'}
  ]

  const darkModeOptions = [
    {label: 'Dark Mode', value: 'darkMode',},
    {label: 'Light Mode', value: 'lightMode'
  }]

  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedDarkMode, setSelectedDarkMode] = useState(darkModeOptions[0])

  function sendEmail() {
    alert(`waiting for api call to send email to: ${email}`)
  }

  const [embedMenu, setEmbedMenu] = useState(false)

  function changeCss(e) {
    setCss(e.target.value)
  }

  const [preview, setPreview] = useState(false)
  return (
    <Container>
      <Wrap>
        <Heading>{props.webHead}</Heading>
        <Description className="bold-text">{description}</Description>
        <Description className="following bold-text">
          {t('common.show_products')}:
        </Description>
        <SectionWrap>
          {checkValues.map(checkData => {
            return (
              <CheckWrapper key={checkData.value}>
                <Checkbox
                  onChange={onCheckboxChange(checkData)}
                  checked={checkList[checkData.label]}
                  notLocal
                />
                <Description>{checkData.label}</Description>
              </CheckWrapper>
            );
          })}
        </SectionWrap>
        <SectionWrap className="drop-wrp">
          <Description className="bold-text">{t('common.select_font_color')}:</Description>
          <Dropdown
            rootClass="deliver-drop"
            selected={selectedFont}
            options={fontList}
            labelKey="label"
            valueKey="value"
            onChange={updateFont}
            placeHolder={t("common.select_font")}
            secondary
          />
        </SectionWrap>
        <SectionWrap isolate>
          <Input
            inputProps={{
              nativeProps: { maxLength: 7 },
              defaultProps: {
                value: colorCode,
                onChange: onColorChange,
                error: colorError,
              },
              labelObj: {
                label: colorError || t('common.color_web_font'),
              },

              mInputProps: {
                classes: { rest: { root: 'adornment-start' } },
                InputProps: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      classes={{ root: 'adornment-root' }}
                    >
                      <ColCode colorCode={colorCode} />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </SectionWrap>

        <SectionWrap>
          <Description className="bold-text">Add your personal Css:</Description>
          <TextArea
            className="textarea"
            autoSize
            inputProps={{
              onChange: changeCss,
              value: css,
              placeholder: 'Add Css',
            }}
          />
        </SectionWrap>

        {/* <SectionWrap className="drop-wrp">
          <Description className="bold-text">{t('common.select_dark_mode')}:</Description>
          <Dropdown
            rootClass="deliver-drop"
            selected={selectedDarkMode}
            options={darkModeOptions}
            labelKey="label"
            valueKey="value"
            onChange={setSelectedDarkMode}
            placeHolder={t("common.select_font")}
            secondary
          />
        </SectionWrap> */}

        {/* <SectionWrap className="drop-wrp">
          <Description className="bold-text">{t('common.dark_mode_alt')}:</Description>
          <Dropdown
            rootClass="deliver-drop"
            selected={selectedColor}
            options={colors}
            labelKey="label"
            valueKey="value"
            onChange={setSelectedColor}
            placeHolder={t("common.select_font")}
            secondary
          />
        </SectionWrap> */}

        <FlexCenter className="btns">
          {/* <Link
            target="_blank"
            href={generatePreviewUrl(apiKey, colorCode, selectedFont.label)}
          >
            <Button className="action-btn" secondary>
              {t('common.preview')}
            </Button>
          </Link> */}
          <Button
            className="action-btn"
            disabled={colorError}
            onClick={callApi}
          >
            {t('common.saveText')}
          </Button>
        </FlexCenter>

        {/* <Heading>{t('common.installation_instructions')}</Heading> */}

        <SectionWrap isolate>
          <Description className="bold-text">{t('common.embedded_email_ask')}:</Description>
          <Input
            inputProps={{
              defaultProps: {
                value: email,
                onChange: onEmailChange,
                error: emailError,
              },
              labelObj: {
                label: emailError || '',
              },


            }}
          />

          <div className="">


          <Button
            className="send-btn"
            disabled={emailError}
            onClick={sendEmail}
          >
            {t('common.send')}
          </Button>
          </div>
        </SectionWrap>

        <SectionWrap isolate>
          <Description className="bold-text">{t('common.embed_copy')}:</Description>

          <div className="">


          <Button
            className="send-btn"
            disabled={emailError}
            onClick={() => setEmbedMenu(true)}
          >
            {t('common.send')}
          </Button>
          </div>
        </SectionWrap>



        <SectionWrap isolate>

          <Description className="bold-text">

          <a
            href={'/manage/external'}
            target="_blank"
          >

              {"Preview"}
          </a>
          </Description>
        </SectionWrap>

      </Wrap>

      <PreviewES
        open={preview}
        setOpen={setPreview}
        code={code.content}
      />
      <DialogStyled
        open={embedMenu}
        onClose={() => setEmbedMenu(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
        <PlanContent>
          <div className="terms-modal confirm-modal">
              {/* <span className="text cus-text">{t('common.download_option')}</span> */}
              <div className="btn-confirm-wrap">
              {renderCodeSection(
                <span className="note-text">
                  {t('common.place_before_body')} (
                  <Link href="#">{t('common.click_instructions')}</Link>)
                </span>,
                code.script,
              )}
              {renderCodeSection(
                <span className="note-text">
                  {t('common.placement_note')}
                </span>,
                code.html,
              )}
              </div>
            </div>
        </PlanContent>
      </DialogStyled>
    </Container>
  );
};

EmbedStore.defaultProps = {
  webHead: '',
};

export default withTheme(EmbedStore);
