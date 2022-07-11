import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { TextInput } from 'components/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ToolTip from '../ToolTip';

import { AlertInputWrapper, ButtonLeft, IconButton, Error } from './styled';
import { withTheme } from '@emotion/react';

const AlertInputField = props => {
  const { t } = useTranslation();
  const [mailId, setMailId] = useState('');
  const [error, setError] = useState('');

  const checkEmail = (mail) => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!emailRegex.test(mail)) {
      setError(t('common.incorrectemail'));
      return false;
    }
    setError('');
    return true;
  }

  const setEmail = (e) =>{
    setMailId(e.target.value);
  }
  
  const submitMailId = () => {
    if(checkEmail(mailId)) {
      props.requestAlert(mailId);
      setMailId('');
    }
  }

  const onKeyUp = e => {
    if (e.keyCode === 13) {
      submitMailId()
    }
  }

  return (
    <React.Fragment>
      <AlertInputWrapper className={props.classes.root}>
        <ToolTip title={props.toolTip}>
          <ButtonLeft className={props.classes.leftButton}>
            {props.buttonLabel}
          </ButtonLeft>
          </ToolTip>
        <AlertInputWrapper.WrapInputIcon className={props.classes.inputWrapper}>
          <TextInput
            InputProps={{
              classes:{
                root: props.classes.input,
                input: props.classes.inputField},
                disableUnderline: true,
            }}
            rootClass={props.classes.alertInputRoot}
            placeholder={t('common.alertEmailPlaceholder')}
            onKeyUp={onKeyUp}
            value={mailId}
            onChange={setEmail}
          />
          <IconButton type="submit">
            <FontAwesomeIcon color={props.theme.flatBlue} onClick={submitMailId} icon={faPaperPlane} />
          </IconButton>
        </AlertInputWrapper.WrapInputIcon>
      </AlertInputWrapper>
      {
        error && <Error>{error}</Error>
      }
    </React.Fragment>

  );
};

AlertInputField.propTypes = {
  toolTip:  PropTypes.string,
  classes: PropTypes.object,
  buttonLabel: PropTypes.string.isRequired,
  requestAlert: PropTypes.func.isRequired,
};

AlertInputField.defaultProps = {
  classes: {},
  toolTip: '',
};

export default withTheme(AlertInputField);

