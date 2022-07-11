import { requestTypesKeys } from 'src/constants/requestTypes';

const entity = value => value
export const options = (trans = null) => {
  const t = trans ? trans : value => value
  console.log(t, 't value')
  return [
  {
    title: t('open_bookings.options.open'),
    id: 'open',
  },
  {
    title: t('open_bookings.options.completed'),
    id: 'completed',
  },
  {
    title: t('open_bookings.options.cancelled'),
    id: 'cancelled',
  },
  {
    title: t('open_bookings.options.commercial'),
    id: 'commercial',
  },
];}

export const filterOptions = (trans = null) => {
  const t = trans ? trans : value => value
  console.log(t, 't value')
  return [
  {
    title: t('open_bookings.filterOptions.all'),
    id: '',
  },
  {
    title: t('open_bookings.filterOptions.rated'),
    id: 'rated',
  },
  {
    title: t('open_bookings.filterOptions.comments'),
    id: 'comments',
  },
  {
    title: t('open_bookings.filterOptions.reactions'),
    id: 'reactions',
  },
  {
    title: t('open_bookings.filterOptions.tips'),
    id: 'tips',
  },
  {
    title: t('open_bookings.filterOptions.favorites'),
    id: 'favorites',
  },
]};

export const sortBy = (trans = null, entityData = null) => {
  const t = trans ? trans : value => value
  console.log(t, 't value')
  return [
  {
    title: t('open_bookings.sortBy.mostRecent'),
    id: '',
  },
  {
    title: t('open_bookings.sortBy.oldest'),
    id: 'oldest',
  },
  {
    title: t('open_bookings.sortBy.recent', {
      purchaser: entityData?.purchaser_singular_name || 'purchaser_singular_name',
    }),
    id: 'recent_activity',
  },
];
}

export const productTypes = (trans = null) => {
  const t = trans ? trans : value => value
  console.log(t, 't value')
  return [
  {
    title: t('open_bookings.productTypes.all'),
    id: '',
  },
  {
    title: t('open_bookings.productTypes.shoutouts'),
    id: requestTypesKeys.shoutout,
  },
  {
    title: t('open_bookings.productTypes.announcement'),
    id: requestTypesKeys.event,
  },
  {
    title: t('open_bookings.productTypes.q&a'),
    id: requestTypesKeys.qa,
  },
  {
    title: t('open_bookings.productTypes.commercial'),
    id: requestTypesKeys.commercial,
  },
  {
    title: t('open_bookings.productTypes.dm'),
    id: requestTypesKeys.message,
  },
  {
    title: t('open_bookings.productTypes.socialShoutout'),
    id: requestTypesKeys.socialShoutout,
  },
  {
    title: t('open_bookings.productTypes.socialCommercial'),
    id: requestTypesKeys.promotion,
  },
  {
    title: t('open_bookings.productTypes.funstuff'),
    id: requestTypesKeys.digitalGoods,
  },
  {
    title: t('open_bookings.productTypes.merch'),
    id: requestTypesKeys.products,
  },
];
}