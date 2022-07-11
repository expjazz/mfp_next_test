import styled from 'styled-components';

export const Container = styled.div`
  background-color: #${props => props.color};
  border-radius: 33px;
  display: flex;
  oberflow: hidden;
  font-weight: bold;
  height: 45px;
  width: 45px;
  opacity: 0.75;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;