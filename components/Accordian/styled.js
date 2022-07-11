import styled from '@emotion/styled';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

export const EPanel = styled(ExpansionPanel)`
  background-color: transparent !important;
  &.expanded-panel {
    margin: 0;
  }
  &.panel-container {
    box-shadow: none;
    border-bottom: 1px solid ${props => props.theme.borderGrey};
    border-radius: 0 !important;
    &:first-child {
      border-top: 1px solid ${props => props.theme.borderGrey};
    }
    &:before {
      display: none;
    }
  }
`;
export const ESummary = styled(ExpansionPanelSummary)`
  &.panel-summary-head {
    padding: 0 15px;
    min-height: 40px !important;
    text-transform: capitalize;
    font-size: 18px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
  }
  .arrow-icon {
    transform: translateY(-50%) rotate(0deg);
    padding: 0px;
    right: 15px;
  }
  .right {
    height: 35px;
    font-size: 18px;
    font-family: Gilroy-Medium;
  }
  &.expand-summary {
    min-height: 40px !important;
    .expand-summary {
      margin: 0 !important;
    }
    .arrow-icon {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`;
export const EDetails = styled(ExpansionPanelDetails)``;

export const Arrow = styled.i`
  border: solid ${props => props.theme.borderGrey};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
`;
