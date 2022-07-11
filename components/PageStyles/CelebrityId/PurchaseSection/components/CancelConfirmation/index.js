import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import Button from 'components/SecondaryButton';
import { DialogStyled, Wrapper, Heading } from './styled';

function CancelConfirmation(props) {
  const { t } = useTranslation();
  return (
    <DialogStyled
      classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      open={props.open}
      onClose={() => props.onClose(false)}
    >
      <Wrapper>
        <Heading>{t('purchase_flow.cancel_confirmation.confirm_cancel')}</Heading>
        <Button secondary className="button" onClick={props.goBack}>
          {t('purchase_flow.cancel_confirmation.comeback_later')}
        </Button>
        <Button
          secondary
          className="button"
          onClick={() => props.onClose(false)}
        >
          {t('purchase_flow.cancel_confirmation.continue_request', {starNM:props.starNM})}
        </Button>
        <FontAwesomeIcon
          onClick={() => props.onClose(false)}
          icon={faTimes}
          className="close-icon"
        />
      </Wrapper>
    </DialogStyled>
  );
}

CancelConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  starNM: PropTypes.string.isRequired,
};

export default CancelConfirmation;
