import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { CloseButton, FlexBoxSB } from '../../../styles/CommonStyled';
import Button from '../../../components/PrimaryButton';
import { Layout, Heading, FlexBox, FloatLabel } from './styled';
import { isBrowser, useMedia } from '../../../customHooks/domUtils';
import { TextInput } from '../../TextField';
import { validateEmail } from '../../../src/utils/dataformatter';
import StarDrawer from '../../StarDrawer';
import { useTranslation } from 'next-i18next';
import { sendFanCelebritySuggestion } from '../../../src/services/myfanpark';
import { editGeneralState, updateToast, useGeneral } from '../../../src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import Header from 'components/LegacyHeader'
import { useRouter } from 'next/router';
const starData = [
  {
    size: '60px',
    horizontal: '2%',
    vertical: '35px',
    rotation: '20deg',
    color: '#cee8f0',
  },
];

const AddStarCategory = props => {
  const { data: entityData } = useGetPartner()
  const fanCelebritySuggestion = () => {
  }
  const isWeb = useMedia('(min-width: 832px)');
  const [{ toastObj, commonReducer }, dispatch] = useGeneral()
  const router = useRouter()
  const { t } = useTranslation();
  const [type, setSearchType] = useState(props.searchTerm);
  const [email, setEmail] = useState('');
  const inputChange = ({ fn }) => event => {
    fn(event.target.value);
  };
  const onBackClick = () => {
    router.back();
  };

  const redirect = () => router.asPath.includes('search-update') ? router.back() : props.handleClose()

  const requestNotification = async () => {
    const bool = await sendFanCelebritySuggestion({email, starName: type});
    if (bool) {
      updateToast(dispatch, {
        value: true,
        message: t('common.talentSuggestSuccess'),
        variant: 'success',
        time: 6000,
        global: true,
      })
    } else {
      updateToast(dispatch, {
        value: true,
        message: 'Error',
        variant: 'error',
        time: 6000,
        global: true,
      })
    }
    redirect()

  };

  const getTextInput = ({
    placeholder,
    value,
    error,
    nativeProps,
    wrapperClass,
    fn,
    label,
  }) => {
    return (
      <section className={`fieldWrapper ${wrapperClass}`}>
        {
          <FloatLabel
            className="float-label"
            show={value !== '' || label === 'Email Address'}
          >
            {label}
          </FloatLabel>
        }
        <TextInput
          error={error}
          placeholder={placeholder}
          onChange={inputChange({ fn })}
          value={value}
          InputProps={{
            classes: { error: 'error-field', input: 'input-field' },
          }}
          nativeProps={nativeProps}
        />
      </section>
    );
  };

  return (
    <Layout>
      {!isWeb && <Header disableSearch showBack onBackClick={onBackClick} t={t} smallEntitySelect noEntity/>}

      <FlexBoxSB className="header-padding">
        <Heading>
          {t('common.searchSuggestion.heading', {
            siteName: entityData?.partnerData.partner_name,
          })}
        </Heading>
        {isWeb && <CloseButton onClick={props.handleClose} />}
      </FlexBoxSB>
      <FlexBox>
        {getTextInput({
          placeholder: t('common.searchSuggestion.placeholder1'),
          value: type,
          error: false,
          nativeProps: {},
          wrapperClass: '',
          fn: setSearchType,
          label: t('common.searchSuggestion.label1'),
        })}
        {getTextInput({
          placeholder: t('common.searchSuggestion.placeholder2'),
          value: email,
          error: false,
          nativeProps: {},
          wrapperClass: '',
          fn: setEmail,
          label: t('common.emailHead'),
        })}

        <Button
          className="search-add-btn"
          id="notify-me"
          onClick={requestNotification}
          disabled={validateEmail(email) || type === ''}
          isDisabled={validateEmail(email) || type === ''}
        >
          {t('common.searchSuggestion.notify')}
        </Button>
        <span className="note">
          {t('common.searchSuggestion.postDescription', {
            type: commonReducer.searchTerm,
            siteName: entityData?.partnerData.partner_name,
          })}
        </span>
        <span className="social-icons">
          <FacebookShareButton
            className="social-btn"
            title={`${t('common.searchSuggestion.shareText', {
              type,
              siteName: entityData?.partnerData.partner_name,
            })}`}
            url={isBrowser() ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL}
          >
            <FontAwesomeIcon className="icon-social" icon={faFacebookF} />
          </FacebookShareButton>

          <TwitterShareButton
            className="social-btn"
            title={`${t('common.searchSuggestion.shareText', {
              type,
              siteName: entityData?.partnerData.partner_name,
            })}\n`}
            url={isBrowser() ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL}
          >
            <FontAwesomeIcon
              className="icon-social iconTwitter"
              icon={faTwitter}
            />
          </TwitterShareButton>
        </span>
        <StarDrawer starData={starData} />
      </FlexBox>
    </Layout>
  );
};

AddStarCategory.propTypes = {
  handleClose: PropTypes.func,
  searchTerm: PropTypes.string,
  fanCelebritySuggestion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

AddStarCategory.defaultProps = {
  searchTerm: '',
  handleClose: () => {},
};

export default AddStarCategory