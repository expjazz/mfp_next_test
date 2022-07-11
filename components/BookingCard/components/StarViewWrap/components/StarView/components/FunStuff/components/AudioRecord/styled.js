import styled from '@emotion/styled';

export const AudioWrap = styled.div`
  max-width: 400px;
  height: 140px;
  margin: 0 auto;
  margin-bottom: 15px;
  .player-container {
    box-shadow: none;
  }
  .player > span {
    background: transparent;
  }
  .video-react {
    background-color: ${props => props.theme.greyishBrown};
  }
`;
