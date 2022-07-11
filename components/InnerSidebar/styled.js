import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const SidebarStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 40px;
  @media (min-width: 832px) {
    padding: 32px 0;
  }
  .innerLink-arrow {
    font-size: 18px;
    height: 35px;
    ${media.largeScreen} {
      display: none;
    }
  }
`;

SidebarStyled.LinkItem = styled.li`
  font-family: ${props => (props.selected ? 'Gilroy-SemiBold' : 'Gilroy')};
  color: ${props =>
    props.selected ? props.theme.flatBlue : props.theme.greyishBrown};
  font-size: 16px;
  border-bottom: 1px solid #e2e2e2;
  :first-child {
    ${media.mobileScreen} {
      border-top: 1px solid #e2e2e2;
    }
  }
  padding: 12px 15px;
  display: flex;
  align-items: center;
  ${media.webView} {
    border: none;
    padding-left: 0;
  }
  cursor: pointer;
  a {
    justify-content: space-between;
    align-items: center;
    &:hover,
    &:focus,
    &:active {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
  }
  .link-item {
    display: inline-block;
    padding-left: 18px;
    width: 100%;
    margin-top: 3px;
  }
  .tick-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex: 1 0 auto;
    background-color: ${props =>
      props.completed ? props.theme.green : props.theme.headerGrey};
  }
  .tick-circle-icon {
    font-size: 24px;
    color: ${props =>
      props.completed ? props.theme.green : props.theme.white};
  }
`;

export { SidebarStyled };

export const Note = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 21px;
  color: #888;
  padding-bottom: 5px;
  max-width: 310px;
  margin: 0 auto;
  display: block;
  text-align: center;
  ${media.webView} {
    display: inline-block;
    text-align: left;
    max-width: 100%;
  }
`;
