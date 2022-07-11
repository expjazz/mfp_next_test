import moment from 'moment';
import { offerCatalogs } from './utils';
import { isProductActive } from '../../utils';

const getSocialLinks = links => {
  return links.map(link => link.social_link_value);
};

export const generateProductSchema = (userProps, prodList = []) => {
  const { userDetails } = userProps;

  const getAggregate = item =>
    item.average_rate
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.average_rate,
            reviewCount: item.rating_count,
          },
        }
      : {};

  const getReview = item =>
    item.average_rate
      ? {
          review: {
            '@type': 'Review',
            author:
              item.comment && item.comment.user_name
                ? item.comment.user_name
                : '',
            datePublished: moment(item.created_date).format('YYYY-MM-DD'),
            description:
              item.comment && item.comment.comments
                ? item.comment.comments
                : '',
            reviewRating: {
              '@type': 'Rating',
              bestRating: item.max_rate,
              ratingValue: item.average_rate,
              worstRating: item.min_rate,
            },
          },
        }
      : {};

  return prodList
    .filter(prod => prod.quantity - (prod.sold + prod.in_progress) > 0)
    .map(prod =>
      JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'Product',
        image: prod.product_image ? prod.product_image[0] : '',
        url: `${process.env.BASE_URL}/${userDetails.user_id}`,
        name: prod.title,
        description: prod.description,
        brand: {
          '@type': 'Thing',
          name: `${userDetails.starName} Merchandise`,
        },
        ...getAggregate(prod),
        ...getReview(prod),
        mpn: prod.product_id,
        sku: prod.product_id,
        offers: {
          '@type': 'Offer',
          price: prod.price,
          priceCurrency: 'USD',
          availability: 'InStock',
          priceValidUntil: moment()
            .add(1, 'M')
            .format('YYYY-MM-DD'),
          url: `${process.env.BASE_URL}/${userDetails.user_id}`,
        },
      }),
    );
};

const generateOfferCatalog = (
  services = {},
  socialList = [],
  digGoods = [],
  userId = '',
) => {
  const getChildItem = items => {
    const filtItems = items.filter(item => isProductActive(item.key, services));
    return filtItems.map(item => ({
      '@type': 'Service',
      name: `${item.name}`,
      url: `${item.url}`,
    }));
  };
  let serviceItems = [];
  offerCatalogs(socialList, digGoods, userId).forEach(off => {
    const offerItem = {
      '@type': 'OfferCatalog',
      name: `${off.name}`,
    };
    const childItems = getChildItem(off.itemList);
    if (childItems.length) {
      serviceItems = [
        ...serviceItems,
        {
          ...offerItem,
          itemListElement: childItems,
        },
      ];
    }
  });
  return serviceItems;
};

export const generateUserSchema = (userProps, socialList, digGoods) => {
  const { userDetails, celebDetails } = userProps;
  const schemaObj = {
    '@context': 'http://schema.org/',
    '@type': 'Service',
    serviceType: 'Personalized Celebrity Messages and Online Interactions',
    provider: {
      '@type': 'Person',
      name: `${userDetails.starName}`,
      sameAs: [...getSocialLinks(userDetails.social_links)],
    },
    broker: {
      '@type': 'Organization',
      name: 'siteName',
      logo: `${process.env.NEXT_PUBLIC_ORIGIN_BASE_URI}/images/logo_starsona.svg`,
      sameAs: [
        `${process.env.NEXT_PUBLIC_ORIGIN_BASE_URI}`,
        'https://twitter.com/getstarsona',
        'https://www.instagram.com/getstarsona',
        'https://www.facebook.com/getstarsona',
        'https://www.linkedin.com/company/starsona/',
      ],
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Messaging and Interactions',
      itemListElement: generateOfferCatalog(
        celebDetails.services,
        socialList,
        digGoods,
        userDetails.user_id,
      ),
    },
  };
  return JSON.stringify(schemaObj);
};
