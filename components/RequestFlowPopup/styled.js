import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

const PopupStyled = styled.div`
`;

PopupStyled.Dialog = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      max-height: 700px;
      border-radius: 20px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
  }
`;

PopupStyled.Container = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
  justify-content: center;
  height: 100%;
  .absolute {
    position: absolute;
    right: 30px;
  }
  @media (min-width: 832px) {
    border-radius: 20px;
  }
`;

PopupStyled.SmallContainer = styled(PopupStyled.Container)`
  padding: ${props => (props.noPadding ? '0' : '25px')};
  width: 100%;
  background-color: #fff;
  overflow: auto;
  .absolute {
    position: absolute;
    right: 30px;
  }
  @media(min-width: 832px) {
    width: 700px;
    height: 700px;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    max-height: 650px;
  }
  .closeClass{
    top: 20px;
  }
  .content-wrapper {
    margin-top: 20px;
  }
  .fa-times {
    font-size: 20px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
`;

PopupStyled.SmallContent = styled.div`
  width: 100%;
`;

PopupStyled.CloseButton = styled.span`
  position: absolute;
  right: 50px;
  z-index: 2;
  display: inline-block;
  cursor: pointer;
  color: #707070;
  font-size: 45px;
  line-height: 20px;
  top: 40px;
`;

export default PopupStyled;
