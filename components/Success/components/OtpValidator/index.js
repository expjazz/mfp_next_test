import React, { useState, useEffect } from 'react';
// import GetPhoneNumber from 'components/GetPhoneNumber';
// import { connect } from 'react-redux';
// import { generateOtp, validateOtp } from 'services/otpGenerate';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import { Layout, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/styled';
import GetPhoneNumber from 'components/GetPhoneNumber';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { generateOtp, validateOtp } from 'src/services/myfanpark/otpGenerate';


const OtpValidator = ({
  notfSettings,
  onSuccess,
  t,
}) => {
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true })
  const [phoneError, setPhoneError] = useState('');
// a
  const generateOTP = () => {
    loaderAction(true);
    generateOtp(notfSettings.mobile_number, notfSettings.mobile_country_code)
      .then(resp => {
        if (resp.success) {
          setPhoneError('');
        }
        loaderAction(false);
      })
      .catch((error) => {
        loaderAction(false);
        if (error.response) {
          localUpdateToast({
            value: true,
            message: error.response.data.error.message,
            variant: 'error',
          });
        } else {
          localUpdateToast({
            value: true,
            message: t('common.commonApiError'),
            variant: 'error',
          });
        }
      });
  };

  const validateOTP = (number, countryCode) => otp => {
    loaderAction(true);
    validateOtp(number, countryCode, otp)
      .then(resp => {
        if (resp.success) {
          setPhoneError('');
          onSuccess();
        }
        loaderAction(false);
      })
      .catch(err => {
        setPhoneError(err.response.data.error.message)
        loaderAction(false);
      });
  };

  useEffect(() => {
    generateOTP();
  }, [])

  return (
    <Layout>
      <Wrapper className="success-wrp otp-validate">
        <GetPhoneNumber
          resendOtp={generateOTP}
          verifyOtp={validateOTP(
            notfSettings.mobile_number,
            notfSettings.mobile_country_code,
          )}
          last4={notfSettings.mobile_number.replace(/\d(?=\d{4})/g, '*')}
          switched
          otptitle={t('common.service.otptitle')}
          otp_sub_title={t('common.service.otp_sub_title')}
          otp_receive_code={t('common.service.otp_receive_code')}
          error={phoneError}
        />  
      </Wrapper>
    </Layout>
  )
}

// const mapDispatchToProps = dispatch => ({
//   loaderAction: value => {
//     dispatch(loaderAction(value));
//   },
//   localUpdateToast: toastObj => {
//     dispatch(localUpdateToast({ ...toastObj }));
//   },
// })

export default OtpValidator
