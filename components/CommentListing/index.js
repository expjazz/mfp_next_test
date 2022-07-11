import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentItem from '../CommentItem';
import ListingStyled from './styled';
import { withScroll } from '../withScroll';

const CommentListing = props => {
  return (
    <ListingStyled className={props.classes.root}>
      {props.dataList.map(data => (
        <ListingStyled.Content
          className="comment-list"
          key={data.id}
          sentComment={props.celebrityId !== data.user_id}
        >
          <CommentItem
            type={data.activity_type}
            isPublic={props.isPublic}
            activityId={data.id}
            disableAction={props.disableAction}
            user={data.activity_from_user}
            time={data.activity_details && data.activity_details.created_date}
            visible={data.public_visibility}
            commentDetails={data.activity_details}
            onReactionClick={props.onReactionClick}
            classes={{ comment: 'comment-section' }}
            receive={props.celebrityId !== data.user_id}
            celebrity={props.celebrity}
          />
        </ListingStyled.Content>
      ))}
    </ListingStyled>
  );
};

CommentListing.defaultProps = {
  onReactionClick: () => {},
  disableAction: false,
  celebrityId: '',
  isPublic: false,
  classes: {},
};

CommentListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  onReactionClick: PropTypes.func,
  userDetails: PropTypes.object.isRequired,
  disableAction: PropTypes.bool,
  celebrityId: PropTypes.string,
  isPublic: PropTypes.bool,
  classes: PropTypes.object,
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails.settings_userDetails,
// });

export default withScroll(CommentListing);
