import styled from '@emotion/styled'

const MainLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

MainLoaderWrapper.LoaderVideo = styled.video`
  width: auto;
  height: 300px;
`;

export default MainLoaderWrapper;
