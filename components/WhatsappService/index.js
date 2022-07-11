import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Button from 'components/SecondaryButton';
import { getMobileOperatingSystem } from 'src/utils/checkOS';
import { LinkText, Heading } from 'styles/TextStyled';
import { DialogStyled } from './styled';

const WhatsappService = props => {
  const { t } = useTranslation();
  const timeOutRef = useRef(null);
  const [showModal, setModal] = useState(false);

  const onClick = () => {
    if (getMobileOperatingSystem()) {
      timeOutRef.current = setTimeout(() => {
        setModal(true);
      }, 1000);
      window.open(`whatsapp://send/?phone=${props.number}`);
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${props.number}`);
    }
  };

  const checkBlur = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener('blur', checkBlur);
    return () => {
      window.removeEventListener('blur', checkBlur);
    };
  }, []);

  return (
    <React.Fragment>
      <DialogStyled
        open={showModal}
        onClose={() => setModal(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
        <Heading className="heading">{t('common.install_whatsapp')}</Heading>
        <a href="https://www.whatsapp.com/download" target="_blank">
          <Button>{t('common.install_now')}</Button>
        </a>
        <LinkText onClick={() => setModal(false)}>
          {t('common.install_later')}
        </LinkText>
      </DialogStyled>
      {props.children(onClick)}
    </React.Fragment>
  );
};

WhatsappService.propTypes = {
  children: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
};

export default WhatsappService;
