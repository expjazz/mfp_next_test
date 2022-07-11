import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import i18n from 'i18next';
// import { connect } from 'react-redux';
import AlertInputField from 'components/AlertInputField';
// import { fetchFanAlert } from 'services/userManagement';
import { AlertStyled, AlertHeader, ActionButton, StatusText } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { fetchFanAlert } from 'src/services/myfanpark/bookingActions';
import { i18n, useTranslation } from 'next-i18next';

const AlertSection = ({
  alertText,
  celebId,
  alertButton,
  itemId,
  requestType,
  onAlertText,
}) => {
  const [statusText, updateStatus] = useState('');
  const [showInput, setInput] = useState(false);
  const { data: fanData } = useFetchLoggedUser()
  const { t } = useTranslation()
  const isLoggedIn = !!fanData
  const alertCall = mail => async () => {
    if (isLoggedIn || mail) {
      const resp = await fetchFanAlert(celebId, requestType, mail, itemId);
      if (resp && resp.success) {
        updateStatus(onAlertText === 'common.alert_has_sheduled' ? t(onAlertText) : onAlertText);
      }
    } else {
      setInput(true);
    }
  };

  const getRequestMail = mail => {
    alertCall(mail)();
  };

  const renderAction = () => {
    if (showInput) {
      return (
        <AlertInputField
          classes={{
            root: 'alert-input-root',
            input: 'alert-input',
            alertInputRoot: 'alert-input-wrap',
          }}
          requestAlert={getRequestMail}
        />
      );
    }
    return (
      <ActionButton secondary onClick={alertCall()}>
        {alertButton === 'common.alert_available' ? t(alertButton) : alertButton}
      </ActionButton>
    );
  };

  return (
    <AlertStyled>
      <AlertHeader>{alertText}</AlertHeader>
      {statusText ? <StatusText>{statusText}</StatusText> : renderAction()}
    </AlertStyled>
  );
};

AlertSection.defaultProps = {
  alertText: '',
  requestType: null,
  itemId: null,
  alertButton: 'common.alert_available',
  onAlertText: 'common.alert_has_sheduled',
};

AlertSection.propTypes = {
  alertText: PropTypes.string,
  alertButton: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  celebId: PropTypes.string.isRequired,
  requestType: PropTypes.string,
  itemId: PropTypes.string,
  alertFan: PropTypes.func.isRequired,
  onAlertText: PropTypes.string,
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// });

// const mapDispatchToProps = dispatch => ({
//   alertFan: (celebId, requestType, fanEmail, itemId) =>
//     dispatch(fetchFanAlert(celebId, requestType, fanEmail, itemId)),
// });

export default AlertSection
