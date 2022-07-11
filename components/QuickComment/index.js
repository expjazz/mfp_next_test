import React, { useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import { Scrollbars } from 'react-custom-scrollbars';
import LightningIcon from '../LightningIcon';
import ToolTip from '../ToolTip';
import { commentGenerator } from './utils';
// import { addVideoComment } from '../../services/addVideoComment';
import CommentStyled from './styled';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { addVideoComment } from 'src/services/addVideoComment';
import { useQueryClient } from 'react-query';
import { css, Global } from '@emotion/react';

const QuickComment = (props) => {
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true })
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const anchorEl = useRef(null);
  const scrollRef = useRef(null);
  const [disable, setDisable] = useState(false);
  const [showList, toggleList] = useState(false);

  const openList = () => {
    if (!disable) {
      toggleList(!showList);
    }
  };

  const handleClose = () => {
    toggleList(false);
  };

  const scrollPosChange = (type) => () => {
    const currentTop = scrollRef.current.getScrollTop();
    const scrollOffset = 20;
    if (type === 'below') {
      scrollRef.current.scrollTop(currentTop + scrollOffset);
    } else {
      scrollRef.current.scrollTop(currentTop - scrollOffset);
    }
  }

  const addComment = (comment) => async () => {
    if (props.notSend) {
      props.onSubmit(comment);
    } else {
      loaderAction(true);
      try {
        await addVideoComment(props.videoId, comment, props.bookingId);
        if (props.once) {
          setDisable(true);
        }
        if (props.bookingId) {
          props.onSubmit(comment);
        }
        queryClient.refetchQueries(['fan-act-list'])
        handleClose();
      } catch(exception) {
        localUpdateToast({
          value: true,
          message: exception.response ? exception.response.data.error.message : t('common.something_wrong'),
          variant: 'error',
        })
      }
      loaderAction(false);
    }
  }

  const { fanName } = props;
  return (
    <>
    <Global styles={css`
      .tooltip-disable {
        display: none;
      }
    `}/>
    <ToolTip
      title={disable ? t('common.comment_sent') : t('common.quick_comment')}
      classes={{
        toolTip: showList ? 'tooltip-disable' : '',
      }}
      placement="top"
    >
      <CommentStyled showList={showList} className={props.classes.root}>
        <CommentStyled.CommentIcon disable={disable} showList={showList} ref={anchorEl} onClick={openList}>
          <LightningIcon className='icon-image' />
        </CommentStyled.CommentIcon>
        <CommentStyled.Popover
          id="quick-comment-popper"
          open={showList}
          anchorEl={anchorEl && anchorEl.current}
          onClose={handleClose}
          classes={{ paper: 'paper-root' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <CommentStyled.OptionWrapper>
            <span className="option-title">Post a Quick Response</span>
            <span className="emoji-list">
              <img className='emoji-icon' alt='heart' src='/images/heart.png' onClick={addComment('❤️')} />
              <img className='emoji-icon' alt='happy' src='/images/happy.png' onClick={addComment('😃')} />
              <img className='emoji-icon' alt='trophy' src='/images/trophy.png' onClick={addComment('🏆')} />
              <img className='emoji-icon' alt='thumbsup' src='/images/thumbsup.png' onClick={addComment('👍')} />
            </span>
            <CommentStyled.ListWrapper>
              <ul className="comment-list">
                <Scrollbars
                  ref={scrollRef}
                  renderThumbVertical={scrollProps => <div {...scrollProps} className="thumb-vertical"/>}
                >
                  {
                    commentGenerator(fanName).map((comment, index) => (
                      <li className="comment-item" key={index} onClick={addComment(comment)}>{comment}</li>
                    ))
                  }
                </Scrollbars>
              </ul>
              <span className='arrow-list'>
                <span className='arrow arrow-1' onClick={scrollPosChange('top')} />
                <span className='arrow arrow-2' onClick={scrollPosChange('below')} />
              </span>
            </CommentStyled.ListWrapper>
          </CommentStyled.OptionWrapper>
        </CommentStyled.Popover>
      </CommentStyled>
    </ToolTip>
    </>
  )
}

QuickComment.defaultProps = {
  classes: {},
  fanName: '',
  once: false,
  notSend: false,
  videoId: '',
  bookingId: undefined,
  onSubmit: () => {},
}

QuickComment.propTypes = {
  classes: PropTypes.object,
  fanName: PropTypes.string,
  videoId: PropTypes.string,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  once: PropTypes.bool,
  notSend: PropTypes.bool,
  bookingId: PropTypes.string,
}

// const mapDispatchToProps = dispatch => ({
//   updateToast: errorObject => dispatch(updateToast(errorObject)),
//   loaderAction: state => dispatch(loaderAction(state)),
// });

export default QuickComment
