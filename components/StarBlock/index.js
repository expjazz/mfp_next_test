import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { withRouter } from 'react-router-dom';
// import i18n from 'i18next';
// import { useTranslation } from 'next-i18next';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import fitty from 'fitty';
import { useMediaQuery } from '@material-ui/core';
// import { isEmpty } from 'src/utils/dataStructures';
// import { useVisibility, useMedia } from 'customHooks/domUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-light-svg-icons';
import Popover from '@material-ui/core/Popover';
// import { getLocalAmount } from 'utils/currencyUtils';
import {
	numberToDecimalWithFractionTwo,
	calculateBalanceAmount,
} from '../../src/utils/dataformatter';

import { commaSeparator, getStarName } from '../../src/utils/dataToStringFormatter';
import { getServicesIcons } from './constants';
import { getLocalisedProfessions } from './utils';
import AvatarContainer from './styled';
import MoreOptions from './components/MoreOptions';
import { useTranslation } from 'next-i18next';
import { isEmpty } from '../../src/utils/dataStructures';
import { useMedia, useVisibility } from '../../customHooks/domUtils';
import Link from 'next/link';
import fitty from 'fitty';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import RateDisplay from 'components/RateDisplay';
import { useGeneralPromocode } from 'customHooks/reactQueryHooks';


const StarBlock = ({
	star,
	classes,
	type,
	noProdIcons,
	pricePrefix,
	...props
}) => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const [profileImage, setProfileImage] = useState(null);
	const [celebFollow, updateCelebFollow] = useState(star.celebrity_follow);
	const mobile = useMedia('(max-width: 831px)');
	const [rootNode, setRootNode] = useState(null);
	const [moreOptions, setMoreOptions] = useState(false);
	const anchorEl = useRef(null);
	let isMounted = true;
	const visible = useVisibility(rootNode);
	const { t } = useTranslation();
	// TO DO remove testing line
	// const generalPromocode = [{'id':'vbmZ20dY','code':'VODAPAY15','type':'percentage','discount':'15.00','auto_load':true,'valide_to':'2022-07-31','local_discount':null,'name':'KICKOFF'}];
	const { data: generalPromocode } = useGeneralPromocode();
	const promocode = generalPromocode?.[generalPromocode?.length - 1] || {};

	const catTagList = useMemo(() => {
		if (props.professions.length) {
			return ([
				...getLocalisedProfessions(star.celebrity_profession, props.professions),
				...star.tags ? star.tags
					.filter(tag => !tag.celebrity_profession_tag)
					.map(tag => ({ title: tag.name })) : [],
			]);
		}
		return (star.tags ? [
			...star.tags
				.filter(tag => !tag.celebrity_profession_tag)
				.map(tag => ({ title: tag.name })),
		] : []);
	}, [props.professions.length, star]);

	const autoFitText = async () => {
		try {
			const fitTitle = fitty(`#name-${star.user_id}`, {
				minSize: 10,
				maxSize: 16,
				multiLine: false,
			});

		} catch (e) {}

	};

	useEffect(() => {
		if (visible) {
			if (
				(star.avatar_photo &&
          (star.avatar_photo.thumbnail_url || star.avatar_photo.image_url)) ||
        star.profileImage
			) {
				const profileImg = new Image();
				profileImg.onload = () => {
					if (isMounted) {
						setProfileImage(profileImg.src);
					}
				};
				profileImg.src =
          star.profileImage ||
          (star.avatar_photo &&
            (star.avatar_photo.thumbnail_url || star.avatar_photo.image_url));
			} else {
				setProfileImage('');
			}
		}
		return () => {
			isMounted = false;
		};
	});

	useEffect(() => {
		updateCelebFollow(star.celebrity_follow);
	}, [star.celebrity_follow]);

	useEffect(() => {
		autoFitText();
	}, [star.nick_name, star.first_name, star.last_name, type, mobile]);

	const serviceIcons = useMemo(() => {
		if (!isEmpty(star.services)) {
			return getServicesIcons(props.entityData).filter(serviceItem =>
				serviceItem.keys.find(serviceKey =>
					Object.keys(star.services).find(() => star.services[serviceKey]),
				),
			);
		}
		return [];
	}, [star.services]);

	const renderCatTagList = () => {
		const listString = commaSeparator(catTagList, 'title');
		return listString;
	};

	const callOutRender = () => {
		// if (star.featured) {
		//   return <AvatarContainer.Label>Featured</AvatarContainer.Label>;
		// } else
		if (star.recent) {
			return <AvatarContainer.Label>{t('common.new')}</AvatarContainer.Label>;
		}
		return '';
	};

	const handleClose = event => {
		event.preventDefault();
		event.stopPropagation();
		setMoreOptions(false);
	};
	const renderServiceIcon = serviceItem => {
		if (serviceItem.cusIcon) return serviceItem.cusIcon;
		return <FontAwesomeIcon className="shop-icon" icon={serviceItem.icon} />;
	};

	const onFollowChange = followStatus => {
		updateCelebFollow(followStatus);
	};

	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setMoreOptions(true);
	};

	const rate = star.celebrity ? star.celebrity.rate : 0;
	return (
		<React.Fragment>
			<Popover
				id="moreoptions-popper"
				open={moreOptions}
				anchorEl={anchorEl && anchorEl.current}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<MoreOptions
					entityData={props.entityData}
					starRate={`${
						getLocalSymbol()
					}${numberToDecimalWithFractionTwo(
						getLocalAmount(calculateBalanceAmount(rate, star.promocode)),
						false,
						false,
					)}`}
					setMoreOptions={setMoreOptions}
					onClose={() => setMoreOptions(false)}
					userId={star.user_id}
					onFollowChange={onFollowChange}
					rateLimit={star.rate_limit}
					pendingMessage={star.pending_direct_message}
					services={star.services}
					history={props.history}
					popularTag={star.popular_tag}
					isfollow={celebFollow}
					remainingLimit={star.remaining_limit}
				/>
			</Popover>
			<AvatarContainer ref={setRootNode} className={classes.root}>
				<Link href={`/${star.user_id}`} shallow={false} passHref className={classes.container}>
					<AvatarContainer.Content
						className={classes.container}
					>
						<AvatarContainer.Avatar
							className={classes.image}
							imageUrl={profileImage}
						>
							{callOutRender()}
						</AvatarContainer.Avatar>
						<AvatarContainer.Wrapper className={classes.sectionWrap}>
							<AvatarContainer.StarDescription className="wrap-profession">
								<AvatarContainer.Name
									title={getStarName(
										star.nick_name,
										star.first_name,
										star.last_name,
									)}
									className="name"
								>
									<span id={`name-${star.user_id}`} className="name-field">
										{getStarName(star.nick_name, star.first_name, star.last_name)}
									</span>
								</AvatarContainer.Name>
							</AvatarContainer.StarDescription>
							<AvatarContainer.Category
								title={catTagList && commaSeparator(catTagList, 'title')}
								className="profession"
								ref={anchorEl}
							>
								{catTagList && renderCatTagList()}
							</AvatarContainer.Category>
							{star.celebrity && star.celebrity.rate ? (
								<span className="no-disc">
									<AvatarContainer.Price>
										{t(pricePrefix)}
										{
											isEmpty(promocode) ? (
												<>


													{getLocalSymbol()}
													{numberToDecimalWithFractionTwo(
														getLocalAmount(star.lowest_price),
														false,
														false,
													)}
												</>
											) : (

												<RateDisplay
													rate={star.lowest_price}
													type={1}
													promoDetails={promocode}
													discountObj={{}}

												/>
											)
										}
									</AvatarContainer.Price>
									<FontAwesomeIcon
										icon={faEllipsisH}
										onClick={handleClick}
										className="ellipsis"
									/>
								</span>
							) : null}
						</AvatarContainer.Wrapper>
						<AvatarContainer.IconLayout>
							{!noProdIcons && !isEmpty(serviceIcons) && (
								<AvatarContainer.IconsWrapper
									spaceApart={serviceIcons.length === 5}
								>
									{/* icons were overflowing, added slice on mobile to avoid that */}
									{mobile
										? serviceIcons
											.slice(0, 5)
											.map(serviceItem => renderServiceIcon(serviceItem))
										: serviceIcons.map(serviceItem =>
											renderServiceIcon(serviceItem),
										)}
								</AvatarContainer.IconsWrapper>
							)}
						</AvatarContainer.IconLayout>
					</AvatarContainer.Content>
				</Link>

			</AvatarContainer>
		</React.Fragment>
	);
};

StarBlock.defaultProps = {
	type: '',
	star: {},
	onCloseClick: () => {},
	classes: {},
	pricePrefix: 'common.starting_at_text',
	favoriteView: false,
	noProdIcons: false,
};

StarBlock.propTypes = {
	star: PropTypes.object,
	type: PropTypes.string,
	pricePrefix: PropTypes.string,
	professions: PropTypes.array.isRequired,
	classes: PropTypes.object,
	noProdIcons: PropTypes.bool,
	history: PropTypes.object.isRequired,
	favoriteView: PropTypes.bool,
	onCloseClick: PropTypes.func,
};

// const mapStateToProps = state => ({
//   entityData: state.entity.data,
//   currencyData: state.entity.currencyData,
//   professions: state.professionsList.professions,
// })

export default StarBlock;
