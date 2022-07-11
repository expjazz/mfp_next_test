import React, { useReducer } from 'react';
import { ItemContainer, ExperiencesContainer } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring';
import { useMediaQuery } from '@material-ui/core';
// import { useMedia } from '../../../../customHooks/domUtils';
import Image from 'next/image';
import Link from 'next/link';
import { getBookingsFrontPageDefault, getBookingsFrontPageSuperSport, getBookingsMyFanPark } from './constants';
import { useGetPartner } from 'customHooks/reactQueryHooks';
const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

const reducer = (state, action) => {
	const tempState = [...state];
	tempState[action.field] = action.payload;
	switch(action.type) {
	case 'hover':
		return tempState;
	default:
		return state;
	}
};

function Bookings() {

	let data = null;
	const { data: entityData } = useGetPartner();
	const entityId = entityData?.partnerData?.entity_id;
	let width = '32%';
	switch(entityId) {
	case 'SUPERSPORT-ZA-1':
		data = getBookingsFrontPageSuperSport;
		break;
	case 'NEXTJS-US-1':
		data = getBookingsMyFanPark;
		width = '24%';
		break;
	case 'NEXTJS-ZA-1':
		data = getBookingsMyFanPark;
		width = '24%';
		break;
	case 'TTWITHME-US-1':
		data = getBookingsFrontPageDefault;
		width = '32%';
		break;
	case 'TTWITHME-ZA-1':
		data = getBookingsFrontPageDefault;
		width = '32%';
		break;
	default:
		data = getBookingsMyFanPark;
		width = '24%';
		break;
	}

	const initialState = data.map(() => false);
	const [state, localDispatch] = useReducer(reducer, initialState);
	const titleStyle = {
		from: { opacity: 0, display: 'block' },
		enter: { opacity: 1 },
		leave: { opacity: 0, display: 'none'  },
		config: { tension: 550, friction: 120 },
	};
	const subTitleStyle = {
		from: { opacity: 0, display: 'block', height: 0, width: 0 },
		enter: { opacity: 1, height: 'auto', width: 'auto', delay: 200 },
		leave: { opacity: 0, height: 'auto', width: 'auto', display: 'none'},
		config: { tension: 350, friction: 120 },
	};
	const firstTitle = useTransition(!state[0], titleStyle);
	const secondTitle = useTransition(!state[1], titleStyle);
	const thirdTitle = useTransition(!state[2], titleStyle);
	const fourthTitle = useTransition(!state[3], titleStyle);
	const fifthTitle = useTransition(!state[4], titleStyle);
	const sixthTitle = useTransition(!state[5], titleStyle);
	const seventhTitle = useTransition(!state[6], titleStyle);
	const eigthTitle = useTransition(!state[7], titleStyle);
	const ninethTitle = useTransition(!state[8], titleStyle);
	const firstSub = useTransition(state[0], subTitleStyle);
	const secondSub = useTransition(state[1], subTitleStyle);
	const thirdSub = useTransition(state[2], subTitleStyle);
	const fourthSub = useTransition(state[3], subTitleStyle);
	const fifthSub = useTransition(state[4], subTitleStyle);
	const sixthSub = useTransition(state[5], subTitleStyle);
	const seventhSub = useTransition(state[6], subTitleStyle);
	const eigthSub = useTransition(state[7], subTitleStyle);
	const ninethSub = useTransition(state[8], titleStyle);
	const arr = [firstTitle, secondTitle, thirdTitle, fourthTitle, fifthTitle, sixthTitle, seventhTitle, eigthTitle, ninethTitle];
	const arrSub = [firstSub, secondSub, thirdSub, fourthSub, fifthSub, sixthSub, seventhSub, eigthSub, ninethSub];
	const isMobile = useMediaQuery('(max-width: 831px)');

	const onEnter = (e, field) => {
		if (isMobile) return;
		localDispatch({
			type: 'hover',
			field,
			payload: true
		});
	};
	const onLeave = (e, field) => {
		if (isMobile) return;
		localDispatch({
			type: 'hover',
			field,
			payload: false
		});
	};
	function bookingSlide(row, index, props) {
		return (
			<Link href={row.url[0] === '/' ? row.url : `/${row.url}`} passHref>

				<ItemContainer
					// href={`/${row.url}`}
					bgImg={row.image}
					key={row.image}
					onMouseEnter={e => onEnter(e, index)}
					onMouseLeave={e => onLeave(e, index)}
					style={{
						'--width': width
					}}
				>
					{/* <div className="gradient"></div> */}

					<Image
						src="/images/homepage-v3/squared-pink.png"
						alt="red"
						layout="fill"
						objectFit="cover"
						sizes='10vw'
						className="gradient"
					/>

					<Image
						src={row.image}
						alt={'getStarName(row)'}
						layout="fill"
						objectFit="cover"
						sizes='10vw'
						className="bg"
					/>

					<div className="container">
						{row.title === 'MORE' ? (
							<div className="more">
								{
									!state[index] && (
										<FontAwesomeIcon icon={faEllipsisH} />
									)
								}

							</div>
						) : (
							<React.Fragment>
								{
									arr[index]((style, item) => item && (

										<animated.h3 style={style} className="title"> {row.title} </animated.h3>
									))
								}
							</React.Fragment>
						)}

						{
							arrSub[index]((style, item) => item && (

								<animated.h3 style={{...style, marginBottom: '5px'}} className="title"> {row.title} </animated.h3>
							))
						}

						{
							arrSub[index]((style, item) => item && (
								<animated.p style={style} className="subtitle"> {row.subtitle} </animated.p>
							))}
					</div>

				</ItemContainer>
			</Link>
		);
	}
	return (
		<ExperiencesContainer>

			{data.map((item, index) => bookingSlide(item, index))}

		</ExperiencesContainer>
	);
}

export default Bookings;

// {
// arrSub[index]((style, item) => item && (
//   <animated.p style={style} className="subtitle"> {row.subtitle} </animated.p>
// ))}