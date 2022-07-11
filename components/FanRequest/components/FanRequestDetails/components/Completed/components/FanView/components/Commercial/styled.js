import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import FanViewStyled from '../../styled';

export const Wrapper = styled(FanViewStyled)`
  .fun-section {
    height: 100%;
    width: 100%;
  }
  .note-info {
    padding: 10px;
    background: ${props => props.theme.white};
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .title {
    font-size: 14px;
    font-family: Gilroy-Bold;
    width: 100%;
  }
  .fun-list {
    margin: 5px 0;
  }
  #fun-scroll-target {
    ${media.mobileScreen} {
      position: relative !important;
    }
  }
  .action-root {
    margin: 0 auto;
    width: 100%;
    @media (min-width: 832px) {
      .action-list-li {
        min-width: 106px;
      }
    }
  }
  .fun-list-item {
    background: ${props => props.theme.white};
    margin: 0 auto;
    margin-bottom: 10px;
    box-shadow: none;
  }
  .no-evidence {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Gilroy-Medium;
    font-size: 18px;
    width: 100%;
    margin: 0;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: ${props => props.theme.white};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  .image {
    display: block;
    margin-top: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
  .file-details {
    display: flex;
    flex-direction: column;
    .file-name {
      font-family: Gilroy-Bold;
      color: ${props => props.theme.flatBlue};
    }
    .file-size {
      padding-top: 5px;
      font-family: Gilroy;
      color: ${props => props.theme.greyishBrown};
    }
  }
`;

export const VideoWrap = styled.div`
  width: 320px;
  height: 420px;
  margin: 0 auto;
  margin-bottom: 15px;
`;
