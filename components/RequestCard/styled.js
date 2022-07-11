import styled from '@emotion/styled';

export const SubHead = styled.span`
  font-size: 14px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.orangePink};
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  object-fit: cover;
  object-position: center;
`;

export const Wrapper = styled.li`
  width: 354px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
  padding: 10px;
  margin-left: 13px;
  margin-right: 13px;
  position: relative;
  margin-bottom: 15px;
  ${props => props.clickable && 'cursor: pointer'};
  .flex-align {
    flex: 1;
    width: 100%;
  }
  :hover {
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.6);
  }
  .image {
    display: block;
    margin: 0 auto;
    border-radius: 0;
  }
  .heading {
    font-size: 16px;
    font-family: Gilroy-Medium;
    line-height: 22px;
    color: ${props => props.theme.greyishBrown};
    padding-top: 14px;
    text-transform: uppercase;
  }
  .start-btn {
    min-width: 100%;
    margin-top: 10px;
    font-size: 14px;
    border-radius: 0;
    min-height: 32px;
    font-family: Gilroy-Bold;
  }
  .card-desc {
    font-size: 14px;
    text-align: left;
    font-family: Gilroy-Light;
    line-height: 21px;
  }
  .card-image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 10px;
    margin-top: 10px;
    object-fit: cover;
    object-position: center;
  }
`;
