import { i18n } from "next-i18next";

export const otherInject = (starMode, reasons) => {
  const hasOther = reasons.find(reason => reason.label === 'Other');
  if (starMode && !hasOther) {
    return ([{
      label: i18n.t('common.other'),
      value: 'other'
    }])
  }
  return [];
}

