import styled from '@emotion/styled';

export const UserName = styled.span`
  font-family: Gilroy-Bold;
  font-size: 16px;
  line-height: 23px;
  color: ${props => props.theme.pureWhite};
  margin: 0 22px;
  margin-top: 7px;
  margin-left: 10px;
`;

export const UserPhoto = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;

export const MenuWrap = styled.span`
  width: 27px;
  height: 27px;
  cursor: pointer;
  font-size: 17px;
  background: ${props => props.theme.pureWhite};
  display: flex;
  align-items: center;
  border-radius: 50%;
  color: ${props => props.theme.greyishBrown};
  justify-content: center;
`;

export const UserDet = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const getHeadTop = (props) => {
  let offset = 0;
  if (props.hasDiscount) {
    offset += 45;
  }
  if (props.hasActionHead) {
    offset += 60;
  }
  return `${offset}px`;
}

export const HeadWrap = styled.header`
  padding: 20px 16px;
  pointer-events: auto;
  max-width: 1019px;
  margin: 0 auto;
  z-index: 1;
  position: absolute;
  top: ${props => props.hasDiscount ? '45px' : 0};
  top: ${props => getHeadTop(props)};
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.pureWhite};
  .nav-wrap {
    display: flex;
    align-items: center;
  }
  .back-btn {
    font-size: 28px;
    margin-right: 10px;
    cursor: pointer;
  }
  .circle-icon {
    font-size: 27px;
  }
  .notf-count {
    padding: 7px 10px 3px;
    margin-top: 3px;
    color: ${props => props.theme.greyishBrown};
    background-color: ${props => props.theme.pureWhite};
  }
  .head-name {
    font-family: ${props =>
    props.theme.font ? props.theme.font : 'Gilroy-Bold'};
  }
`;

export const ActionHead = styled.section`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 0 23px;
  .action-btn {
    background-color: ${props => props.theme.default.flatBlue};
    border-color: ${props => props.theme.default.flatBlue};
  }
  .back-lbl-wrp {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${props => props.theme.default.flatBlue};
    .back-label {
      font-size: 12px;
      padding-left: 8px;
      padding-top: 0;
    }
  }
`;
