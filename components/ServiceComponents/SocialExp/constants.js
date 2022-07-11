import { requestTypesKeys } from 'src/constants/requestTypes';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
export const getCategoryList = (services, featuredList, t, entityData) => {
  const list = [
    {
      key: requestTypesKeys.shoutout,
      id: requestTypesKeys.shoutout,
      title: t('services.featuredExp.cat1'),
      active:
        services.personalised_video &&
        entityData?.products[requestTypesKeys.shoutout] &&
        !featuredList.find(
          item => item.request_type === requestTypesKeys.shoutout,
        ),
    },
    {
      key: requestTypesKeys.event,
      id: requestTypesKeys.event,
      title: t('services.featuredExp.cat2'),
      active:
        services.announcement &&
        entityData?.products[requestTypesKeys.event] &&
        !featuredList.find(
          item => item.request_type === requestTypesKeys.event,
        ),
    },
    {
      key: requestTypesKeys.qa,
      id: requestTypesKeys.qa,
      title: t('services.featuredExp.cat3'),
      active:
        services.question_answer &&
        entityData?.products[requestTypesKeys.qa] &&
        !featuredList.find(item => item.request_type === requestTypesKeys.qa),
    },
    {
      key: requestTypesKeys.message,
      id: requestTypesKeys.message,
      title: t('services.featuredExp.cat4'),
      active:
        services.direct_message &&
        entityData?.products[requestTypesKeys.message] &&
        !featuredList.find(
          item => item.request_type === requestTypesKeys.message,
        ),
    },
    {
      key: requestTypesKeys.socialShoutout,
      id: requestTypesKeys.socialShoutout,
      title: t('services.featuredExp.cat5'),
      sub: true,
      active: services.social_shout_out && entityData?.products[requestTypesKeys.socialShoutout],
    },
    {
      key: 'live',
      id: requestTypesKeys.digitalGoods,
      title: t('services.featuredExp.cat6'),
      sub: true,
      active: services.live_call,
      del_method: deliveryMethods.videoCalls && entityData?.products['live'],
    },
    {
      key: requestTypesKeys.digitalGoods,
      id: requestTypesKeys.digitalGoods,
      title: t('services.featuredExp.cat7'),
      sub: true,
      active: services.fun_stuff && entityData?.products[requestTypesKeys.digitalGoods],
    },
    {
      key: requestTypesKeys.products,
      id: requestTypesKeys.products,
      title: t('services.featuredExp.cat8'),
      sub: true,
      active: services.products && entityData?.products[requestTypesKeys.products],
    },
    {
      key: requestTypesKeys.commercial,
      id: requestTypesKeys.commercial,
      title: t('services.featuredExp.cat9'),
      sub: true,
      active: services.commercial && entityData?.products[requestTypesKeys.commercial],
    },
    {
      key: requestTypesKeys.promotion,
      id: requestTypesKeys.promotion,
      title: t('services.featuredExp.cat10'),
      sub: true,
      active: services.social_promotions && entityData?.products[requestTypesKeys.promotion],
    },
  ];

  return list.filter(item => item.active);
};
