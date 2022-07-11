import styled from '@emotion/styled';

export const Layout = styled.div`
  display: flex;
  .star-img {
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin: 0;
  }
  .close-btn {
    font-size: 20px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
`;

export const NewLbl = styled.span`
  position: absolute;
  background: ${props => props.theme.orangePink};
  padding: 3px 5px;
  left: 4px;
  top: 4px;
  color: ${props => props.theme.pureWhite};
  font-family: Gilroy;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  width: calc(100% - 90px);
  padding-left: 10px;
  padding-right: 10px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  font-size: 14px;
  line-height: 21px;
  .star-nm {
    font-family: Gilroy-Bold;
    cursor: pointer;
  }
  .professions {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .sep {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
