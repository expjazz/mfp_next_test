import styled from '@emotion/styled'

export const Layout = styled.div`
  width: 100%;
  .section-wrap {
    margin-top: 20px;
    flex-direction: column;
    &:first-child {
      margin-top: 0;
    }
  }
  @media (min-width: 832px) {
    width: 600px;
    margin: 0 auto;
  }
`;

export const SectionWrap = styled.section`
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
  .sub-head {
    min-width: 75px;
    margin-bottom: 0;
  }
  .row {
    display: flex;
    .text {
      margin-left: 10px;
      overflow-wrap: break-word;
    }
    .row-style {
      display: inline-block;
    }
  }
  .script-details {
    display: flex;
    flex-direction: column;
    font-family: Gilroy;
    line-height: 24px;
  }
  .due {
    color: ${props => props.theme.errorRed};
    font-family: Gilroy-Bold;
  }
`;
