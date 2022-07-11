import styled from '@emotion/styled';
import StarViewStyled from '../../styled';

export const Wrapper = styled(StarViewStyled)`
  .left-section {
    min-width: 50%;
    .fun-list {
      padding: 5px 0;
    }
  }
  .left-wrapper {
    width: 100%;
  }
  .fun-list-item {
    background: ${props => props.theme.white};
    margin: 0 auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  .no-evidence {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Gilroy-Medium;
    font-size: 18px;
    width: 100%;
    margin: 0;
  }
  @media (min-width: 832px) {
    .layout {
      flex-direction: column;
      height: calc(100% - 26px);
    }
  }
  .hidden-upload {
    display: none;
  }
`;

export const FunSection = styled.section`
  width: 100%;
  .note-info {
    padding: 10px;
    background: ${props => props.theme.white};
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .player-container {
    box-shadow: none;
  }
  .divider {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: ${props => props.theme.white};
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  .image {
    display: block;
    margin-top: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  .file-details {
    display: flex;
    flex-direction: column;
    .file-name {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
    }
    .file-size {
      padding-top: 5px;
      font-family: Gilroy;
      color: ${props => props.theme.greyishBrown};
    }
  }
`;

export const VideoWrap = styled.div`
  width: 320px;
  height: 420px;
  margin: 0 auto;
  margin-bottom: 15px;
`;
