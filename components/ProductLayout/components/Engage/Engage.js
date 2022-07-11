import { useGetPartner } from 'customHooks/reactQueryHooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentWrapper, Container, Title, Features, Desk, ImageDesign } from './styled';

const Engage = () => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
    return (
        <ContentWrapper>
            <Container>
              <div className="content-wrapper">
                <div className="text-wrapper">
                  <Title>
                      <p>{t('product.engage.title', {siteName:entityData?.partnerData?.siteName})}<br/></p>
                  </Title>
                  <Desk>
                      <p>{t('product.engage.desc', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}</p>
                  </Desk>
                  <Features>
                      <p><b>{t('product.engage.offerings_prices')}</b></p>
                      <p>{t('product.engage.offerings_prices_txt')}</p>
                      <p><br/></p>
                      <p><b>{t('product.engage.commitment_to_safety')}</b></p>
                      <p>{t('product.engage.commitment_to_safety_txt', {siteName:entityData?.partnerData?.siteName, purchaserPlural:entityData?.partnerData?.purchaserPlural, })} <br/></p>
                      <p><br/></p>
                      <p><b>{t('product.engage.page_customization')}</b></p>
                      <p>{t('product.engage.your_page', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</p>
                      <p>{t('product.engage.choose_photos')}</p>
                      <p>{t('product.engage.choose_color')}</p>
                      <p>{t('product.engage.choose_font')}</p>
                      <p><br/></p>
                      <p><b>{t('product.engage.get_data', {purchaserSingle:entityData?.partnerData?.purchaserSingle})}</b></p>
                      <p>{t('product.engage.get_data_txt', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}</p>
                      <p></p>
                  </Features>
                </div>
                <div className="image-wrapper">
                  <ImageDesign width="325" height="368" src={'/images/PageDesign.png'} alt="" />
                  <ImageDesign width="286" height="337"  className="funst" src={'/images/Funstuffideas.png'} alt="" />
                </div>
              </div>
            </Container>
        </ContentWrapper>
    )
}

export default Engage;
