import { requestTypesKeys } from "src/constants/requestTypes";
import { deliveryMethods } from "src/constants/requestTypes/funTypes";

export const successData = ({ t, callBack, starName, key, delivery, entityData }) => {
  const successInfo = {
    [requestTypesKeys.shoutout]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.shoutout.note', {
        starName,
        talentPlural: entityData.talent_plural_name,
        purchaserSingle:entityData.purchaser_singular_name,
      }),
      btnLabel: t('common.sharePage'),
      buttonHandler: callBack,
    },
    [requestTypesKeys.event]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.event.note', {
        starName,
        talentPlural: entityData.talent_plural_name,
        purchaserSingle:entityData.purchaser_singular_name,
      }),
      btnLabel: t('common.sharePage'),
      buttonHandler: callBack,
    },
    [requestTypesKeys.qa]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.event.note', {
        starName,
        talentPlural: entityData.talent_plural_name,
        purchaserSingle:entityData.purchaser_singular_name,
      }),
      btnLabel: t('common.sharePage'),
      buttonHandler: callBack,
    },
    [requestTypesKeys.commercial]: {
      successMsg: t('purchase_flow.successInfo.commercial.successMsg'),
      note: t('purchase_flow.successInfo.commercial.note', { starName }),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
    [requestTypesKeys.message]: {
      successMsg: t('purchase_flow.successInfo.chat_sent'),
      note: t('purchase_flow.successInfo.message.note', { starName }),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
    [requestTypesKeys.socialShoutout]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.sit_back_msg', { starName }),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
    [requestTypesKeys.promotion]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.sit_back_msg', { starName }),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
    [requestTypesKeys.digitalGoods]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note:
        deliveryMethods.videoCalls === delivery
          ? t('purchase_flow.successInfo.digitalGoods.note1')
          : t('purchase_flow.successInfo.digitalGoods.note2', { starName }),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
    [requestTypesKeys.products]: {
      successMsg: t('purchase_flow.successInfo.request_sent'),
      note: t('purchase_flow.successInfo.products.note'),
      buttonHandler: callBack,
      btnLabel: t('common.sharePage'),
    },
  };

  return successInfo[key];
};
