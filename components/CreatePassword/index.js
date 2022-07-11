import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { getShortName } from 'src/utils/dataToStringFormatter';
import RequestFlowPopup from 'components/RequestFlowPopup';
import ConfirmPassword from 'components/ConfirmPassword';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { changePassword } from 'src/services/myfanpark/loginActions';
import { useQueryClient } from 'react-query';
// import { changePassword } from 'store/shared/actions/changePassword';

const CreatePassword = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const router = useRouter()
  const [showCreate, setCreate] = useState(true);
  const {data: fanData} = useFetchLoggedUser()
  const queryClient = useQueryClient()
  const isLoggedIn = !!fanData
  const closePopup = () => {
    setCreate(false);
  };
  const onResetPassword = password => {
    changePassword(
      { new_password: password, login: 'true' },
      closePopup,
      true,
      payload => generalLoader(dispatch, payload),
      fanData,
      queryClient,
      payload => updateToast(dispatch, payload),
      t
      )
    // props.changePassword({ new_password: password, login: 'true' }, closePopup);
  };
  // const path = window.location ? window.location.pathname : '';
  const path = router.pathname
  if ((!isLoggedIn) && router.query.reset_id) {
    router.push(`/resetpassword?reset_id=${router.query.reset_id}`)
    return null;
  }
  return (
    <div>
      {showCreate &&
        !state.commonReducer.justSignup &&
        fanData?.user.has_password !==
          undefined &&
        !fanData?.user.has_password &&
        path !== '/resetpassword' &&
        !props.alertData.open && (
          <RequestFlowPopup
            dotsCount={0}
            closePopUp={closePopup}
            modalView
            smallPopup
          >
            <ConfirmPassword
              onResetPassword={onResetPassword}
              title1={t('common.createPassword.title', {
                userName: getShortName(
                  fanData?.user.nick_name,
                  fanData?.user.first_name
              )})}
              title2={t('common.createPassword.heading')}
              input_txt_1={t('common.password')}
              input_txt_2={t('common.password')}
              sub_title={t('common.subTitle')}
              button_txt={t('common.continue')}
              completeUserDetails
            />
          </RequestFlowPopup>
        )}
    </div>
  );
};

CreatePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  userDetails: PropTypes.object,
  alertData: PropTypes.object,
};

CreatePassword.defaultProps = {
  userDetails: {},
  alertData: {},
};

export default CreatePassword

// state => ({
//   justSignup: state.commonReducer.justSignup,
//   userDetails: state.userDetails,
//   starRole: state.session.starRole,
//   userDataLoaded: state.userDetails.userDataLoaded,
//   isLoggedIn: state.session.isLoggedIn,
//   alertData: state.commonReducer.alertData,
// }),
// dispatch => ({
//   changePassword: (data, callBack) =>
//     dispatch(changePassword(data, callBack)),
// }),