import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
// import Input from 'components/TextInput';
// import { validateEmail } from 'src/utils/dataformatter';
import { Wrapper, Message } from './styled';
import { useTranslation } from 'next-i18next';
import { validateEmail } from '../../src/utils/dataformatter';
import Input from '../TextInput';
import { fetchFanAlert } from 'src/services/myfanpark/bookingActions';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';

function AlertSoldOut({
  celbId,
  type,
  productId,
  fanEmail,
  ...props
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState(fanEmail);
  const [emailError, setEmailError] = useState(false);
  const dispatch = useGeneral()[1]
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const inputChange = ({ target: { value } }) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(false);
    }
  };

  const onSubmit = (click=false) => event => {
    if (event.keyCode === 13 || click) {
      if (!validateEmail(email)) {
        fetchFanAlert(celbId, type, email, productId, loaderAction, localUpdateToast).then(res => {
          if (res.data) {
            localUpdateToast({
              value: true,
              message: res.data,
              variant: 'success',
              global: true
            });
          }
        });
      } else {
        setEmailError(true);
      }
    }
  };
  return (
    <Wrapper className={props.rootClass}>
      <Message>{t('common.sold_out')}</Message>
      <Input
        inputProps={{
          defaultProps: {
            value: email,
            onChange: inputChange,
            onKeyUp: onSubmit(),
            error: emailError,
          },
          labelObj: {
            label: t('common.enterEmail'),
            errorMsg: emailError && emailError && t('common.valid_url'),
          },
          mInputProps: {
            classes: { rest: {} },
            InputProps: {
              endAdornment: (
                <FontAwesomeIcon icon={faTelegramPlane} onClick={onSubmit(true)} />
              ),
            },
          },
        }}
      />
    </Wrapper>
  );
}

AlertSoldOut.propTypes = {
  alertFan: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  celbId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  rootClass: PropTypes.string,
  fanEmail: PropTypes.string,
  type: PropTypes.number.isRequired,
};

AlertSoldOut.defaultProps = {
  rootClass: '',
  fanEmail: '',
  alertFan: () => {},
};

// const mapDispatchToProps = dispatch => ({
//   alertFan: (celebId, requestType, fanEmail, itemId) =>
//     dispatch(fetchFanAlert(celebId, requestType, fanEmail, itemId)),
// });

export default AlertSoldOut;
