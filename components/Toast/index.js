import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Layout } from './styled';
import { editGeneralState, useGeneral } from '../../src/context/general';
import router, { useRouter } from 'next/router';

const variantIcon = {
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faExclamationCircle,
  info: faInfoCircle,
};

function CustomToast(props) {
  const [{ toastObj }, dispatch] = useGeneral()
  const router = useRouter()
  useEffect(() => {
    if (!toastObj.noTop) window.scrollTo(0, 0);
  }, []);

  return (
    <SnackbarContent
      className={props.variant}
      aria-describedby="client-snackbar"
      classes={{ message: 'content-msg-wrapper' }}
      message={
        <span id="client-snackbar">
          <FontAwesomeIcon icon={variantIcon[props.variant]} className="icon" />
          <span className="message">
            {typeof props.message === 'function'
              ? props.message()
              : props.message}
          </span>
        </span>
      }
      action={[
        <FontAwesomeIcon
          key="close"
          icon={faTimes}
          aria-label="Close"
          className="icon closeBtn"
          onClick={props.onClose}
        />,
      ]}
    />
  );
}

CustomToast.propTypes = {
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const Toast = props => {
  const [{ toastObj }, dispatch] = useGeneral()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    editGeneralState(dispatch, { payload: {
      value: false,
      message: '',
      variant: '',
      time: 6000,
      global: true,
    }, key: 'toastObj' })

  };

  const clearToast = () => {
    editGeneralState(dispatch, { payload: {
      value: false,
      message: '',
      variant: '',
      time: 6000,
      global: true,
    }, key: 'toastObj' })
  };

  useEffect(() => {
    const handleChange = () => {
        clearToast()
    }
    router.events.on('routeChangeComplete', handleChange)
    return () => {
      router.events.off('routeChangeComplete', handleChange)
      clearToast();
    };
  }, []);

  if (!toastObj.global && !props.custom) {
    return null;
  }

  if (toastObj?.global && props.custom) {
    return null
  }



  let unlisten = null;



  return (
    <Layout className="toast-wrp">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={toastObj.value}
        autoHideDuration={toastObj.time || 6000}
        onClose={handleClose}
        className="toast-bar"
      >
        {toastObj.value ? (
          <CustomToast
            onClose={handleClose}
            variant={toastObj.variant}
            message={toastObj.message}
            toastObj={toastObj}
          />
        ) : null}
      </Snackbar>
    </Layout>
  );
};

Toast.propTypes = {
  updateToast: PropTypes.func.isRequired,
  toastObj: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  custom: PropTypes.bool,
};

Toast.defaultProps = {
  custom: false,
};

export default Toast