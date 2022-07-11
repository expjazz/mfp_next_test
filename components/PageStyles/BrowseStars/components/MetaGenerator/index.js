import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'
import { useTranslation } from 'next-i18next';
import { getCurrentUrl } from 'customHooks/domUtils';
// import { setMetaTags } from '../../../../utils/setMetaTags';

const MetaGenerator = ({
  pageType,
  category,
  selected,
  tag,
  featuredStars,
  topStars,
  entity
}) => {
  const { t } = useTranslation();
  const title = useMemo(() => {
    return pageType === 'category'
      ? (selected[0] && selected[0].title) || category.label
      : tag.label;
  }, [pageType, category.label, tag.label]);
  const getTitle = () => {
    if (pageType === 'category')
      return t('browse_stars.title_1', {
        label: category.label,
      });
    return t('browse_stars.title_2', {
      label: category.label,
      talent: entity.talentPlural,
      siteName: entity.siteName,
    });
  };
  const getDescription = () => {
    if (pageType === 'category')
      return t('browse_stars.title_3', {
        label: category.label.toLowerCase(),
        stars: featuredStars,
      });

    return t('browse_stars.title_4', {
      talent: entity.talentPlural,
      stars: topStars,
    });
  };

  const getKeyWords = () => {
    if (pageType === 'category') {
      if (
        category &&
        category.subCategories &&
        category.subCategories.length > 0
      ) {
        return category.subCategories
          .reduce((accumulator, currentValue) => {
            return `${accumulator}, ${currentValue.title}`;
          }, '')
          .replace(/^,|,$/g, '')
          .trim();
      }
    }
    return `${title}. ${entity.seoKeywords}`;
  };

  const imageUrl = pageType === 'tag' && tag.image ? tag.image : entity.seoImage

  if (pageType === 'category' || pageType === 'tag') {
    return (
      <Head>
        <title>{getTitle()}</title>
        <meta property="description" content={getDescription()} data-react-helmet="true"/>
        <meta property="og:title" content={getTitle()} data-react-helmet="true"/>
        <meta property="og:image" content={imageUrl} data-react-helmet="true"/>
        <meta property="og:secure_url" content={imageUrl} data-react-helmet="true"/>
        <meta property="og:site_name" content={entity.seo_site_name} data-react-helmet="true"/>
        <meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
        <meta property="og:type" content="website" data-react-helmet="true"/>
        <meta property="og:description" content={getDescription()} data-react-helmet="true"/>
        <meta property="twitter:title" content={getTitle()} data-react-helmet="true"/>
        <meta property="twitter:image" content={imageUrl} data-react-helmet="true"/>
        <meta property="twitter:site" content={entity.seo_site_name} data-react-helmet="true"/>
        <meta property="twitter:creator" content={entity.seo_site_name} data-react-helmet="true"/>
        <meta property="twitter:description" content={getDescription()} data-react-helmet="true"/>
        <meta property="keywords" content={getKeyWords()} data-react-helmet="true"/>
        {/* <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
        <meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
        <meta property="al:ios:app_store_id" content={process.env.NEXT_PUBLIC_IOS_APP_ID} data-react-helmet="true"/>
        <meta property="al:ios:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
  }://profile/?profile_id=${getUserId()}`} data-react-helmet="true"/>
        <meta property="al:ios:app_name" content={process.env.NEXT_PUBLIC_IOS_APP_NAME} data-react-helmet="true"/>
        <meta property="al:android:package" content={process.env.NEXT_PUBLIC_ANDROID_APP_ID} data-react-helmet="true"/>
        <meta property="al:android:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
  }://profile/?profile_id=${getUserId()}`} data-react-helmet="true"/>
        <meta property="al:android:app_name" content={process.env.NEXT_PUBLIC_ANDROID_APP_NAME} data-react-helmet="true"/> */}
    </Head>
    );
  }
  return (
    <Head>
      <title>{entity.seo_title}</title>
      <meta property="description" content={entity.seo_description} data-react-helmet="true"/>
      <meta property="og:title" content={entity.seo_title} data-react-helmet="true"/>
      <meta property="og:image" content={entity.seo_image} data-react-helmet="true"/>
      <meta property="og:secure_url" content={entity.seo_site_name} data-react-helmet="true"/>
      <meta property="og:site_name" content={entity.seo_site_name} data-react-helmet="true"/>
      <meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
      <meta property="og:type" content="website" data-react-helmet="true"/>
      <meta property="twitter:title" content={entity.seo_title} data-react-helmet="true"/>
      <meta property="twitter:image" content={entity.seo_image} data-react-helmet="true"/>
      <meta property="twitter:site" content={entity.seo_site_name} data-react-helmet="true"/>
      <meta property="twitter:creator" content={entity.seo_site_name} data-react-helmet="true"/>
      <meta property="keywords" content={entity.seo_keywords} data-react-helmet="true"/>
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
      <meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
    </Head>
  );
};
      // <Helmet
      //   title={getTitle()}
      //   meta={[
      //     ...setMetaTags(
      //       getTitle(),
      //       pageType === 'tag' && tag.image ? tag.image : entity('seoImage'),
      //       getDescription(),
      //       getKeyWords(),
      //     ),
      //   ]}
      // />

MetaGenerator.propTypes = {
  pageType: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  featuredStars: PropTypes.string.isRequired,
  topStars: PropTypes.string.isRequired,
};

export default MetaGenerator;
