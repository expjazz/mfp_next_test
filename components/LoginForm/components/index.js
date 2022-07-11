import React from 'react';
import PropTypes from 'prop-types';
import { HeadingH2, DescriptionP, LinkText } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import { Wrapper } from './styled';

function LoginFailed(props) {
  return (
    <Wrapper>
      <HeadingH2>{props.t('common.havingTrouble')}</HeadingH2>
      <DescriptionP>
        {props.t('common.havingTrouble')}
        {props.t('common.troubleOptions')}:
      </DescriptionP>
      <div className="btn-wrp">
        <Button onClick={() => props.changeView('forgotpassword')}>
          {props.t('common.passwordValid.resetPass')}
        </Button>
        <a
          href={`mailto: ${props.partnerData.contact_email}?subject=${props.t('common.troubleLoggin')}`}
        >
          <Button>{props.t('common.account_settings.contactsupport')}</Button>
        </a>
      </div>
      <LinkText className="try-again" onClick={props.goBack}>
        {props.t('common.tryAgain')}
      </LinkText>
    </Wrapper>
  );
}

LoginFailed.propTypes = {
  entityData: PropTypes.object.isRequired,
};
// const mapStates = state => ({
//   entityData: state.entity.data,
// });

export default LoginFailed
