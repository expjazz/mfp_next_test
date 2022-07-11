import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Main, Container, Title, Feature, FeatureTitle, FeatureImg, FulfillTitle, FulfillSubTitle, ReceiveImg, ReceiveTitle, ReceiveDesc
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';


const HowItWorks = () => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  return (
    <Main>
      <Container>
        <Title>
          <p>{t('promotion_layout.how_it_works.main_title', {siteName:entityData?.partnerData?.siteName})}<br /></p>
        </Title>
      </Container>
      <Container>
        <div className="wrap-block">
          <div className="block">
            <FeatureImg width="89" height="82" src={'/images/tellfans.png'} alt="" />
            <div className="block-content">
              <FeatureTitle>
                <p>{t('promotion_layout.how_it_works.tell_purchasers', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}<br /></p>
              </FeatureTitle>
              <Feature>
                <p>{t('promotion_layout.how_it_works.tell_purchasers_desc', {siteName:entityData?.partnerData?.siteName, storeNameSmall:entityData?.partnerData?.storeNameSmall})}</p>
              </Feature>
            </div>
          </div>
          <div className="block">
            <FeatureImg width="105" height="89" className="security" src={'/images/security.png'} alt="" />

            <div className="block-content">
              <FeatureTitle className="connect">
                <p>{t('promotion_layout.how_it_works.connect_safely')}<br /></p>
              </FeatureTitle>
              <Feature className="feature2">
                <p>{t('promotion_layout.how_it_works.connect_safely_desc', {siteName:entityData?.partnerData?.siteName})}<br /></p>
              </Feature>
            </div>
          </div>
          <div className="block">
            <FeatureImg width="96" height="66" className="get-paid" src={'/images/getpaid.png'} alt="" />
            <div className="block-content">
              <FeatureTitle className="get-paid">
                <p>{t('promotion_layout.how_it_works.get_paid')}<br /></p>
              </FeatureTitle>
              <Feature className="feature3">
                <p>{t('promotion_layout.how_it_works.get_paid_desc')}</p>
              </Feature>
            </div>
          </div>

        </div>

      </Container>
      <Container className="fulfill">
        <FulfillTitle>
          <p>{t('promotion_layout.how_it_works.fulfill_requests')}<br /></p>
        </FulfillTitle>
        <FulfillSubTitle>
          <p>{t('promotion_layout.how_it_works.fulfill_requests_desc')}<br /></p>
        </FulfillSubTitle>
      </Container>
      <Container className="receive">
        <div className="wrap-block">
          <div className="block">
            <ReceiveImg width="118" height="88" src={'/images/receiverequest.png'} alt="" />
            <div className="block-content">
              <ReceiveTitle>
                <p>{t('promotion_layout.how_it_works.request_received')}</p>
              </ReceiveTitle>
              <ReceiveDesc>
                <p>{t('promotion_layout.how_it_works.request_received_desc', {purchaserSingle:entityData?.partnerData?.purchaserSingle})}</p>
              </ReceiveDesc>
            </div>
          </div>
          <div className="block">
            <ReceiveImg width="123" height="100" className="img-next" src={'/images/reminders.png'} alt="" />
            <div className="block-content">
              <ReceiveTitle className="next">
                <p>{t('promotion_layout.how_it_works.alert_sent')}<br /></p>
              </ReceiveTitle>
              <ReceiveDesc className="next">
                <p>{t('promotion_layout.how_it_works.alert_sent_desc')}</p>
              </ReceiveDesc>
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default HowItWorks;
