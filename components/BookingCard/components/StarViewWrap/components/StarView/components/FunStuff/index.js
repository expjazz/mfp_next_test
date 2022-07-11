/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import CommentBox from 'components/CommentBox';
import QuickComment from 'components/QuickComment';
import { Description } from 'styles/TextStyled';
import Loader from 'components/Loader';
import TypeChooser from './components/TypeChooser';
import BookingStyled from '../../../../styled';
import StarViewStyled from '../../styled';
import { Wrapper, FunSection } from './styled';

const FunStuff = props => {
  const { fun_stuff_request_details: reqDetails } = props.bookingData;
  return (
    <Wrapper>
      <BookingStyled.Layout starMode className="layout">
        <BookingStyled.LeftSection className="left-section">
          <FunSection>
            <TypeChooser
              updateToast={props.updateToast}
              loaderAction={props.loaderAction}
              delivMethod={reqDetails.delivery_method}
              bookingData={props.bookingData}
            />
            {reqDetails.celebrity_reply && reqDetails.delivery_method !== 5 && (
              <Description className="note-info">
                {reqDetails.celebrity_reply}
              </Description>
            )}
          </FunSection>
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

FunStuff.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  onQuickComment: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FunStuff;
