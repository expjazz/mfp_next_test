import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { localeEntity } from '../../../../../src/services/entities/localeEntity';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getGalleryImage, getProfessions, getRecentRequest } from '../../../../../src/services/myfanpark';
import axios from 'axios';
import StarShowLayout from '../../../../../components/PageStyles/CelebrityId/Layout/StarShowLayout';
import { useRouter } from 'next/router';
import StarShowLayoutContainer from '../../../../../components/PageStyles/CelebrityId/Layout/StarShowLayoutContainer';
import BioSection from '../../../../../components/PageStyles/CelebrityId/components/BioSection';
import { editModals, useGeneral } from '../../../../../src/context/general';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
function StarBio(props) {
	const router = useRouter();
	const [state, dispatch] = useGeneral();

	const { celebrityId } = router.query;
	useEffect(() => {
		router.prefetch(`/${celebrityId}`);
	}, []);
	const { entityId, entityToken } = props.partnerData;

	const { data } = useGetPartner();
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: celebritySimilarStars } = useQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0));
	const digitalGoodsList = celebrityFunStuffData?.fun_stuff;

	const { data: galleryImages } = useQuery(['getGalleryImages', celebrityId], () => getGalleryImage(celebrityId));
	const getUserId = () => {
		return celebrityId.toLowerCase();
	};

	const toggleBookingModal = (active, bookingData, reaction) => {
		if (active) {
			editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: true, requestId: bookingData.id, data: { ...bookingData, isPublic: true } } });
		} else {
			editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: false, requestId: bookingData.id, data: { ...bookingData, isPublic: true } } });
		}
	};

	// location: state.starDetails.celebDetails.celebrityDetails.location,
	// headline: state.starDetails.celebDetails.celebrityDetails.headline,
	// dateOfBirth: state.starDetails.celebDetails.userDetails.date_of_birth_full,
	// videosList: state.starDetails.celebVideos,
	return (
		<div>
			<BioSection
				userId={getUserId()}
				id={celebrityData?.user.id}
				// topProds={formatTopProds(celebrityTopProducts)}
				loaderAction={props.loaderAction}
				detailsLoading={props.detailsLoading}
				isBookable={true}
				history={props.history}
				toggleLogin={props.toggleLogin}
				isStar={false}
				isLoggedIn={false}
				location={celebrityData?.celebrity_details.location}
				toggleBookingModal={toggleBookingModal}
				setShowHow={() => {}}
				digitalGoodsList={digitalGoodsList}
				location={props.location}
				isFollow={false}
				celebDetails={celebrityData?.celebrity_details}
				userDetails={celebrityData?.user}
				similarStars={celebritySimilarStars?.similar_stars || []}
				dateOfBirth={celebrityData?.user.date_of_birth_full}
				// shoutVideos={{count: featuredVideosData.count, limit: 20, offset: 0, data: featuredVideosData.featured_videos}}
				// reactionVideos={{count: celebrityReactionsFull.count, data: celebrityReactionsFull['reactions-details']}}
			/>
		</div>
	);
}

StarBio.getLayout = page => (
	<StarShowLayoutContainer pageProps={page.props} >
		{page}
	</StarShowLayoutContainer>
);

export default StarBio;

export async function getStaticPaths() {
	return {
		paths: [
			// { params:  { celebrityId: 'primrose' }, locale: 'en-US' },
			// { params:  { celebrityId: 'primrose' }, locale: 'en-ZA' }
		],
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params: { celebrityId, site }, locale }) {
	try {

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;
		axios.interceptors.request.use(config => {
			config.headers['entity-id'] = entityId;
			config.headers['entity-token'] = entityToken;
		});
		const queryClient = new QueryClient();



		await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });

		await queryClient.prefetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				...(await serverSideTranslations(locale, ['common', 'footer'])),

			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			props: {
				error: e.message
			}
		};
	}
}