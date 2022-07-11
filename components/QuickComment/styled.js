import styled from '@emotion/styled';
import Popover from '@material-ui/core/Popover';
/* eslint-disable */
// injectGlobal`
// .tooltip-disable {
//   display: none;
// }`

const CommentStyled = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
  ${props => props.showList && `
    border: none !important;
  `}
`;

CommentStyled.CommentIcon = styled.span`
  width: 100%;
  height: 100%;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  border-color: ${props => props.theme.flatBlue};
  background: ${props => props.showList ? props.theme.flatBlue : '#fff'};
  color: ${props => props.showList ? '#fff' : props.theme.flatBlue};
  ${props => props.disable && `
    background: ${props.theme.veryLightPinkTwo};
    color: ${props.theme.brownGrey};
  `}
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  .quick-arrow {
    position: absolute;
    display: ${props => props.showList ? 'block' : 'none'};
    content: '';
    top: -5px;
    left: -3px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #fff;
    z-index: 9999;
  }
`;

CommentStyled.Popover = styled(Popover)`
  .paper-root {
    overflow: initial;
    box-shadow: none;
    background: transparent;
    width: 196px;
  }
`;

CommentStyled.ListWrapper = styled.div`
  display: flex;
  .thumb-vertical {
    display: none;
  }
  .arrow-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 24px;
    .arrow {
      background: url('..//images/previcon.svg') no-repeat;
      background-size: contain;
      width: 20px;
      display: inline-block;
      height: 20px;
      cursor: pointer;
      &.arrow-1 {
        transform: rotateZ(90deg);
        margin-bottom: auto;
        margin-top: 0;
      }
      &.arrow-2 {
        transform: rotateZ(-90deg);
        margin-bottom: 7px;
      }
    }
    @media(min-width: 832px) {
      .arrow-list {
        margin: 10px 0;
      }
    }
  }
`;

CommentStyled.OptionWrapper = styled.div`
  position: relative;
  padding: 16px 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
  bottom: 3px;
  &:before {
    content: '';
    position: absolute;
    bottom: -20px;
    right: 89px;
    border-bottom: 10px solid #fff;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
    z-index: 10;
    transform: rotateZ(180deg);
    @media(max-width: 831px) {
      display: none;
    }
  }
  .emoji-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 0 20px;
    .emoji-icon {
      width: 24px;
      height: 30px;
      cursor: pointer;
    }
  }
  .option-title {
    font-size: 12px;
    display: block;
    color: ${props => props.theme.boldBrown};
    text-align: center;
    font-family: Gilroy-Regular;
  }
  .comment-list {
    height: 209px;
    width: 145px;
    .comment-item {
      padding: 7px 10px;
      width: 112px;
      font-size: 12px;
      text-align: center;
      border-radius: 60px;
      font-family: Gilroy-Medium;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${props => props.theme.veryLightPinkTwo};
      color: ${props => props.theme.flatBlue};
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default CommentStyled;
