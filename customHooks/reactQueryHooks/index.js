import { useState } from 'react';
import { filterOptions, sortBy } from 'components/Bookings/constants';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { requestTypes } from 'src/constants/requestTypes';
import Api from 'src/lib/api';
import { localeEntity } from 'src/services/entities/localeEntity';
import { axiosFetch } from 'src/services/fetch';
import { fetchActivitiesList, generalPromocode, getAllProfessions, getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getConfig, getEntity, getFeaturedVideos, getProfessions, getRequestDetails, getV3Users } from 'src/services/myfanpark';
import { getDashboardData } from 'src/services/myfanpark/loggedActions';
import { fetchOccasionlist } from 'src/services/myfanpark/ocassionsActions';
import { getCustomPromoImgs, getPromoCat, getPromoList } from 'src/services/myfanpark/promoCelebActions';
import { useGeneral } from 'src/context/general';
import { fetchAllCustomPromoImgs, fetchAllPromoImgs, fetchArticles, fetchCourses, fetchGetCommercialTemplates, fetchIdeas, fetchRecentActivity, fetchStarConcierge, getRating } from 'src/services/myfanpark/celebActions';
import { fetchReferralData } from 'components/SettingsComponents/ReferralProgram/actions/getReferrals';
import { fetchPendingList } from 'components/PerformanceComponents/Earnings/earnings/actions/getPendingList';
import { fetchPaidList } from 'components/PerformanceComponents/Earnings/earnings/actions/getPaidList';
import { fetchCelebDetails, fetchFanActivitiesList, fetchFavouritesList } from 'src/services/myfanpark/fanActions';
import { getTermsPolicy } from 'src/services/myfanpark/termsActions';
import { useEffect } from 'react';
import { getPaystackCards, paystackToPaymentService } from 'src/services/myfanpark/paymentActions';
import { isBrowser } from 'customHooks/domUtils';
import { getServerDomain } from 'src/utils/urlUtils';

export const useFetchOccasions = (entityId, prod = 1) => {
	return useQuery(['shoutout-occasions', entityId], () => fetchOccasionlist(prod, entityId));
};

export const useGetPartner = () => {
	const router = useRouter();
	// const { entityId, entityToken } = localeEntity(router.locale)
	return useQuery(['partnerData',  router.query?.site, router.locale], () => getEntity(router.query?.site, router.locale), {
		//enabled: !!router.asPath.includes('manage'),
		enabled: true,
		retry: 5,
	});
};

export const withPartnerData = Component => {
	return props => {
		const { data } = useGetPartner();
		return <Component { ...props } entityData={data} partnerData={data?.partnerData} />;
	};
};

export const useV3ExpUsers = users => {
	return useQuery(['v3Users', users], () => getV3Users({users}), {
		enabled: !!isBrowser()
	});
};

export const useGetCelebrityData = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	const { data: entityData } = useGetPartner();
	const entityId = entityData?.partnerData.entity_id;
	const entityToken = entityData?.partnerData.public_token;
	const { data: fanData, isLoggedIn, isStar } = useFetchLoggedUser();
	// const data = useQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }, !!isLoggedIn), {
	//   enabled: !!celebrityId,
	// })

	// useEffect(() => {
	//   data.refetch()
	// }, [isLoggedIn])

	// return data
	const domain = process.env.ENV !== 'dev' ? router.query.site : getServerDomain();
	const query = useQueries(
		[
			{
				queryKey: ['getCelebDetails', celebrityId, false],
				enabled: !!celebrityId,
				queryFn: () => getCelebDetails({ celebrityId, entityId, entityToken }, !!isLoggedIn, isStar, domain)
			},
			{
				queryKey: ['getCelebDetails', celebrityId, !!isLoggedIn],
				enabled: !!celebrityId,
				queryFn: () => getCelebDetails({ celebrityId, entityId, entityToken }, !!isLoggedIn, isStar, domain)
			},
		]
	);
	useEffect(() => {
		if (isLoggedIn) {
			query[1].refetch();
		} else {
			query[0].refetch();
		}
	}, [fanData?.user?.id]);
	return isLoggedIn && !!query[1]?.data?.user ? query[1] : query[0];
};

export const useGetCelebFeaturedVideos = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }));
};

export const useGetCelebFunStuff = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
};

export const useGetCelebSocial = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
};

export const useGetCelebReactionsFull = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0));
};

export const useGetCelebProducts = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));
};

export const useGetCelebSimilarStars = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0));
};

export const useGetCelebTopProducts = (id = '') => {
	const router = useRouter();
	let { celebrityId } = router.query;
	if (id) celebrityId = id;
	// const { entityId, entityToken } = localeEntity(router.locale)

	return useQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }, {
		initialData: []
	}));
};

export const useConfigPartner = () => {
	const router = useRouter();
	const { data: { partnerData } } = useGetPartner();
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;
	return useQuery('config', () => getConfig(entityId, entityToken));
};

export const withConfigParter = Component => {
	return props => {
		const { data: config } = useConfigPartner();
		return <Component {...props} config={config}/>;
	};
};

export const useDashboardData = (callback=false) => {
	const { data: userData } = useFetchLoggedUser();
	return useQuery([userData?.user.id, 'dashboardData'], () => getDashboardData(callback, !!userData), {
		enabled: !!userData,
		initialData: {}
	});
};

export const useFetchBookingsList = (

) => {
	const [t, setT] = useState(null);
	const [offset, setOffset] = useState(0);
	const [refresh, setRefresh] = useState(true);
	const [filterParam, setFilterParam] = useState('');
	const [sortParam, setSortParam] = useState('');
	const [requestType, setRequestType] = useState(null);
	const [requestStatus, setRequestStatus] = useState([2, 3, 8]);
	const { data: entityData } = useGetPartner();
	const [status, setStatus] = useState('all');
	const [limit, setLimit] = useState(50);
	const getListParams = (
		t,
		offset,
		refresh,
		requestStatus,
		filterParam = '',
		sortParam = '',
		requestType,
	) => {
		if (t) {
			setT(t);
		} else {
			setT(null);
		}
		if (offset) {
			setOffset(offset);
		} else {
			setOffset(0);
		}
		if (refresh) {
			setRefresh(refresh);
		} else {
			setRefresh(null);
		}
		if (requestStatus) {
			setRequestStatus(requestStatus);
		} else {
			setRequestStatus(null);
		}
		if (filterParam) {
			setFilterParam(filterParam);
		} else {
			setFilterParam('');
		}
		if (sortParam) {
			setSortParam(sortParam);
		} else {
			setSortParam('');
		}
		if (requestType) {
			setRequestType(requestType);
		} else {
			setRequestType(null);
		}
	};
	const videoStatus = requestStatus ? requestStatus : status;
	let filterString = '';
	let sortString = '';
	filterOptions(t).forEach(filterOption => {
		if (filterOption.id !== '') {
			filterString = `${filterString}&${filterOption.id}=${filterOption.id ===
        filterParam}`;
		}
	});
	sortBy(t, entityData?.partnerData).forEach(sortOption => {
		if (sortOption.id !== '') {
			sortString = `${sortString}&${sortOption.id}=${sortOption.id ===
        sortParam}`;
		}
	});

	const fetchList = () => {
		return axiosFetch.get(
			`${
				Api.getUserVideos
			}?status=${videoStatus}&limit=${limit}&offset=${offset}${filterString}${sortString}${
				requestType ? `&request_type=${requestType}` : ''
			}&role=celebrity_id`,
		).then(resp => {
			const { count } = resp.data.data;
			const miscData = {
				highCancel: resp.data.data.high_cancel,
				highCancelCount: resp.data.data.high_cancel_count,
			};
			const list = resp.data.data.request_list || [];
			return {data: list, offset, count, status: videoStatus, highCancel: miscData.highCancel, highCancelCount: miscData.highCancelCount, limit};
		}).catch(e => {
			console.log(e);
		});
	};

	const queryResult = useQuery([
		'bookings',
		offset,
		refresh,
		requestStatus,
		filterParam,
		sortParam,
		requestType,
		status,
		limit
	], () => fetchList(), {
		keepPreviousData: !refresh && requestTypes[requestType] !== 'Commercial',
		enabled: !!(offset >= 0 && limit),
		initialData: {
			data: [],
			offset: -1,
			count: 0,
			limit: 50,
			highCancel: false,
			highCancelCount: 0,
			status: 'all',
		}
	});
	const dataRes = queryResult?.data;
	return [{...queryResult, data: {...dataRes, loading: queryResult?.isLoading }}, {
		setStatus,
		setLimit,
		getListParams
	}, [
		offset,
		refresh,
		requestStatus,
		filterParam,
		sortParam,
		requestType,
		status,
		limit
	]];
};

export const withFetchBookingList = Component => {
	return props => {
		const [bookingsList, bookingListFn, bookingsListQueryParams] = useFetchBookingsList();
		return <Component { ...props } bookingsList={bookingsList?.data} bookingsListQueryParams={bookingsListQueryParams} fullBookingData={bookingsList} bookingsListLoading={bookingsList.isLoading || bookingsList.isFetching} bookingListFn={bookingListFn} />;
	};
};

export const withQueryClient = Component => {
	return props => {
		const queryClient = useQueryClient();
		return <Component { ...props } queryClient={queryClient} />;
	};
};

export const useGetPromoList = (cat='', occ='', entity='') => {
	return useQuery(['promo-list', cat, occ, entity], () => getPromoList(cat, occ, entity), {
		initialData: []
	});
};

export const useGetCustomPromoImgs = (id='') => {
	return useQuery([id, 'custom-promo-image'], () => getCustomPromoImgs(id), {
		enabled: !!id,
		initialData: []
	});
};

export const useGetPromoCat = () => {
	return useQuery('promo-cat', () => getPromoCat(), {
		initialData: {
			catList: [],
			occasList: []
		}
	});
};

export const useTipsArticles = (limit) => {
	const [_, dispatch] = useGeneral();
	const [offset, setOffset] = useState(0);
	const [category, setCategory] = useState('');
	const fetchList = (localOffset = 0, cat  = '') => {
		setOffset(localOffset);
		setCategory(cat);
	};
	const data = useQuery(['tip-article', offset, category, limit], () => fetchArticles(offset, category, limit, dispatch), {
		initialData: {
			data: [],
			loading: false,
			offset: -1,
			count: 0,
			limit: 20,
		}
	});
	return [data, fetchList];
};

export const useFetchCourses = () => {
	const [_, dispatch] = useGeneral();
	return useQuery('courses', () => fetchCourses(dispatch), {
		initialData: {
			data: [],
			loading: false,
			error: null,
		}
	});
};

export const useFetchIdeas = (limit) => {
	const [offset, setOffset] = useState(0);
	const [category, setCategory] = useState('');
	const fetchList = (localOffset = 0, cat  = '') => {
		setOffset(localOffset);
		setCategory(cat);
	};
	const [_, dispatch] = useGeneral();
	const data = useQuery(['ideas', offset, category, limit], () => fetchIdeas(offset, category, limit, dispatch), {
		initialData: {
			data: [],
			loading: false,
			offset: -1,
			count: 0,
			limit: 20,
		}
	});
	return [data, fetchList];
};

export const useGetProfessions = () => {
	const { data: entityData } = useGetPartner();
	// We can get an ID to show themed categories from the partner.
	let selectedCat = null;
	if (entityData?.partnerData?.entity_id === 'SUPERSPORT-ZA-1') {
		selectedCat = 1;
	}
	return useQuery('professions', () => getAllProfessions(selectedCat), {
		initialData: {
			professions: [],
			subcategories: [],
			allProfessions: []
		},
	});
};

export const withProfessionsList = Component => {
	return props => {
		const { data } = useGetProfessions();
		return <Component {...props} professionsList={data?.professions} />;
	};
};

export const useReferralData = () => {
	const [offset, setOffset] = useState(0);
	const [refresh, setRefresh] = useState(true);
	const [_, dispatch] = useGeneral();
	const [prevData, setPrevData] = useState([]);
	const executeQuery = (off, ref, prev) => {
		setOffset(off);
		setRefresh(ref);
		setPrevData(prev);
	};
	const data = useQuery(['referral', offset, refresh], () => fetchReferralData(offset, refresh, 20, dispatch, prevData) , {
		initialData: {
			data: [],
			loading: false,
			offset: -1,
			count: 0,
			limit: 20,
			pendingPayments: '$0.00',
			totalEarnings: '$0.00',
			lastPayment: '$0.00',
			lastPaymntDate: '',
		}
	});
	return [data, executeQuery];
};

export const useRecentActivity = () => {
	return useQuery('recent-activity', fetchRecentActivity);
};

export const useGetCommercialTemplates = () => {
	const [entity, setEntity] = useState('');
	const data = useQuery(['commercial-templates', entity], () => fetchGetCommercialTemplates(entity), {
		enabled: !!entity,
		initialData: {
			templateOfferings: []
		}
	});
	return [data, setEntity];
};

export const useFetchPendingList = () => {
	const [filter, setFilter] = useState('');
	const data = useQuery(['pending-payment-list', filter], () => fetchPendingList(filter), {
		initialData: {
			data: [],
			loading: false,
			error: '',
		}
	});
	return [data, setFilter];
};

export const useFetchGetPaidList = () => {
	const [state, setState] = useState({
		offset: 0,
		filter: '',
		refresh: true,
		limit: 20,
		prevData: []
	});
	const updateState = (offset=0, refresh=true, filter='', limit=20, prevData=[]) => {
		setState({
			offset,
			refresh,
			filter,
			limit,
			prevData
		});
	};
	const { offset, refresh, filter, limit, prevData } = state;
	const data = useQuery(['paid-payments', offset, refresh, filter, limit], () => fetchPaidList(
		offset,
		refresh,
		filter,
		limit,
		prevData
	), {
		initialData: {
			data: [],
			limit: 5,
			offset: -1,
			loading: false,
			error: '',
		}
	});
	return [data, updateState];
};

export const useFetchConcienge = () => {
	const [_, dispatch] = useGeneral();
	return useQuery(['star-concierge'], () => fetchStarConcierge(dispatch), {
		initialData: {
			data: [],
			loading: false,
			error: null
		}
	});
};

export const useFetchFanActivities = () => {
	const [_, dispatch] = useGeneral();
	const { isLoggedIn } = useFetchLoggedUser();
	const [state, setState] = useState({
		bookingId: '',
		offset: 0,
		refresh: true,
		apiOptions: {},
		prevData: { count: 0 }
	});
	const fetchList = (prevData, bookingId, offset, refresh, apiOptions) => {
		setState({
			bookingId,
			offset,
			refresh,
			apiOptions,
			prevData
		});
	};

	const {
		bookingId,
		offset,
		refresh,
		apiOptions,
		prevData
	} = state;
	const data = useQuery([
		'fan-act-list',
		bookingId,
		offset,
		refresh,
		apiOptions], () => fetchFanActivitiesList(
		bookingId,
		offset,
		refresh,
		prevData,
		apiOptions,
		dispatch,
		isLoggedIn
	), {
		enabled: !!bookingId,
		initialData: {
			data: [],
			loading: false,
			offset: -1,
			count: 0,
			limit: 20,
			error: null,
		}
	});
	return [data, fetchList];
};

export const useFetchCeleb = () => {
	const dispatch = useGeneral()[1];
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const [state, setState] = useState({
		id,
		templateId,
		fullQuery
	});
	const fetchList = (id, templateId, fullQuery) => setState({id, templateId, fullQuery});
	const {id, templateId, fullQuery} = state;
	const data = useQuery(['celeb-fan', id, templateId, fullQuery], () => fetchCelebDetails(
		id,
		templateId,
		fullQuery,
		dispatch,
		!!userData,
		entityData?.partnerData?.entity_id
	), {
		enabled: !!id
	});

	return [data, fetchList];
};

export const useFanFavorites = () => {
	const dispatch = useGeneral()[1];
	const { data: userData, isLoggedIn } = useFetchLoggedUser();
	const [state, setState] = useState({
		offset: 0,
		prevData: {},
		refresh: true
	});
	const fetchList = prevData => (offset, refresh) => {
		setState({offset, prevData, refresh});
	};
	const {
		offset,
		prevData,
		refresh
	} = state;
	const data = useQuery(['fan-fav', userData?.user?.user_id, offset, refresh], () => fetchFavouritesList(
		offset,
		refresh,
		dispatch,
		!!userData,
		prevData
	), {
		enabled: isLoggedIn
	});
	return [data, fetchList];
};

// fetchPaidList = (offset, refresh, filter, limit, prevData)

// id, templateId, fullQuery = '', dispatch = () => {}, isLoggedIn = true, entity = ''

export const useModalsActivities = (id, bookingModal, bookingData) => {
	return useQuery(['tempActivitiesList', id], () => fetchActivitiesList(
		bookingData.id,
		0,
		10,
		true,
		{isPublic: props.bookingModal?.data?.isPublic, isAll: isMobile, isBookingId: true})
	);

};

export const useCelebPromoImgs = celebId => {
	return useQuery([celebId, 'allPromoImgs'], () => fetchAllPromoImgs(celebId));
};

export const useCelebCustomPromoImgs = celebId => {
	return useQuery([celebId, 'customPromoImgs'], () => fetchAllCustomPromoImgs(celebId));
};

export const useTermsServices = () => useQuery('terms-service', getTermsPolicy);

export const useComments = (userId, bookings) => useQuery(['celebrityFanRating', userId], () => getRating(userId, bookings));

export const useRequestById = (reqId) => {
	const { isLoggedIn, data: fanData } = useFetchLoggedUser();
	const query = useQueries(
		[
			{
				queryKey: [reqId, false],
				queryFn: () => getRequestDetails(reqId, isLoggedIn)
			},
			{
				queryKey: [reqId, !!isLoggedIn],
				queryFn: () => getRequestDetails(reqId, isLoggedIn)
			},
		]
	);
	useEffect(() => {
		if (isLoggedIn) {
			query[1].refetch();
		} else {
			query[0].refetch();
		}
	}, [fanData?.user?.id]);
	const data = isLoggedIn ? query[1] : query[0];
	return {
		...data,
		data: {
			...data?.data?.data?.stargramz_response
		},
	};
};

export const usePaystackPost = (callback = null) => useMutation(paystackToPaymentService, {
	onSuccess: resp => {
		console.log('payment response', resp,);
		if (callback) callback(resp);
	}
});

export const useGetPaystackCards = () => {
	const { data: userData } = useFetchLoggedUser();
	const token = userData?.user?.fresh_desk_jwt;
	return useQuery(['loggedUser cards', token], () => getPaystackCards(token), {
		enabled: !!token
	});
};

export const useGeneralPromocode = () => {
	const { data: partnerData } = useGetPartner();
	const { entity_id: entityId, public_token: entityToken } = partnerData?.partnerData;
	return useQuery(['general-promocode', entityId, entityToken], generalPromocode);
};
