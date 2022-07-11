import React from 'react';
import Button from 'components/SecondaryButton';
import { DialogStyled } from './styled';
import { useTranslation } from 'next-i18next';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const LanguageModal = (props) => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  return (
    <DialogStyled
      open
      onClose={props.onClose}
      classes={{ paper: 'paper-body' }}
    >
      {t('open_bookings.language',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name, lang:props.lang})}
      <Button
        secondary
        className='button-wrap'
        onClick={props.onClose}
      >
        {t('common.ok')}
      </Button>
    </DialogStyled>
  )
}

export default LanguageModal;
