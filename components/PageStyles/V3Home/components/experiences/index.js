import React from 'react';
import { ItemContainer, ExperiencesContainer } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import HorizontalListing from '../../../../HorizontalListing';
import { useMediaQuery } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { generalLinkHash, superSportLinkHash } from './constants';
// import { useMedia } from '../../../../customHooks/domUtils';


function Experiences({data}) {
	const isMedium = useMediaQuery('(max-width: 950px)');
	const duplicate = data && data.length ? [...data.map(row => row)] : [];
	const { data: entityData } = useGetPartner();
	let linkHash;
	const entityId = entityData?.partnerData?.entity_id;

	// Allowing to change the links and images per entity
	switch(entityId) {
	case 'STARSONA-US-1':
		linkHash = superSportLinkHash;
		break;
	default:
		linkHash = generalLinkHash;
		break;
	}
	const carouselWidth = '190px';
	const treatUrl = url => url?.[0] === '/' ? url : `/${url}`;
	function expSlide(row) {
		return (
			<Link href={row.url ? `/${row?.url}` : treatUrl(linkHash[row.title])} key={row.title} passHref prefetch={true}>

				<ItemContainer
					bgImage={row.image}
					style={{
						'--width': carouselWidth
					}}>
					<div className="gradient rounded-3xl"></div>
					<div className="width">

						<Image
							src={row.image}
							alt={row?.title || 'categories'}
							layout="fill"
							priority
							objectFit="cover"
							className="rounded-3xl bg rounded rounded-corners"
						/>
					</div>

					<div className="content">
						<div className="container-top">

							<h3 className="title"> {row.title} </h3>
						</div>
						<div className="container-bottom">

							<p className="description">{row.description}</p>
						</div>
					</div>

				</ItemContainer>
			</Link>
		);
	}
	const left = () => (
		<div className="left">

			<FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
		</div>

	);
	const right = () => (
		<div className="right">

			<FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
		</div>

	);
	return (
		<ExperiencesContainer>
			<HorizontalListing
				customVisibility
				classes={{root: 'list-root', arrowWrapper: 'custom-arrow'}}
				scrollId='star-list-scroll'
				showArrows={duplicate.length > 4 || isMedium}
				onScroll={false}
				dataList={duplicate}
				fixedContent
				icons={{right: right(), left: left()}}
				renderContent={expSlide}
				totalCount={duplicate.length}
				scrollProps={{
					autoHeight: true,
					autoHeightMax: 550,
				}}
			/>


		</ExperiencesContainer>
	);
}

export default Experiences;
