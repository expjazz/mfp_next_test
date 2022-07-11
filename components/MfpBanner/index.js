import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import PropTypes from 'prop-types';
import CloseIcon from 'components/CloseIcon';
// import { toggleMfpBanner, toggleRegCollector } from 'store/shared/actions/toggleModals';
import { DescriptionP } from 'styles/TextStyled';
import { DialogStyled, ModalContainer, Heading, Logo, LinkTag } from './styled';
import { locStorage } from 'src/utils/localStorageUtils';
import { toggleMfpBanner, useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const MfpBanner = (props) => {
  const { t } = useTranslation();
  const [_, dispatch] = useGeneral()
  const { data: fanData } = useFetchLoggedUser()
  const isLoggedIn = !!fanData
  const closeHandler = () => {
    toggleMfpBanner(dispatch, false);
  };

  useEffect(() => {
    locStorage.setItem('mfpBanner', true);
  }, [])

  return (
    <DialogStyled
      open
      onClose={closeHandler}
      disableBackdropClick={false}
      classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
    >
      <CloseIcon
        className='close-icon'
        onClick={() => closeHandler()}
      />
      <ModalContainer>
        <Logo src='/images/myfanpark-logo.png' />
        <Heading>
          <Trans i18nKey="common.mfpBanner.heading">
            Welcome to the new<br />myFanPark Experience
          </Trans>
        </Heading>
        <DescriptionP className='description'>
          <Trans i18nKey="common.mfpBanner.description">
            Same look, different name. Starsona is now myFanPark. Fans can now connect directly and authentically with more celebrities from around the world in almost any way imaginable.
            <LinkTag href='https://about.myfanpark.com' target='_blank'>Read More</LinkTag>
          </Trans>
        </DescriptionP>
      </ModalContainer>
    </DialogStyled>
  );
}

// MfpBanner.propTypes = {
//   toggleMfpBanner: PropTypes.func.isRequired,
//   toggleRegCollector: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// }

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => ({
//   toggleMfpBanner: state => dispatch(toggleMfpBanner(state)),
//   toggleRegCollector: state => dispatch(toggleRegCollector(state)),
// })

export default MfpBanner
