import styled from '@emotion/styled';
import { Description } from 'styles/TextStyled';
import { Wrapper as Wrap } from '../../styled';

export const Wrapper = styled(Wrap)`
  .date-time {
    font-family: Gilroy;
    font-size: 14px;
    display: block;
    line-height: 21px;
  }
  .start-btn-wrp {
    flex-direction: column;
    align-items: center;
    .link {
      padding-top: 10px;
    }
    .d-link {
      padding: 10px 0;
      font-family: Gilroy;
      color: ${props => props.theme.flatBlue};
      opacity: 0.5;
      font-size: 14px;
      word-break: break-all;
    }
    .disabled-link {
      pointer-events: none;
    }
  }
  .note {
    text-align: center;
  }
  .add-cal {
    padding-bottom: 20px;
  }
  .call-note {
    font-size: 12px;
  }
  .call-desc {
    padding-bottom: 10px;
  }
`;
export const DetailsWrap = styled.span`
  width: 100%;
  padding-bottom: 15px;
  display: block;
`;

export const LineDesc = styled(Description)`
  display: inline;
`;
