import styled from '@emotion/styled';
import PrimaryButton from 'components/PrimaryButton';

const AlertStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  .alert-input-root {
    padding: 0 10px;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    background: ${props => props.theme.white};
    .alert-input-wrap {
      width: 100%;
      .alert-input {
        margin-top: 3px;
      }
    }
  }
`;

const AlertHeader = styled.span`
  font-family: Gilroy-Medium;
  font-size: 16px;
  margin-bottom: 7px;
  color: ${props => props.theme.flatBlue};
  text-transform: uppercase;
`;

const ActionButton = styled(PrimaryButton)`
  border: 1px solid ${props => props.theme.flatBlue};
  color: ${props => props.theme.flatBlue};
  line-height: initial;
  font-family: Gilroy;
  font-size: 12px;
  display: block;
  padding: 4px;
  border-radius: 4px;
  min-width: auto;
  min-height: auto;
  width: auto;
  &:hover, &:focus {
    background: ${props => props.theme.pureWhite};
    box-shadow: none;
  }
  &:active {
    color: ${props => props.theme.flatBlue};
    border-color: initial;
    background: ${props => props.theme.pureWhite};
  }
`;

const StatusText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
`;

export { AlertStyled, AlertHeader, ActionButton, StatusText };
