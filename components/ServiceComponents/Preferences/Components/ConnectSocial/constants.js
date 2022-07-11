import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

export const socialList = (t) => ([{
  name: t('common.facebook'),
  icon: faFacebookSquare,
  type: 'facebook',
  permissions: 'public_profile, instagram_basic, instagram_content_publish, pages_manage_posts, pages_read_user_content, pages_show_list, publish_video, read_insights',
}, {
  name: t('common.instagram'),
  icon: faInstagram,
  type: 'instagram',
  permissions: 'ads_management, business_management, pages_read_engagement, public_profile, instagram_basic, instagram_content_publish, pages_manage_posts, pages_read_user_content, pages_show_list, publish_video, read_insights'
}])

export const socialDet = (t) => ({
  'facebook': {
    icon: faFacebookSquare,
    name: t('common.facebook')
  },
  'instagram': {
    icon: faInstagram,
    name: t('common.instagram')
  }
})
