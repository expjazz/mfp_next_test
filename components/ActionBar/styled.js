import styled from '@emotion/styled';

export const Wrapper = styled.div`
  min-height: ${props => (props.activeTab ? '170px' : 'auto')};
`;

export const ActionStyled = styled.div`
  display: block;
  position: relative;
`;

export const ActionList = styled.ul`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  background-color: ${props => props.theme.flatBlue};
`;

export const ListItem = styled.li`
  padding: 7px 9px;
  font-size: 12px;
  font-family: Gilroy-Medium;
  color: #fff;
  flex: 1;
  white-space: nowrap;
  cursor: pointer;

  :not(:last-child) {
    border-right: 1px solid #fff;
  }
  :first-child {
    border-radius: 5px 0 0 0;
  }

  :last-child {
    border-radius: 0 5px 0 0;
  }

  ${props => props.active && `background-color: ${props.theme.orangePink}`};
  text-align: center;
`;
export const DropContent = styled.section`
  border-radius: 0 0 5px 5px;
  background: ${props => props.theme.greyBackground};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-top: 0;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;
`;

export const List = styled.section`
  .share-list {
    justify-content: center;
    border-radius: 0 0 5px 5px;
    max-width: 100%;
    padding: 10px 0;
  }
  .tip-container {
    padding-bottom: 20px;
    margin-top: 15px;
  }
  .rating-wrapper {
    text-align: center;
    padding: 20px;
    font-size: 22px;
    .rate-button {
      color: ${props => props.theme.flatBlue};
      border: 1px solid ${props => props.theme.flatBlue};
      border-radius: 5px;
      padding: 7px 20px;
      background: #fff;
      cursor: pointer;
      outline: none;
    }
    .rating-wrap {
      padding-top: 7px;
      padding-bottom: 12px;
    }
    .rate {
      width: 150px;
      display: flex !important;
      justify-content: space-between;
      margin: 0 auto;
    }
  }

  .action-title {
    font-family: Gilroy-Regular;
    font-size: 12px;
    color: #3c3c3c;
    text-align: center;
  }
  .comment-box {
    padding: 10px;
  }
  .comment-box {
    > span:empty {
      display: none;
    }
    .input-wrapper {
      background: #fff;
      height: 90px;
      border-radius: 5px;
      border-color: #ccc;
      align-items: flex-start;
      input {
        height: auto;
        padding: 5px 0;
        margin: 3px 10px 0;
        color: #555;
        font-size: 14px;
        line-height: 18px;
      }
      .comment-icon {
        margin-bottom: 10px;
      }
      svg {
        align-self: flex-end;
        margin-right: 10px;
      }
    }
  }
`;

export const ReactionInput = styled.input`
  display: none;
`;
