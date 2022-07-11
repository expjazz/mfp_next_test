import axios from 'axios';
import { isBrowser, isVodacom } from 'customHooks/domUtils';
import useFetchLoggedUser, { useLoginWithToken } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';
import { toggleLogin, toggleSignup, useGeneral } from 'src/context/general';
import { registerTempSuccess, setSignupFlow, useSession } from 'src/context/session';
import { axiosFetch } from 'src/services/fetch';
import { locStorage } from 'src/utils/localStorageUtils';
import AuthLayer from '.';
const testLogin = () => localStorage.setItem('data', JSON.stringify({'user':{'first_name':'Expedito','last_name':'Andrade','nick_name':null,'id':'Qe1630aJ','email':'expeditojazz+1234@gmail.com','authentication_token':'9e1271fd992b5a02d02eede828944a993ea5e712','status':1,'sign_up_source':1,'images':[{'id':'xe7nPwd7','image_url':'https://dxjnh2froe2ec.cloudfront.net/images/profile/FILE_1631646745ISISBDUD.jpeg','thumbnail_url':'https://dxjnh2froe2ec.cloudfront.net/images/profile/thumbnail_FILE_1631646745ISISBDUD.jpeg','photo':'FILE_1631646745ISISBDUD.jpeg','thumbnail':'thumbnail_FILE_1631646745ISISBDUD.jpeg','medium_thumbnail':null,'medium_thumbnail_url':null}],'profile_photo':'https://lh3.googleusercontent.com/a-/AOh14GhymL1Fqy6FA7fsYlD51ZL7XoUaF8oaBAsKnl3DeA=s96-c','avatar_photo':{'id':'xe7nPwd7','image_url':'https://dxjnh2froe2ec.cloudfront.net/images/profile/FILE_1631646745ISISBDUD.jpeg','thumbnail_url':'https://dxjnh2froe2ec.cloudfront.net/images/profile/thumbnail_FILE_1631646745ISISBDUD.jpeg','photo':'FILE_1631646745ISISBDUD.jpeg','thumbnail':'thumbnail_FILE_1631646745ISISBDUD.jpeg','medium_thumbnail':null,'medium_thumbnail_url':null},'show_nick_name':false,'completed_fan_unseen_count':420,'fresh_desk_jwt':'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZGV2X3VzZXIiLCJlbWFpbCI6ImRldmVtYWlsQGVtYWlsLmNvbSIsImV4cCI6MTY0NzAxOTk2OX0.5-WtGpZ74GbQ7aE0Ilax9v1cfFW4_oMxMemp9ubKdQw','getstream_token':'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAzMzQifQ.dsgPmQDh0Pn3PiNgamgiOCWGdCEvsByBTl-YklKgyjQ','role_details':{'id':'9avQYreG','role_code':'R1001','role_name':'Fan','is_complete':true},'celebrity':false,'partner_data':{'partner_entity_domain':'https://staging.ttwithme.com','entity_id':'STARSONA-US-1','name':'Starsona - US','region_id':'STARSONA-US','base_date_format':'MM/DD/YYYY'},'show_fan_home':true,'notification_settings':{'id':9126,'user':'Qe1630aJ','timezone':'America/Sao_Paulo','timezone_name':null,'celebrity_starsona_request':false,'celebrity_starsona_message':false,'celebrity_account_updates':false,'fan_account_updates':true,'fan_starsona_messages':true,'fan_starsona_videos':true,'fan_email_starsona_videos':false,'email_notification':true,'secondary_email':null,'mobile_country_code':'351','mobile_number':'933231398','mobile_notification':true,'mobile_verified':false,'verification_uuid':'ea99ffd0-6bdb-013a-6132-0ef9dc385247','is_viewed':true,'whatsapp_notification':false}}}));

function AuthLayerContainer(props) {
	// useEffect(() => {
	// 	testLogin();
	// }, []);
	const router = useRouter();
	useLoginWithToken();
	const queryClient = useQueryClient();
	const [_, dispatch] = useGeneral();
	// const [cookies] = useCookies()
	const { cookies } = props;
	const [session, sessionDispatch] = useSession();
	useEffect(() => {
		if (locStorage.getItem('data') && router.query?.logout) {
			locStorage.removeItem('data');
			queryClient.removeQueries(['loggedUser']);
			queryClient.setQueryData(['loggedUser'], undefined);
			router.replace('/');
			delete axiosFetch.defaults.headers.common.authorization;
			delete axios.defaults.headers.common.authorization;
		} else if (!locStorage.getItem('data') && router.query?.logout) {
			router.replace('/');
		}
	}, [router.query]);

	useEffect(() => {
		const signupData = cookies.get('signupDetails');
		const tempSignupDetails = cookies.get('loginDetails');
		if (
			signupData !== undefined &&
      session.signupDetails.completedSignup === undefined
		) {
			if (new Date(signupData.expiryDate) > new Date()) {
				setSignupFlow(sessionDispatch, {...signupData, completedSignup: false});
				if (tempSignupDetails) {
					registerTempSuccess(sessionDispatch, tempSignupDetails);
				}
				toggleSignup(dispatch, true);
			} else if (locStorage) {
				locStorage.removeItem('tempAuthToken');
			}
		}
	}, []);

	if (isBrowser() && locStorage.getItem('data') && router.query?.logout) {
		locStorage.removeItem('data');
		queryClient.removeQueries(['loggedUser']);
		queryClient.setQueryData(['loggedUser'], undefined);
		router.replace('/');
		delete axiosFetch.defaults.headers.common.authorization;
		delete axios.defaults.headers.common.authorization;
	}

	const { data: loggedUser } = useFetchLoggedUser();
	useEffect(() => {
		if (loggedUser?.user && loggedUser?.user?.celebrity_profile_not_complete) {
			const {
				first_name: firstName,
				last_name: lastName,
				email,
			} = loggedUser?.user;
			const tempUser = {
				firstName,
				lastName,
				email,
				phone_number: loggedUser?.user?.notification_settings?.mobile_number,
				country_code: loggedUser?.user?.notification_settings?.mobile_country_conde,
			};
			setSignupFlow(sessionDispatch, {...tempUser, completedSignup: false, currentStep: 2, incompleteCeleb: true});
			registerTempSuccess(sessionDispatch, tempUser);

			toggleSignup(dispatch, true);
		}
	}, [loggedUser?.user?.celebrity_profile_not_complete]);
	return props.children;
}

export default withCookies(AuthLayerContainer);
