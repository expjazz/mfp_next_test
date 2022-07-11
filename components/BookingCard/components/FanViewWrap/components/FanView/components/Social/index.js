/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import ActionBar from '../../../../../../../ActionBar';
import DetailItem from '../../../../../../../DetailItem';
import BookingStyled, { EvidenceItem } from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper, ImageSection, EvidenceList } from './styled';
import { locStorage } from 'src/utils/localStorageUtils';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const SocialMedia = props => {
  const { t } = useTranslation();
  const { social_request_details: socialDetails = {} } = props.bookingData;
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const tipPayment = (type, value) => {
    if (type === 'tip') {
      locStorage.setItem(
        'req_data',
        {
          returnUrl: window.location.pathname,
          amount: value,
          bookingId: props.bookingData.id,
          noback: true,
          userId: props.bookingData.celebrity_vanity,
          promoCode: {},
        },
      );
      props.toggleBookingModal(false);
      router.push({
        pathname: `/${props.bookingData.celebrity_vanity}/tip`,
      });
    } else {
      props.onCompleteAction(type, value);
    }
  };

  return (
    <Wrapper>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.LeftSection>
          <DetailItem
            classes={{
              root: 'detail-header',
              detailHead: 'detail-head',
              detailDesc: 'detail-desc',
            }}
            heading={t('common.status')}
            description={t('common.completed')}
          />
          <ImageSection hasEvidence={socialDetails.evidence_files}>
            <EvidenceList isScrollable={socialDetails.evidence_files}>
              {socialDetails.evidence_files
                ? socialDetails.evidence_files.map(evidence => (
                    <EvidenceItem
                      className="evidence-item"
                      imageUrl={evidence}
                      key={evidence}
                    />
                  ))
                : isEmpty(socialDetails.celebrity_reply) && (
                    <EvidenceItem className="evidence-item no-evidence">
                      {t('common.socialCompleteText', {
                        talent: entityData?.partnerData.talent_singular_name,
                        type: props.isPromotion ? 'promotion.' : 'interaction.',
                      })}
                    </EvidenceItem>
                  )}
            </EvidenceList>
            {!isEmpty(socialDetails.celebrity_reply) && (
              <span className="text box">{socialDetails.celebrity_reply}</span>
            )}
          </ImageSection>
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection>
          <FanViewStyled.DetailWrapper isPublic={false}>
            <section className="action-root">
              <ActionBar
                initialSelection
                bookingId={props.bookingData.booking_id}
                disableRating={
                  props.isBookingStar || props.bookingData.has_rating
                }
                disableReaction={
                  props.isBookingStar || props.bookingData.has_reaction
                }
                disableComment={
                  props.bookingData.has_comment && !props.isBookingStar
                }
                disableTips={props.isBookingStar}
                rateProps={{
                  onSuccessMsg: t('common.request_rated'),
                }}
                shareDisable
                onAction={tipPayment}
                beforeShare={() => {}}
                commentDetails={{
                  maxLength: 104,
                  thresholdLimit: 97,
                }}
                shareDetails={{}}
                onSelectAction={() => {}}
              />
            </section>
          </FanViewStyled.DetailWrapper>
          {props.renderCommentList()}
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};


export default SocialMedia;
