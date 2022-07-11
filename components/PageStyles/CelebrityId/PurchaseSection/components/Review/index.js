import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'components/StarRating';
import SharePage from '../SharePage';
import Follow from '../Follow';
import { Wrapper, RateWrap, Desc, ButtonWrap } from './styled';
import { getAvtar } from '../../utils';

function Review(props) {
  const { data, starData } = props
  return (
    <Wrapper className="review-wrp">
      {data.rating && (
        <RateWrap>
          <StarRating readOnly ratingClass="rating" rating={data.rating} />
          <span className="review-text">
            {data.rating_count} {data.rating_count > 1 ? 'Reviews' : 'Review'}
          </span>
        </RateWrap>
      )}
      <ul className="list-ul">
        {data.comments.map((comment, index) => {
          return (
            <li className="list-li" key={`Review-${index}`}>
              <Desc>
                {comment.comments} - <span>{comment.user_name}</span>
              </Desc>
            </li>
          );
        })}
      </ul>
      <ButtonWrap>
        <SharePage 
          starData={{celbData: starData.celbData,
                    userData: starData.userData,
                    avatar: starData.avatar}}   
          star={starData.userData}         
          />
        <Follow
          starData={props.celebrityData}
          loaderAction={props.loaderAction}
          updateToast={props.updateToast}
          updateUserDetails={props.updateUserDetails}
          isStar={props.isStar}
        />
      </ButtonWrap>
    </Wrapper>
  );
}

Review.propTypes = {
  data: PropTypes.object.isRequired,
  starData: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  isStar: PropTypes.bool.isRequired,
};

export default Review;
