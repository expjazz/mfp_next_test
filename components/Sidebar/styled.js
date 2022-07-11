import styled from '@emotion/styled';

const SidebarStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

SidebarStyled.AvatarImage = styled.span`
  border: none;
  border-radius: 50%;
  width: 170px;
  margin: 0 auto;
  height: 170px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  background: ${props =>
      props.imageUrl
        ? `url(${props.imageUrl})`
        : 'url(/images/fan-profile-pic.svg)'}
    no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: block;
  @media (max-width: 831px) {
    display: ${props => (props.hidden ? 'none' : 'block')};
    width: 150px;
    height: 150px;
  }
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 0;
  @media (min-width: 832px) {
    max-width: 620px;
    margin: 0 auto;
    padding: 32px 0;
  }
  @media (max-width: 831px) {
    width: 100%;
  }
`;

SidebarStyled.LinkItem = styled.li`
  font-family: ${props => (props.selected ? 'Gilroy-Bold' : 'Gilroy-Regular')};
  color: ${props =>
    props.selected ? props.theme.flatBlue : props.theme.greyishBrown};
  font-size: 18px;
  line-height: 27px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .log-out {
    &:hover {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
  }
  @media (max-width: 831px) {
    padding: 0 10px;
    margin-bottom: 0;
    border-bottom: ${props => `1px solid ${props.theme.borderGrey}`};
    &:first-child {
      border-top: ${props => `1px solid ${props.theme.borderGrey}`};
    }
  }
  a,
  .log-out {
    font-size: 16px;
    line-height: 27px;
    padding: 12px 0 10px 0;
    display: flex;
    margin-bottom: 0;
    @media (min-width: 832px) {
      padding-bottom: 0;
      font-size: inherit;
      padding-top: 0;
    }
  }
  a {
    justify-content: space-between;
    align-items: center;
    &:hover {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
    .notification-count {
      display: flex;
      border-radius: 5px;
      justify-content: center;
      align-items: center;
      line-height: 18px;
      font-size: 16px;
      padding: 7px 10px 5px;
      font-family: Gilroy-Bold;
    }
    @media (min-width: 832px) {
      justify-content: flex-start;
      align-items: flex-start;
      cursor: pointer;
      .notification-count {
        margin-left: 8px;
      }
    }
    @media (max-width: 831px) {
      color: #555;
    }
  }
  & > span {
    @media (max-width: 831px) {
      color: #555;
    }
  }
  .sidebar-arrow {
    font-size: 14px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
  }
  .fav-count {
    color: ${props => props.theme.greyishBrown};
  }
`;

const MoreBtn = styled.span`
  font-size: 16px;
  font-family: Gilroy;
  line-height: 35px;
  color: ${props => props.theme.flatBlue};
  padding: 0 13.5px;
  margin-top: 9px;
  display: block;
`;

export { SidebarStyled, MoreBtn };
