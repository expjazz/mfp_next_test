import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';
import { HeadingBold } from '../../styled';

const CompletedStyled = styled(Card)`
  display: inline-block;
  position: relative;
  .favorite-icon {
    display: block;
    color: ${props => (props.isFavorite ? props.theme.orangePink : '#fff')};
    font-size: 23px;
    position: absolute;
    top: 12.2px;
    left: 14px;
    cursor: pointer;
    z-index: 10;
  }
  @media (min-width: 832px) {
    cursor: pointer;
    border-radius: 10px;
    .favorite-icon {
      top: 20.2px;
      left: initial;
      right: 18.3px;
    }
  }
`;

CompletedStyled.Container = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  @media (min-width: 832px) {
    flex-direction: column;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .thumbnail {
    position: relative;
    .process-label {
      position: absolute;
      top: 33%;
      left: 50%;
      color: yellow;
      transform: translate(-50%, 20%) rotate(-45deg);
      display: inline-block;
      text-align: center;
      font-family: Gilroy-Semibold;
      color: #555;
      font-size: 14px;
      @media (min-width: 832px) {
        font-size: 21px;
      }
    }
  }
`;

CompletedStyled.ProfilePic = styled.span`
  background: ${props =>
      props.imageUrl
        ? `url(${props.imageUrl})`
        : 'url(/images/default-cover.jpg)'}
    no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  display: inline-block;
  @media (min-width: 832px) {
    width: 100%;
    display: block;
    border-radius: 10px;
    height: 220px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

CompletedStyled.IconWrapper = styled.span`
  color: ${props => props.theme.orangePink};
  display: block;
  display: ${props => (props.visible ? 'block' : 'none')};
  margin-left: 10px;
  cursor: pointer;
  &.comment {
    .comment-icon {
      transform: rotateY(180deg);
      font-size: 22px;
    }
    @media (max-width: 831px) {
      margin-left: 55px;
    }
  }
  &.tip {
    padding: 5px 9.5px;
    border-radius: 10px;
    line-height: 9px;
    font-family: Gilroy-Medium;
    font-size: 10px;
    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.orangePink};
    color: #fff;
    @media (max-width: 831px) {
      padding: 16px 8px 2px;
      border-radius: 50%;
      width: 23px;
      height: 23px;
      span {
        display: none;
      }
    }
  }
  &.reaction {
    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    line-height: 9px;
    font-family: Gilroy-Bold;
    font-size: 9px;
    background-color: ${props => props.theme.orangePink};
    color: #fff;
    border-radius: 60px;
    padding: 5px 9.5px;
    text-transform: uppercase;
    .reaction-icon {
      margin-right: 6.5px;
      display: block;
    }
    @media (max-width: 831px) {
      margin-right: 0;
    }
  }
  @media (min-width: 832px) {
    margin-right: 0;
  }
`;

CompletedStyled.DetailsWrapper = styled.div`
  padding-left: 16.7px;
  flex: 1 1 auto;
  .details-header {
    display: flex;
    justify-content: space-between;
    .date {
      font-family: Gilroy;
      font-size: 14px;
      margin-top: 2px;
      color: ${props => props.theme.notfColor};
    }
    .rating {
      padding: 0;
      font-size: 14px;
    }
  }
  .description {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Regular;
    margin-top: 5px;
    display: block;
    font-size: 14px;
    ${HeadingBold} {
      font-family: Gilroy-Bold;
      font-size: 14px;
    }
    @media(min-width: 832px) {
      margin-bottom: 30px;
      .list-item & {
        margin-bottom: 0;
      }
      ${HeadingBold} {
        line-height: 18px;
      }
    }
  }
  .sample-label {
    color: #fe6b57;
    font-family: Gilroy-Semibold;
    font-size: 12px;
  }
  .action-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 5px;
  }
  @media (min-width: 832px) {
    padding: 15px 19.3px 19.3px;
    display: flex;
    flex-direction: column;
    .details-header {
      margin-bottom: 2px;
      .date {
        color: ${props => props.theme.lightDarK};
      }
    }
    .action-section {
      flex: 1;
      margin-top: 0;
    }
  }
`;

export default CompletedStyled;
