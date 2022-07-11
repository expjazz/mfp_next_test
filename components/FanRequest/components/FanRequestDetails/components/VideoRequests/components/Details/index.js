import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import dompurify from 'dompurify';
import { isEmpty } from 'src/utils/dataStructures';
import { getFor, checkFromName } from 'src/utils/dataformatter';
import ToolTip from 'components/ToolTip';
import Checkbox from 'components/Checkbox';
import { LinkText } from 'styles/TextStyled';
// import { makeVideoPrivate } from 'services/request';
import { FlexBoxSB } from 'styles/CommonStyled';
import ReceiptDisplay from '../../../ReceiptDisplay';
import { getOccasion, generateReceipt } from './utils';
import {
	Layout,
	CheckboxWrapper,
	DetailWrapper,
	DetailHead,
	DetailDesc,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { makeVideoPrivate } from 'src/services/myfanpark/bookingActions';

const Details = props => {
	const { reqDetails, requestType } = props;
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const {
		occasion,
		request_details: requestDetails = {},
		celebrity,
	} = reqDetails;
	const commercialDetails = reqDetails.commercial_details || {};

	const setIntitialCheckBox = () => {
		return !reqDetails.public_request;
	};

	const [checkBox, setCheckBox] = useState(setIntitialCheckBox());

	const onCheckBoxChange = async check => {
		const prevCheck = checkBox;
		setCheckBox(check);
		props.loaderAction(true);
		try {
			await makeVideoPrivate(reqDetails.booking_id, check)
				.then(() => {
					props.onPrivacyChange(!check);
					props.loaderAction(false);
				})
				.catch(() => {
					props.updateToast({
						value: true,
						message: t('common.something_wrong'),
						variant: 'error',
					});
				});
		} catch (e) {
			setCheckBox(prevCheck);
			props.loaderAction(false);
			props.updateToast({
				value: true,
				message: t('common.something_wrong'),
				variant: 'error',
			});
		}
	};

	const getRelation = () => {
		if (
			reqDetails.request_details.relationship &&
      typeof reqDetails.request_details.relationship === 'object'
		) {
			return `${reqDetails.request_details.relationship.title}`;
		} else if (reqDetails.request_details.relationship) {
			return `${reqDetails.request_details.relationship}`;
		}
	};

	const getScriptDetails = () => {
		const date = reqDetails.request_details.date ? reqDetails.request_details.date.split('+')[0] : null;
		return `<span class="script-details">
        <span>
        ${t('common.occasion')}
          ${!isEmpty(reqDetails.occasion) ? reqDetails.occasion : ''}
        </span>
        ${date ?
		`<span>
          ${t('common.date')} ${moment(date).format(
	props.entityData?.base_date_format,
)}
          </span>` : ''}
        ${
	getFor(reqDetails)
		? `<span>${t('common.for')} ${getFor(reqDetails)}</span>`
		: ''
}
        ${
	checkFromName(reqDetails)
		? `<span>
          ${t('common.from')} ${checkFromName(reqDetails)}
            ${getRelation() && `<span> (${getRelation()})</span>`}
          </span>`
		: ''
}
        ${
	reqDetails.request_details.for_what
		? `<span>
          ${t('common.for_what')}: ${reqDetails.request_details.for_what}
          </span>`
		: ''
}
        ${
	reqDetails.request_details.event_title
		? `<span>
          ${t('common.event')}: ${reqDetails.request_details.event_title}
          </span>`
		: ''
}
      </span>`;
	};

	const getScript = () => {
		if (requestDetails.templateType === 'other') {
			return requestDetails.booking_statement;
		}
		return getScriptDetails();
	};

	return (
		<Layout>
			<div className="content-data">
				<DetailWrapper>
					<DetailHead>{t('common.ordered_item')}:</DetailHead>
					<DetailDesc>{celebrity}</DetailDesc>
					<DetailDesc>
						{getOccasion(occasion)[reqDetails.request_type]}
					</DetailDesc>
					{commercialDetails.star_reply && (
						<DetailDesc>{commercialDetails.star_reply}</DetailDesc>
					)}
				</DetailWrapper>
				{requestDetails ? (
					<React.Fragment>
						{getScript() && (
							<DetailWrapper>
								<DetailHead>{t('common.request')}:</DetailHead>
								<DetailDesc
									dangerouslySetInnerHTML={{
										__html: dompurify.sanitize(getScript()),
									}}
								/>
							</DetailWrapper>
						)}
						{requestDetails.important_info ? (
							<DetailWrapper>
								<DetailHead>{t('common.additional_information')}:</DetailHead>
								<DetailDesc>
									{requestDetails.important_info || 'None'}
								</DetailDesc>
							</DetailWrapper>
						) : null}
					</React.Fragment>
				) : null}
				{commercialDetails.fan_request && (
					<DetailWrapper>
						<DetailHead>{t('common.request')}:</DetailHead>
						<DetailDesc>{commercialDetails.fan_request}</DetailDesc>
					</DetailWrapper>
				)}
				<ReceiptDisplay
					detailClasses={{
						title: 'detail-title',
					}}
					receiptArray={generateReceipt({...props.reqDetails, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})(false)[requestType]}
				/>
				{requestType !== 'cancelled' && (
					<CheckboxWrapper>
						<Checkbox checked={checkBox} onChange={onCheckBoxChange} />
						<span className="check-text ">
							<ToolTip
								title={t('my_videos.restrict_share', {
									siteName: props.entityData?.siteName,
								})}
							>
								<span>{t('my_videos.make_video_private')}</span>
							</ToolTip>
						</span>
					</CheckboxWrapper>
				)}
			</div>
			{(requestType === 'open' || requestType === 'commercial-open') && (
				<FlexBoxSB className="order-action">
					<LinkText onClick={props.cancelBooking}>
						{t('common.cancel_request')}
					</LinkText>
				</FlexBoxSB>
			)}
		</Layout>
	);
};

Details.defaultProps = {
	requestType: '',
};

Details.propTypes = {
	onPrivacyChange: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	cancelBooking: PropTypes.func.isRequired,
	reqDetails: PropTypes.object.isRequired,
	requestType: PropTypes.string,
};

export default Details;
