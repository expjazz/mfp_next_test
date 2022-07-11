import { isVodacom } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toggleSignup, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';
import {
	Container,
	Title,
	MinusList,
	Desc,
	MainBtn,
	LinkWrapper,
} from './styled';

const Minus = (props) => {
	const dispatch = useGeneral()[1];
	const signupFlow = payload => setSignupFlow(dispatch, payload);
	const togSignup = paylaod => toggleSignup(dispatch, paylaod);
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	if (isVodacom()) {
		return null;
	}
	return (
		<div>
			<LinkWrapper>
				<MainBtn
					onClick={() => {
						signupFlow({ role: 'star' });
						togSignup(true);
					}}
				>
					<div>{t('pricing_layout.create_your_store', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</div>
				</MainBtn>
			</LinkWrapper>
		</div>
	);
};

const mapStateToProps = state => ({
	isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
	setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
	toggleSignup: state => dispatch(toggleSignup(state)),
});

export default Minus;
