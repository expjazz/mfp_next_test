import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
// import RequestFlowPopup from '../../../../components/RequestFlowPopup';
// import InfoBooking from '../../../../components/InfoBooking';
// import { useMedia } from '../../../../utils/domUtils';
import RowStyled from './styled';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useGeneral } from '../../../../../src/context/general';
import Image from 'next/image';

const starCountMobile = 2;

const RowMessage = ({
	row,
	history,
	RenderComponent,
}) => {
	const { t } = useTranslation();
	const mobile = useMediaQuery('(max-width: 1279px)');
	const smallMobile = useMediaQuery('(max-width: 831px)');
	const [state, dispatch] = useGeneral();
	const {
		rowCount,
		messages: rowMessages
	} = state.salesMessage;

	const [infoMsg, setInfo] = useState(false);

	const getPlacementRow = () => {
		if (!smallMobile) {
			return rowCount.rows_in_web;
		}
		return rowCount.rows_in_mobile === 1
			? rowCount.rows_in_mobile
			: Math.floor(rowCount.rows_in_mobile / starCountMobile);
	};

	const currentPlacement = getPlacementRow();

	const isValidRow = () => {
		if (!smallMobile) {
			return row > 0 && row % currentPlacement === 0;
		}
		return row % currentPlacement === 0;
	};

	const toggleInfo = () => {
		if (!smallMobile) {
			setInfo(!infoMsg);
		} else {
			history.push('/how-it-works');
		}
	};

	const renderButton = messageData => {
		return (
			<RowStyled.Button className='cta-cat-call' href={messageData.button_link || '#'}>
				{messageData.button_name}
			</RowStyled.Button>
		);
	};
	if (isValidRow()) {
		const messageIndex = smallMobile
			? row / currentPlacement
			: row / currentPlacement - 1;
		const messageData = rowMessages[messageIndex] || null;
		return (
			messageData && (
				<RenderComponent className="grid-item">
					{/* {infoMsg && (
            <RequestFlowPopup
              closePopUp={toggleInfo}
              classes={{
                root: 'custom-modal',
                sub: 'profile-modal',
              }}
              smallPopup
            >
              <InfoBooking
                title={t('browse_stars.info_booking_title')}
                subTitle={t('browse_stars.how_it_works')}
              />
            </RequestFlowPopup>
          )} */}
					<RowStyled>
						<RowStyled.Container>
							<RowStyled.LeftCol>
								{messageData.celebrity_image_url && (
									<span className="image-wrapper">
										<Image
											src={messageData.celebrity_image_url}
											alt="star-image"
											layout='fill'
										/>
									</span>
								)}
								<RowStyled.Description>
									{messageData.description}
								</RowStyled.Description>
								{smallMobile && messageData.button_name
									? renderButton(messageData)
									: null}
							</RowStyled.LeftCol>
							<RowStyled.RightCol>
								{!smallMobile && messageData.include_info && (
									<span>
										<FontAwesomeIcon
											className="info-icon"
											icon={faInfoCircle}
											onClick={toggleInfo}
										/>
									</span>
								)}
								{!smallMobile && messageData.button_name
									? renderButton(messageData)
									: null}
							</RowStyled.RightCol>
						</RowStyled.Container>
					</RowStyled>
				</RenderComponent>
			)
		);
	}

	return null;
};

RowMessage.defaultProps = {
	row: 0,
};

RowMessage.propTypes = {
	row: PropTypes.number,
	history: PropTypes.object.isRequired,
	rowCount: PropTypes.object.isRequired,
	rowMessages: PropTypes.array.isRequired,
};

// const mapStateToProps = state => ({
//   rowCount: state.listData.salesMessages.rowCount,
//   rowMessages: state.listData.salesMessages.messages,
// });

export default RowMessage;
