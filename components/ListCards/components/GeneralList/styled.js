import styled from '@emotion/styled';

const GeneralStyled = styled.div`
  padding: 13px 10.5px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  .left-content {
    display: none;
  }
  @media (min-width: 1280px) {
    ${props => props.isOpen && `
      .left-content {
        display: inherit;
      }
    `}
  }
  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    padding: 9px 20.5px;
  }
  @media (min-width: 832px) and (max-width: 1280px) {
    width: 100%;
    padding: 9px 20.5px 20px;
  }
  .inner-wrapper {
    display: flex;
    justify-content: space-between;
    @media (min-width: 832px) {
      min-width: 500px;
      padding-right: 25px;
    }
    .inner-top {
      @media (min-width: 832px) and (max-width: 1280px) {
        margin-bottom: -10px;
      }
    }
  }
  .details-wrapper {
    flex: 1;
    justify-content: space-between;
  }
`;

GeneralStyled.Section = styled.div`
  display: flex;
  flex-direction: column;
  .cancel-heading {
    display: block;
    color: #fe6b57;
    font-size: 14px;
    font-family: Gilroy-Bold;
  }
  .close-icon {
    &:before {
      content: '';
      display: none;
      border: none;
    }
    svg {
      font-size: 22px;
    }
  }
  .view-action {
    display: none;
    @media (min-width: 832px) {
      display: block;
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy-Medium;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .action-button {
    display: none;
    @media (min-width: 832px) {
      display: block;
      font-family: Gilroy-Medium;
      font-size: 14px;
      min-width: auto;
      width: 160px;
      padding: 5px 10px;
      min-height: auto;
      height: 40px;
    }
  }
  @media (min-width: 832px) {
    align-items: center;
    flex-direction: row;
  }

  &.details-wrapper {
    @media (min-width: 832px) and (max-width: 1280px) {
      margin-top: 10px;
    }
  }
`;
GeneralStyled.Description = styled.span`
  max-width: 320px;
  ${props => !props.isOpen && `
    .description-text {
      font-size: 14px;
    }
  `}
  @media (min-width: 1280px) {
    ${props => props.isOpen ? `
      padding-left: 19.3px;
      min-width: 320px;
    ` : `
      max-width: 800px;
    `}
  }
`;

GeneralStyled.Details = styled.span`
  display: flex;
  margin-top: 8px;
  font-family: Gilroy;
  font-size: 14px;
  color: #b4b4b4;
  .time {
    color: ${props => props.theme.brown};
    margin-right: 5px;
    .time-head {
      display: none;
      @media (min-width: 832px) {
        display: inline;
      }
    }
    &.expiring {
      color: ${props => props.theme.orangePink};
    }
  }
  .action {
    color: ${props => props.theme.flatBlue};
    ${props => (props.isSample ? 'margin-left:0' : 'margin-left: 5px')};
    cursor: pointer;
    &:before {
      content: ${props => `'${props.buttonLabel}'`};
      display: block;
    }
  }
  @media (min-width: 832px) {
    ${props =>
      !props.isOpen &&
      `
      margin: 0;
    `}
    margin-right: 21.3px;
    .action {
      &:before {
        content: 'View Details';
      }
    }
    .comment {
      margin-right: 39px;
    }
  }
`;
export default GeneralStyled;
