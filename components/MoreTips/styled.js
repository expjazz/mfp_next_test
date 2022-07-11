import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Image, PlayButton } from 'styles/CommonStyled';

export const Layout = styled.div``;

export const ContentWrap = styled.div`
  padding-top: 10px;
`;

export const Content = styled.div`
  background: ${props => props.theme.white};
  margin-right: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 350px;
  ${media.mobileScreen} {
    width: 320px;
  }
  text-align: center;
  .tip-btn {
    min-height: 40px;
    min-width: 100px;
    border-radius: 5px;
    margin-top: 5px;
    line-height: 30px;
  }
  .desc {
    padding-bottom: 10px;
  }
  .view-more {
    padding-top: 10px;
  }
  .share-btn {
    margin-right: 0;
  }
  .action-btn {
    width: 140px;
  }
`;

export const Photo = styled(Image)`
  display: block;
  border-radius: 0;
  margin: 0 0 10px 0;
  width: 140px;
  height: 140px;
`;

export const VideoEle = styled.video`
  width: 140px;
  height: 140px;
  background: ${props => props.theme.darkGrey};
  margin-bottom: 10px;
`;

export const VideoWrap = styled.div`
  position: relative;
  cursor: pointer;
  .fa-expand {
    position: absolute;
    right: 10px;
    bottom: 24px;
    color: ${props => props.theme.pureWhite};
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 5px 2px;
    display: none;
  }
  :hover {
    .fa-expand {
      display: block;
    }
  }
`;

export const Play = styled(PlayButton)`
  position: absolute;
  background: transparent;
  width: 60px;
  height: 60px;
  border: 4px solid ${props => props.theme.flatBlue};
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 8px));
  pointer-events: none;
  .fa-play {
    color: ${props => props.theme.flatBlue};
  }
`;
