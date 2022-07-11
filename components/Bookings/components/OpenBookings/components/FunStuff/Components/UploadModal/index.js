import React from 'react';
import PropTypes from 'prop-types';
import { i18n, useTranslation } from 'next-i18next';
// import i18n from 'i18next';
import Button from 'components/SecondaryButton';
import { LinkText, Description } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
import { Wrapper, ModalContent, DialogStyled } from './styled';


function UploadModal(props) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {props.open && (
        <DialogStyled
          open={props.open}
          classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
        >
          <ModalContent>
            {!props.getComponent && (
              <React.Fragment>
                {
                  props.heading &&
                    <span className="sub-head upload-err">
                      {props.heading}
                    </span>
                }
                {
                  (props.description || props.moreInfo) && (
                    <Description>
                      {props.description}
                      <LinkText>{props.moreInfo}</LinkText>
                    </Description>
                  )
                }
                <FlexCenter className="buttons">
                  <Button
                    className="link-button"
                    secondary
                    onClick={props.changeDelivery}
                  >
                    {
                      props.primBtn
                    }
                  </Button>
                  <Button onClick={props.tryUpload}>{props.secBtn}</Button>
                </FlexCenter>
              </React.Fragment>
            )}
            {props.getComponent && props.getComponent()}
          </ModalContent>
        </DialogStyled>
      )}
    </Wrapper>
  );
}

UploadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  changeDelivery: PropTypes.func.isRequired,
  tryUpload: PropTypes.func.isRequired,
  description: PropTypes.string,
  moreInfo: PropTypes.string,
  heading: PropTypes.string,
  primBtn: PropTypes.string,
  secBtn: PropTypes.string,
  getComponent: PropTypes.oneOfType([PropTypes.func, null]),
};

UploadModal.defaultProps = {
  getComponent: null,
  description: i18n.t('common.upload_modal.description'),
  moreInfo: i18n.t('common.upload_modal.moreInfo'),
  heading: i18n.t('common.upload_modal.heading'),
  primBtn: i18n.t('common.upload_modal.primBtn'),
  secBtn: i18n.t('common.upload_modal.secBtn'),
};

export default UploadModal;
