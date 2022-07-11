import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Input from 'components/TextInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';
import SecondaryButton from 'components/SecondaryButton';
import { Heading, Description } from 'styles/TextStyled';
import { Container } from '../styled';
import { FormContainer, Wrap } from './styled';
import { checkStarURLAvailability } from 'src/services/myfanpark/celebActions';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { capitalize } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const StarsonaURL = props => {
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { t } = useTranslation();
  const [starURL, setStarURL] = useState(userData?.user?.user_id);
  const [isAvailable, setAvailable] = useState(false);
  const [availInfo, setAvailInfo] = useState({
    type: 'success',
    message: '',
  });

  const updateStarURL = event => {
    if (
      !event.target.value.includes(' ') &&
      !event.target.value.includes('/') &&
      !event.target.value.includes('.') &&
      !event.target.value.includes(':') &&
      !event.target.value.includes('\\')
    ) {
      setAvailable(false);
      setAvailInfo({ type: 'success', message: '' });
      setStarURL(event.target.value.trim());
    }
  };

  const checkAvailability = () => {
    const regex = /^([A-Za-z0-9]+[\-]*[A-Za-z0-9]+)+$/;
    if (regex.test(starURL)) {
      loaderAction(true);
      checkStarURLAvailability(starURL)
        .then(resp => {
          loaderAction(false);
          if (resp.success && resp.data.url_availability) {
            setAvailable(true);
            setAvailInfo({ type: 'success', message: 'Available' });
          } else if (resp.success) {
            setAvailInfo({
              type: 'error',
              message: t('star_settings.url.name_unavailable'),
            });
          }
        })
        .catch(e => {
          loaderAction(false);
          if (
            e.response &&
            e.response.data &&
            e.response.data.error &&
            e.response.data.error.message
          ) {
            setAvailInfo({
              type: 'error',
              message: e.response.data.error.message,
            });
          }
        });
    } else {
      setAvailInfo({
        type: 'error',
        message: t('star_settings.url.incorrect_url'),
      });
    }
  };

  const copyLink = copyData => {
    copy(copyData);
    localUpdateToast({
      value: true,
      message: t('star_settings.url.url_copied', {
        store: capitalize(entityData?.partnerData?.partner_name),
      }),
      variant: 'success',
    });
  };

  const saveChanges = () => {
    props.handleSave({
      ...userData?.user,
      user_id: starURL,
    });
  };

  const handleDomain = () => {
    if (userData?.user?.partner_domain) {
      return userData?.user?.partner_domain.includes('https') ? userData?.user?.partner_domain : `https://${userData?.user?.partner_domain}`
    } else {
      return `${window.location.origin}`
    }
  }

  return (
    <Container className="set-wrap">
      <Wrap>
        <Heading className="inner-head">{props.webHead}</Heading>
        <Description>{props.note}</Description>
        <FormContainer autoComplete="off">
          <Input
            inputProps={{
              defaultProps: {
                value: starURL,
                onChange: updateStarURL,
                error: availInfo.type === 'error',
                success: availInfo.type === 'success' && availInfo.message,
              },
              labelObj: {
                label: 'Unique url',
                errorMsg: availInfo.message,
              },
              mInputProps: {
                classes: { rest: { root: 'adornment-start' } },
                InputProps: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      disableTypography
                      classes={{ root: 'adornment-root' }}
                    >
                      {handleDomain()}/
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      disableTypography
                      classes={{
                        root: 'adornment-root',
                        positionEnd: 'adornment-end',
                      }}
                    >
                      {availInfo.type === 'error' && (
                        <FontAwesomeIcon
                          className="adornicon error"
                          icon={faExclamationCircle}
                        />
                      )}
                      {availInfo.type === 'success' && availInfo.message && (
                        <FontAwesomeIcon
                          className="adornicon success"
                          icon={faCheckCircle}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </FormContainer>
        <section className="button-wrap">
          {!isAvailable && (
            <SecondaryButton
              disabled={starURL === userData?.user?.user_id || !starURL}
              isDisabled={starURL === userData?.user?.user_id || !starURL}
              secondary
              onClick={checkAvailability}
            >
              {t('star_settings.url.verify_availability')}
            </SecondaryButton>
          )}
          {isAvailable && (
            <SecondaryButton
              className="save-button"
              disabled={!isAvailable}
              isDisabled={!isAvailable}
              onClick={saveChanges}
            >
              {t('common.save')}
            </SecondaryButton>
          )}
          {!isAvailable && (
            <SecondaryButton
              className="copy-button"
              secondary
              onClick={() => copyLink(`${handleDomain()}/${starURL}`)}
            >
              {t('star_settings.url.copy_url', { store: entityData?.partnerData?.partner_name })}
            </SecondaryButton>
          )}
        </section>
      </Wrap>
    </Container>
  );
};

StarsonaURL.propTypes = {
  userDetails: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  webHead: PropTypes.string,
  note: PropTypes.string,
};
StarsonaURL.defaultProps = {
  webHead: '',
  note: '',
};

export default StarsonaURL;
