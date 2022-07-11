import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FlexCenter } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import { getRedirectURL, isVodacom } from 'customHooks/domUtils';
import ReceiptDisplay from '../../../ReceiptDisplay';
import { generateReceipt } from './util';
import {
	Layout,
	Link,
	Image,
	CustomDetailWrap,
	DetailWrapper,
	DetailHead,
	DetailDesc,
	UpDetailWrapper,
	ButtonLink,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Details = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const {
		fun_stuff_request_details: { fun_stuff: funDetails },
		fun_stuff_request_details: funStuff,
		celebrity,
	} = props.reqDetails;
	const handleZoomLink = () => {
		window.postVodapayMessage({name: 'webRedirect', url: getRedirectURL(funStuff.external_link)});
	};
	return (
		<Layout>
			<DetailWrapper>
				<DetailHead>{t('common.ordered_item')}:</DetailHead>
				{!props.starMode && <DetailDesc>{celebrity}</DetailDesc>}
				<DetailDesc className="capitalise">{funDetails.title}</DetailDesc>
				<DetailDesc>{funDetails.description}</DetailDesc>
				<DetailDesc>{funDetails.required_info}</DetailDesc>
			</DetailWrapper>
			{funStuff.description && (
				<CustomDetailWrap>
					<DetailHead>{t('common.request')}:</DetailHead>
					<DetailDesc>
						{funDetails.description ? funStuff.description : ''}
					</DetailDesc>
				</CustomDetailWrap>
			)}
			{funStuff.fan_url && (
				<CustomDetailWrap sameLine>
					<DetailHead>{t('common.link')}:</DetailHead>
					<DetailDesc>
						<Link href={getRedirectURL(funStuff.fan_url)} target="_blank">
							{funStuff.fan_url}
						</Link>
					</DetailDesc>
				</CustomDetailWrap>
			)}
			{funStuff.fan_image && (
				<CustomDetailWrap>
					<DetailHead>{t('common.photo_uploaded')}:</DetailHead>
					<DetailDesc>
						<Image src={funStuff.fan_image} alt="fan image" />
					</DetailDesc>
				</CustomDetailWrap>
			)}

			{funStuff.external_link && funStuff.delivery_method === 7 && (
				<>
					<UpDetailWrapper>
						<DetailHead>{t('common.external_link')}:</DetailHead>
						<DetailDesc>
							{/* <Link href={getRedirectURL(funStuff.external_link)} target="_blank" rel="noreferrer">
								{funStuff.external_link}
							</Link> */}
							{
								isVodacom() ? (<ButtonLink onClick={handleZoomLink} >
									{funStuff.external_link}
								</ButtonLink>) : (

									<Link href={getRedirectURL(funStuff.external_link)} target="_blank" rel="noreferrer">
										{funStuff.external_link}
									</Link>
								)
							}
						</DetailDesc>
					</UpDetailWrapper>
					{
						funStuff.celebrity_reply && (
							<CustomDetailWrap>
								<DetailHead>{t('common.comments_to_fan')}:</DetailHead>
								<DetailDesc>
									<Link >
										{funStuff.celebrity_reply}
									</Link>
								</DetailDesc>
							</CustomDetailWrap>
						)
					}
				</>
			)}
			<ReceiptDisplay
				detailClasses={{
					title: `detail-title ${
						props.reqDetails.fun_stuff_request_details.meeting_date
							? 'has_schedule'
							: ''
					}`,
				}}
				receiptArray={generateReceipt({...props.reqDetails, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[props.requestType]}
			/>
			{!props.starMode && props.requestType === 'open' && (
				<FlexCenter className="order-action">
					<LinkText onClick={props.cancelBooking}>
						{t('common.cancel_request')}
					</LinkText>
				</FlexCenter>
			)}
		</Layout>
	);
};

Details.propTypes = {
	reqDetails: PropTypes.object.isRequired,
	requestType: PropTypes.string,
	cancelBooking: PropTypes.func.isRequired,
	starMode: PropTypes.bool,
};
Details.defaultProps = {
	starMode: false,
	requestType: '',
};

export default Details;
