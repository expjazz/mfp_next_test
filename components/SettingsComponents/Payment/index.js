import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import { Heading, Description } from 'styles/TextStyled';
import {
	Layout,
	Wrap,
	CloseBtn,
	CardLink,
	StyledDashed,
	TruzoContainer,
	TruzoFlex,
} from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { redirectTruzo } from 'src/utils/truzoUtils';
import { useRouter } from 'next/router';
import { postTruzoCode } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';
import { useGeneral } from 'src/context/general';
// import { deleteStripe } from '../../../store/shared/actions/stripeRegistration';
// import { redirectTruzo } from 'services/truzoRedirect/truzoActions';

const Payment = props => {
	const { data: userData } = useFetchLoggedUser();
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const dispatch = useGeneral()[1];
	const { data: entityData } = useGetPartner();
	const router = useRouter();
	const readableDomain = domain => !domain.includes('http') ? `https://${router.query.site}` : router.query.site;
	const redirectObj = {
		audience: process.env.NEXT_PUBLIC_TRUZO_AUDIENCE,
		app_key: process.env.NEXT_PUBLIC_TRUZO_APP_KEY,
		scope: 'openid profile',
		response_type: 'code',
		client_id: process.env.NEXT_PUBLIC_TRUZO_CLIENT_ID,
		redirect_url: `${readableDomain(router.query.site)}/truzo_callback&status_url=${readableDomain(router.query.site)}/truzo_error`
	};
	const getTruzo = data => {
		switch (data.truzo_auth_status) {
		case 'null':
			return (
				<a
					className="button card-button"
					href={redirectTruzo({
						...redirectObj,
						state: userData?.user?.id,
					})}
					rel="noopener noreferrer"
				>
					<Dashed className="d-btn">{props.labels.truzoBtn}</Dashed>
				</a>
			);
		case 'live':
			return (
				<StyledDashed className="d-btn">
					<CardLink
						className="button"
						href={redirectTruzo({
							...redirectObj,
							state: userData?.user?.id,
						})}
						target="_blank"
						rel="noopener noreferrer"
					>
						{`Truzo Account xxxx-${data.truzo_customer_id.slice(
							data.truzo_customer_id.length - 4,
						)}`}
					</CardLink>
					<CloseBtn
						onClick={() => {
							// props.deleteStripe();
							postTruzoCode(null, { truzo_auth_status: 'delete' }, dispatch, queryClient);
						}}
					/>
				</StyledDashed>
			);

		case 'manual':
			return (
				<StyledDashed className="d-btn">
					<CardLink
						className="button card-button"
						href={redirectTruzo({
							...redirectObj,
							state: userData?.user?.id,
						})}
						target="_blank"
						rel="noopener noreferrer"
					>
						{props.labels.truzoBtn}
					</CardLink>
					<CloseBtn
						onClick={() => {
							// props.deleteStripe();
							props.postTruzo(null, { truzo_auth_status: 'delete' });
						}}
					/>
				</StyledDashed>
			);

		default:
			return (
				<a
					className="button card-button"
					href={redirectTruzo({
						...redirectObj,
						state: userData?.user?.id,
					})}
					rel="noopener noreferrer"
				>
					<Dashed className="d-btn">{props.labels.truzoBtn}</Dashed>
				</a>
			);
		}
	};

	const handleStrypeOrTruzo = data => {
		if (data.payout_method !== 2) {
			return (
				<Description className="note-payment">{props.labels.info}</Description>
			);
		}
		if (data.truzo_auth_status === 'manual') {
			return (
				<Description className="note-payment">
					{t('common.service.payment.truzo-manual')}
				</Description>
			);
		}

		if (data.truzo_auth_status === 'live') {
			return (
				<Description className="note-payment">
					{t('common.service.payment.truzo-live')}
				</Description>
			);
		}

		return (
			<TruzoFlex>
				<Description>
					<strong>{t('common.service.payment.truzoTitle')}</strong>
					<p>
						{t('common.service.payment.truzoDescrip', {
							siteName: entityData?.partnerData?.siteName,
							talent: entityData?.partnerData?.talentSingleCap,
						})}
					</p>
				</Description>
				<div className="content">
					<Description>- {t('common.service.payment.truzoSub1')}</Description>
					<Description>- {t('common.service.payment.truzoSub2')}</Description>
					<Description>- {t('common.service.payment.truzoSub3')}</Description>
				</div>
			</TruzoFlex>
		);
	};

	return (
		<Layout className="set-wrap">
			<Wrap>
				<Heading className="inner-head">{props.heading}</Heading>
				{handleStrypeOrTruzo(props.userDetails)}
				{userData?.user?.payout_method !== 2 ? (
					<FlexCenter>
						{isEmpty(props.stripeCard) ? (
							<a
								className="button card-button"
								href={props.stripeUrl}
								rel="noopener noreferrer"
							>
								<Dashed className="d-btn">{props.labels.btnLabel}</Dashed>
							</a>
						) : (
							<StyledDashed className="d-btn">
								<CardLink
									className="button"
									href={props.dashboardURL}
									target="_blank"
									rel="noopener noreferrer"
								>
									{' '}
									{props.stripeCard}{' '}
								</CardLink>
								<CloseBtn
									onClick={() => {
										props.deleteStripe();
									}}
								/>
							</StyledDashed>
						)}
					</FlexCenter>
				) : (
					<TruzoContainer>{getTruzo(userData?.user)}</TruzoContainer>
				)}
			</Wrap>
		</Layout>
	);
};

Payment.propTypes = {
	stripeCard: PropTypes.string,
	stripeUrl: PropTypes.string,
	dashboardURL: PropTypes.string,
	heading: PropTypes.string,
	labels: PropTypes.object.isRequired,
	info: PropTypes.node,
	truzoData: PropTypes.object,
};

Payment.defaultProps = {
	stripeCard: '',
	stripeUrl: '',
	dashboardURL: '',
	heading: '',
	info: '',
	truzoData: {},
};

// const mapDispatchToProps = dispatch => ({
//   deleteStripe: () => dispatch(deleteStripe()),
// });

export default Payment;
