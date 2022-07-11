import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AudioRecorderDiv = styled.div`
  height: 100%;
  position: relative;
  width: ${props => props.recorded && '100%'};
  .recording {
    justify-content: flex-end;
  }
`;
AudioRecorderDiv.Icon = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  ${props => props.recording && 'pointer-events:none; color: #c0bfbf;'}
`;

AudioRecorderDiv.Rerecord = styled.div`
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 12px;
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  align-items: center;
  margin-top: 2px;
  ${props => props.recording && 'pointer-events:none; color: #c0bfbf;'}
`;

AudioRecorderDiv.TextButton = styled.button`
  min-width: 60px;
  background-color: white;
  margin-right: 5px;
  padding: 5px 20px;
  text-align: center;
  font-family: 'Avenir-Bold';
  color: ${props => props.theme.orangePink};
  border: 2px solid #ef6a58;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 15px;
`;

AudioRecorderDiv.Label = styled.div`
  font-size: 16px;
  color: ${props => props.theme.orangePink};
  font-family: Avenir-bold;
  margin-bottom: 10px;
  @media (min-width: 1025px) {
    font-size: 24px;
  }
`;

AudioRecorderDiv.UploadWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
`;

AudioRecorderDiv.UploadInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 160px;
  height: 28px;
  margin-top: 10px;
`;

AudioRecorderDiv.CloseButton = styled.div`
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

AudioRecorderDiv.Audio = styled.audio`
  @media (min-width: 1025px) {
    width: 50%;
    margin-top: 10px;
  }
`;

AudioRecorderDiv.ControlWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .recText {
    ${props => props.recording && 'pointer-events:none; color: #c0bfbf;'}
    font-size: 12px;
    font-family: Gilroy-Semibold;
    line-height: 20px;
    margin-left: 5px;
  }
  .recText, .mic-icon {
    cursor: pointer;
  }
`;

AudioRecorderDiv.PlayButton = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 12px;
  color: #2f829c;
  margin: 0 5px;
  cursor: pointer;
  margin-top: 2px;
  ${props => props.playing && 'pointer-events:none;color: #c0bfbf;'}
`;

AudioRecorderDiv.PauseButton = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 12px;
  color: #2f829c;
  margin: 0 5px;
  cursor: pointer;
  margin-top: 2px;
`;

export { AudioRecorderDiv };

export const Ripple = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 6px;
  -webkit-transition: height 0.25s ease, width 0.25s ease;
  transition: height 0.25s ease, width 0.25s ease;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  :before,
  :after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.flatBlue};
  }
  :before {
    -webkit-animation: ripple 2s linear infinite;
    animation: ripple 2s linear infinite;
  }
  :after {
    -webkit-animation: ripple 2s linear 1s infinite;
    animation: ripple 2s linear 1s infinite;
  }
  :hover:before,
  :hover:after {
    -webkit-animation: none;
    animation: none;
  }

  @-webkit-keyframes ripple {
    0% {
      -webkit-transform: scale(1);
    }
    75% {
      -webkit-transform: scale(1.75);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.75);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
