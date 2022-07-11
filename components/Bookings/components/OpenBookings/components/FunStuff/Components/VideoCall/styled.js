import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  .dashed-btn,
  .MuiFormControl {
    margin-bottom: 15px;
  }
  .react-datepicker__time-container {
    border-left: none;
    width: 80px;
  }
  .react-datepicker__month-container {
    border-right: 1px solid #aeaeae;
    max-width: calc(100% - 80px);
    min-height: 420px;
    ${media.mobileScreen} {
      min-height: 326px;
    }
  }
  .react-datepicker__time-box {
    width: 80px !important;
    .react-datepicker__time-list-item {
      padding: 5px 0px !important;
    }
  }
  .react-datepicker__navigation--next--with-time {
    right: 80px !important;
  }
  .react-datepicker__input-container {
    display: none;
  }
  .react-datepicker__time-list {
    min-height: 370px;
    ${media.mobileScreen} {
      min-height: 280px;
    }
  }
  .date-time {
    display: block;
  }
  .italics {
    font-size: 12px;
  }
  .fa-edit {
    color: ${props => props.theme.flatBlue};
    margin-left: 5px;
    cursor: pointer;
  }
  .add-to-cal {
    margin-right: 12px;
  }
  .desc-call {
    font-family: Gilroy-Bold;
    text-align: center;
    padding-top: 10px;
  }
  .link-join {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .meeting-link {
    cursor: inherit;
    font-size: 16px;
  }
  .send-btn {
    padding-top: 20px;
  }
  .cal-btns {
    align-items: baseline;
  }
  .action-head {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`;
export const DetailsWrap = styled.span`
  padding-bottom: 15px;
  display: block;
`;
