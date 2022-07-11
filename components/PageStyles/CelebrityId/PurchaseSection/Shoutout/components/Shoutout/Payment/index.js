import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import Checkout from '';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { HeadingH2, LinkText, DescriptionP } from 'styles/TextStyled';
import { DetailWrapper, DetailWrap } from '../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const ShoutoutPayment = ({
	fanData,
	starData,
	hasDis,
	formData,
	promoDet,
	finalPrice,
	...props
}) => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const [showDet, toggDet] = useState(false);
	const starNM = useMemo(() => {
		return getShortName(
			starData.userData.nick_name,
			starData.userData.first_name,
		);
	}, []);
	const renderRequestDet = (head, value) => {
		return value ? (
			<span className="detail-item">
				{head} {value}
			</span>
		) : null;
	};

	const renderRelation = () => {
		if (
			formData.relationshipValue &&
      typeof formData.relationshipValue === 'object'
		) {
			return ` (${formData.relationshipValue.title})`;
		} else if (formData.relationshipValue) {
			return ` (${formData.relationshipValue})`;
		}
	};

	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head name">
						{t('common.vidShoutFrom', { starName: starNM })}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(starData.celbData.rate),
							false,
							false,
						)}
					</span>
					<DetailWrap show={showDet}>
						{renderRequestDet(t('common.occasion'), formData.occasion.label)}
						{renderRequestDet(
							t('common.date'),
							formData.date
								? moment(formData.date).format(entityData?.partnerData.base_date_format)
								: '',
						)}
						{renderRequestDet(t('common.for'), formData.hostName)}
						{formData.userName && renderRequestDet(
							t('common.from'),
							`${formData.userName}${renderRelation() ? renderRelation() : ''}`,
						)}
						{(formData.templateType === 7 || formData.templateType === 2) &&
              renderRequestDet(
              	`${t('common.honoring')}:`,
              	formData.specification,
              )}
						{formData.templateType === 5 &&
              renderRequestDet(
              	`${t('common.from_where')}:`,
              	formData.specification,
              )}
						{(formData.templateType === 4 || formData.templateType === 3) &&
              renderRequestDet(
              	`${t('common.for_what')}:`,
              	formData.specification,
              )}
						{formData.templateType === 6 &&
              renderRequestDet(
              	`${t('common.name_of_the_event')}:`,
              	formData.specification,
              )}
						{formData.importantInfo ? (
							<React.Fragment>
								<span className="detail-head name additional-head">
									{t('common.additional_info')}
								</span>
								<DescriptionP className='additional-info'>{formData.importantInfo}</DescriptionP>
							</React.Fragment>
						) : null}
					</DetailWrap>
					<LinkText className="details-cta" onClick={() => toggDet(!showDet)}>
						{showDet ? t('common.hideDetails') : t('common.showDetails')}
					</LinkText>
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
				title={t('common.vidShoutFrom', { starName: starNM })}
				promoDetails={hasDis ? {} : promoDet}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						bookingPrice: finalPrice,
					},
				}}
				// returnUrl={`${window.location.origin}${window.location.pathname}`}
				bookingId={props.bookingId}
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
		</Wrapper>
	);
};

ShoutoutPayment.propTypes = {
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	showOptile: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

ShoutoutPayment.defaultProps = {
	bookingId: '',
};

export default ShoutoutPayment;
