import { i18n } from 'next-i18next';
import { requestTypesKeys } from 'src/constants/requestTypes';

export const orderStatVal = {
  0: i18n.t('my_videos.order_status.not_started'),
  1: i18n.t('my_videos.order_status.in_progress'),
  2: i18n.t('my_videos.order_status.almost_ready'),
}

export const statusReq = [
  requestTypesKeys.digitalGoods,
  requestTypesKeys.products
]
