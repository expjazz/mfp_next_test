/* eslint-disable camelcase */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { isEmpty } from 'src/utils/dataStructures';
import { requestProduct } from 'src/services/index';
import { TextInput } from 'components/TextField';
import Dropdown from 'components/Dropdown';
import Button from 'components/PrimaryButton';
import Loader from 'components/Loader';
import { Image, FlexCenter, InputWrapper } from 'styles/CommonStyled';
import TextArea from 'components/TextArea';
import CommentBox from 'components/CommentBox';
import QuickComment from 'components/QuickComment';
import BookingStyled from '../../../../styled';
import StarViewStyled from '../../styled';
import { Wrapper, ProductSection } from './styled';

const Products = props => {
  const { t } = useTranslation();
  const {
    product_request_details: requestDetails,
    id: bookingId,
  } = props.bookingData;

  const [formData, updateFormData] = useState({
    details: requestDetails.celebrity_reply,
    trackingId: requestDetails.tracking_number,
    shippingCarrier: {
      label: requestDetails.shipping_carrier,
      key: requestDetails.shipping_carrier,
    },
  });

  const inputChange = state => event => {
    updateFormData({ ...formData, [state]: event.target.value });
  };

  const onCarrierChange = carrier => {
    updateFormData({ ...formData, shippingCarrier: carrier });
  };

  const completeRequest = () => {
    const payload = {
      celebrity_reply: formData.details,
      tracking_number: formData.trackingId,
      shipping_carrier: !isEmpty(formData.shippingCarrier)
        ? formData.shippingCarrier.key
        : '',
      complete_status: 'completed',
    };
    props.loaderAction(true);
    requestProduct('edit', bookingId, payload)
      .then(resp => {
        props.loaderAction(false);
        if (resp.booking) {
          props.updateToast({
            value: true,
            message: t('common.update_success'),
            variant: 'success',
            global: true,
          });
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
            global: true,
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.completion_failed'),
          variant: 'error',
          global: true,
        });
      });
  };

  const carriers = useMemo(() => {
    return props.carriers.map(carrier => ({ label: carrier, key: carrier }));
  }, [props.carriers.length]);

  return (
    <Wrapper>
      <BookingStyled.Layout starMode className="layout">
        <BookingStyled.LeftSection className="left-section">
          <ProductSection>
            <span className="flex-box">
              <Image
                className="image"
                image={
                  requestDetails.product.product_image &&
                  requestDetails.product.product_image.length > 0
                    ? requestDetails.product.product_image[0]
                    : null
                }
              />
              <span className="flex-col details">
                <span className="text">{requestDetails.product.title}</span>
                <span className="text">
                  {
                    t('common.shippedOn', {
                      date: moment(requestDetails.completed_date).format('MMM D, YYYY')
                    })
                  }
                </span>
              </span>
            </span>

            <div className="inpt-wrap">
              <InputWrapper className="input-wrapper">
                <TextInput
                  label={t('common.tracking_number')}
                  onChange={inputChange('trackingId')}
                  value={formData.trackingId}
                  InputProps={{
                    classes: { error: 'error-field', input: 'input-field' },
                  }}
                  InputLabelProps={{
                    classes: {
                      shrink: 'input-label-shrink',
                      root: 'float-label',
                    },
                  }}
                  nativeProps={{ type: 'text', maxLength: 50 }}
                />
              </InputWrapper>
              <div className="input-wrapper">
                <Dropdown
                  rootClass="state-drop"
                  selected={formData.shippingCarrier}
                  options={carriers || []}
                  labelKey="label"
                  valueKey="key"
                  onChange={onCarrierChange}
                  placeHolder={t('common.select_carrier')}
                  className="cus-drop"
                  secondary
                />
              </div>
              <TextArea
                className="textarea"
                autoSize
                inputProps={{
                  onChange: inputChange('details'),
                  value: formData.details,
                  maxLength: 500,
                  placeholder: t('common.add_comments'),
                }}
              />
              <FlexCenter className="btn-wrp">
              <Button onClick={completeRequest}>{t('common.update')}</Button>
              </FlexCenter>
            </div>
          </ProductSection>
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection starMode>
          {props.renderCommentList()}
          <StarViewStyled.CommentWrapper>
            <CommentBox
              maxLength={104}
              thresholdLimit={97}
              classes={{ root: 'comment-box' }}
              onSubmit={props.submitComment}
            />
            <QuickComment
              bookingId={props.bookingData.booking_id}
              fanName={props.bookingData.fan_first_name}
              onSubmit={props.onQuickComment}
              classes={{ root: 'quick-comment' }}
            />
          </StarViewStyled.CommentWrapper>
          {props.loading && <Loader />}
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};

Products.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  onQuickComment: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  carriers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Products;
