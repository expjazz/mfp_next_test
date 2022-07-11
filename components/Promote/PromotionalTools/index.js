import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Heading, Description } from 'styles/TextStyled';
import { Card, EmptyText, NotificationCount } from 'styles/CommonStyled';
import PromoTemplate from 'components/PromoTemplates';
import Dropdown from 'components/Dropdown';
import {
	sharePromoProfile,
	updateCelebrityShare,
	shareCustomPromoImg,
	markCustomImgAsViewed,
} from 'src/services';
import Carousel from 'components/Carousel';
import ShareButton from 'components/ShareButton';
import { getStarName } from 'src/utils/dataToStringFormatter';
import DownloadHandler from 'components/DownloadHandler';
import { catOptions } from './constants';
import { Layout } from './styled';
// import { fetch } from 'services/fetch';
import { useRouter } from 'next/router';
import { useGetCustomPromoImgs, useGetPartner, useGetPromoCat, useGetPromoList } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, useGeneral } from 'src/context/general';

const PromoTools = props => {
	const router = useRouter();
	const [selCat, setCat] = useState({});
	const {data: entityData} = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const [_, dispatch] = useGeneral();
	const { data: promoList, isFetching: promoListFetching, isLoading: promoListLoading } = useGetPromoList(selCat.type === 'category' ? selCat.key : '',
		selCat.type !== 'category' ? selCat.key : '',
		userData?.user.partner_entity_id);
	const { data: promoImg, isFetching: promoImgFetching, isLoading: promoImgLoading } = useGetCustomPromoImgs(userData?.user?.id);
	const { data: promoCat } = useGetPromoCat();
	useEffect(() => {
		if (promoCat) {
			const arr = [...promoCat.catList, ...promoCat.occasList];
			const { category, occasion } = router.query;
			const foundCat = arr?.find(cat => cat.key === category || cat.key === occasion);
			if (foundCat) {
				setCat(foundCat);
			}
		}
	}, [router.query.category, router.query.occasion, promoCat]);
	const fullyLoaded = !promoImgLoading && !promoImgLoading && !promoListFetching && !promoImgFetching;
	useEffect(() => {
		if (promoListLoading || promoImgLoading || promoListFetching || promoImgFetching) {
			generalLoader(dispatch, true);
		}
		if (fullyLoaded) {
			generalLoader(dispatch, false);
		}
	}, [promoListLoading, promoImgLoading, promoListFetching, promoImgFetching, selCat, dispatch, fullyLoaded]);
	const { t } = useTranslation();
	const viewedRef = useRef([]);
	const [carouselData, setCarouselData] = useState([]);
	const getCount = arr => {
		if (!arr.length) {
			return null;
		}
		let count = 0;
		arr.forEach(row => {
			if (!row.viewed) {
				count += 1;
			}
		});
		return count === 0 ? null : count;
	};
	const optionsList = useMemo(() => {
		const options =
      promoImg && promoImg?.length
      	? [
      		{
      			title: 'Customized images',
      			id: -1,
      			type: 'customizedImages',
      			count: getCount(promoImg),
      		},
      		...catOptions(t),
      		...promoCat?.catList,
      		...promoCat?.occasList,
      	].map(item => ({
      		label: item.title,
      		key: item.id,
      		type: item.type,
      		count: item.count,
      	}))
      	: [
      		...catOptions(t),
      		...promoCat?.catList,
      		...promoCat?.occasList,
      	].map(item => ({
      		label: item.title,
      		key: item.id,
      		type: item.type,
      		count: item.count,
      	}));
		return options;
	}, [
		promoCat?.catList.length,
		promoCat?.occasList.length,
		promoImg?.length,
	]);

	const getNote = () => {
		return (
			<React.Fragment>
				<h2 className="promo-head">{t('promote_page.promotional.heading')}</h2>
				<Description className="promo-note">
					{t('promote_page.promotional.description')}
				</Description>
			</React.Fragment>
		);
	};

	const beforeShare = (tid, template) => type => {
		props.loaderAction(true);
		return new Promise((resolve, reject) => {
			if (template.customPromo) {
				const promiseList = [
					shareCustomPromoImg(userData?.user.user_id, tid),
				];
				Promise.all(promiseList)
					.then(() => {
						props.loaderAction(false);
						resolve();
					})
					.catch(exception => {
						props.loaderAction(false);
						reject();
						props.updateToast({
							value: true,
							message: exception.response.data.error.message,
							variant: 'error',
							global: false,
						});
					});
			} else {
				const promiseList = [
					updateCelebrityShare('celebrity', { type, tid }),
					sharePromoProfile(userData?.user.user_id, tid),
				];
				Promise.all(promiseList)
					.then(() => {
						props.loaderAction(false);
						resolve();
					})
					.catch(exception => {
						props.loaderAction(false);
						reject();
						props.updateToast({
							value: true,
							message: exception.response.data.error.message,
							variant: 'error',
							global: false,
						});
					});
			}
		});
	};

	const downloadTemplate = (profile, key) => () => {
		props.loaderAction(true);
		if (profile.customPromo) {
			shareCustomPromoImg(userData?.user.user_id, profile.id)
				.then(resp => {
					props.loaderAction(false);
					if (resp.data) props.downloadFunc(resp.data[key], true, false);
				})
				.catch(exception => {
					props.loaderAction(false);
					props.updateToast({
						value: true,
						message: exception.response.data.error.message,
						variant: 'error',
					});
				});
		} else {
			sharePromoProfile(userData?.user.user_id, profile.id)
				.then(resp => {
					props.loaderAction(false);
					if (resp.data) props.downloadFunc(resp.data[key], true, false);
				})
				.catch(exception => {
					props.loaderAction(false);
					props.updateToast({
						value: true,
						message: exception.response.data.error.message,
						variant: 'error',
					});
				});
		}
	};

	const getTemplate = (profile, isActive, index) => {
		const tid = profile.id;
		let shareUrl = `${window.location.origin}/${userData?.user.user_id}?tid=${tid}`;
		if (profile.customPromo && profile.background_url){
			const fileName = profile.background_url.split('/');
			shareUrl += `&ct=${fileName[fileName.length - 1]}`;
		}
		let temp = profile.template;
		temp = temp.replace('background_url', profile.background_url);
		temp = temp.replace('profile_pic', userData?.user?.avatarPhoto);
		temp = temp.replace(
			'full_name',
			userData?.user &&
        getStarName(
        	userData?.user.nick_name,
        	userData?.user.first_name,
        	userData?.user.last_name,
        ),
		);

		// Marking the promo image as viewed
		if (selCat.type === 'customizedImages' && promoImg?.length) {
			if (
				promoImg[index] &&
        !promoImg[index].viewed &&
        !viewedRef.current.includes(promoImg[index].id)
			) {
				viewedRef.current.push(promoImg[index].id);
				markCustomImgAsViewed(promoImg[index].id);
			}
		}
		const services = {
			facebook: profile.has_facebook,
			twitter: true,
			email: true,
			sms: true,
			instagram: true,
			instagramStory: profile.has_instagram,
		};
		// Here we have the option to customize in where each image can be shared.
		if (
			profile.customPromo
		) {
			Object.keys(services).forEach(key => {
				if (!profile.social_links.includes(key)) {
					if (
						key === 'instagramStory' &&
            !profile.social_links['instagram social']
					) {
						services[key] = false;
					} else {
						services[key] = false;
					}
				} else {
					services[key] = true;
				}
			});
		}
		return (
			<React.Fragment>
				{isActive && (
					<ShareButton
						buttonText={t('promote_page.promotional.share_btn_text')}
						shareUrl={shareUrl}
						beforeShare={beforeShare(tid, profile)}
						services={services}
						facebookLikeInstagram
						popperProps={{
							disablePortal: false,
							style: {
								zIndex: 6,
							},
						}}
						onInstaClick={
							services.instagram
								? downloadTemplate(profile, 'promotional_image_url')
								: null
						}
						onStoryClick={
							services.instagramStory
								? downloadTemplate(
									profile,
									profile.customPromo
										? 'promotional_image_url'
										: 'promotional_instagram_url',
								)
								: null
						}
						classes={{ root: 'share-root' }}
					/>
				)}
				<PromoTemplate
					template={temp}
					selected={isActive}
					template_style={profile.template_style}
				/>
			</React.Fragment>
		);
	};

	const onDropListRender = (list, remProps) => {
		return (
			<React.Fragment>
				{list.map((item, index) => {
					return (
						<React.Fragment key={item.value}>
							<remProps.Component
								tabIndex="0"
								className={`droplist-item ${promoCat?.catList.length &&
                  index === promoCat?.catList.length - 1 &&
                  promoCat?.occasList.length > 0 &&
                  'cat-divider'}`}
								onClick={remProps.onClick(item)}
								onKeyUp={remProps.onKeyUp(item)}
								key={item.value}
							>
								{item.label}
								{item.count && Number(item.count) > 0 && (
									<NotificationCount className="count-li">
										{item.count}
									</NotificationCount>
								)}
							</remProps.Component>
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	};

	useEffect(() => {
		if (optionsList && optionsList.length) {
			const { category, occasion } = router.query;
			const foundCat = optionsList.find(
				opItem => opItem.key === category || opItem.key === occasion,
			);
			setCat(foundCat || optionsList[0] || {});
		}
	}, [
		promoCat?.catList.length,
		promoCat?.occasList.length,
		optionsList,
	]);

	useEffect(() => {
		if (selCat.type === 'customizedImages') {
			setCarouselData(
				promoImg?.map(row => ({
					background_url: row.image,
					template: `
          <div class="custom-container-wrap" >
          <div class="custom-temp-wrap" style="position:relative;width: 1080px;" >
            <img src=${row.image} style="width: 100%; height: 100%; background-size: contain; display: inline-block; background-repeat: no-repeat;" >
            </img>
          </div>
        </div>
        `,
					hasInstagram: row.social_links.instagram,
					id: row.id,
					customPromo: true,
					template_style: null,
					social_links: row.social_links
				})),
			);
		} else if (selCat.key) {
			const auxArr = [
				...promoImg
					.map(row => ({
						background_url: row.image,
						template: `
              <div class="custom-container-wrap" >
                <div class="custom-temp-wrap" style="position:relative;width: 1080px; " >
                  <img src=${row.image} style="width: 100%; height: 100%; background-size: contain; display: inline-block; background-repeat: no-repeat;" >
                  </img>
                </div>
              </div>
            `,
						hasInstagram: row.social_links.instagram,
						id: row.id,
						customPromo: true,
						template_style: null,
						category: row.category ? row.category.title : null,
						all: selCat.label?.includes('All'),
						social_links: row.social_links

					}))
					.filter(row => (row.all || row.category === selCat.label ? row : null)),
				...promoList,
			];


			setCarouselData(auxArr);
		}
	}, [selCat.key, promoList, promoImg]);

	// useEffect(() => {
	//   const auxArr = [
	//     ...promoImg
	//       .map(row => ({
	//         background_url: row.image,
	//         template: `
	//         <div class="custom-container-wrap" >
	//           <div class="custom-temp-wrap" style="position:relative;width: 1080px; " >
	//             <img src=${row.image} style="width: 100%; height: 100%; background-size: contain; display: inline-block; background-repeat: no-repeat;" >
	//             </img>
	//           </div>
	//         </div>
	//       `,
	//         hasInstagram: row.social_links.instagram,
	//         id: row.id,
	//         customPromo: true,
	//         template_style: null,
	//         category: row.category ? row.category.title : null,
	//         all: selCat.label?.includes('All'),
	//         social_links: row.social_links

	//       }))
	//       .filter(row => (row.all || row.category === selCat.label ? row : null)),
	//     // ...promoList,
	//   ];
	//   if (
	//     selCat.type !== 'customizedImages' &&
	//     auxArr.length !== carouselData.length
	//   ) {
	//     setCarouselData(auxArr);
	//   }
	// }, [promoList]);

	useEffect(() => {
		if (selCat.key === -1 && promoImg?.length !== carouselData.length) {
			setCarouselData(
				promoImg?.map(row => ({
					background_url: row.image,
					template: `
          <div class="custom-container-wrap" >
            <div class="custom-temp-wrap" style="position:relative;width: 1080px; " >
              <img src=${row.image} style="width: 100%; height: 100%; background-size: contain; display: inline-block; background-repeat: no-repeat;" >
              </img>
            </div>
          </div>
        `,
					hasInstagram: true,
					customPromo: true,
					id: row.id,
					template_style: null,
					social_links: row.social_links

				})),
			);
		}
	}, [promoImg]);

	// useEffect(() => {
	//   props.getPromoCat();
	//   props.getPromoImgs(userData?.user.id);
	// }, []);

	const emptyText = () => {
		return fullyLoaded ? (
			<EmptyText>
				{t('promote_page.promotional.no_promotional_images')}
			</EmptyText>
		) : null;
	};

	return (
		<Layout>
			<Heading className="card-heading">
				{t('promote_page.promotional.share_on_social')}
			</Heading>
			<Card className="card-layout">
				{getNote()}
				<Dropdown
					options={optionsList}
					selected={selCat}
					labelKey="label"
					valueKey="key"
					placeHolder={t('promote_page.promotional.placeholder')}
					className="cat-drop"
					listRender={onDropListRender}
					classes={{ scrollbar: 'scroll-wrap', list: 'drop-list' }}
					onChange={setCat}
				/>
				{carouselData && carouselData.length > 0 ? (
					<Carousel
						key={selCat.key}
						getComponent={getTemplate}
						data={carouselData}
					></Carousel>
				) : emptyText()}
			</Card>
		</Layout>
	);
};

export default DownloadHandler(PromoTools);

PromoTools.propTypes = {
	getPromoCat: PropTypes.func.isRequired,

	promoCat: PropTypes.array.isRequired,

	userDetails: PropTypes.object.isRequired,

	promoList: PropTypes.array,

	getPromoList: PropTypes.func.isRequired,

	loaderAction: PropTypes.func.isRequired,

	updateToast: PropTypes.func.isRequired,

	getPromoImgs: PropTypes.func.isRequired,
};

PromoTools.defaultProps = {
	promoList: [],
};
