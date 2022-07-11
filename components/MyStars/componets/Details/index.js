import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'components/Modal';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import RequestHeader from 'components/RequestHeader';
import Pagination from 'components/Pagination';
import { FlexBoxSB, TickText } from 'styles/CommonStyled';
import Loader from 'components/Loader';
import { getTime } from 'src/utils/timeUtils';
import ShareButton from 'components/ShareButton';
import Button from 'components/SecondaryButton';
import { getDetails } from '../../services';
import { getTabsList, getSelectedTab } from '../utils';
import { ModalContainer } from '../../styled';
import { Layout } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const emailContent = (t, selected, fanName, entityData) => {
	return {
		subject: t('fan_manage.myStars.mail_sub'),
		body: t('fan_manage.myStars.mail_body', {
			name: selected.celebrity_name,
			siteName: entityData?.siteName,
			reqCount: selected.pending_request_count,
			earnings: numberToCommaFormatter(selected.pending_earnings),
			fanName,
		}),
	};
};
function Details(props) {
	const { data: entityData } = useGetPartner();
	const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [requests, setRequests] = useState([]);
	const [count, setCount] = useState(0);
	const [offset, setOffset] = useState(0);
	const [loader, setLoader] = useState(false);
	const router = useRouter();
	const callApi = offSet => {
		if (props.selected.id) {
			setLoader(true);
			getDetails(props.selected.id, offSet, 5)
				.then(resp => {
					if (resp && resp.data && resp.data.data && resp.data.data.requests) {
						setRequests(resp.data.data.requests);
						setCount(resp.data.data.count);
						setOffset(offSet);
					}
					setLoader(false);
				})
				.then(() => {
					setLoader(false);
				});
		}
	};

	const fetchNext = offSet => {
		callApi(offSet);
	};

	useEffect(() => {
		callApi(0);
	}, [props.selected.id]);
	const renderView = tab => {
		if (tab === 'request') {
			return (
				<div>
					<FlexBoxSB>
						<Pagination
							classes={{
								root: 'pagination-wrapper',
								pageDisplay: 'page-display',
							}}
							offset={offset}
							count={count}
							limit={5}
							dataLoading={false}
							onChange={fetchNext}
						/>
						{props.selected.total_requests > 0 && (
							<a
								href={`mailto: ${
									props.selected.email
								}?body=${encodeURIComponent(
									emailContent(props.t, props.selected, props.fanName, entityData?.partnerData).body,
								)}&subject=${
									emailContent(props.t, props.selected, props.fanName, entityData?.partnerData).subject
								}`}
							>
								<Button>{props.t('fan_manage.myStars.reminder')}</Button>
							</a>
						)}
					</FlexBoxSB>
					<ul>
						{requests.map(req => {
							return (
								<li className="req-li">
									<span className="for">{req.request_type_text}</span>
									<span className="name">
										{props.selected.first_name} {props.selected.last_name}
									</span>
									<span className="exp-wrp">
										<TickText className="tick-text ">
											{props.t('common.toDo')}
										</TickText>
										{req.expiring && (
											<span className="expiry">
												{props.t('common.expiring')}
											</span>
										)}
										{!req.expiring && (
											<span className="time">{getTime(req.created_date)}</span>
										)}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}
		return (
			<div className="det-wrp">
				<span className="left">
					<span className="flex-col">
						<span className="heading">
							{props.t('fan_manage.myStars.starRealName', {
								talent: entityData?.partnerData?.talentSingle,
							})}
						</span>
						<span className="desc">{props.selected.celebrity_name}</span>
					</span>
					<span className="flex-col">
						<span className="heading">
							{props.t('fan_manage.myStars.totalRequests')}
						</span>
						<span className="desc">
							{props.selected.total_requests} ({props.selected.conversion_rate}%
							{props.t('fan_manage.myStars.completionRate')})
						</span>
					</span>
					{props.selected.total_earnings && (
						<span className="flex-col">
							<span className="heading">
								{props.t('fan_manage.myStars.netEarnings')}
							</span>
							<span className="desc">
                ${numberToCommaFormatter(props.selected.total_earnings)}
							</span>
						</span>
					)}
					{/* <span className="flex-col">
            <span className="heading">Refferal details</span>
            <span className="desc">{props.selected.celebrity_name}</span>
          </span> */}
				</span>
				<span className="btns">
					<Link href={`/${props.selected.vanity}`} target="_blank">
						<Button secondary>{props.t('common.viewPage')}</Button>
					</Link>
					<ShareButton
						secondary
						buttonText={props.t('common.sharePage')}
						popperProps={{ disablePortal: false, placement: 'bottom-end' }}
						classes={{
							button: 'share-btn',
						}}
						shareUrl={`https://${router.query.site}/${props.selected.vanity}`}
					/>
				</span>
			</div>
		);
	};

	const getComponent = component => {
		if (isModalView || isMobile) {
			return (
				<React.Fragment>
					<Modal open onClose={props.closeHandler} disableBackdropClick={false}>
						<ModalContainer>{component}</ModalContainer>
					</Modal>
				</React.Fragment>
			);
		}
		return <React.Fragment>{component}</React.Fragment>;
	};

	return (
		<React.Fragment>
			{getComponent(
				<RequestHeader
					renderHeading={() => (
						<React.Fragment>{props.selected.celebrity_name}</React.Fragment>
					)}
					onClose={props.closeHandler}
					tabsList={getTabsList(props.t)}
					selected={getSelectedTab(props.t)}
				>
					{selectedTab => (
						<Layout>
							<Scrollbars
								renderView={scrollProps => (
									<div {...scrollProps} id="stars-scroll" />
								)}
							>
								{renderView(selectedTab)}
							</Scrollbars>
						</Layout>
					)}
				</RequestHeader>,
			)}
			{loader && <Loader />}
		</React.Fragment>
	);
}

Details.propTypes = {
	closeHandler: PropTypes.func.isRequired,
	selected: PropTypes.object,
	t: PropTypes.func.isRequired,
	// eslint-disable-next-line react/no-unused-prop-types
	fanName: PropTypes.string.isRequired,
};

Details.defaultProps = {
	selected: {},
};

export default Details;
