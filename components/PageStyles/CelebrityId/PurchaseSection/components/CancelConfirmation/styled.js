import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { media } from 'styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    border-radius: 5px;
    height: 500px;
    padding: 30px;
    position: relative;
    ${media.mobileScreen} {
      height: 100%;
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;
      margin: 0;
    }
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .close-icon {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    font-size: 24px;
    color: ${props =>
      props.theme.link ? props.theme.link : props.theme.flatBlue};
  }
  .button {
    margin-top: 15px;
    min-height: 60px;
    width: 330px;
    font-size: 18px;
    font-family: Gilroy-Extrabold;
  }
`;

export const Heading = styled.h2`
  font-family: Gilroy-Bold;
  font-size: 30px;
  color: ${props =>
    props.theme.accent ? props.theme.accent : props.theme.orangePink};
  text-align: center;
`;
