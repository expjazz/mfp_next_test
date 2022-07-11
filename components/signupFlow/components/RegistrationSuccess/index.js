import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import SecondaryButton from 'components/SecondaryButton';
import Input from 'components/TextInput';
import BackHeader from 'components/BackHeader';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';

import RegSuccessWrapper from './styled';
import { useGeneral } from 'src/context/general';
import { clearSignupFlow, updateLoginStatus, useSession } from 'src/context/session';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { locStorage } from 'src/utils/localStorageUtils';
import { messages, updateUserDetails } from 'src/services/myfanpark/celebActions';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const RegistrationSuccess = props => {
  const [state] = useGeneral()
  const currencyData = useCurrencyData()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const router = useRouter()
  const [sessionState, sessionDispatch] = useSession()
  const isBookingFlow = state.modals.requestFlow
  const tempLoginDetails = sessionState.generalData.tempDetails
  const { data: celebrityData } = useFetchLoggedUser(tempLoginDetails.id)
  const sessionDetails = sessionState.generalData.auth_token
  const { t, ready } = useTranslation();
  const [starPrice, setStarPrice] = useState(20);
  const queryClient = useQueryClient()
  // const { data: loggedUser } = useFetchLoggedUser()
  useEffect(() => {
    if (props.signupRole !== 'fan') {
      router.prefetch('/manage/storefront/services/personalized-videos')
      router.prefetch('/manage/settings/payment')
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'Success StarSignup' });
      }
      updateLoginStatus(sessionDispatch, { ...props.tempLoginDetails, celebrity: true });
      // props.fetchUserDetails(props.tempLoginDetails.id, null, true);
      clearSignupFlow(sessionDispatch);
      if (locStorage) {
        locStorage.removeItem('tempAuthToken');
      }
      if (props.cookies !== undefined) {
        const { cookies } = props;
        cookies.set('signupDetails', '', {
          path: '/',
          expires: new Date(Date.now() + 1000),
          sameSite: 'Strict',
        });
        cookies.set('loginDetails', '', {
          path: '/',
          expires: new Date(Date.now() + 1000),
          sameSite: 'Strict',
        });
      }
    } else {
      // props.fetchUserDetails(props.sessionDetails.id, null, false);
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'Success FanSignup' });
      }
    }
  }, []);

  const setPrice = () => {
    if (celebrityData?.user.user_id && starPrice) {
      updateUserDetails(
        celebrityData?.user.user_id,
        {
          celebrity_details: {
            rate: starPrice,
          },
          user_details: {},
        },
        (user) => {
          if (entityData.partnerData.allow_video_shoutout) {
            router.push('/manage/storefront/services/personalized-videos', undefined, { shallow: true });

          } else {
            router.push('/manage/settings/payment', undefined, { shallow: true })
          }
          // export const messages = (payload, callBack, loaderAction = () => {}, user = {}, queryClient = null, updateToast = () => {}) => {

          messages({
            announcement: false,
            question_answer: false,
            personalised_video: true,
          },
          null,
          props.generalLoader,
          celebrityData,
          queryClient,
          props.updateToast,
          t
          );
          props.updateToast({
            value: true,
            message: t('common.update_success'),
            variant: 'success',
            global: true,
          });
          props.closeSignupFlow();
        },
        true,
        false,
        props.updateToast,
        props.generalLoader,
        celebrityData,
        queryClient,
        t
      );
    } else if (starPrice) {
      props.updateToast({
        value: true,
        message: t('common.failed_update_settings'),
        variant: 'success',
        global: false,
      });
    }
  };

  const updateStarPrice = event => {
    if (event.target.value === '0') {
      return true;
    }
    const regex = new RegExp(`\\USD|\\s|\\$|,`, 'g');
    const value = event.target.value.replace(regex, '');
    if (/^\d*\.?\d*$/.test(value) && value < 9999999) setStarPrice(value);

    return '';
  };

  useEffect(() => {
    // setStarPrice(props.starRate === '0.00' ? 20 : props.starRate);
  }, [props.starRate]);

  return ready && (
    <RegSuccessWrapper>
      <BackHeader
        rootClass="success-header"
        closeHandler={props.closeSignupFlow}
        noHelp
      />
      <RegSuccessWrapper.ComponentWrapper>
        <RegSuccessWrapper.OptionWrapper>
          <RegSuccessWrapper.Type>
            <RegSuccessWrapper.Image
              className={`${props.signupRole === 'fan' ? 'success-fan' : ''}`}
              imageUrl={props.image_url}
            ></RegSuccessWrapper.Image>
            <RegSuccessWrapper.Label>{props.message}</RegSuccessWrapper.Label>
            {props.highlight_text ? (
              <RegSuccessWrapper.HighLight>
                {props.highlight_text}
              </RegSuccessWrapper.HighLight>
            ) : null}
            <RegSuccessWrapper.Description>
              {props.description}
            </RegSuccessWrapper.Description>
          </RegSuccessWrapper.Type>
        </RegSuccessWrapper.OptionWrapper>
        {props.signupRole === 'star' && (
          <RegSuccessWrapper.PriceSection>
            <RegSuccessWrapper.SectionHead>
              {t('common.signupFlow.priceFirstExp')}
            </RegSuccessWrapper.SectionHead>
            <RegSuccessWrapper.Description>
              {t('common.signupFlow.howMuchPrice')}
            </RegSuccessWrapper.Description>
            <Input
              inputProps={{
                nativeProps: {
                  inputmode: 'numeric',
                  pattern: '\\d*',
                },
                defaultProps: {
                  label: 'Price',
                  value: `${starPrice ? `USD $` : ''}${
                    starPrice
                      ? numberToCommaFormatter(starPrice, false, false)
                      : ''
                  }`,
                  classes: {
                    root: 'price-root',
                  },
                  onChange: updateStarPrice,
                },
              }}
            />
            {currencyData.abbr !== 'USD' && (
              <span className="convert-price">
                {
                  t('common.approxCurrency', {
                    name: currencyData.abbr,
                    symbol: getLocalSymbol(),
                    amount: numberToDecimalWithFractionTwo(
                      getLocalAmount(starPrice),
                      false,
                      false,
                    )
                  })
                }
              </span>
            )}
            <SecondaryButton className="price-submit" onClick={setPrice}>
              {t('common.submitButton')}
            </SecondaryButton>
          </RegSuccessWrapper.PriceSection>
        )}
        <RegSuccessWrapper.ButtonWrapper
          className={`${props.signupRole === 'fan' ? 'signup-fan' : ''}`}
        >
          {props.signupRole === 'star' && (
            <RegSuccessWrapper.SectionHead>
              {t('common.signupFlow.exploreSome')}
            </RegSuccessWrapper.SectionHead>
          )}
          <SecondaryButton
            className="success-button"
            secondary
            onClick={props.primaryButtonClick}
          >
            {props.isBookingFlow
              ? props.booking_primary_button
              : props.primary_button}
          </SecondaryButton>
          {!props.isBookingFlow && props.signupRole !== 'fan' ? (
            <SecondaryButton
              className="success-button"
              secondary={props.secondary}
              onClick={props.secondaryButtonClick}
            >
              {props.secondary_button}
            </SecondaryButton>
          ) : (
            ''
          )}
        </RegSuccessWrapper.ButtonWrapper>
      </RegSuccessWrapper.ComponentWrapper>
    </RegSuccessWrapper>
  );
};

RegistrationSuccess.propTypes = {
  description: PropTypes.string,
  closeSignupFlow: PropTypes.func,
  clearSignupFlow: PropTypes.func.isRequired,
  highlight_text: PropTypes.string,
  icon: PropTypes.object,
  image_url: PropTypes.string,
  skipvideo_description: PropTypes.string,
  message: PropTypes.string,
  nodevice_description: PropTypes.string,
  primary_button: PropTypes.string,
  booking_primary_button: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  secondary: PropTypes.bool,
  secondary_button: PropTypes.string,
  secondaryButtonClick: PropTypes.func,
  title: PropTypes.string,
  audioVideoSupport: PropTypes.bool,
  skipVideo: PropTypes.bool,
  isBookingFlow: PropTypes.bool,
};
RegistrationSuccess.defaultProps = {
  description: '',
  highlight_text: '',
  icon: {},
  image_url: '',
  nodevice_description: '',
  skipvideo_description: '',
  message: '',
  primary_button: '',
  booking_primary_button: '',
  primaryButtonClick: () => {},
  secondary: true,
  secondary_button: '',
  audioVideoSupport: false,
  skipVideo: false,
  secondaryButtonClick: () => {},
  title: '',
  isBookingFlow: false,
  closeSignupFlow: () => {},
};

// const mapStateToProps = state => ({
//   userId: state.userDetails.settings_userDetails.user_id,
//   starRate: state.userDetails.settings_celebrityDetails.rate,
//   currencyData: state.entity.currencyData,
//   entityData: state.entity.data,
//   tempLoginDetails: state.session.tempDetails,
//   sessionDetails: state.session.auth_token,
//   isBookingFlow: state.modals.requestFlow,
// });

// const mapDispatchToProps = dispatch => ({
//   updateLoginStatus: sessionData => dispatch(updateLoginStatus(sessionData)),
//   fetchUserDetails: (id, token, showLoader) =>
//     dispatch(fetchUserDetails(id, token, showLoader)),
//   clearSignupFlow: () => dispatch(clearSignupFlow()),
//   messages: (payload, callBack) => {
//     dispatch(messages(payload, callBack));
//   },
//   updateUserDetails: (id, obj, callback) =>
//     dispatch(updateUserDetails(id, obj, callback)),
//   completedSignup: value => dispatch(completedSignup(value)),
//   updateToast: obj => dispatch(updateToast(obj)),
// });

export default RegistrationSuccess