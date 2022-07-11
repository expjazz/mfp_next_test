import React, { useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import DownloadHandler from 'components/DownloadHandler';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LegacyHeader from 'components/LegacyHeader';
import VideoPublicStyled from 'components/PublicVideoPage/styled';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import { getEntity, getRequestDetails } from 'src/services/myfanpark';
import HeaderV3 from 'components/HeaderV3';
import { useRouter } from 'next/router';
import { useFetchFanActivities, useGetPartner, useRequestById } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import RequestFlowPopup from 'components/RequestFlowPopup';
import SuccessScreen from 'components/SuccessScreen';
import { isEmpty } from 'src/utils/dataStructures';
import Head from 'next/head';
import { requestTypes } from 'src/constants/requestTypes';
import { findCompletedVideo, getFor, getFrom } from 'src/utils/dataformatter';
import { getCurrentUrl, useMedia } from 'customHooks/domUtils';
import StarDrawer from 'components/StarDrawer';
import PageTitle from 'components/PageTitle';
import PipeSeparator from 'components/PipeSeparator';
import StarRating from 'components/StarRating';
// import VideoRender from 'components/VideoRender';
import ActionBar from 'components/ActionBar';
import { LinkText } from 'styles/TextStyled';
import Scrollbars from 'react-custom-scrollbars';
import CommentListing from 'components/CommentListing';
import { useTranslation } from 'next-i18next';
import { updateCelebrityShare } from 'src/services';
import { generateSmsTitle } from 'src/utils/dataToStringFormatter';
import { generalLoader, toggleLogin, updateFavouritesQueue, updateToast, useGeneral } from 'src/context/general';
import { followCelebrity } from 'src/services/myfanpark/celebActions';
import { addVideoComment } from 'src/services/addVideoComment';
import { locStorage } from 'src/utils/localStorageUtils';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';
import dynamic from 'next/dynamic';
const VideoRender = dynamic(() => import('components/VideoRender'), { ssr: false });
const starData = [
	{
		size: '70px',
		horizontal: 'calc(11.5% + 250px)',
		vertical: '190px',
		rotation: '-10deg',
		color: '#cee8f0',
	},
	{
		size: '50px',
		horizontal: 'calc(88.5% + 50px)',
		vertical: '350px',
		rotation: '20deg',
		color: '#cee8f0',
	},
	{
		size: '30px',
		horizontal: 'calc(66.5% + 15px)',
		vertical: '760px',
		rotation: '20deg',
		color: '#cee8f0',
	},
];
function PublicVideo(props) {
	const router = useRouter();
	useDisableRefetchOnFocus();
	const { t } = useTranslation();
	const isMobile = useMedia('(max-width: 831px)');
	const dispatch = useGeneral()[1];
	const [reactionVideo, setReactionVideo] = useState('');
	const [isReaction, setReactionFlag] = useState(false);
	const { data: bookingData, refetch: bookingRefetch } = useRequestById(router.query.videoId);
	const { data: entityData } = useGetPartner();
	const { data: userData, isLoggedIn } = useFetchLoggedUser();
	const isBookingStar = userData?.user?.id === bookingData?.celebrity_id;
	const isBookingFan = userData?.user?.id === bookingData?.fan_id;
	const queryClient = useQueryClient();
	const [{data: fetchActData}, queryFetchAct] = useFetchFanActivities(bookingData?.id);
	const [tipMode, setTipMode] = useState('');
	const fetchActivity = (offset = 0, refresh) => {
		// queryClient.refetchQueries(['fan-act-list'])
		queryFetchAct(fetchActData?.data, router.query.videoId, offset, refresh, { isPublic: true });
	};

	const toggleTipMode = type => () => {
		setTipMode(type);
	};

	useEffect(() => {
		fetchActivity();
	}, []);

	const otherCheck = () => {
		if (bookingData.occasion_id !== 18 && bookingData.occasion_id !== 24) {
			return `${bookingData.celebrity} ${bookingData.occasion} ${
				requestTypes[bookingData.request_type] === 'Shout-out'
					? 'shoutout video'
					: 'announcement video'
			} for ${getFor(bookingData)}${getFrom(bookingData, t)}`;
		}
		return `${bookingData.celebrity} ${
			requestTypes[bookingData.request_type] === 'Shout-out'
				? 'Shoutout video'
				: 'Announcement video'
		} for ${getFor(bookingData)}${getFrom(bookingData, t)}`;
	};

	const renderHeading = () => {
		if (requestTypes[bookingData.request_type] === 'Q&A') {
			return t('common.question_from', {
				requestData: bookingData.fan_first_name,
			});
		} else if (requestTypes[bookingData.request_type] === 'Commercial') {
			return t('open_bookings.commercial_request', {
				fan_first_name: bookingData.fan_first_name,
			});
		}
		return otherCheck();
	};

	const finalVideo = findCompletedVideo(bookingData);
	const imageUrl = finalVideo.s3_thumbnail_url
		? finalVideo.s3_thumbnail_url
		: 'images/profile.png';
	const description = `${renderHeading()}. Request shoutouts, unique experiences, social media interactions or DMs through ${entityData?.partnerData?.siteName}.`;
	const keywords = `${bookingData.celebrity}. Personalized gift, celebrity, celebrities, celebrity video messages, video messages, celebrity birthday messages, gift, video, birthday wishes, happy birthday wishes, birthday message, happy birthday, birthday wishes for friend, birthday gift`;
	const autoFitText = () => {
		try {
			if (document.getElementById('celeb-name')) {
				fitty('#celeb-name', {
					minSize: 20,
					maxSize: 55,
					multiLine: true,
				});
			}
		} catch (e) {}
	};

	useEffect(() => {
		autoFitText();
		document.fonts.ready.then(() => {
			autoFitText();
		});
	}, [bookingData.celebrity, isMobile]);

	const onFavoriteClick = () => {
		if (isLoggedIn) {
			// generalLoader(dispatch, true);
			followCelebrity(bookingData?.celebrity_id, !bookingData.has_following, false, false, {}, queryClient)
			// (celebrityId, follow, cancelUpdate, onSuccess, celebrityData, queryClient) => {

				.then(res => {
					// generalLoader(dispatch, false);
					if (!res || !res.data || !res.data.success) {
						// updateToast(dispatch, {
						//   value: true,
						//   message: res.message,
						//   variant: 'error',
						//   global: true
						// });
					}
				})
				.catch(err => {
					// generalLoader(dispatch, false);
					// updateToast(dispatch, {
					//   value: true,
					//   message: err.message,
					//   variant: 'error',
					//   global: true
					// });
				});
		} else {
			updateFavouritesQueue(dispatch, {celebId: bookingData?.celebrity_id, follow: !bookingData.has_following});
			toggleLogin(dispatch, {active: true, options: {} });
		}
	};
	const updateBooking = newRequestData => {
		queryClient.setQueryData([router.query.videoId, isLoggedIn],{data: {stargramz_response: newRequestData}});
	};
	const submitComment = async comment => {
		if (!isLoggedIn) {
			toggleLogin(dispatch, {active: true, options: {} });
		} else {
			generalLoader(dispatch, true);
			try {
				const response = await addVideoComment(
					router.query.videoId,
					comment,
					bookingData.booking_id,
				);
				const success = response && response.success;
				if (isMobile && success) {
					queryFetchAct(fetchActData?.data, router.query.videoId, 0, true, {
						isPublic: true,
						isAll: true,
					});
				} else if (success) {
					queryFetchAct(fetchActData?.data, router.query.videoId, 0, true, { isPublic: true });
				} else {
					throw new exception();
				}
				if (!isBookingStar) {
					const newRequestData = { ...bookingData };
					newRequestData.has_comment = true;
					updateBooking(newRequestData);
					// updateBooking(newRequestData);
				}
			} catch (exception) {
				updateToast(dispatch, {
					value: true,
					message: exception.response
						? exception.response.data.error.message
						: 'Something went wrong',
					variant: 'error',
				});
			}
			generalLoader(dispatch, false);
		}
	};

	const onCompleteAction = (type, data) => {
		const paramId = router.query.videoId;
		const newRequestData = { ...bookingData };
		if (type === 'tip') {
			locStorage.setItem(
				'req_data',
				{
					returnUrl: window.location.pathname,
					amount: data,
					bookingId: bookingData.id,
					userId: bookingData.celebrity_vanity,
					promoCode: {},
				},
			);
			router.push({
				pathname: `/${bookingData.celebrity_vanity}/tip`,
			});
		} else if (type === 'rating') {
			queryFetchAct(fetchActData?.data, paramId, 0, true, {
				isPublic: true,
				isAll: isMobile,
			});
			newRequestData.has_rating = true;
			bookingRefetch();
		} else if (type === 'reaction') {
			queryFetchAct(fetchActData?.data, paramId, 0, true, {
				isPublic: true,
				isAll: isMobile,
			});
			newRequestData.has_reaction = true;
		} else if (type === 'comment') {
			submitComment(data);
		}
		if (!isBookingStar) {
			updateBooking(newRequestData);
		}
	};

	const onTagClick = tag => () => {
		router.push(`/tag/${tag.slug}`);
	};

	const onProfessionClick = profession => {
		router.push(`/category/${profession.slug}`);
	};

	const beforeShare = type => {
		return updateCelebrityShare('video', {
			bookingId: bookingData.booking_id,
			type,
		});
	};

	const followStatus = bookingData?.has_following;
	const currentVideo = isReaction ? reactionVideo : finalVideo;

	const onSelectAction = option => {
		if (option.value === 'download') {
			const completedVideo = findCompletedVideo(bookingData);
			props.downloadFunc(completedVideo.download_url || completedVideo.s3_video_url, bookingData.booking_title);
		}
	};

	const onReactionClick = (fileUrl, thumbnail, type) => {
		setReactionFlag(true);
		setReactionVideo({
			s3_video_url: fileUrl,
			type: type === 1 && 'image',
			isReaction: true,
			s3_thumbnail_url: type === 2 ? thumbnail : fileUrl,
		});
	};

	return (
		<VideoPublicStyled>
			<HeaderV3
				noCategory
				smallEntitySelect
			/>
			{tipMode !== '' && (
				<RequestFlowPopup disableClose closePopUp={toggleTipMode('')}>
					{tipMode === 'payment' ? (
						<h3>
              payment popup
						</h3>
					) : (
						<SuccessScreen
							title={t('common.bookingSuccess.title')}
							successMsg={t('common.bookingSuccess.successMsg')}
							note={t('common.bookingSuccess.tip_note')}
							btnLabel={t('common.bookingSuccess.back_to_video')}
							closeHandler={toggleTipMode('')}
							buttonHandler={toggleTipMode('')}
						/>
					)}
				</RequestFlowPopup>
			)}
			{!isEmpty(bookingData) && (
				<Head>
					<title>{renderHeading()}</title>
					<meta property="description" content={description} data-react-helmet="true"/>
					<meta property="og:description" content={description} data-react-helmet="true"/>
					<meta property="twitter:description" content={description} data-react-helmet="true"/>
					<meta property="og:title" content={renderHeading()} data-react-helmet="true"/>
					<meta property="og:image" content={imageUrl} data-react-helmet="true"/>
					<meta property="og:secure_url" content={imageUrl} data-react-helmet="true"/>
					<meta property="og:site_name" content={entityData?.partnerData?.seo_site_name} data-react-helmet="true"/>
					<meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
					<meta property="og:type" content="website" data-react-helmet="true"/>
					<meta property="twitter:title" content={renderHeading()} data-react-helmet="true"/>
					<meta property="twitter:image" content={imageUrl} data-react-helmet="true"/>
					<meta property="twitter:site" content={entityData?.partnerData?.seo_site_name} data-react-helmet="true"/>
					<meta property="twitter:creator" content={entityData?.partnerData?.seo_site_name} data-react-helmet="true"/>
					<meta property="keywords" content={keywords} data-react-helmet="true"/>
					<meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
					<meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
				</Head>
			)}
			<VideoPublicStyled.StarWrapper>
				<StarDrawer starData={starData} />
			</VideoPublicStyled.StarWrapper>
			<VideoPublicStyled.TitleWrapper>
				{!isEmpty(bookingData) && (
					<PageTitle
						title={
							bookingData.request_details ||
              requestTypes[bookingData.request_type] === 'Commercial'
								? renderHeading()
								: t('orderDet.videoShout')
						}
					/>
				)}
			</VideoPublicStyled.TitleWrapper>
			<VideoPublicStyled.PageWrapper>
				{!isEmpty(bookingData) && (
					<VideoPublicStyled.Row>
						<VideoPublicStyled.DashBorder />
						<VideoPublicStyled.Width288Block className="profile-wrapper">
							<VideoPublicStyled.Profile>
								<VideoPublicStyled.ProfileAvatar>
									<VideoPublicStyled.AvatarImg
										src={`${
											isEmpty(bookingData.avatar_photo.image_url)
												? `${window.location.origin}/assets/images/default-cover.jpg`
												: bookingData.avatar_photo.image_url
										}`}
									/>
									{bookingData.recent && (
										<VideoPublicStyled.Label>
											{t('common.newCap')}
										</VideoPublicStyled.Label>
									)}
									<VideoPublicStyled.ProfileFavorite onClick={onFavoriteClick}>
										<FontAwesomeIcon
											icon={
												isEmpty(bookingData)
													? faHeart
													: followStatus
														? faHeartSolid
														: faHeart
											}
											size="lg"
										/>
									</VideoPublicStyled.ProfileFavorite>
								</VideoPublicStyled.ProfileAvatar>
								<VideoPublicStyled.Proffession>
									<PipeSeparator
										itemClass="category-item"
										list={bookingData.professions}
										listKey="title"
										onItemClick={onProfessionClick}
									/>
								</VideoPublicStyled.Proffession>
								<VideoPublicStyled.ProfileNameWrapper>
									<VideoPublicStyled.ProfileName id="celeb-name">
										{bookingData.celebrity}
									</VideoPublicStyled.ProfileName>
								</VideoPublicStyled.ProfileNameWrapper>
								{bookingData.video_rating ? (
									<VideoPublicStyled.RatingWrapper>
										<span className="rating-heading">
											{t('common.video_rating')}
										</span>
										<StarRating
											readOnly
											ratingClass="star-item"
											rating={bookingData.video_rating}
										/>
									</VideoPublicStyled.RatingWrapper>
								) : null}
								<VideoPublicStyled.ProfileInterests>
									{bookingData.celebrity_tags.map(each => {
										return (
											<VideoPublicStyled.ProfileInterest
												onClick={onTagClick(each)}
												key={`profile-interest-${each.id}`}
											>
												{each.name}
											</VideoPublicStyled.ProfileInterest>
										);
									})}
								</VideoPublicStyled.ProfileInterests>
								<VideoPublicStyled.ProfileLink>
									<Link href={`/${bookingData.celebrity_vanity}`}>
										<a>
											{t('common.read_full_profile')}
										</a>
									</Link>
								</VideoPublicStyled.ProfileLink>
							</VideoPublicStyled.Profile>
						</VideoPublicStyled.Width288Block>

						<VideoPublicStyled.Inner100perMin576Block>
							{!isEmpty(reactionVideo) && (
								<div className="video-switcher">
									<VideoPublicStyled.TabSwitcher
										className="reaction-video"
										disabled={isEmpty(reactionVideo)}
										selected={isReaction}
										onClick={() => setReactionFlag(true)}
									>
										{t('common.reaction_video')}
									</VideoPublicStyled.TabSwitcher>
                  |
									<VideoPublicStyled.TabSwitcher
										className="star-video"
										selected={!isReaction}
										onClick={() => setReactionFlag(false)}
									>
										{t('common.talentVideo', {
											talent: entity('talentSingle'),
										})}
									</VideoPublicStyled.TabSwitcher>
								</div>
							)}
							<VideoPublicStyled.VideoWrapper>
								<VideoRender
									variableWidth
									variableHeight
									noBorder={isMobile}
									videoStatus={currentVideo.status}
									type={currentVideo.type}
									cover={currentVideo.s3_thumbnail_url}
									videoSrc={
										isEmpty(currentVideo) ? '' : currentVideo.s3_video_url
									}
								/>
							</VideoPublicStyled.VideoWrapper>
						</VideoPublicStyled.Inner100perMin576Block>

						<VideoPublicStyled.Width288Block>
							<VideoPublicStyled.Comment>
								<VideoPublicStyled.CommentShowLove>
									<ActionBar
										initialSelection
										bookingId={bookingData.booking_id}
										disableRating={isBookingStar || bookingData.has_rating}
										disableComment={bookingData.has_comment && !isBookingStar}
										disableReaction={isBookingStar || bookingData.has_reaction}
										disableTips={isBookingStar}
										beforeShare={beforeShare}
										shareDisable={!isBookingFan && !bookingData.public_request}
										onAction={onCompleteAction}
										commentDetails={{
											maxLength: 104,
											thresholdLimit: 97,
										}}
										shareDetails={{
											smsTitle: generateSmsTitle(bookingData),
											fullShareUrl: true,
											title: `Check out this video from ${bookingData.celebrity}!`,
											body: `Watch this personalized video from ${bookingData.celebrity}`,
											shareUrl: `${finalVideo.video_url || ''}`,
										}}
										onSelectAction={onSelectAction}
									/>
								</VideoPublicStyled.CommentShowLove>
								<span
									className="dw-links"
									onClick={() => onSelectAction({value: 'download'})}
									role="presentation"
								>
									<FontAwesomeIcon icon={faDownload} />
									<LinkText className="download">
										{t('common.download_video')}
									</LinkText>
								</span>
								<VideoPublicStyled.CommentBody>
									<Scrollbars
										className="publicvideo-scroll"
										autoHide
										renderView={prop => (
											<div
												{...prop}
												className="scroll-render"
												id="comments-scroll-target"
											/>
										)}
									>
										<CommentListing
											notCenter
											scrollTarget="comments-scroll-target"
											dataList={fetchActData?.data || []}
											noDataText="No comments yet"
											disableAction
											celebrityId={bookingData.celebrity_id}
											loading={fetchActData?.loading}
											offset={fetchActData?.offset}
											fetchData={fetchActivity}
											onReactionClick={onReactionClick}
											totalCount={fetchActData?.count}
											limit={fetchActData?.limit}
											isPublic
										/>
									</Scrollbars>
								</VideoPublicStyled.CommentBody>
							</VideoPublicStyled.Comment>
						</VideoPublicStyled.Width288Block>
					</VideoPublicStyled.Row>
				)}
			</VideoPublicStyled.PageWrapper>
		</VideoPublicStyled>
	);
}

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths: [],
		fallback: 'blocking'
	};
}

export async function getStaticProps({ locale, params: { site, videoId } }) {


	// const { entityId, entityToken } = localeEntity(locale, site);
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([videoId, false], () => getRequestDetails(videoId));
	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;
	await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });
	return {
		props: {
			locale,
			partnerData: { entityId: partnerData.entity_id, entityToken: partnerData.public_token },
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
		revalidate: 60,
	};
}




export default DownloadHandler(PublicVideo);

