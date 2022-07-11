import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import moment from 'moment';
import Share from 'components/Share';
import { Wrapper, Content, UserImage } from '../../styled';

const ReferralItem = props => {
  const { t } = useTranslation();
  const { data } = props;
  const viewProfile = () => {
    props.history.push(`/${data.user_id}`);
  };
  const numberToDollarFormatter = (number) => {
    return(`$${parseFloat(number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/[.,]00$/, "")}`)
  }
  return (
    <Content>
      <Wrapper>
        <UserImage
          userImage={data.avatar_photo && data.avatar_photo.thumbnail_url}
        />
        <Content.ItemWrapper>
          <Content.SectionWrapper>
            <Content.StarName>{data.name}</Content.StarName>
            <Content.SectionWrapper className='profile-actions'>
              <Content.Link onClick={viewProfile} className="align-left">
                {t('common.viewPage')}
              </Content.Link>
              <Share
                classes={{
                  root: 'share',
                  button: 'share-btn'
                }}
                title={`${entity('siteName')} ${data.name} !`}
                body={t('referrals.book_shoutout',{data:data.name})}
                shareUrl={`${window.location.host || ''}/${data.user_id}` || ''}
                buttonText={t('common.sharePage')}
                secondary
              />
            </Content.SectionWrapper>
          </Content.SectionWrapper>
          <Content.SectionWrapper>
            <span>
              {t('referrals.total_request')} {data.total_bookings}
            </span>
            <span>
              {t('referrals.total_earnings')} {numberToDollarFormatter(data.total_earnings)}
            </span>
          </Content.SectionWrapper>
          <Content.SectionWrapper>
            <span>{t('referrals.referral_expiration')} {moment(data.referral_expiry_date)
              .local()
              .format('common.MMM DD, YYYY')}</span>
          </Content.SectionWrapper>
        </Content.ItemWrapper>
        </Wrapper>
      </Content>
    );
   }

   ReferralItem.propTypes = {
    data: PropTypes.object.isRequired,
  };

  export default ReferralItem;
