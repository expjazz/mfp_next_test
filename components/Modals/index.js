import React, { useEffect, useState } from 'react';
// import BookingCard from '../BookingCard';
// import PropTypes  from './components/ActionLoader';
import PropTypes from 'prop-types'
import { editModals, generalLoader, loginToSignup, setJustSignup, setVideoUploadedFlag, signupToLogin, toggleSignup, updateToast, useGeneral } from '../../src/context/general';
import dynamic from 'next/dynamic'
import { useQueryClient } from 'react-query';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
// import SignupFlow from 'components/signupFlow';
import { clearRegisterErrors, completedSignup, setSignupFlow, useSession } from 'src/context/session';
import { loginUser, registerUser, socialMediaLogin } from 'src/services/myfanpark/loginActions';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import { useTranslation } from 'next-i18next';
import { followCelebrity, updateProfilePhoto } from 'src/services/myfanpark/celebActions';
import ActionLoader from 'components/ActionLoader';
import { locStorage } from 'src/utils/localStorageUtils';
import { isBrowser } from 'customHooks/domUtils';

const BookingCard = dynamic(() => import('../BookingCard'), {
  loading: () => <ActionLoader />
})
const LoginFlow = dynamic(() => import('../LoginFlow'), {
  loading: () => <ActionLoader />
})
const SignupFlow = dynamic(() => import('../signupFlow'), {
  loading: () => <ActionLoader />
})

const UpdateBooking = dynamic(() => import('../UpdateBooking'), {
  loading: () => <ActionLoader />
})



const MfpBanner = dynamic(() => import('components/MfpBanner'), {
  loading: () => <ActionLoader />
})

const RegistrationCollector = dynamic(() => import('components/RegistrationCollector'), {
  ssr: false,
  loading: () => <ActionLoader />
})

// const LoginFlow = lazy(() =>
//   retry(() => import('./components/loginFlow')),
// );
// const QuickViewModal = lazy(() =>
//   retry(() => import('./components/QuickViewModal')),
// );
// const SignupFlow = lazy(() =>
//   retry(() => import('./components/signupFlow')),
// );
// const BookingCard = lazy(() =>
//   retry(() => import('./components/BookingCard')),
// );
// const UpdateBooking = lazy(() =>
//   retry(() => import('./components/UpdateBooking')),
// );
// const SupportModal = lazy(() =>
//   retry(() => import('./components/SupportModal')),
// );
// const RegistrationCollector = lazy(() =>
//   retry(() =>
//     import('components/RegistrationCollector'),
//   ),
// );

// const MfpBanner = lazy(() =>
//   retry(() => import('components/MfpBanner')),
// );

// const renderFallback = () => <ActionLoader />;
// const errorRender = () => '';

// const SuspenseWrapper = Suspense => (fallback = renderFallback) => {
//   return (
//     <ErrorHandler fallback={fallback} errorRender={errorRender}>
//       <Suspense />
//     </ErrorHandler>
//   );
// };

const Modals = () => {
  const [state, dispatch] = useGeneral()
  // const { data: partnerData } = useGetPartner()
  const [sessionState, sessionDispatch] = useSession()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {data: celebrityData} = useGetCelebrityData()
  const { data } = useGetPartner()
  const [userId, setUserId] = useState(null)

  const { data: fanData } = useFetchLoggedUser(userId, {
    enabled: !!userId
  })
  if (state.modals?.supportModal) {
    return null
  }  else if (state.modals?.loginModal.active) {
    // cancelUpdate, onSuccess, celebrityData, queryClient
    const localFollowCelebrity = (celebId, follow) => followCelebrity(celebId, follow, false, false, celebrityData, queryClient)
    const toggleLogin = active => editModals(dispatch, { payload: { active, options: {} }, key: 'loginModal' })
    const tempSocialMediaLogin = async (user, options, loader, callback) => {
      const res = await socialMediaLogin(user, options, loader, callback, (payload) => { updateToast(dispatch, payload) }, payload => generalLoader(dispatch, payload), queryClient)

      if (res) {
        setUserId(res.user.id)
      }
      queryClient.setQueryData(['loggedUser'], resp.data.data)
    }
    const outterLoginUser = (email, password, options) => {
      loginUser(email, password, options, setUserId, null, (payload) => { updateToast(dispatch, payload) }, payload => generalLoader(dispatch, payload), queryClient, dispatch, sessionDispatch)
    }

    return (

      <LoginFlow
        followCelebrity={localFollowCelebrity}
        partnerData={data?.partnerData}
        toggleLogin={toggleLogin}
        setUserId={setUserId}
        loginUser={outterLoginUser}
        toggleSignup={() => loginToSignup(dispatch)}
        socialMediaLogin={tempSocialMediaLogin}
        updateToast={payload => updateToast(dispatch, payload)}
        loginModalOptions={state.modals?.loginModal}
        options={state.modals?.loginModal.options}
        isLoggedIn={!!fanData}
        starRole={!!fanData?.celebrity_details}
        error={sessionState.generalData.incorrectError}
        errorCode={sessionState.generalData.errorCode}
        statusCode={sessionState.generalData.statusCode}
        commonError={sessionState.generalData.error.message}
        // redirectUrls={state.redirectReferrer}
        // socialMediaStore={state.socialMediaData}
        fanData={fanData}
        loginEmail={sessionState.generalData.loginEmail}
        loading={sessionState.generalData.loading}
        generalLoader={payload => generalLoader(dispatch, payload)}

      />

    )

  } else if (state.modals?.signUpModal) {
    const tempSocialMediaLogin = async (user, options, loader, callback) => {
      return new Promise(async (resolve, reject) => {

        const res = await socialMediaLogin(user, options, loader, callback, (payload) => { updateToast(dispatch, payload) }, payload => generalLoader(dispatch, payload), null, dispatch)
        // setUserId(res.user.id)
        resolve(res)
      }
      )
    }
    return (
      <SignupFlow
        partnerData={data?.partnerData}
        toggleSignup={(payload) => toggleSignup(dispatch, payload)}
        signupDetails={sessionState.signupDetails}
        clearRegisterErrors={clearRegisterErrors}
        setSignupFlow={value => setSignupFlow(sessionDispatch, value)}
        setVideoUploadedFlag={payload => setVideoUploadedFlag(dispatch, payload)}
        completedSignup={payload => completedSignup(sessionDispatch, payload)}
        toggleLogin={() => signupToLogin(dispatch)}
        registerUser={payload => registerUser([...payload, null, queryClient, sessionDispatch, payload => generalLoader(dispatch, payload), payload => updateToast(dispatch, payload), dispatch, sessionState?.generalData])}
        entityData={data?.partnerData}
        t={t}
        socialMediaLogin={tempSocialMediaLogin}
        setJustSignup={payload => setJustSignup(dispatch, payload)}
        updateProfilePhoto={updateProfilePhoto}
        updateToast={payload => updateToast(dispatch, payload)}
        currencyData={data?.currencyData}
        generalLoader={payload => generalLoader(dispatch, payload)}
        isLoggedIn={!!fanData}
        fanData={fanData}
        starRole={!!fanData?.celebrity_details}
        error={sessionState.generalData.incorrectError}
        errorCode={sessionState.generalData.errorCode}
        statusCode={sessionState.generalData.statusCode}
        commonError={sessionState.generalData.error.message}
        // redirectUrls={state.redirectReferrer}
        // socialMediaStore={state.socialMediaData}
        tempLoginDetails={sessionState.generalData.tempDetails}
        loginEmail={sessionState.generalData.loginEmail}
        loading={sessionState.generalData.loading}
      />
    )
  } else if (state.modals.bookingModal?.active) {
    return (
    <BookingCard
      isLoggedIn={!!fanData}
    />);
  } else if (state.modals?.updateBookingModal.active) {
      return (
        <UpdateBooking />
      )
  } else if (state.modals?.mfpBanner) {
    return <MfpBanner />
  } else if (state.modals?.regCollector) {
    return <RegistrationCollector />
  }
  return null;
};

export default Modals;
