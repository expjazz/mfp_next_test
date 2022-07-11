import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
// import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmSave from 'components/ConfirmSave';
import { isEmpty } from 'src/utils/dataStructures';
import NavigationPrompt from 'components/NavigationPrompt';

const ConfirmRoute = props => {
  const { t } = useTranslation();
  const [open, setOpenModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [shouldNavigate, shouldNavigateUrl] = useState(false);
  const confirm = useRef(false)
  window.onbeforeunload = ev => {
    if (props.when) {
      ev.preventDefault();
      return t('common.unsavedChanges');
    }
  };

  const openModal = route => {
    setOpenModal(true);
    setLocation(route);
  };

  const closeModal = () => {
    setOpenModal(false);
    window.onbeforeunload = () => {};
  };

  const handleBlock = next => {
    if (!shouldNavigate && !confirm.current) {
      if (props.validateUrl) {
        if (
          next &&
          (next !== props.validateUrl ||
            next === props.validateUrl) &&
          props.when
        ) {
          openModal(next);
          return false;
        }
      } else if (props.blockHandler && props.blockHandler(next)) {
        openModal(next);
        return false;
      }
    }
    return true;
  };

  const handleConfirm = () => {
    confirm.current = true
    shouldNavigateUrl(true);
  };

  useEffect(() => {

    if (shouldNavigate) {
      const nexLoc = location;
      setLocation(null);
      closeModal(false);
      if (props.comfirmCallback) props.comfirmCallback();
      if (props.goTo && nexLoc) {
        props.goTo(nexLoc);
        if (props.confirmSave) props.confirmSave({ saved: true, route: '' });
      } else if (!isEmpty(props.history)) {
        props.history.push(nexLoc, undefined, { shallow: true });
        if (props.confirmSave) props.confirmSave({ saved: true, route: '' });
      }
    }
  }, [shouldNavigate]);

  return (
    <React.Fragment>
      <NavigationPrompt when={props.when} message={handleBlock} />
      <ConfirmSave
        open={open}
        message={props.message}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
      />
    </React.Fragment>
  );
};

ConfirmRoute.propTypes = {
  blockHandler: PropTypes.func,
  goTo: PropTypes.func,
  when: PropTypes.bool.isRequired,
  validateUrl: PropTypes.string,
  history: PropTypes.object,
  comfirmCallback: PropTypes.func,
  message: PropTypes.string,
  confirmSave: PropTypes.oneOfType([PropTypes.func, null]),
};

ConfirmRoute.defaultProps = {
  blockHandler: null,
  goTo: null,
  validateUrl: '',
  history: {},
  comfirmCallback: null,
  message: '',
  confirmSave: null,
};
export default ConfirmRoute;
