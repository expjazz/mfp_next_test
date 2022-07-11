import styled from '@emotion/styled';

const AvatarContainer = styled.section`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  width: 100%;
  .btn-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    .action-btn {
      width: 137px;
      height: 39px;
      min-width: auto;
      min-height: auto;
    }
  }
`;

AvatarContainer.Label = styled.span`
  position: absolute;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
  color: #fff;
  font-family: Gilroy-Bold;
  background: ${props => props.theme.orangePink};
`;

AvatarContainer.ControlWrapper = styled.span`
  display: none;
  .fa-play {
    padding-left: 1px;
    padding-top: 1px;
  }
  @media (min-width: 832px) {
    display: block;
    position: absolute;
    bottom: 7.5px;
    left: 0;
    right: 0;
    text-align: center;
  }
`;

AvatarContainer.ControlButton = styled.span`
  width: 26.4px;
  height: 26.4px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 14px;
  color: ${props => props.theme.orangePink};
  border-radius: 50%;
`;

AvatarContainer.Avatar = styled.span`
  border: none;
  display: block;
  width: calc(100% + 2px);
  margin-left: -1px;
  margin-top: -1px;
  height: 175px;
  background: ${props =>
		props.imageUrl
			? `url(${props.imageUrl})`
			: 'url(/images/default-cover.jpg)'}
    no-repeat;
  background-position: center center;
  background-size: cover;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  position: relative;
  .close-btn {
    position: absolute;
    right: 0;
    color: ${props => props.theme.flatBlue};
    font-size: 19px;
    bottom: -7px;
    @media (min-width: 832px) {
      font-size: 24px;
      bottom: 0;
    }
  }
  ${AvatarContainer.Label} {
    font-size: 12px;
    font-family: Gilroy-Medium;
  }
  @media (min-width: 832px) {
    height: 172px;
  }
  @media (min-width: 1280px) {
    height: 172px;
  }
`;

AvatarContainer.StarDescription = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
`;

AvatarContainer.Category = styled.span`
  font-family: Gilroy-Light;
  font-size: 10px;
  display: block;
  text-align: inherit;
  width: 100%;
  word-break: break-word;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 4px;
  @media (min-width: 832px) {
    text-align: left;
    flex: 1;
    overflow: hidden;
    -webkit-line-clamp: 3;
    max-height: 37px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`;

AvatarContainer.Headline = styled.span`
  font-family: Gilroy-Medium;
  font-size: 10px;
  display: block;
  text-align: inherit;
  width: 100%;
  color: ${props => props.theme.lightBlack};
  padding-top: 8px;
  padding-bottom: 4px;
  word-break: break-word;
  @media (min-width: 832px) {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    flex: 1;
    overflow: hidden;
    max-height: 33px;
  }
`;

AvatarContainer.Name = styled.h2`
  font-size: 17px;
  font-family: Gilroy-Semibold;
  text-align: inherit;
  text-overflow: ellipsis;
  margin-top: 10px;
  color: ${props => props.theme.flatBlue};
  width: fit-content;
  @media (min-width: 832px) {
    /* fixed width so the fitty works properly */
    width: 156px !important;
    line-height: 1.41;
    font-size: 10px;
    text-align: left;
  }
  span {
    font-family: Gilroy-Medium;
  }
  .name-field {
    @media (max-width: 831px) {
      white-space: normal !important;
    }
  }
`;

AvatarContainer.Price = styled.span`
  font-family: Gilroy-Medium;
  font-size: 12px;
  line-height: 1.41;
  vertical-align: top;
  text-align: center;
  color: ${props =>
		props.hasDis ? props.theme.orangePink : props.theme.greyishBrown};
`;

AvatarContainer.Wrapper = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 832px) {
    padding-bottom: 38px;
  }
`;

AvatarContainer.IconsWrapper = styled.article`
  padding: 0 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: ${props => props.spaceApart && 'space-between'};
  align-items: center;
  .shop-icon {
    color: ${props => props.theme.brownGrey};
    margin-right: ${props => !props.spaceApart && '12px'};
  }
  .cus-icon {
    margin-right: ${props => !props.spaceApart && '12px'};
    div {
      display: flex;
    }
    svg {
      width: 20px;
      path {
        fill: ${props => props.theme.brownGrey};
      }
    }
  }
`;

AvatarContainer.Content = styled.a`
  font-family: Gilroy-Light;
  display: flex;
  max-width: 200px;
  background-color: ${props => props.theme.pureWhite};
  border-radius: inherit;
  flex: 1;
  border: 1px solid ${props => props.theme.veryLightPink};
  ${AvatarContainer.Category}, ${AvatarContainer.StarDescription} {
    padding: 0 8px;
  }
  .has-dis,
  .no-disc {
    display: flex;
    align-items: center;
    padding: 0 8px;
    justify-content: space-between;
    @media (min-width: 832px) {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 34px;
    }
    .ellipsis {
      font-size: 34px;
      color: ${props => props.theme.brownGrey};
    }
  }
  .strike-text {
    line-height: 1.41;
    margin-left: 8px;
    font-size: 12px;
    font-family: Gilroy;
    color: ${props => props.theme.greyishBrown};
    @media (max-width: 831px) {
      margin-left: 0;
      margin-right: 8px;
    }
  }
  flex-direction: column;
  @media (min-width: 832px) {
    text-align: left;
    max-width: 100%;
  }
`;

AvatarContainer.IconLayout = styled.div`
  min-height: 30px;
`;

export default AvatarContainer;
