import { i18n } from "next-i18next";

const orderStatus = [{
  "label": i18n.t('common.order_pending'),
  "value": "not_started"
}, {
  "label": i18n.t('open_bookings.in_progress_small'),
  "value": "in_progress"
}, {
  "label": i18n.t('open_bookings.almost_finished_small'),
  "value": "almost_finished"
}];

const orderStatusFunc = t => [{
  "label": t('common.order_pending'),
  "value": "not_started"
}, {
  "label": t('open_bookings.in_progress_small'),
  "value": "in_progress"
}, {
  "label": t('open_bookings.almost_finished_small'),
  "value": "almost_finished"
}];

export default orderStatus;
