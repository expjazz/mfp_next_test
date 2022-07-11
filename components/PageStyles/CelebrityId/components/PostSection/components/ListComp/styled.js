import styled from '@emotion/styled';

export const VideoEle = styled.video`
  width: 0;
  height: 0;
  display: ${props => props.isPlaying ? 'block' : 'none'};
`;

export const ListingStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .list-block-root {
    margin: 0 15px;
    margin-bottom: 10px;
    width: 87px;
  }
  .block-root {
    margin-right: 0;
    .block-image {
      width: 87px;
    }
  }
`;

export const ListWrap = styled.section`
  height: calc(375px - 60px);
  padding-bottom: 10px;
`;

export const MainSection = styled.span`
  width: 100%;
  height: 375px;
  background: ${props => `url(${props.imageUrl}) no-repeat`};
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  .play-icon {
    font-size: 48px;
    cursor: pointer;
    color: ${props => props.theme.white};
  }
  @media(min-width: 1280px) {
    width: 375px;
  }
`;

export const RightWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 375px;
`;

export const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  .list-root {
    height: 145px;
    margin-top: 10px;
    padding: 0 10px;
    &.follow-list {
      display: flex;
      overflow-x: scroll;
    }
  }
  .follow-btn {
    margin-right: 16px;
    border: none;
    height: 100px;
    border-radius: 7px;
    text-transform: capitalize;
    background: ${props => props.theme.white};
  }
  .block-root {
    margin-right: 16px;
    .video-head {
      font-size: 11px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  @media(min-width: 1280px) {
    flex-direction: row;
    .list-root {
      margin-top: 0;
      margin-left: 30px;
      &.follow-list {
        overflow-x: initial;
      }
    }
    .block-root {
      width: 87px;
      margin-bottom: 20px;
      .block-image {
        width: 87px;
        height: 87px;
      }
    }
    .follow-list {
      flex-wrap: wrap;
      height: fit-content;
      flex: 1;
    }
    .follow-btn {
      height: 87px;
      width: 87px;
      min-width: 87px;
      margin-right: 0;
    }
  }
`;
