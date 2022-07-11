import styled from '@emotion/styled';

export const Li = styled.li`
  position: relative;
  ${props => props.hasImage && 'cursor: pointer'};
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  width: 100%;
  padding: 10px;
  padding-right: 25px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  font-family: Gilroy;
  &:hover {
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.14);
  }
  &.fun-desc {
    font-size: 14px;
    padding: 15px 10px;
  }
  .content-wrap {
    display: flex;
    .right-content {
      display: flex;
      flex-direction: column;
      width: calc(100% - 70px);
      flex: 1;
    }
    .head {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
      font-size: 14px;
      word-break: break-word;
      line-height: 21px;
    }
    .text {
      font-family: Gilroy;
      font-size: 14px;
      line-height: 21px;
      color: ${props => props.theme.greyishBrown};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-transform: capitalize;
    }
    .low-case {
      text-transform: lowercase;
    }
  }
  .hidden {
    color: ${props => props.theme.errorRed};
    font-family: Gilroy-Medium;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 18px;
    color: ${props => props.theme.flatBlue};
  }
  .edit-btn {
    min-width: 120px;
    width: 120px;
    min-height: 30px;
    margin-top: 10px;
    border-radius: 5px;
  }
  .MuiFormControl {
    width: 100%;
    textarea {
      overflow: hidden;
      padding: 10px;
      border: 1px solid ${props => props.theme.borderGrey};
      color: ${props => props.theme.twilight};
      font-family: Gilroy;
      font-size: 18px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }

  .text-title {
    font-size: 14px;
  }
  .capitalize {
    text-transform: capitalize;
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    &.process-link {
      justify-content: center;
    }
    .fa-download {
      font-size: 24px;
      color: ${props => props.theme.flatBlue};
    }
    .download {
      font-size: 10px;
    }
    .processing {
      font-size: 16px;
      color: ${props => props.theme.greyishBrown};
      font-family: Gilroy-Bold;
    }
  }
`;

export const Image = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
  background: ${props => (props.image ? `url(${props.image})` : '#333')};
  background-size: cover;
  background-repeat: no-repeat;
`;
