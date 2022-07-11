import {
  faShareAll,
  faTag,
  faHandshakeAlt,
  faUsers,
  faBook,
  faGlobe,
} from '@fortawesome/pro-light-svg-icons';

export const getLinks = ({
  t,
  entityData = {},
  fullPlan = false,
  adminApproved = false,
  allowPosts = false,
}) => [
  ...allowPosts ? [{
    linkName: t('promote_page.links.post-promote.name'),
    key: 'post-promote',
    url: '/manage/promote/post-promote',
    moboLinkName: t('promote_page.links.post-promote.mob_link'),
    info: t('promote_page.links.post-promote.info', {
      name: entityData?.partner_name,
    }),
    moboIcon: faShareAll,
  }] : [],
  ...(entityData.allow_star_share_graphics && adminApproved
    ? [
        {
          linkName: t('promote_page.links.promo-share.name'),
          key: 'promo-share',
          url: '/manage/promote/promo-share',
          moboLinkName: t('promote_page.links.promo-share.mob_link'),
          info: t('promote_page.links.promo-share.info', {
            name: entityData?.partner_name,
          }),
          moboIcon: faShareAll,
        },
      ]
    : []),
  ...(entityData.allow_star_fan_discount && fullPlan
    ? [
        {
          linkName: t('promote_page.links.discount.name', {
            purchaser: entityData?.purchaser_plural_name,
          }),
          key: 'discount',
          url: '/manage/promote/discount',
          moboLinkName: t('promote_page.links.discount.mob_link'),
          info: t('promote_page.links.discount.info'),
          moboIcon: faTag,
        },
      ]
    : []),
  ...(entityData.allow_star_charity_fndraiser
    ? [
        {
          linkName: t('promote_page.links.fundraiser.name'),
          key: 'fundraiser',
          url: '/manage/promote/fundraiser',
          moboLinkName: t('promote_page.links.fundraiser.mob_link'),
          info: t('promote_page.links.fundraiser.info'),
          moboIcon: faHandshakeAlt,
        },
      ]
    : []),
  ...(entityData.allow_star_corss_promote
    ? [
        {
          linkName: t('promote_page.links.partner.name', {
            name: entityData?.talent_plural_name,
          }),
          key: 'partner',
          url: '/manage/promote/partner',
          moboLinkName: t('promote_page.links.partner.mob_link'),
          info: t('promote_page.links.partner.info'),
          moboIcon: faUsers,
        },
      ]
    : []),
  ...(entityData.region_share
    ? [
      //  {
      //    linkName: t('promote_page.links.global.name'),
      //    key: 'global',
      //    url: '/manage/promote/global',
      //    moboLinkName: t('promote_page.links.global.mob_link'),
      //    info: t('promote_page.links.global.info'),
      //    moboIcon: faGlobe,
      //  },
      ]
    : []),
  ...(entityData.allow_star_tips_tricks
    ? [
        {
          linkName: t('promote_page.links.tips&tricks.name'),
          key: 'tips&tricks',
          active: false,
          maxHeight: 140,
          sel_url: '/manage/promote/tips&tricks',
          moboLinkName: t('promote_page.links.tips&tricks.mob_link'),
          info: t('promote_page.links.tips&tricks.info'),
          moboIcon: faBook,
          subMenu: [
            {
              linkName: t(
                'promote_page.links.tips&tricks.sub_links.tip-success.name',
              ),
              key: 'tip-success',
              url: '/manage/promote/tips&tricks/tip-success',
            },
            {
              linkName: t(
                'promote_page.links.tips&tricks.sub_links.tip-experts.name',
              ),
              key: 'tip-experts',
              url: '/manage/promote/tips&tricks/tip-experts',
            },
            {
              linkName: t(
                'promote_page.links.tips&tricks.sub_links.tip-inspirations.name',
              ),
              key: 'tip-inspirations',
              url: '/manage/promote/tips&tricks/tip-inspirations',
            },
          ],
        },
      ]
    : []),
];
