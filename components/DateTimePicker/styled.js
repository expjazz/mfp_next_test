import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { media } from 'styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    border-radius: 5px;
    width: 580px;
    height: 400px;
    ${media.mobileScreen} {
      width: 340px;
      height: 350px;
      margin: 15px;
    }
  }
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  ${media.mobileScreen} {
    padding: 15px;
    height: 100%;
  }
`;

export const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  .react-datepicker {
    border: none;
    .react-datepicker__header {
      border: none;
      border-radius: 0;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
      width: 2.2rem;
      line-height: 2.2rem;
    }
  }
  .titile {
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy-Semibold;
    padding-bottom: 10px;
  }
  ${props => props.hide && 'display: none'};
`;

export const TimeWrap = styled.div`
  width: 100%;
  padding-left: 30px;
  position: relative;
  ${media.mobileScreen} {
    padding-left: 15px;
    padding-right: 15px;
    z-index: 10;
    .fa-arrow-left {
      margin-bottom: 10px;
    }
  }
  .date-icon {
    display: flex;
    ${media.mobileScreen} {
      position: absolute;
      width: 97%;
      background: ${props => props.theme.pureWhite};
      z-index: 11;
    }
  }
  .date {
    color: ${props => props.theme.greyishBrown};
    font: 15px Gilroy;
    padding-bottom: 10px;
    display: flex;
    flex: 1;
    ${media.mobileScreen} {
      padding-left: 10px;
    }
  }
  .time-scroll {
    margin: 0 !important;
  }
`;

export const TimeUl = styled.ul`
  ${media.mobileScreen} {
    padding-top: 30px;
    padding-right: 15px;
  }
`;

export const TimeLi = styled.li`
  border: 1px solid ${props => props.theme.headerGrey};
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'Avenir-Medium';
  cursor: pointer;
`;
