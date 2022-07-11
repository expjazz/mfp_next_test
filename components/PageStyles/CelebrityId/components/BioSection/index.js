import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import moment from 'moment';
// import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBirthdayCake,
	faMapMarkerAlt,
	faGlobe,
} from '@fortawesome/pro-light-svg-icons';
// import { getRedirectURL } from 'customHooks/domUtils';
// import { connect } from 'react-redux';
// import Pill from 'components/Pills';
// import FundRaiser from '../FundRaiser';
import PhotoGallery from './components/Gallery';
import RecentRequests from './components/RecentRequests';
import { getUserAge } from '../../utils';
import {
	Wrapper,
	Heading,
	ContentWrapper,
	ContentList,
	Description,
	LinkItem,
} from './styled';
import { Container, SmallHeading, Headline } from '../../styled';
import { useTranslation } from 'next-i18next';
import { getRedirectURL, isVodacom } from '../../../../../customHooks/domUtils';
import Pill from '../../../../Pill';
import FundRaiser from 'components/FundRaiser';

const BioSection = props => {
	const { t } = useTranslation();
	const filteredTags = props.celebDetails.tags
		? props.celebDetails.tags.filter(tag => !tag.celebrity_profession_tag)
		: [];

	const renderCatTags = list => {
		return (
			<section className="tag-wrap">
				{list
					.map(item => ({ ...item, name: item.name || item.title }))
					.map(item => {
						return (
							<Link
								href={
									item.tag_id ? `/tag/${item.slug}` : `/category/${item.slug}`
								}
							>
								<a>
									<Pill tag={item} key={item.id} className="tag-item">
										{' '}
									</Pill>
								</a>
							</Link>
						);
					})}
			</section>
		);
	};

	const renderContentItem = stats =>
		stats.map(stat => (
			<li className="content-item">
				<span className="icon">
					<FontAwesomeIcon icon={stat.statIcon} />
				</span>
				<span className="content">
					<span className="small-title">{stat.title}</span>
					<span className="description">{stat.description}</span>
				</span>
			</li>
		));

	const getCharity = () => {
		return props.celebDetails.charity.map(charity => {
			if (charity.website) {
				return (
					<LinkItem href={getRedirectURL(charity.website)} target='_blank'>
						{charity.charity}
					</LinkItem>
				);
			}
			return charity.charity;
		}).reduce((prev, curr) => [prev, ', ', curr]);
	};

	const handleDateYear = date => {
		// const array = date.split('/')
		// const year = array[array.length - 1]
		// if (year === '2020' || year === '2021') {
		//   return t('common.ageDisplayNoYear', {
		//     date: moment(date).format('MMM DD')
		//   })
		// }
		return t('common.ageDisplay', {
			date: moment(date).format('MMM DD, YYYY'),
			age: getUserAge(date),
		});

	};

	return (
		<Container config={props.config} className={props.classes.root}>
			<Wrapper>
				<Heading config={props.config}>{t('star_profile.about_me')}</Heading>
				<ContentWrapper>
					{renderCatTags([
						...props.celebDetails.profession_details,
						...filteredTags,
					])}
					<Description className="desc">
						{props.celebDetails.charity &&
              props.celebDetails.charity.length > 0 && !isVodacom() && (
							<span className="charity">
								{t('star_profile.supports')}: {getCharity()}
							</span>
						)}
					</Description>
					<Description className='LinesEllipsis'>
						{props.celebDetails.description}
					</Description>
					<FundRaiser />
				</ContentWrapper>
				{props.dateOfBirth ? (
					<ContentWrapper>
						<SmallHeading>{t('common.stats')}</SmallHeading>

						<ContentList>
							{renderContentItem([
								{
									title: t('common.dob'),
									statIcon: faBirthdayCake,
									description: handleDateYear(props.dateOfBirth),
								},
								{
									title: t('common.home_town'),
									statIcon:faGlobe,
									description:props.celebDetails.location?.home_town || '',
								},
								{
									title:t('common.current_town'),
									statIcon:faMapMarkerAlt,
									description:props.celebDetails.location?.current_town || '',
								}
							])}
						</ContentList>
					</ContentWrapper>
				) : null}
				<PhotoGallery
					celebId={props.id}
					classes={{ root: 'gallery-root accent-bg' }}
				/>
				{props.celebDetails.headline ? (
					<ContentWrapper paddingBottom="15px">
						<Headline>{`"${props.celebDetails.headline}"`}</Headline>
					</ContentWrapper>
				) : null}
				<RecentRequests
					config={props.config}
					celebId={props.id}
					userDetails={props.userDetails}
					isStar={props.isStar}
					toggleBookingModal={props.toggleBookingModal}
					isBookable={props.isBookable}
					celebDetails={props.celebDetails}
				/>
			</Wrapper>
		</Container>
	);
};

BioSection.defaultProps = {
	config: {},
	classes: {},
	dateOfBirth: '',
};

BioSection.propTypes = {
	celebDetails: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	shortName: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	dateOfBirth: PropTypes.string,
	config: PropTypes.object,
	classes: PropTypes.object,
	headline: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	userDetails: PropTypes.object.isRequired,
	isStar: PropTypes.bool.isRequired,
	toggleBookingModal: PropTypes.func.isRequired,
	isBookable : PropTypes.bool.isRequired,
};

// const mapStateToProps = state => ({
//   id: state.starDetails.celebDetails.userDetails.id,
//   location: state.starDetails.celebDetails.celebrityDetails.location,
//   headline: state.starDetails.celebDetails.celebrityDetails.headline,
//   dateOfBirth: state.starDetails.celebDetails.userDetails.date_of_birth_full,
//   videosList: state.starDetails.celebVideos,
// });

export default BioSection;
