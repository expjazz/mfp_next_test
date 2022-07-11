import React from 'react';
import {ReactSVG} from 'react-svg';
import {
  faChartArea,
  faComments,
} from '@fortawesome/pro-light-svg-icons';
import { capitalize } from '@material-ui/core';

const getIcon = () => (
  <ReactSVG src="/images/shoutout-icon.svg" class="cus-icon" />
);

export const getlinks = ({ t, customLi = null, entityData={}, fullPlan=false }) => {
  const links = [
    ...entityData.allow_star_earnings ? [{
      linkName: t('common.view_earnings'),
      key: 'earnings',
      url: '/manage/performance/earnings',
      moboLinkName: t('common.earnings'),
      info: t('common.promote_store',{storeNameSmall:entityData?.partner_name}),
      moboIcon: faChartArea,
      customLi: customLi || null,
    }] : [],
    ...entityData.allow_star_performance ? [{
      linkName: t('common.analyze_requests'),
      key: 'analytics',
      url: '/manage/performance/analytics',
      moboLinkName: t('common.performance.performance'),
      info: t('common.review_feedback'),
      cusIcon: getIcon(),
    }] : [],
    ...entityData.allow_star_fan_data && fullPlan ? [{
      linkName: t('common.get_data',{purchaserSingle:entityData?.purchaser_singular_name}),
      key: 'fan-information',
      url: '/manage/performance/fan-information',
      moboLinkName: t('common.fan_data'),
      info: t('common.purchase_history',{purchaserSingleCap:capitalize(entityData?.purchaser_singular_name)}),
      moboIcon: faComments,
    }] : [],
  ];

  return links;
};
