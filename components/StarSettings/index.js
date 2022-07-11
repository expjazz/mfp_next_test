import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import InnerSidebar from 'components/InnerSidebar';
import Modal from 'components/Modal';
import MoboList from 'components/MoboList';
// import { generateOtp, validateOtp } from 'src/services/otpGenerate';
import {
  Layout,
  ContentWrapper,
  OtpWrap,
  MenuDesc,
  ModalContainer,
} from './styled';
import { getLinks } from './Constants/constants';
import { isEmpty } from 'src/utils/dataStructures';
import { generateOtp, validateOtp } from 'src/services/myfanpark/otpGenerate';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { changePassword } from 'src/services/myfanpark/loginActions';
import { useQueryClient } from 'react-query';
const AccountInfo =
  dynamic(() =>
    import(
      'components/SettingsComponents/AccountInfo'
    )
  )

const Password =
  dynamic(() =>
    import(
      'components/SettingsComponents/Password'
    ),
  )

const LangSelector =
  dynamic(() =>
    import(
      'components/SettingsComponents/LangSelector'
    ),
  )

const StarsonaURL =
  dynamic(() =>
    import(
      'components/SettingsComponents/StarsonaURL'
    ),
  )

const EmbedStore =
  dynamic(() =>
    import(
      'components/SettingsComponents/EmbedStore'
    ),
  )

const Payment =
  dynamic(() =>
    import('components/SettingsComponents/Payment'),
  )

const Notification =
  dynamic(() =>
    import(
      'components/SettingsComponents/Notification'
    ),
  )

const ReferralProgram =
  dynamic(() =>
    import(
      'components/SettingsComponents/ReferralProgram'
    ),
  )

const GetPhoneNumber =
  dynamic(() => import('components/GetPhoneNumber'))

const Settings = props => {
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const router = useRouter()
  const pathname = router.asPath
  const {
    stripeURL: stripeUrl,
    cardDetails: stripeCard,
    dashboardURL: dashboardUrl
   } = state?.stripeRegistration
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { data: userData } = useFetchLoggedUser()
  const { t } = useTranslation();
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const webView = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [phoneData, setPhoneData] = useState({
    number: '',
    countryCode: '',
    trigger: false,
    country: '',
    error: false,
  });
  const goBack = () => {
    if (isMobile && pathname === '/manage/settings') {
      router.push('/manage', undefined, { shallow: true })
    } else {
      router.back();
    }
  };

  const getNotifications = () => {
    const notifications = [
      {
        key: 'celebrity_starsona_message',
        value:
          userData?.user?.notification_settings.celebrity_starsona_message,
        mainText: t('common.service_notification.my_updates'),
        subText: t('common.service_notification.sub_text1'),
      },
      {
        key: 'celebrity_account_updates',
        value:
          userData?.user?.notification_settings.celebrity_account_updates,
        mainText: t('common.service_notification.account_updates'),
        subText: t('common.service_notification.sub_text2'),
      },
      {
        key: 'celebrity_starsona_request',
        value:
          userData?.user?.notification_settings.celebrity_starsona_request,
        mainText: t('common.service_notification.communications'),
        subText: t('common.service_notification.sub_text3'),
      },
    ];
    return notifications;
  };

  const handleCheck = (payload, timezone) => {
    props.updateNotification({
      ...payload,
      timezone: timezone.timezone,
      timezone_name: timezone.text,
    });
  };

  const handleAccountSave = userDetails => {
    props.updateUserDetails(userData?.user?.id, {
      celebrity_details: {},
      user_details: userDetails,
    });
  };

  const triggerOtp = () => {
    setPhoneData({ ...phoneData, trigger: false, error: '' });
  };

  const modalClose = () => {
    if (phoneData.trigger) {
      triggerOtp();
    } else {
      router.push('/manage/settings');
    }
  };

  useEffect(() => {
    if (pathname.includes('truzo_error')) {
      router.push('/manage/settings/payment');
      localUpdateToast({
        value: true,
        message: t('common.service.truzo_error'),
        variant: 'error',
      });
    }
  });

  const getComponent = component => {
    if (isModalView) {
      return (
        <Modal open onClose={modalClose}>
          <ModalContainer>
            {!phoneData.trigger && (
              <BackHeader
                backHandler={modalClose}
                closeHandler={modalClose}
                label={t('common.service.account_settings')}
                noHelp
              />
            )}
            {component}
          </ModalContainer>
        </Modal>
      );
    }
    return component;
  };

  const linkStatus = link => {
    switch (link.selectedName) {
      case 'Password':
        if (userData?.user?.has_password) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;

      case 'Increase-earnings':
        if (userData?.celebrity_details?.has_referer) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;

      case 'Banking':
        if (!isEmpty(stripeCard)) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;

      case 'Notification':
        if (userData?.user?.notification_settings.is_viewed) {
          const temp = { ...link };
          temp.completed = true;
          return temp;
        }
        break;
      default:
        return link;
    }
    return link;
  };

  const localGenerateOTP = (number, countryCode, country) => {
    loaderAction(true);
    generateOtp(number, countryCode)
      .then(resp => {
        if (resp.success) {
          setPhoneData({
            ...phoneData,
            number,
            countryCode,
            trigger: true,
            country,
            error: '',
          });
          loaderAction(false);
          return true
        }
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
        return false
      });
  };

  const localValidateOTP = (number, countryCode, country) => otp => {
    loaderAction(true);
    validateOtp(number, countryCode, otp, country)
      .then(resp => {
        if (resp.success) {
          setPhoneData({ ...phoneData, trigger: false, error: '' });
          props.userDetailsUpdateHandler({
            mobile_country_code: countryCode,
            mobile_number: number,
          });
          localUpdateToast({
            value: true,
            message: t('common.update_success'),
            variant: 'success',
          });
        }
        loaderAction(false);
      })
      .catch(err => {
        setPhoneData({ ...phoneData, error: err.response.data.error.message });
        loaderAction(false);
      });
  };

  const getAllLinks = () => {
    return getLinks({
      t,
      entityData: props.entityData,
      userDetails: userData?.user,
    }).map(link => {
      return linkStatus(link);
    });
  };

  const resendOtp = () => {
    generateOTP(phoneData.number, phoneData.countryCode);
  };

  const queryClient = useQueryClient()

  const localChangePassword = (data, callback = () => {}, toastGlobal = true) => {
    changePassword(
      data,
      callback,
      toastGlobal,
      loaderAction,
      userData,
      queryClient,
      localUpdateToast,
      t
    )
  }

  const passwordUpdate = passwordData => {
    localChangePassword(passwordData);
  };


  const getAccountScreen = () => {
    if (phoneData.trigger) {
      return (
        <OtpWrap>
          <BackHeader backHandler={triggerOtp} label="Account Info" noHelp />
          <ErrorHandler>
            <GetPhoneNumber
              resendOtp={resendOtp}
              verifyOtp={localValidateOTP(
                phoneData.number,
                phoneData.countryCode,
                phoneData.country,
              )}
              last4={phoneData.number.replace(/\d(?=\d{4})/g, '*')}
              switched
              otptitle={t('common.service.otptitle')}
              otp_sub_title={t('common.service.otp_sub_title')}
              otp_receive_code={t('common.service.otp_receive_code')}
              error={phoneData.error}
            />
          </ErrorHandler>
        </OtpWrap>
      );
    }
    return getComponent(
      <ErrorHandler>
        <AccountInfo
          {...props}
          generateOTP={localGenerateOTP}
          validateOTP={localValidateOTP}
          handleAccountSave={handleAccountSave}
          mobHead={t('common.service.accountInfo.heading')}
          webHead={t('common.service.accountInfo.heading')}
          allowPhone
          labels={{
            firstNameLbl: t('common.service.accountInfo.firstNameLbl'),
            lastNameLbl: t('common.service.accountInfo.lastNameLbl'),
            emailLbl: t('common.service.accountInfo.emailLbl'),
            emailHead: t('common.service.accountInfo.emailHead'),
            nameHead: t('common.service.accountInfo.nameHead'),
            phoneLabel: t('common.service.accountInfo.phoneLabel'),
            buttonLbl: t('common.save'),
            emailError: t('common.service.accountInfo.emailError'),
            phError: t('common.service.accountInfo.phError'),
            nmError: t('common.service.accountInfo.nmError'),
          }}
        />
      </ErrorHandler>,
    );
  };

  const redirect = useMemo(() => {
    if (webView && pathname === '/manage/settings')
      return true;
    return false;
  }, [webView, pathname]);

  useEffect(() =>{
    if (redirect) {
      router.push('/manage/settings/account-info', undefined, { shallow: true })
    }
  }, [redirect])

  const MenuWrap =
    webView || pathname === '/manage/settings'
      ? MenuDesc
      : React.Fragment;

  // if (redirect) return <Redirect to="/manage/settings/account-info" />;
  const getRoute = () => {
    switch(pathname) {
      case '/manage/settings/account-info':
        return (
          getComponent(getAccountScreen())
        )
      case '/manage/settings/password':
        return getComponent(
          <ErrorHandler>
            <Password
              {...props}
              changePassword={changePassword}
              passwordUpdate={passwordUpdate}
              mobHead={t('common.service.password.heading')}
              webHead={t('common.service.password.heading')}
              showPasswd
              labels={{
                password: t('common.service.password.password'),
                confirmPasswd: t('common.service.password.confirmPasswd'),
                hint: t('common.service.password.hint'),
                buttonLbl: t('common.save'),
              }}
            />
          </ErrorHandler>
        )
      case '/manage/settings/starsona-url':
        return getComponent(
          <ErrorHandler>
            <StarsonaURL
              {...props}
              handleSave={handleAccountSave}
              mobHead={t('common.service.starsonaURL.heading', {
                name: entityData?.partnerData?.partner_name,
              })}
              webHead={t('common.service.starsonaURL.heading', {
                name: entityData?.partnerData?.partner_name,
              })}
              note={t('common.service.starsonaURL.note')}
            />
          </ErrorHandler>
        )
      case '/manage/settings/payment':
        return getComponent(
          <ErrorHandler>
            <Payment
              {...props}
              stripeCard={stripeCard}
              stripeUrl={stripeUrl}
              dashboardURL={dashboardUrl}
              truzoData={props.truzoData}
              heading={t('common.service.payment.heading')}
              userDetails={userData?.user}
              postTruzo={props.postTruzo}
              labels={{
                btnLabel: t('common.service.payment.btnLabel'),
                truzoBtn:
                  userData?.user.truzo_auth_status === 'manual'
                    ? t('common.service.truzo_btn_manual')
                    : t('common.service.truzo_btn'),
                info: t('common.service.payment.info'),
              }}
            />
          </ErrorHandler>
        )
      case '/manage/settings/embed-store':
        return getComponent(
          <ErrorHandler>
            <EmbedStore
              {...props}
              handleSave={handleAccountSave}
              webHead={`Sell your fan experiences on your own website`}
            />
          </ErrorHandler>
        )
      case '/manage/settings/site-settings':
        return getComponent(
          <ErrorHandler>
            <LangSelector
              {...props}
              updateUser={props.updateUserDetails}
              heading={t('common.site-settings')}
            />
          </ErrorHandler>
        )
      case '/manage/settings/notification':
        return getComponent(
          <ErrorHandler>
            <Notification
              {...props}
              notifications={getNotifications()}
              handleCheck={handleCheck}
              updateNotificationViewed={props.updateNotificationViewed}
              is_viewed={
                userData?.user.notification_settings.is_viewed
              }
              mobHead={t('common.service.not_heading')}
              webHead={t('common.service.not_heading')}
              hasTimezone
              notiObj={userData?.user.notification_settings}
            />
          </ErrorHandler>
        )
      case '/manage/settings/referral':
        return getComponent(
          <ErrorHandler>
            <ReferralProgram
              {...props}
              mobHead={t('common.service.ref_heading')}
              webHead={t('common.service.ref_heading')}
            />
          </ErrorHandler>
        )
      default:
        return null
    }


  }
  return (
    <Layout
      showMenu={pathname === '/manage/settings'}
      hideBack={phoneData.trigger}
    >
      <BackHeader
        backHandler={goBack}
        label={
          pathname === '/manage/settings'
            ? t('common.menu')
            : t('common.service.account_settings')
        }
        heading={isMobile ? t('common.service.account_settings') : ''}
        headerCls="header-label"
        noHelp
      />
      <ContentWrapper>
        <MenuWrap>
          {!isMobile && (
            <React.Fragment>
              <Heading className="main-heading">
                {t('common.service.account_settings')}
              </Heading>
              <InnerSidebar links={getAllLinks()} normalTick></InnerSidebar>
            </React.Fragment>
          )}
          {isMobile && pathname === '/manage/settings' && (
            <MoboList
              links={getLinks({
                t,
                entityData: props.entityData,
                userDetails: userData?.user,
              })}
            />
          )}
        </MenuWrap>
        {getRoute()}
      </ContentWrapper>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  stripeCard: PropTypes.string,
  stripeUrl: PropTypes.string,
  userDetails: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  entityData: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  dashboardURL: PropTypes.string,
  celbDetails: PropTypes.object.isRequired,
  updateNotificationViewed: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  userDetailsUpdateHandler: PropTypes.func.isRequired,
  truzoData: PropTypes.object,
};
Settings.defaultProps = {
  truzoData: {},
  stripeCard: '',
  stripeUrl: '',
  dashboardURL: '',
};

export default Settings;

{/* <Switch>
          <Route
            path="/manage/settings/account-info"
            render={childProps => getComponent(getAccountScreen(childProps))}
          />
          <Route
            path="/manage/settings/password"
            render={childProps =>
              getComponent(
                <ErrorHandler>
                  <Password
                    {...childProps}
                    {...props}
                    passwordUpdate={passwordUpdate}
                    mobHead={t('common.service.password.heading')}
                    webHead={t('common.service.password.heading')}
                    showPasswd
                    labels={{
                      password: t('common.service.password.password'),
                      confirmPasswd: t('common.service.password.confirmPasswd'),
                      hint: t('common.service.password.hint'),
                      buttonLbl: t('common.save'),
                    }}
                  />
                </ErrorHandler>,
              )
            }
          />
          <Route
            path="/manage/settings/starsona-url"
            render={childProps =>
              getComponent(
                <ErrorHandler>
                  <StarsonaURL
                    {...childProps}
                    {...props}
                    handleSave={handleAccountSave}
                    mobHead={t('common.service.starsonaURL.heading', {
                      name: entityData?.partnerData?.partner_name,
                    })}
                    webHead={t('common.service.starsonaURL.heading', {
                      name: entityData?.partnerData?.partner_name,
                    })}
                    note={t('common.service.starsonaURL.note')}
                  />
                </ErrorHandler>,
              )
            }
          />
          {/* {
            <Route
              path="/manage/settings/embed-store"
              render={childProps =>
                getComponent(
                  <ErrorHandler>
                    <EmbedStore
                      {...childProps}
                      {...props}
                      handleSave={handleAccountSave}
                      webHead={`Add your ${entityData?.partnerData?.partner_name} on your website`}
                    />
                  </ErrorHandler>,
                )
              }
            />
          } */}
        //   {userData?.user?.stripe_payouts && (
        //     <Route
        //       path="/manage/settings/payment"
        //       render={childProps =>
        //         getComponent(
        //           <ErrorHandler>
        //             <Payment
        //               {...childProps}
        //               stripeCard={stripeCard}
        //               stripeUrl={stripeUrl}
        //               dashboardURL={dashboardURL}
        //               truzoData={props.truzoData}
        //               heading={t('common.service.payment.heading')}
        //               userDetails={props.userDetails}
        //               postTruzo={props.postTruzo}
        //               labels={{
        //                 btnLabel: t('common.service.payment.btnLabel'),
        //                 truzoBtn:
        //                   userData?.user?.truzo_auth_status === 'manual'
        //                     ? t('common.service.truzo_btn_manual')
        //                     : t('common.service.truzo_btn'),
        //                 info: t('common.service.payment.info'),
        //               }}
        //             />
        //           </ErrorHandler>,
        //         )
        //       }
        //     />
        //   )}

        //   <Route
        //     path="/manage/settings/site-settings"
        //     render={childProps =>
        //       getComponent(
        //         <ErrorHandler>
        //           <LangSelector
        //             {...childProps}
        //             heading={t('common.site-settings')}
        //           />
        //         </ErrorHandler>,
        //       )
        //     }
        //   />

        //   <Route
        //     path="/manage/settings/notification"
        //     render={childProps =>
        //       getComponent(
        //         <ErrorHandler>
        //           <Notification
        //             {...childProps}
        //             notifications={getNotifications()}
        //             handleCheck={handleCheck}
        //             updateNotificationViewed={props.updateNotificationViewed}
        //             is_viewed={
        //               userData?.user?.notification_settings.is_viewed
        //             }
        //             mobHead={t('common.service.not_heading')}
        //             webHead={t('common.service.not_heading')}
        //             hasTimezone
        //             notiObj={userData?.user?.notification_settings}
        //           />
        //         </ErrorHandler>,
        //       )
        //     }
        //   />
        //   <Route
        //     path="/manage/settings/referral"
        //     render={childProps =>
        //       getComponent(
        //         <ErrorHandler>
        //           <ReferralProgram
        //             {...childProps}
        //             mobHead={t('common.service.ref_heading')}
        //             webHead={t('common.service.ref_heading')}
        //           />
        //         </ErrorHandler>,
        //       )
        //     }
        //   />
        // </Switch> */}