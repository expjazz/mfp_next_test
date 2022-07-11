import React, { useState } from 'react';
import Button from 'components/SecondaryButton';
import { DescriptionP } from 'styles/TextStyled';
// import { showWhatsappOption } from 'src/constants';
import { FlexCenter } from 'styles/CommonStyled';
import OtpValidator from '../OtpValidator';
// import { Layout, Wrapper } from '../../styled';
import { HeadingH2B } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { Layout, Wrapper } from 'components/Success/styled';
import { showWhatsappOption } from 'src/constants';
// import { HeadingH2B } from '../../../';

const NotifyUser = ({
  notfSettings,
  t,
  successMsg,
  updateNotification,
  onSkip,
}) => {
  const [shouldValidate, toggValidate] = useState(false);

  const onNotifyClick = key => () => {
    updateNotification({
      [key]: true,
      fan_starsona_videos: true,
    });
    if (notfSettings.mobile_verified) {
      onSkip();
      return;
    }
    toggValidate(!notfSettings.mobile_verified);
  }
  // alert(shouldValidate)
  if (shouldValidate) {
    return (
      <OtpValidator
        notfSettings={notfSettings}
        t={t}
        onSuccess={onSkip}
      />
    )
  }

  return (
    <Layout>
      <Wrapper className="success-wrp">
        <HeadingH2B className="success-head">
          {successMsg}
        </HeadingH2B>
        <DescriptionP className='notf-description'>
          {t('purchase_flow.notify_description')}
        </DescriptionP>
        <FlexCenter className='notf-btn-wrap'>
          {
            !notfSettings.mobile_notification &&
            <Button className='notf-buttons' secondary onClick={onNotifyClick('mobile_notification')}>
              {t('common.sms/text')}
            </Button> 
          }
          {
            showWhatsappOption && !notfSettings.whatsapp_notification &&
              <Button className='notf-buttons' secondary onClick={onNotifyClick('whatsapp_notification')}>
                {t('common.whatsapp')}
              </Button>
          }
        </FlexCenter>
        <span role='presentation' className='skip-wrap' onClick={onSkip}>
          {t('common.skip')}
        </span>
      </Wrapper>
    </Layout>
  )
};

export default NotifyUser;
