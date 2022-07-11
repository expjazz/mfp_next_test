import { i18n } from "next-i18next";


const commentGenerator = (fanName) => {
  return ([
    i18n.t('common.quick_comment_box.thanks'),
    i18n.t('common.quick_comment_box.thanks_fan',{fan:fanName}),
    i18n.t('common.quick_comment_box.you_da_man'),
    i18n.t('common.quick_comment_box.you_go_girl'),
    i18n.t('common.quick_comment_box.my_pleasure'),
    i18n.t('common.quick_comment_box.happy_to_do'),
    i18n.t('common.quick_comment_box.appreciate_you'),
    i18n.t('common.quick_comment_box.come_back_again'),
    i18n.t('common.quick_comment_box.you_too_kind')
  ])
}

export { commentGenerator };
