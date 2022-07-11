// import i18n from 'i18next';

import { i18n } from "next-i18next";

// export const options = [
//   {
//     title: i18n.t('common.all'),
//     value: 'all',
//   },
//   {
//     title: i18n.t('open_bookings.options.open'),
//     value: 'open',
//   },
//   {
//     title: i18n.t('open_bookings.options.completed'),
//     value: 'completed',
//   },
//   {
//     title: i18n.t('open_bookings.options.cancelled'),
//     value: 'cancelled',
//   },
//   {
//     title: i18n.t('open_bookings.conversations'),
//     value: 'conversation',
//   },
// ];

export const options = [
  { label: 'ALL', value: 'all' },
  { label: 'ACTION NEEDED', value: 'action' },
  { label: 'OPEN REQUESTS', value: 'open' },
  { label: 'COMPLETED', value: 'completed' },
  { label: 'NEWS', value: 'news' },
  { label: 'CANCELLED', value: 'cancelled' },
  { label: "DM's", value: 'conversation' },
];

export const filterOptions = [
  {
    title: i18n.t('open_bookings.filterOptions.all'),
    id: 'all',
  },
  {
    title: i18n.t('open_bookings.filterOptions.rated'),
    id: 'rated',
  },
  {
    title: i18n.t('open_bookings.filterOptions.comments'),
    id: 'comments',
  },
  {
    title: i18n.t('open_bookings.filterOptions.reactions'),
    id: 'reactions',
  },
  {
    title: i18n.t('open_bookings.filterOptions.tips'),
    id: 'tips',
  },
  {
    title: i18n.t('open_bookings.filterOptions.favorites'),
    id: 'favorites',
  },
];

export const SortBy = [
  {
    title: i18n.t('open_bookings.sortBy.mostRecent'),
    id: 'MostRecent',
  },
  {
    title: i18n.t('open_bookings.sortBy.oldest'),
    id: 'oldest',
  },
  {
    title: i18n.t('open_bookings.sortBy.recentActivity'),
    id: 'recentActivity',
  },
];
