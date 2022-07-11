import styled from '@emotion/styled';
import { descStyles } from 'styles/TextStyled';
import Popper from '@material-ui/core/Popper';

const ShareStyled = styled.div`
  .action-btn {
    min-width: auto;
    min-height: auto;
    width: 130px;
    height: 40px;
    margin-right: 7px;
  }
  #share-popper {
  }
`;

export const Poppover = styled(Popper)`
  z-index: 10000;
`;

ShareStyled.List = styled.ul`
  background: ${props => props.theme.pureWhite};
  display: flex;
  border-radius: 0;
  max-width: 225px;
  padding: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.27);
  flex-wrap: wrap;
  .list-item {
    color: ${props => props.theme.greyishBrown};
    flex: 0 0 105px;
    padding: 10px;
    text-align: center;
    &:last-child {
      border-bottom: none;
    }
    .social-btn {
      cursor: pointer;
      outline: none;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        font-size: 19px;
      }
      .icon-text {
        ${descStyles};
        margin-top: 9px;
        display: block;
      }
    }
  }
  .sms-section {
    display: flex;
    align-items: center;
    flex-direction: column;
    .input-root {
      width: 100%;
      margin-top: 10px;
      display: block;
      margin-bottom: 10px;
    }
  }
  .download-icon {
    font-size: 18px;
  }
`;

ShareStyled.ErrorField = styled.span`
  color: #990000;
  font-size: 12px;
  margin-top: 5px;
  font-family: Gilroy-Medium;
  text-align: left;
`;

export default ShareStyled;
