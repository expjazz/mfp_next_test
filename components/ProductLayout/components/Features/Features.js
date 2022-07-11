import Link from 'next/link';
import React from 'react';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useTranslation } from 'react-i18next';
import { toggleSignup, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';
// import { setSignupFlow } from 'store/shared/actions/setSignupFlow';
// import { toggleSignup } from 'store/shared/actions/toggleModals';
import {
	FeaturesContainer,
	Container,
	MainBtn,
	Title,
	Desc,
	PrimaryBtn,
} from './styled';
import { isVodacom } from 'customHooks/domUtils';

const Features = (props) => {
	const { t } = useTranslation();
	const dispatch = useGeneral()[1];
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const isLoggedIn = !!userData;
	return (
		<FeaturesContainer>
			<Container isLoggedIn={isLoggedIn}>
				<Title>
					<p>
						{t('product.your_page_includes', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}
						<br />
					</p>
				</Title>
				<Desc>
					<p></p>
					<div>{t('common.video_shoutouts')} • {t('common.direct_messages')} • {t('common.social_media_interactions')}</div>
					<div>{t('common.fun_Stuff')} • {t('common.live_video_interactions')} • {t('common.personalized_merch')}</div>
					<div>
						{t('common.commercial_requests')}
						<br />
					</div>
					<p></p>
				</Desc>
				<Link href={`/${entityData?.partnerData.talentsUrlPrefix}/product-detail`} passHref>

					<MainBtn href={`/${entityData?.partnerData.talentsUrlPrefix}/product-detail`} version="3" subtype="landingpage">
						<div>{t('common.more_information')}</div>
					</MainBtn>
				</Link>
				{
					!props.isLoggedIn && !isVodacom() && (
						<PrimaryBtn
            	onClick={() => {
            		setSignupFlow(dispatch, { role: 'star' });
            		toggleSignup(dispatch, true);
            	}}
						>
            	<div>{t('product.create_your_page', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</div>
						</PrimaryBtn>
					)}
			</Container>
		</FeaturesContainer>
	);
};

const mapStateToProps = state => ({
	isLoggedIn: state.session.isLoggedIn,
	entityData: state.entity.data,
});

const mapDispatchToProps = dispatch => ({
	setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
	toggleSignup: state => dispatch(toggleSignup(state)),
});

export default Features;
