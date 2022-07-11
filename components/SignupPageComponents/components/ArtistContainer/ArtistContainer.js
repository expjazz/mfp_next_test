import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  ArtistContainerDiv,
  LeftThumb,
  Artist,
  ArtistText,
  ArtistLink,
  ArtistLinkText,
  ArtistImg,
  Container,
  ArtistBtn,
  ArtistDesc,
  ArtistJob,
  ArtistCompare,
  ThumbnailContainer,
  GridCol,
  ArtistThumb,
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const ArtistContainer = () => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  return (
    <ArtistContainerDiv>
      <Artist>
        <div className="row">
          <Container>
            <GridCol>
              <LeftThumb>
                <div version="3" subtype="landingpage">
                  <ArtistBtn className="widget widget-text">
                    <p>
                      {t('custom_home_layout.generate_new_revenue')}
                    <br />
                    </p>
                  </ArtistBtn>
                  <ArtistDesc>
                    <p>
                    {t('custom_home_layout.generate_revenue_desc', {siteName:entityData?.partnerData?.siteName, storeNameSmall:entityData?.partnerData?.storeNameSmall})}
                  </p>
                  </ArtistDesc>
                  <ArtistCompare
                    className='cameo-link'
                    to="/cameo"
                  >{t('custom_home_layout.how_we_compare')}</ArtistCompare>
                </div>
              </LeftThumb>
              <div>
                <ThumbnailContainer>
                  <ArtistThumb>
                    <ArtistImg width="165" height="165" src={'/images/signup_page/adam.jpg'} alt="" />
                  </ArtistThumb>
                  <ArtistText>
                    <ArtistLink to="/adamrupp" version="3" target="_blank">
                      <ArtistLinkText>{t('custom_home_layout.adam_page')}</ArtistLinkText>
                    </ArtistLink>
                    <p className='right-star-desc'>
                    {t('custom_home_layout.adam_comment', {siteName:entityData?.partnerData?.siteName, storeNameSmall: entityData?.partnerData?.storeNameSmall, purchaserPlural:entityData?.partnerData?.purchaserPlural})}
                  </p>
                  </ArtistText>
                </ThumbnailContainer>
                <ArtistJob>
                  <p>
                  {t('custom_home_layout.adam_name')}
                  <br />
                  </p>
                  <p>
                    <i>
                      <span>{t('custom_home_layout.adam_proffession')}</span>
                    </i>
                    <br />
                  </p>
                </ArtistJob>
              </div>
            </GridCol>
          </Container>
        </div>
      </Artist>
      <Artist className="right-thumb">
        <div className="row">
          <Container>
            <GridCol className='align-fix'>
              <div>
                <ThumbnailContainer>
                  <ArtistText className="right-pd">
                    <ArtistLink to="/perezhilton" version="3" target="_blank" className="hide-mob">
                      <ArtistLinkText>{t('custom_home_layout.perez_page')}</ArtistLinkText>
                    </ArtistLink>
                    <p>
                    {t('custom_home_layout.perez_comment', {siteName:entityData?.partnerData?.siteName})}
                  </p>
                  </ArtistText>

                  <ArtistThumb className="img-thumb-right">
                    <ArtistImg width="165" height="165" src={'/images/signup_page/perez2.jpg'} alt="" />
                  </ArtistThumb>
                </ThumbnailContainer>
                <ArtistJob className="right-article-job">
                  <p>
                    {t('custom_home_layout.perez_name')}
                  <br />
                  </p>
                  <p>
                    <i>
                      <span>
                      <Trans i18nKey="custom_home_layout.perez_proffession">
                        TV Personality, <br /> Blogger 'The Original Influencer'
                      </Trans>
                    </span>
                    </i>
                    <br />
                  </p>
                </ArtistJob>
                <ArtistLink to="/perezhilton" version="3" target="_blank" className="show-mob">
                  <ArtistLinkText>{t('custom_home_layout.perez_page')}</ArtistLinkText>
                </ArtistLink>
              </div>
              <LeftThumb className="apply-margin">
                <div version="3" subtype="landingpage">
                  <ArtistBtn className="widget widget-text">
                    <p>
                      {t('custom_home_layout.one-of-a-kind')}
                    <br />
                    </p>
                  </ArtistBtn>
                  <ArtistDesc>
                    <p>
                      {t('custom_home_layout.one-of-a-kind-desc', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}
                    </p>
                  </ArtistDesc>
                  <ArtistCompare to="/product-detail">
                    {t('custom_home_layout.interaction_types')}
                </ArtistCompare>
                </div>
              </LeftThumb>
            </GridCol>
          </Container>
        </div>
      </Artist>

      <Artist>
        <div className="row">
          <Container>
            <GridCol>
              <LeftThumb>
                <div version="3" subtype="landingpage">
                  <ArtistBtn className="widget widget-text">
                    <p>
                      {t('custom_home_layout.stronger_fanbase')}
                    <br />
                    </p>
                  </ArtistBtn>
                  <ArtistDesc>
                    <p>
                    {t('custom_home_layout.fanbase_desc')}
                  </p>
                  </ArtistDesc>
                </div>
              </LeftThumb>
              <div>
                <ThumbnailContainer>
                  <ArtistThumb>
                    <ArtistImg width="165" height="165" src={'/images/signup_page/omarosa.jpg'} alt="" />
                  </ArtistThumb>
                  <ArtistText>
                    <ArtistLink to="/omarosa" version="3" target="_blank">
                      <ArtistLinkText>{t('custom_home_layout.omarosa_page')}</ArtistLinkText>
                    </ArtistLink>
                    <p className='right-star-desc'>
                    {t('custom_home_layout.omarosa_comment', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}
                  </p>
                  </ArtistText>
                </ThumbnailContainer>
                <ArtistJob>
                  <p>
                    {t('custom_home_layout.omarosa_name')}
                  <br />
                  </p>
                  <p>
                    <i>
                      <span>{t('custom_home_layout.omarosa_proffession')}</span>
                    </i>
                    <br />
                  </p>
                </ArtistJob>
              </div>
            </GridCol>
          </Container>
        </div>
      </Artist>
    </ArtistContainerDiv>
  );
};

export default ArtistContainer;
