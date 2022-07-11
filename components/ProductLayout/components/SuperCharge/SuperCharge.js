import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toggleSignup, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';

import { Container, Title, MainBtn, BtnDiv, Desc } from './styled';

const SuperCharge = (props) => {
	const dispatch = useGeneral()[1];
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const isLoggedIn = !!userData;
	const { t } = useTranslation();
	return (
		<div>
			<div className="row">
				<Container isLoggedIn={isLoggedIn}>
					<Title>
						<p>{t('product.super_charge')}</p>
					</Title>
					{
						isLoggedIn &&
              <MainBtn
              	onClick={() => {
              		setSignupFlow(dispatch, { role: 'star' });
              		toggleSignup(dispatch, true);
              	}}
              >
              	<BtnDiv>{t('product.create_your_page', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</BtnDiv>
              </MainBtn>
					}
					<Desc>
						<p>
							{t('product.super_charge_desc', {storeNameSmall:entityData?.partnerData?.storeNameSmall, siteName:entityData?.partnerData?.siteName, purchaserPlural:entityData?.partnerData?.purchaserPlural})}
						</p>
					</Desc>
				</Container>
			</div>
		</div>
	);
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => ({
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
// })

export default SuperCharge;
