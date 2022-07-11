import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
// import { accountStatus } from 'constants/requestTypes/accountStatus';
import { FlexCenter } from 'styles/CommonStyled';
import Loader from 'components/Loader';
import Button from 'components/SecondaryButton';
import PromoDisplay from 'components/PromoDisplay';
import LangSelector from 'components/LangSelector';
import { getShortName } from 'src/utils/dataToStringFormatter';
import TextArea from 'components/TextArea';
import { Heading } from 'styles/TextStyled';
import { RateBold } from '../../styled';
import MessageStyled from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { isEmpty } from 'src/utils/dataStructures';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { useGetPartner } from 'customHooks/reactQueryHooks';
const totalCharCount = 500;

const Message = ({
	starName,
	haveDirectMessage,
	starPrice,
	celebId,
	...props
}) => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const scrollbarRef = useRef(null);

	const onContinue = () => {
		props.submitClick();
	};

	return (
		<MessageStyled className="message-container message-pay-layout">
			<Scrollbars
				autoHide
				ref={scrollbarRef}
				renderView={scrollProps => (
					<div {...scrollProps} id="category-list-scroll" />
				)}
			>
				<React.Fragment>
					{!isEmpty(props.starDetails.celebDetails) && (
						<React.Fragment>
							<Heading className="con-head">
								{t('common.continueConversation')}
							</Heading>
							<RateBold>
								{getLocalSymbol()}
								{numberToDecimalWithFractionTwo(
									getLocalAmount(starPrice),
									false,
									false,
								)}
							</RateBold>

							{props.starDetails.userDetails.talent_status ===
                accountStatus.live && (
								<React.Fragment>
									<div className="msg-contnet-wrp">
										<TextArea
											autoSize
											inputProps={{
												placeholder: t('common.dm.additionalInfo', {
													talent: entityData?.partnerData?.talentSingle,
												}),
												value: props.message,
												onChange: props.messageChange,
												maxLength: totalCharCount,
												className: 'msgTxtArea',
											}}
										></TextArea>
										<MessageStyled.CharCount>
											{t('common.remCharacters', { count: props.charCount })}
										</MessageStyled.CharCount>
									</div>
									<LangSelector
										language={props.lang}
										starName={props.bookingData.celebrity}
										starDefaultLang={props.starDetails.celebDetails.defaultLang}
										langList={props.starDetails.celebDetails.languages}
										onSelectLang={props.setLang}
									/>
									<PromoDisplay
										rate={props.starDetails.rate}
										promoObj={props.promoCode}
										celebId={props.starDetails.userDetails.id}
										updatePromoCode={props.setPromoCode}
									/>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</React.Fragment>
				{isEmpty(props.starDetails.celebDetails) ? (
					<Loader />
				) : (
					<FlexCenter>
						{!isEmpty(props.starDetails.celebDetails) &&
              props.starDetails.userDetails.talent_status ===
                accountStatus.live && (
							<Button
								onClick={onContinue}
								disbled={props.message === ''}
								isDisabled={props.message === ''}
								className="msg-submit"
							>
								{t('common.submitButton')}
							</Button>
						)}
					</FlexCenter>
				)}

				{!isEmpty(props.starDetails.celebDetails) &&
          props.starDetails.userDetails.talent_status !==
            accountStatus.live && (
					<span className="unavailable">
						{t('common.star_unavilable', {
							talent: !isEmpty(props.starDetails.userDetails)
								? getShortName(
									props.starDetails.userDetails.nick_name,
									props.starDetails.userDetails.first_name,
								)
								: '',
						})}
					</span>
				)}
			</Scrollbars>
			{!haveDirectMessage && <div className="bottom-bg" />}
		</MessageStyled>
	);
};

Message.propTypes = {
	submitClick: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	starName: PropTypes.string.isRequired,
	haveDirectMessage: PropTypes.bool.isRequired,
	starDetails: PropTypes.object.isRequired,
	updateToast: PropTypes.func.isRequired,
	starPrice: PropTypes.string.isRequired,
	createCharge: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	celebId: PropTypes.string.isRequired,
	paymentSuccess: PropTypes.func.isRequired,
	messageSuccess: PropTypes.func.isRequired,
	bookingData: PropTypes.object.isRequired,
};
Message.defaultProps = {};

export default Message;
