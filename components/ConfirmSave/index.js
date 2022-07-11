import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Confirm from 'components/ConfirmModal';
import Button from 'components/SecondaryButton';
import { Wrapper } from './styled';

const ConfirmSave = props => {
  const { t } = useTranslation();
  return (
    <Confirm open={props.open}>
      <Wrapper>
        <span className="message">
          {props.message
            ? props.message
            : t('common.unsavedChanges')}
        </span>
        <div className="btnWrap">
          <Button className='confirm-btn-styles' onClick={props.closeModal} secondary>
            {props.cancelBtnText || t('common.cancel')}
          </Button>
          <Button className='confirm-btn-styles' onClick={props.handleConfirm}>{props.confirmBtntext || t('common.yes')}</Button>
        </div>
      </Wrapper>
    </Confirm>
  );
};

ConfirmSave.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  cancelBtnText: PropTypes.string,
  confirmBtntext: PropTypes.string,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

ConfirmSave.defaultProps = {
  message: '',
  cancelBtnText: '',
  confirmBtntext: '',
};
export default ConfirmSave;
