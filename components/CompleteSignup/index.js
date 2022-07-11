import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton, FlexCenter } from '../../styles/CommonStyled';
import PrimaryButton from '../../components/PrimaryButton';
import { Content,  Container, Head } from './styled';

const CompleteSignup = props => {

  return (
    <Container>
      <CloseButton className='action-buttons' onClick={props.onClose} />
      <FlexCenter className="colAlign content">
        <Head className="heading">{props.title}</Head>
        <Content.Image imageUrl={props.image_url}> </Content.Image>
        <Content.MainTitle {...props}>{props.main_title} </Content.MainTitle>
        <Content.Description {...props}>{props.description} </Content.Description>
        <Content.ButtonWrapper>
          <PrimaryButton className='success-button' onClick={props.primaryButtonClick} >
            {props.primary_button}              
          </PrimaryButton>
            <PrimaryButton className='success-button' secondary onClick={props.secondaryButtonClick}>
              {props.secondary_button}             
            </PrimaryButton>
        </Content.ButtonWrapper>
      </FlexCenter>
    </Container>
  );
};

CompleteSignup.propTypes = {
  switched: PropTypes.bool,
  onClose: PropTypes.func,
};

CompleteSignup.defaultProps = {
  switched: false,
  onClose: () => {},
};

export default CompleteSignup;
