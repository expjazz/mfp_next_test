import styled from '@emotion/styled';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Progress = styled(CircularProgress)`
  position: fixed;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
`;

export const Loading = styled.section`
  position: fixed;
  justify-content: center;
  display: flex;
  z-index: 9999;
  width: 100%;
  flex-direction: column;
  background: #bdbcbc;
  opacity: 0.8;
  min-height: 100%;
  top: 0;
  left: 0;
`;
