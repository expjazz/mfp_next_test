import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  :focus {
    outline: none;
  }
  :hover {
    fieldset {
      border-color: ${props => props.theme.brownGrey};
    }
  }

  textarea:focus + fieldset {
    border-width: 2px;
    border-color: ${props => props.theme.flatBlue};
  }
`;
export const Fieldset = styled.fieldset`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: text;
  pointer-events: none;
  border: 1px solid ${props => props.theme.headerGrey};
  border-color: ${props => props.error && props.theme.errorRed};
  &:hover {
    border-color: ${props => !props.error && props.theme.brownGrey};
  }
`;
