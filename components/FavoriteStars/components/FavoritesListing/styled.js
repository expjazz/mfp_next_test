import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const FavoriteListStyled = styled.ul`
  width: 100%;
  ${media.webView} {
    display: flex;
    flex-wrap: wrap;
  }
  .star-card {
    height: 100%;
  }
`;

FavoriteListStyled.Content = styled.li`
  margin-bottom: 15px;
  background: ${props => props.theme.white};
  padding: 15px;
  border-radius: 5px;
  ${media.webView} {
    width: 172px;
    margin-bottom: 8px;
    margin-right: 8px;
    background: none;
    padding: 0;
  }

  & > section {
    height: 100%;
  }
`;

FavoriteListStyled.LoadingIcon = styled.span`
  width: 100px;
  height: 100px;
  display: block;
  background: url('/images/starloader_mobile.png') no-repeat;
  background-size: contain;
  @media (min-width: 832px) {
    background: url('/images/starloader_web.png') no-repeat;
    background-size: contain;
    width: 200px;
    height: 200px;
  }
`;

export default FavoriteListStyled;
