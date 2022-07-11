import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { HeadingH2, LinkText } from 'styles/TextStyled';
import { DetailWrapper, DetailWrap } from '../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useRouter } from 'next/router';
import SeoHeader from 'components/SeoHeader';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const MessagePayment = ({
	fanData,
	starData,
	finalPrice,
	message,
	rate,
	promoDet,
	hasDis,
	...props
}) => {
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const [showDet, toggDet] = useState(false);
	const { data: entityData } = useGetPartner();
	const router = useRouter();
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
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head name">
						{t('common.dmWith', { starName: starNM })}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(getLocalAmount(rate), false, false)}
					</span>
					<DetailWrap show={showDet}>
						<span className="detail-item">
							{t('common.message')}: {message}
						</span>
					</DetailWrap>
					<LinkText className="details-cta" onClick={() => toggDet(!showDet)}>
						{showDet ? t('common.hideDetails') : t('common.showDetails')}
					</LinkText>
				</li>
				{rate != finalPrice && (
					<li className="detail">
						<span className="detail-head">
							{t(hasDis ? 'common.discount' : 'common.promo_code_discount')}
						</span>
						<span className="detail-value">
              -{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(rate - finalPrice),
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
				promoDetails={hasDis ? {} : promoDet}
				title={t('common.dmWith', { starName: starNM })}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						bookingPrice: finalPrice,
					},
				}}
				returnUrl={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
				bookingId={props.bookingId}
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
			<SeoHeader
				title={t('purchase_flow.direct_message.meta_title', {
					starNM,
					rate: finalPrice,
				})}
				shareImage={entityData?.partnerData.seo_image}
				description={t('purchase_flow.direct_message.meta_desc', {
					starNM,
				})}
				keywords={
					t('purchase_flow.direct_message.meta_keywords', {
						starNM,
						siteName: entityData?.partnerData.partner_name,
					})
				}
			/>
		</Wrapper>
	);
};

MessagePayment.propTypes = {
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	hasDis: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired,
	optileCheckout: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

MessagePayment.defaultProps = {
	bookingId: '',
};

export default MessagePayment;
