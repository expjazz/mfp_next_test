/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { Heading } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import WhatsappService from 'components/WhatsappService';
import { getMobileOperatingSystem } from 'src/utils/checkOS';
import { Container } from '../../styled';
import {
  Wrap,
  SubHeading,
  StarAvatar,
  Title,
  DetailWrapper,
  StarName,
  LinkText,
} from './styled';

const StarConcierge = props => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const {
    first_name: firstName,
    profile_image: profileImage,
    email,
    mobile_number: phNo,
  } = props.concierge;

  const sendSms = () => {
    if (isMobile) {
      if (phNo.trim() !== '') {
        const userAgent =
          navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
          window.open(`sms:${phNo}`);
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          window.open(`sms:${phNo}`);
        }
      }
    } else {
      window.open(`mailto:${email}?subject=Inquiry`);
    }
  };


  const whatsappNumber = props.concierge.email === 'mikaela.wright@myfanpark.com' ? '17073540407' : props.entityData.contact_whatsapp;

  return (
    <Container>
      <Wrap>
        <Heading className="title">{t('star_manage.contactConcierge')}</Heading>
        <SubHeading>{t('star_manage.personalRep')}:</SubHeading>
        {
          profileImage ?
            <StarAvatar src={profileImage} alt="rep-image" />
        : null
        }
        <DetailWrapper>
          <StarName>{firstName}</StarName>
          <LinkText href={`mailto: ${email}?subject=Inquiry`}>{email}</LinkText>
          <span>{formatPhoneNumberIntl(`+${phNo}`)}</span>
        </DetailWrapper>
        <Title>
          {getMobileOperatingSystem() ? t('star_manage.sendHelp') : t('star_manage.contact')}
        </Title>
        <DetailWrapper className="btn-wrp">
          {
            getMobileOperatingSystem() ?
              <React.Fragment>
                <Button className='btn' onClick={sendSms}>
                  {t('star_manage.textBtn')}
                </Button>
                {
                  whatsappNumber ?
                    <WhatsappService number={whatsappNumber}>
                      {
                        (onClick) => (
                          <Button className='btn' onClick={onClick}>
                            {t('star_manage.Whatsapp')}
                          </Button>
                        )
                      }
                    </WhatsappService>
                  : null
                }
              </React.Fragment>
            :
              <React.Fragment>
                {
                  whatsappNumber ?
                    <WhatsappService number={whatsappNumber}>
                      {
                        (onClick) => (
                          <Button className='btn' onClick={onClick}>
                            {t('star_manage.Whatsapp')}
                          </Button>
                        )
                      }
                    </WhatsappService>
                  : null
                }
                <a href={`mailto:${email}?subject=Inquiry`}>
                  <Button className='btn'>
                    {t('star_manage.emailBtn')}
                  </Button>
                </a>
              </React.Fragment>
          }
        </DetailWrapper>
      </Wrap>
    </Container>
  );
};

StarConcierge.propTypes = {
  concierge: PropTypes.object.isRequired,
};

StarConcierge.defaultProps = {};

export default StarConcierge;
