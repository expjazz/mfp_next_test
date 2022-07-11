import React, { useState } from 'react';
import Link from 'next/link'
import { useTranslation } from 'next-i18next';
// import Truncate from 'react-truncate';
import Pill from 'components/Pills';
// import { useMedia, getRedirectURL } from 'src/utils/domUtils';
// // import StarRating from 'components/StarRating';
// import FundRaiser from '../FundRaiser';
import {
  More,
} from '../../styled';
import {
  Wrap,
  Charity,
  PillList,
  RateSection,
} from './styled';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';

const StarDetails = ({

  description,
  charity,
  rating,
  showFollow,
  ratingCount,
}) => {
  const { t } = useTranslation();
  const { data: celebrityData } = useGetCelebrityData()
  const tags = celebrityData?.celebrity_details.tags
  const professions = celebrityData?.celebrity_details.profession_details
  const filteredTags = tags
  ? tags.filter(tag => !tag.celebrity_profession_tag)
  : [];
  // const isDesktop = useMedia('(min-width: 1280px)');

  const [expanded, expandDesc] = useState(false);

  const renderTagsList = () => {
    return filteredTags.map(tag => {
      return (
        <Link key={tag.id} href={`/tag/${tag.slug}`}>
          <a>
            <Pill
              tag={tag}
              key={tag.id}
              className="pill-item"
            >
              {' '}
            </Pill>
          </a>
        </Link>
      );
    })
  };

  const getProfessions = list => {
    return list && list.map(profession => (
      <Link key={profession.id} href={`/category/${profession.slug}`}>
        <a >
          <Pill
            tag={{name: profession.title}}
            key={profession.id}
            className="pill-item"
          >
            {' '}
          </Pill>
        </a>
      </Link>
    ))
  };

  // const getCharity = () => {
  //   const renderComma = (index) => index !== (charity.length - 1) ? ', ' : null;
  //   return charity.map((char, index) => {
  //     if (char.website) {
  //       return (
  //         <a
  //           className='char-link'
  //           target="_blank"
  //           key={char.charity_id}
  //           href={getRedirectURL(char.website)}
  //         >
  //           {char.charity}{renderComma(index)}
  //         </a>
  //       )
  //     }
  //     return <span key={char.charity_id}>{char.charity}{renderComma(index)}</span>
  //   })
  // };
  return (
    <Wrap>
      <PillList>
        {getProfessions(professions)}
        {renderTagsList()}
      </PillList>
      {/* {
        charity && Object.values(charity).length > 0 &&
          <Charity>
            {t('star_profile.supports')}: {getCharity()}
          </Charity>
      }
      <Truncate
        lines={!expanded && 3}
        ellipsis={<More onClick={() => expandDesc(true)}>{t('common.more')}</More>}
        className='LinesEllipsis'
      >
        {description}
      </Truncate>
      <RateSection showFollow={showFollow}>
        <span className='rate-section'>
          {
            rating >0 &&
              <StarRating readOnly ratingClass="rate-root" rating={rating} />
          }
          {ratingCount ? `${ratingCount} ${t('common.reviews')}` : ''}
        </span>
      </RateSection>
      {
        !isDesktop &&
          <FundRaiser />
      } */}
    </Wrap>
  )
}

// const mapStateToProps = state => ({
//   professions: state.starDetails.celebDetails.celebrityDetails.profession_details,
//   tags: state.starDetails.celebDetails.celebrityDetails.tags,
//   description: state.starDetails.celebDetails.celebrityDetails.description,
//   charity: state.starDetails.celebDetails.celebrityDetails.charity,
//   rating: state.starDetails.celebDetails.celebrityDetails.rating,
//   ratingCount: state.starDetails.celebDetails.celebrityDetails.rating_count,
// })

export default StarDetails
