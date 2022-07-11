import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from 'components/SecondaryButton';
import ShareButton from 'components/ShareButton';
import { CloseButton } from 'styles/CommonStyled';
import { ShareContent } from './constants';
import { Layout, Content, SmallHead, FooterWrap, Image } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { isEmpty } from 'src/utils/dataStructures';

const SuccessScreen = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const finalProps = !isEmpty(props.cusProps) ? props.cusProps : props;
  const services = {
    facebook: props.shareProps?.has_facebook,
    twitter: true,
    email: true,
    sms: true,
    instagram: true,
    instagramStory: props.shareProps?.has_instagram,
  }
  return (
    <Layout className="content-wrapper">
      {finalProps.closeHandler && (
        <CloseButton
          onClick={finalProps.closeHandler}
          className="closeBtn"
          id="id_close"
        />
      )}
      <Scrollbars
        className="successScroll"
        renderView={prop => <div {...prop} className="scrollRenderView" />}
      >
        <Content>
          {finalProps.customTitle}
          <h2 className="highFive">{finalProps.title}</h2>
          {finalProps.customMsg}
          {finalProps.successMsg && (
            <h1 className="orderSuccess">{finalProps.successMsg}</h1>
          )}
          {finalProps.customNote}
          <p className="note">{finalProps.note}</p>
          {finalProps.customButton}
          {!finalProps.customButton && isEmpty(props.shareProps) && (
            <div className="align-center">
              <Button className="browseBtn" onClick={finalProps.buttonHandler}>
                {finalProps.btnLabel}
              </Button>
            </div>
          )}
          {finalProps.footerContent}
          {!isEmpty(props.shareProps) &&
            entityData?.partnerData?.allow_star_share_graphics && (
              <React.Fragment>
                <SmallHead>
                  {t('common.boost_earnings', {
                    purchaser:entityData?.partnerData?.purchaser_plural_name,
                  })}
                </SmallHead>
                <Image src={props.shareProps.shareImage} data-cy='promo-image-response' />
                <FooterWrap>
                  <ShareButton
                    secondary
                    services={services}
                    buttonText={t('common.share')}
                    classes={{
                      button: 'foot-btn share-btn',
                    }}
                    popperProps={{
                      placement: 'top-start',
                    }}
                    beforeShare={props.shareProps.beforeShare}
                    shareUrl={props.shareProps.shareUrl}
                    content={ShareContent(
                      props.shareProps.starName,
                      props.shareProps.shareUrl,
                      t,
                      entityData?.partnerData
                    )}
                  />
                  <Button
                    className="foot-btn"
                    onClick={finalProps.buttonHandler}
                  >
                    {finalProps.btnLabel}
                  </Button>
                </FooterWrap>
              </React.Fragment>
            )}
        </Content>
      </Scrollbars>
    </Layout>
  );
};

SuccessScreen.propTypes = {
  closeHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  buttonHandler: PropTypes.object.isRequired,
  shareProps: PropTypes.object,
  title: PropTypes.string,
  successMsg: PropTypes.string,
  note: PropTypes.string,
  btnLabel: PropTypes.string,
  customTitle: PropTypes.node,
  customMsg: PropTypes.node,
  customNote: PropTypes.node,
  customButton: PropTypes.node,
  footerContent: PropTypes.node,
  cusProps: PropTypes.object,
};

SuccessScreen.defaultProps = {
  closeHandler: false,
  shareProps: {},
  title: '',
  successMsg: '',
  note: '',
  btnLabel: '',
  customTitle: '',
  customMsg: '',
  customNote: '',
  customButton: '',
  footerContent: '',
  cusProps: {},
};

// const mapStateToProps = state => ({
//   entityData: state.entity.data,
// });

export default SuccessScreen
