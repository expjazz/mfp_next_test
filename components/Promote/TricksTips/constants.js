import {
  faComments,
  faTag,
  faHandshakeAlt,
} from '@fortawesome/pro-light-svg-icons';
import { i18n } from 'next-i18next';

export const links = [
  {
    linkName: i18n.t('common.tips_for_success'),
    key: 'tip-success',
    url: '/manage/promote/tips&tricks/tip-success',
    icon: faComments,
  },
  {
    linkName: i18n.t('common.tip_experts_heading'),
    key: 'tip-experts',
    url: '/manage/promote/tips&tricks/tip-experts',
    icon: faTag,
  },
  {
    linkName: i18n.t('common.tip_inspirations_heading'),
    key: 'tip-inspirations',
    url: '/manage/promote/tips&tricks/tip-inspirations',
    icon: faHandshakeAlt,
  },
];
