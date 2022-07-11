import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { times } from 'lodash';
// import Masonry from 'masonry-layout';
// import StarBlock from '../StarBlock';
import ListingStyled, {
	mobMargin,
	desktopMargin,
	mobileWidth,
	desktopWidth,
} from './styled';
// import { useMedia } from '../../utils/domUtils';
// import { withScroll } from '../../services/withScroll';
// import { times } from '../../src/utils/dataStructures';
// import StarBlock from '../StarBlock';
import { withScroll } from '../withScroll';
import { useMediaQuery } from '@material-ui/core';
import { times } from '../../src/utils/dataStructures';
import StarBlock from '../StarBlock';

const StarListing = props => {
	const mobile = useMediaQuery('(max-width: 831px)');
	const smallDesktop = useMediaQuery('(min-width: 832px)');
	const desktop = useMediaQuery('(min-width: 1280px)');
	const listingRef = useRef(null);
	const masonry = useRef(null);
	const [rowElementCount, setRowEleCount] = useState(0);


	const reStartMasonryOnResize = async () => {
		const Masonry = (await import('masonry-layout')).default;
		if (smallDesktop || desktop) {
			if (masonry.current) {
				masonry.current.destroy();
			}
		} else if (mobile) {
			setTimeout(() => {
				masonry.current = new Masonry(listingRef.current, {
					itemSelector: '.grid-item',
					transitionDuration: 0,
					fitWidth: true,
					gutter: 10,
				});
			}, 0);
		}
	};

	// This is for keeping the grid centered on resize


	const onResize = () => {
		if (listingRef.current) {
			const margin = mobile ? mobMargin : desktopMargin;
			setRowEleCount(
				Math.floor(
					listingRef.current.parentNode.clientWidth / (desktopWidth + margin),
				) === 1
					? 2
					: Math.floor(
						listingRef.current.parentNode.clientWidth /
                (desktopWidth + margin),
					),
			);
		}
		reStartMasonryOnResize();
	};

	useEffect(() => {
		window.addEventListener('resize', onResize);
		onResize();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [listingRef.current]);

	useEffect(async () => {
		const Masonry = (await import('masonry-layout')).default;
		if (smallDesktop || desktop) {
			if (masonry.current) {
				masonry.current?.destroy();
			}
		} else if (mobile) {
			setTimeout(() => {
				masonry.current = new Masonry(listingRef.current, {
					itemSelector: '.grid-item',
					transitionDuration: 0,
					fitWidth: true,
					gutter: 10
				});
			}, 0);
		}
	}, [smallDesktop, props.dataList.length, props.loading]);

	const isNewRow = elementPosition => {
		return elementPosition % rowElementCount === 0;
	};

	const renderLoader = () => {
		const loadingLength = rowElementCount;
		const loadingArray = times(loadingLength, String);
		return loadingArray.map((loader, index) => (
			<ListingStyled.Content
				className="grid-item loading-item"
				hidden={!props.loading}
				key={index}
			>
				<ListingStyled.LoadingIcon />
			</ListingStyled.Content>
		));
	};
	const renderContent = (data, index) => {
		const currentRow = index / rowElementCount;
		return (
			<React.Fragment key={index}>
				{isNewRow(index) &&
          props.renderRowMessage &&
          props.renderRowMessage(
          	currentRow,
          	desktop || smallDesktop
          		? ListingStyled.RowContent
          		: ListingStyled.Content,
          )}
				<ListingStyled.Content className="grid-item" key={index}>
					<StarBlock
						star={data}
						entityData={props.entityData}
						professions={props.professions}
						currencyData={props.currencyData}
					/>
				</ListingStyled.Content>
			</React.Fragment>
		);
	};
	return (
		<article>
			<ListingStyled
				key={rowElementCount}
				rowCount={rowElementCount}
				ref={listingRef}
			>
				{props.dataList.map((data, index) => renderContent(data, index))}
				{renderLoader()}
			</ListingStyled>
		</article>
	);
};

StarListing.defaultProps = {
	renderRowMessage: false,
};

StarListing.propTypes = {
	dataList: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	renderRowMessage: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default withScroll(StarListing);
