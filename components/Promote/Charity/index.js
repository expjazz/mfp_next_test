import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import { Dashed } from 'styles/CommonStyled';
// import {
//   getCharityList,
//   addCharity,
//   deleteCharity,
//   getFundRaiser,
//   addFundRaiser,
// } from 'services/userManagement';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import ToolTip from 'components/ToolTip';
import DisplayCard from 'components/DisplayCard';
import { toolTips } from './constants';
import { isFundraiserStarted, isFundraiserEnded } from './utils';
import FormSection from './components/FormSection';
import { Layout, Content, Container, ListContainer } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { addCharity, addFundRaiser, deleteCharity, deleteFundraiser, getCharityList, getFundRaiser } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Charity = props => {
	const queryClient = useQueryClient();
	const [state, dispatch] = useGeneral();
	const { data: entityData } = useGetPartner();
	const dateFormat = entityData?.partnerData?.base_date_format;
	const { data: userData } = useFetchLoggedUser();
	const { t } = useTranslation();
	const [formObject, toggleFormObject] = useState(null);
	const [charityList, updateCharityList] = useState([]);
	const [fundRaiser, updateFundRaiser] = useState(null);

	const addForm = type => () => {
		toggleFormObject({
			type,
		});
		props.modalBackHandler(false);
	};

	const getCharities = async () => {
		generalLoader(dispatch, true);
		try {
			const charityData = await getCharityList();
			const userDetails = userData?.user;
			const celebDetails = userData?.celebrity_details;
			if (charityData.success) {
				updateCharityList(charityData.data.charity);
				// props.updateUserDetails({
				//   userDetails,
				//   celbDetails: {
				//     ...celebDetails,
				//     charity: charityData.data.charity,
				//   },
				// });
				queryClient.setQueryData(['loggedUser'], {
					user: userDetails,
					celebrity_details: {
						...celebDetails,
						charity: charityData.data.charity
					}
				});
			}
		} catch (e) {
			if (e && e.response) {
				updateToast(dispatch, {
					value: true,
					message: e.response.data.error.message,
					variant: 'error',
				});
			} else {
				updateToast(dispatch, {
					value: true,
					message: t('common.refresh_error'),
					variant: 'error',
				});
			}
		}
		generalLoader(dispatch, false);
	};

	const getFundRaiserData = async () => {
		generalLoader(dispatch, true);
		try {
			const fundRaiserData = await getFundRaiser();
			if (fundRaiserData.success) {
				updateFundRaiser(fundRaiserData.data);
			}
		} catch (e) {
			if (e && e.response) {
				updateToast(dispatch, {
					value: true,
					message: e.response.data.error.message,
					variant: 'error',
				});
			} else {
				updateToast(dispatch, {
					value: true,
					message: t('common.refresh_error'),
					variant: 'error',
				});
			}
		}
		generalLoader(dispatch, false);
	};

	const deleteCharityDetails = async charityId => {
		generalLoader(dispatch, true);
		const resp = await deleteCharity(charityId);
		generalLoader(dispatch, false);
		if (resp) {
			getCharities();
		}
	};

	const deleteFundraiserDetails = async charityId => {
		generalLoader(dispatch, true);
		try {
			const resp = await deleteFundraiser(charityId);
			generalLoader(dispatch, false);

			if (resp) {
				getFundRaiserData();
			} else {
				updateToast(dispatch, {
					value: true,
					message: t('common.refresh_error'),
					variant: 'error',
					global: true
				});
			}

		} catch(e) {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: t('common.refresh_error'),
				variant: 'error',
				global: true
			});
		}
		// getFundRaiser();
	};

	const onCardClick = (type, data) => () => {
		if (type === 'charity') {
			toggleFormObject({
				type: 'charity',
				charityName: data.charity,
				charityWebsite: data.website,
				id: data.charity_id,
			});
			props.modalBackHandler(false);
		} else {
			const startDate = data.start_date && data.start_date.split('common.T')[0];
			const endDate = data.end_date && data.end_date.split('common.T')[0];
			toggleFormObject({
				...data,
				type: 'fundraiser',
				charityName: data.charity,
				charityWebsite: data.website,
				id: data.fund_raiser_id,
				started: isFundraiserStarted(startDate),
				ended: isFundraiserEnded(endDate),
				goalAmount: parseInt(data.goal_amount, 0),
				startDate: moment(startDate),
				endDate: moment(endDate),
			});
			props.modalBackHandler(false);
		}
	};

	const onBackClick = () => {
		if (!formObject) {
			props.goBack();
		} else {
			toggleFormObject(null);
			props.modalBackHandler(true);
		}
	};

	const onSave = async formData => {
		let saveType = 'add';
		if (formData.id) {
			saveType = 'update';
		}
		if (formData.ended) {
			toggleFormObject(null);
			props.modalBackHandler(true);
			return;
		}
		try {
			if (formData.type === 'charity') {
				generalLoader(dispatch, true);
				const success = await addCharity(formData, saveType);
				generalLoader(dispatch, false);
				if (success) {
					toggleFormObject(null);
					props.modalBackHandler(true);
					getCharities();
				}
			} else {
				let { startDate, endDate } = formData;
				const { started } = formData;
				saveType = started ? 'update' : 'add';
				startDate = moment(startDate).format('MMM D YYYY 00:00:00');
				endDate = moment(endDate).format('MMM D YYYY 00:00:00');
				generalLoader(dispatch, true);
				const success = await addFundRaiser(
					{ ...formData, startDate, endDate },
					saveType,
				);
				generalLoader(dispatch, false);
				if (success) {
					toggleFormObject(null);
					getFundRaiserData();
				}
			}
		} catch (e) {
			generalLoader(dispatch, false);
			if (e && e.response) {
				updateToast(dispatch, {
					value: true,
					message: e.response.data.error.message,
					variant: 'error',
				});
			} else {
				updateToast(dispatch, {
					value: true,
					message: t('common.refresh_error'),
					variant: 'error',
				});
			}
		}
	};

	const renderSelectionField = (type, title, toolTip = '') => {
		return (
			<ToolTip title={toolTip}>
				<Dashed onClick={addForm(type)} className="dashed-btn">
					{title}
				</Dashed>
			</ToolTip>
		);
	};

	const renderMainContent = () => {
		return (
			<React.Fragment>
				<ListContainer>
					<Heading className="title">{props.titleCharity}</Heading>
					<Description className="main-desc">
						{props.subtitleCharity}
					</Description>
					{charityList.map(charity => (
						<DisplayCard
							heading={charity.charity}
							id={charity.charity_id}
							description={charity.website}
							onClick={onCardClick('charity', charity)}
							onClose={deleteCharityDetails}
						/>
					))}
					{charityList.length < 3 &&
            renderSelectionField(
            	'charity',
            	t('promote_page.charity.add_charity'),
            	toolTips(t).addCharity,
            )}
					<Heading className="fund-head">{props.titleFund}</Heading>
					<Description className="main-desc">{props.subtitleFund}</Description>
					{!isEmpty(fundRaiser) && !isEmpty(fundRaiser.active_fund_raiser) && (
						<React.Fragment>
							<Description className="card-title">
								{`${
									isFundraiserStarted(
										fundRaiser.active_fund_raiser.start_date &&
                      fundRaiser.active_fund_raiser.start_date.split('common.T')[0],
									)
										? t('promote_page.charity.active')
										: t('promote_page.charity.pending')
								} ${t('promote_page.charity.fundraiser')}`}
							</Description>
							<DisplayCard
								heading={fundRaiser.active_fund_raiser.charity}
								id={fundRaiser.active_fund_raiser.fund_raiser_id}
								description={fundRaiser.active_fund_raiser.website}
								onClick={onCardClick(
									'fundRaiser',
									fundRaiser.active_fund_raiser,
								)}
								onClose={deleteFundraiserDetails}
							/>
						</React.Fragment>
					)}
					{!isEmpty(fundRaiser) &&
            isEmpty(fundRaiser.active_fund_raiser) &&
            renderSelectionField(
            	'fundraiser',
            	t('promote_page.charity.add_fundraiser'),
            	toolTips(t).addFundraiser,
            )}
					{!isEmpty(fundRaiser) && !isEmpty(fundRaiser.completed_fund_raiser) && (
						<ListContainer
							className="fund-list"
							hasActiveFund={!isEmpty(fundRaiser.active_fund_raiser)}
						>
							<React.Fragment>
								<Description className="card-title">
									{t('promote_page.charity.past_fundraisers')}
								</Description>
								{fundRaiser.completed_fund_raiser.map(fundRaiserItem => (
									<DisplayCard
										heading={fundRaiserItem.charity}
										id={fundRaiserItem.fund_raiser_id}
										description={
											fundRaiserItem.end_date
												? t('promote_page.charity.completed_on', {
													date: moment(
														fundRaiserItem.end_date.split('common.T')[0],
													).format(dateFormat),
												})
												: ''
										}
										onClick={onCardClick('fundRaiser', fundRaiserItem)}
									/>
								))}
							</React.Fragment>
						</ListContainer>
					)}
				</ListContainer>
			</React.Fragment>
		);
	};

	useEffect(() => {
		getCharities();
		getFundRaiserData();
	}, []);

	return (
		<Layout formEnabled={!isEmpty(formObject)}>
			{!isEmpty(formObject) && (
				<BackHeader
					backHandler={onBackClick}
					label={t('promote_page.charity.back_lbl')}
					closeHandler={onBackClick}
					noHelp
				/>
			)}
			<Scrollbars
				autoHide
				renderView={scrollProps => <div {...scrollProps} id="scroll-charity" />}
			>
				<Container>
					{!isEmpty(formObject) && (
						<React.Fragment>
							<Heading className="title">
								{formObject.type === 'fundraiser'
									? t('promote_page.charity.fundraiser')
									: t('promote_page.charity.charities')}
							</Heading>
							<Description>
								{formObject.type === 'fundraiser'
									? t('promote_page.charity.description')
									: t('promote_page.charity.note')}
							</Description>
						</React.Fragment>
					)}
					<Content>
						{!formObject ? (
							renderMainContent()
						) : (
							<FormSection
								dateFormat={props.dateFormat}
								formObject={formObject}
								onSave={onSave}
							/>
						)}
					</Content>
				</Container>
			</Scrollbars>
		</Layout>
	);
};

Charity.defaultProps = {
	titleCharity: '',
	subtitleCharity: '',
	subtitleFund: '',
	titleFund: '',
};

Charity.propTypes = {
	titleCharity: PropTypes.string,
	subtitleCharity: PropTypes.string,
	subtitleFund: PropTypes.string,
	titleFund: PropTypes.string,
	userDetails: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	updateUserDetails: PropTypes.func.isRequired,
	modalBackHandler: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
//   dateFormat: state.entity.data.base_date_format,
// });

// const mapDispatchToProps = dispatch => ({
//   updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateUserDetails: obj => dispatch(updateUserDetails(obj)),
// });

export default Charity;
