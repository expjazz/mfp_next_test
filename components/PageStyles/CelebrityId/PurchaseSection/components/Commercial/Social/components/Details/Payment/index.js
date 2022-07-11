import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import { DetailWrapper } from '../../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const SocialCommPayment = ({ fanData, starData, social, ...props }) => {
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();

	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head name">
						{social.social_media} - {social.title}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(social.amount),
							false,
							false,
						)}
					</span>
				</li>
				<li className="detail bold">
					<span className="detail-head">{t('common.total')}</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(social.amount),
							false,
							false,
						)}
					</span>
				</li>
			</DetailWrapper>
			<Checkout
				fanData={fanData}
				title={`${social.social_media} - ${social.title}`}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						bookingPrice: social.amount,
					},
				}}
				returnUrl={`${window.location.origin}${window.location.pathname}`}
				bookingId={props.bookingId}
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
		</Wrapper>
	);
};

SocialCommPayment.propTypes = {
	social: PropTypes.object.isRequired,
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	optileCheckout: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

SocialCommPayment.defaultProps = {
	bookingId: '',
};

export default SocialCommPayment;
