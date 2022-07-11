import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { getLocalAmount } from 'utils/currencyUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { HeadingH2 } from 'styles/TextStyled';
import { DetailWrapper } from '../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const QAPayment = ({
	fanData,
	starData,
	hasDis,
	formData,
	promoDet,
	finalPrice,
	...props
}) => {
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const starNM = useMemo(() => {
		return getShortName(
			starData.userData.nick_name,
			starData.userData.first_name,
		);
	}, []);
	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper className='payment-details'>
				<li className="detail">
					<span className="detail-head name">
						{t('common.qaFrom', { starName: starNM })}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(starData.celbData.rate),
							false,
							false,
						)}
					</span>
				</li>
				{starData.celbData.rate != finalPrice && (
					<li className="detail">
						<span className="detail-head">
							{t(hasDis ? 'common.discount' : 'common.promo_code_discount')}
						</span>
						<span className="detail-value">
              -{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(starData.celbData.rate - finalPrice),
								false,
								false,
							)}
						</span>
					</li>
				)}
				<li className="detail bold">
					<span className="detail-head">{t('common.total')}</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(finalPrice),
							false,
							false,
						)}
					</span>
				</li>
			</DetailWrapper>
			<Checkout
				fanData={fanData}
				title={t('common.qaFrom', { starName: starNM })}
				promoDetails={hasDis ? {} : promoDet}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						bookingPrice: finalPrice,
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

QAPayment.propTypes = {
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	showOptile: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

QAPayment.defaultProps = {
	bookingId: '',
};

export default QAPayment;
