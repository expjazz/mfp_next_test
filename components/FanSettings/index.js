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
// import { generateOtp, validateOtp } from 'src/services/otpGenerate';
import {
	Layout,
	ContentWrapper,
	OtpWrap,
	MenuDesc,
	ModalContainer,
	RightContentWrap,
} from './styled';
import { Links } from './Constants.';
import { isEmpty } from 'src/utils/dataStructures';
import { generateOtp, validateOtp } from 'src/services/myfanpark/otpGenerate';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { changePassword } from 'src/services/myfanpark/loginActions';
import { useQueryClient } from 'react-query';
import ProgressBar from 'components/ProgressBar';
import ProfilePhoto from 'components/SettingsComponents/ProfilePhoto';
import { awsImageUpload } from 'src/services/awsImageUpload';
import { updateProfilePhoto } from 'src/services/myfanpark/celebActions';
import { showWhatsappOption } from 'src/constants';
import ConfirmSave from 'components/ConfirmSave';
import { axiosFetch } from 'src/services/fetch';
import { localHost } from 'src/utils/urlUtils';
import { isVodacom } from 'customHooks/domUtils';
import VodacomProfilePhoto from 'components/SettingsComponents/ProfilePhoto/VodacomProfilePhoto';
const AccountInfo =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/AccountInfo'
  	)
  );

const Password =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/Password'
  	),
  );

const LangSelector =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/LangSelector'
  	),
  );

const StarsonaURL =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/StarsonaURL'
  	),
  );

const EmbedStore =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/EmbedStore'
  	),
  );

const Payment =
  dynamic(() =>
  	import('components/SettingsComponents/Payment'),
  );

const Notification =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/Notification'
  	),
  );

const ReferralProgram =
  dynamic(() =>
  	import(
  		'components/SettingsComponents/ReferralProgram'
  	),
  {
  	ssr: false
  }
  );

const GetPhoneNumber =
  dynamic(() => import('components/GetPhoneNumber'));

const Settings = props => {
	const [state, dispatch] = useGeneral();
	const [resetNotifications, setResetNotifications] = useState(false);
	const { data: entityData } = useGetPartner();
	const [notfPayload, toggNotfPayload] = useState(null);
	const router = useRouter();
	const pathname = router.asPath;
	const {
		stripeURL: stripeUrl,
		cardDetails: stripeCard,
		dashboardURL: dashboardUrl
	} = state?.stripeRegistration;
	const loaderAction = payload => generalLoader(dispatch, payload);
	const localUpdateToast = payload => updateToast(dispatch, payload);
	const { data: userData } = useFetchLoggedUser();
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
		router.back();
	};

	const handleCheck = (payload, notfCheck=true) => {
		const oldNotfSett = props.userDetails.notification_settings;
		let notifyPayload = {...payload, is_viewed: oldNotfSett.is_viewed };
		const socialNotfKeys = getSocialNotifications().map(notf => notf.key);
		const someSocEnabled = socialNotfKeys.some(notf => payload[notf]);
		const shouldCheck = (socialNotfKeys.some(notf => oldNotfSett[notf]) || oldNotfSett.fan_starsona_videos) && notfCheck;
		if (someSocEnabled && !oldNotfSett.fan_starsona_videos) {
			notifyPayload = {
				...notifyPayload,
				fan_starsona_videos: true
			};
		} else if (!notifyPayload.fan_starsona_videos) {
			notifyPayload = {
				...notifyPayload,
				...getSocialNotifications().map(notf => ({...notf,value: false})).reduce((acc, curr) => ({
					...acc, [curr.key]: curr.value
				}), {})
			};
		}
		if (!notifyPayload.fan_starsona_videos && shouldCheck) {
			// if ((!someSocEnabled || !notifyPayload.fan_starsona_videos) && shouldCheck) {

			toggNotfPayload(notifyPayload);
		} else {
			props.updateNotification({
				...notifyPayload,
			});
		}
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
			router.push('/fan-manage/settings');
		}
	};

	useEffect(() => {
		if (pathname.includes('truzo_error')) {
			router.push('/fan-manage/settings/payment');
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
		case 'profilePhoto':
			if (
				props.userDetails.avatar_photo &&
          props.userDetails.avatar_photo.image_url
			) {
				const temp = { ...link };
				temp.completed = true;
				return temp;
			}
			break;

		case 'Payment':
			if (!isEmpty(props.stripeCard)) {
				const temp = { ...link };
				temp.completed = true;
				return temp;
			}
			break;
		case 'Notification':
			if (props.userDetails.notification_settings.is_viewed) {
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

	const generateOTP = (number, countryCode, country) => {
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

	const validateOTP = (number, countryCode, country) => otp => {
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

	const getLinks = () => {
		return Links(
			t,
			props.entityData,
			props.userDetails,
			props.asRep,
		).map(link => {
			return linkStatus(link);
		});
	};

	const resendOtp = () => {
		generateOTP(phoneData.number, phoneData.countryCode);
	};

	const queryClient = useQueryClient();

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
		);
	};

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
							verifyOtp={validateOTP(
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
					generateOTP={generateOTP}
					validateOTP={validateOTP}
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
		if (webView && pathname === '/fan-manage/settings')
			return true;
		return false;
	}, [webView, pathname]);

	const MenuWrap =
    webView || pathname === '/fan-manage/settings'
    	? MenuDesc
    	: React.Fragment;

	const localUpdateProfilePhoto = image => {
		loaderAction(true);
		// alert(JSON.stringify(image));
		// alert(JSON.stringify(image.croppedFile));
		awsImageUpload(image.croppedFile, 'jpeg')
			.then(resp => {
				const fileName = {
					images: [resp],
					avatar_photo: resp,
					featured_image: '',
				};
				loaderAction(false);
				updateProfilePhoto(fileName, true, true, dispatch, queryClient, t);
			})
			.catch((e) => {
				loaderAction(false);
				updateToast(dispatch, {
					value: true,
					message: t('fan_settings.photoUploadError'),
					variant: 'error',
				});
			});
	};
	// if (redirect) return <Redirect to="/fan-manage/settings/account-info" />;
	useEffect(() => {
		if (redirect) {
			router.push('/fan-manage/settings/profile-photo', undefined, { shallow: true });
		}
	}, [redirect]);
	const getNotifications = () => {
		const notifications = [
			{
				key: 'fan_starsona_messages',
				value: props.userDetails.notification_settings.fan_starsona_messages,
				mainText: t('fan_settings.notifications.messageMainText', {siteName: props.entityData?.siteName}),
				subText: t('fan_settings.notifications.messageSubText'),
			},
			{
				key: 'fan_account_updates',
				value: props.userDetails.notification_settings.fan_account_updates,
				mainText: t('fan_settings.notifications.updatesMainText'),
				subText: t('fan_settings.notifications.updatesSubText')
			},
			{
				key: 'fan_starsona_videos',
				value: props.userDetails.notification_settings.fan_starsona_videos,
				mainText: t('fan_settings.notifications.videosMainText', {siteName: props.entityData?.siteName}),
				subText: t('fan_settings.notifications.videoSubText'),
			},
		];
		return notifications;
	};

	const getSocialNotifications = () => {
		return ([
			{
				key: 'email_notification',
				value: props.userDetails.notification_settings.email_notification,
				mainText: t('common.emailLbl'),
			},
			{
				key: 'mobile_notification',
				value: props.userDetails.notification_settings.mobile_notification,
				mainText: t('common.sms/text'),
			},
			...showWhatsappOption ? [{
				key: 'whatsapp_notification',
				value: props.userDetails.notification_settings.whatsapp_notification,
				mainText: t('common.whatsapp'),
			}] : [],
		]);
	};
	const getRoute = () => {
		let imageTest = true;
		switch(pathname) {
		case '/fan-manage/settings/profile-photo':
			return getComponent(
				!imageTest && isVodacom() ? (
					<VodacomProfilePhoto
						{...props}
						updateProfilePhoto={localUpdateProfilePhoto}
						mobHead={t('fan_settings.photo.mobHead')}
						webHead={t('fan_settings.photo.webHead')}
						profImg={
							props.userDetails.avatar_photo &&
              props.userDetails.avatar_photo.image_url
						}
					/>
				) : (

					<ProfilePhoto
						{...props}
						updateProfilePhoto={localUpdateProfilePhoto}
						mobHead={t('fan_settings.photo.mobHead')}
						webHead={t('fan_settings.photo.webHead')}
						profImg={
							props.userDetails.avatar_photo &&
              props.userDetails.avatar_photo.image_url
						}
					/>
				)
			);
		case '/fan-manage/settings/account-info':
			return (
				getComponent(getAccountScreen())
			);
		case '/fan-manage/settings/password':
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
			);
		case '/fan-manage/settings/starsona-url':
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
			);
		case '/fan-manage/settings/payment':
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
			);
		case '/fan-manage/settings/site-settings':
			return getComponent(
				<ErrorHandler>
					<LangSelector
						{...props}
						updateUser={props.updateUserDetails}
						heading={t('common.site-settings')}
					/>
				</ErrorHandler>
			);
		case '/fan-manage/settings/notification':
			return getComponent(
				<ErrorHandler>
					<Notification
						{...props}
						notifications={getNotifications()}
						socialNotifications={getSocialNotifications()}
						notfPayload={notfPayload}
						handleCheck={handleCheck}
						updateNotificationViewed={props.updateNotificationViewed}
						resetNotifications={resetNotifications}
						setResetNotifications={setResetNotifications}
						is_viewed={
							userData?.user.notification_settings.is_viewed
						}
						mobHead={t('common.service.not_heading')}
						webHead={t('common.service.not_heading')}
						// notiObj={userData?.user.notification_settings}
					/>
				</ErrorHandler>
			);
		case '/fan-manage/settings/referral':
			return getComponent(
				<ErrorHandler>
					<ReferralProgram
						{...props}
						mobHead={t('common.service.ref_heading')}
						webHead={t('common.service.ref_heading')}
					/>
				</ErrorHandler>
			);
		default:
			return null;
		}


	};

	const getCompletedCount = () => {
		let completed = 0;
		const linkLength = getLinks().length;
		getLinks().forEach(link => {
			if (link.completed) {
				completed += 1;
			}
		});
		return Math.floor((completed/linkLength)*100);
	};

	return (
		<Layout
			showMenu={pathname === '/fan-manage/settings'}
		>
			<ConfirmSave
				open={notfPayload}
				message={t('fan_settings.notifications.confirmNotification')}
				cancelBtnText={t('common.turnOff')}
				confirmBtntext={t('common.keepOn')}
				handleConfirm={() => { setResetNotifications(true); toggNotfPayload(null); }}
				closeModal={() => {
					toggNotfPayload(null);
					handleCheck(notfPayload, false);
				}}
			/>
			<BackHeader
				backHandler={goBack}
				label={
					pathname === '/fan-manage/settings'
						? t('common.menu')
						: t('common.service.account_settings')
				}
				heading={isMobile ? t('common.service.account_settings') : ''}
				headerCls="header-label"
				noHelp
			/>
			<ContentWrapper
				root={pathname === '/fan-manage/settings'}
			>
				{pathname === '/fan-manage/settings' && (
					<section className="progress-mob">
						<ProgressBar percentage={getCompletedCount()}></ProgressBar>
					</section>
				)}
				<React.Fragment>
					<InnerSidebar links={getLinks()} arrow normalTick></InnerSidebar>
					<RightContentWrap>
						{pathname === '/fan-manage/settings' ||
          (webView && (
          	<React.Fragment>
          		<p className="note-progress">
          			{t('fan_settings.complete', {siteName: props.entityData?.siteName})}:
          		</p>
          		<section className="progress-web">
          			<ProgressBar percentage={getCompletedCount()}></ProgressBar>
          		</section>
          	</React.Fragment>
          ))}
						{getRoute()}
					</RightContentWrap>
				</React.Fragment>

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

