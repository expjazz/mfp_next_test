import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import Share from 'components/Share';
import { Wrapper, Content, UserImage } from '../../styled';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const ReferralItem = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const { data } = props;
  const viewProfile = () => {
    router.push(`/${data.user_id}`);
  };
  const numberToDollarFormatter = number => {
    return `$${parseFloat(number)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/[.,]00$/, '')}`;
  };
  return (
    <Content>
      <Wrapper>
        <UserImage
          userImage={data.avatar_photo && data.avatar_photo.thumbnail_url}
        />
        <Content.ItemWrapper>
          <Content.SectionWrapper>
            <Content.StarName>{data.name}</Content.StarName>
            <Content.SectionWrapper className="profile-actions">
              <Content.Link onClick={viewProfile} className="text-left">
                {t('common.viewPage')}
              </Content.Link>
              <Share
                classes={{
                  root: 'share',
                  button: 'share-btn',
                }}
                title={`${entityData?.partnerData?.partner_name} ${data.name} !`}
                body={t('star_settings.referral.share_body', {
                  name: data.name,
                })}
                shareUrl={`${window.location.host || ''}/${data.user_id}` || ''}
                buttonText={t('common.sharePage')}
                secondary
              />
            </Content.SectionWrapper>
          </Content.SectionWrapper>
          <Content.SectionWrapper>
            <span>
              {t('star_settings.referral.total_req')} {data.total_bookings}
            </span>
            <span>
              {t('common.total_earnings')}{' '}
              {numberToDollarFormatter(data.total_earnings)}
            </span>
          </Content.SectionWrapper>
          <Content.SectionWrapper>
            <span>
              {t('star_settings.referral.ref_expiry')}{' '}
              {moment(data.referral_expiry_date)
                .local()
                .format('MMM DD, YYYY')}
            </span>
          </Content.SectionWrapper>
        </Content.ItemWrapper>
      </Wrapper>
    </Content>
  );
};

ReferralItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ReferralItem;
