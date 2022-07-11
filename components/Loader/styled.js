import styled from '@emotion/styled';

const LoaderWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
LoaderWrapper.inner = styled.div`
  text-align: center;
`;
export default LoaderWrapper;
