import styled from '@emotion/styled';
import { Image } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  .raf-new-activities-notification {
    background: transparent;
    box-shadow: none;
    .raf-link {
      color: ${props => props.theme.orangePink};
      font-family: Gilroy-Bold;
      font-weight: normal;
    }
  }
`;

export const List = styled.ul`
  border-top: solid 1px ${props => props.theme.veryLightPink};
`;

export const ListItem = styled.li`
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: solid 1px ${props => props.theme.veryLightPink};
  padding-top: 20px;
  padding-bottom: 20px;

  .flex-content {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .time {
    display: block;
    font-family: Gilroy;
    font-size: 12px;
    color: ${props => props.theme.normalGrey};
    padding-top: 3px;
  }
  .svg-inline--fa {
    margin-right: 5px;
    font-size: 20px;
    color: ${props => props.theme.arrow};
  }
  .tal-name {
    font-family: Gilroy-Bold;
  }
`;

export const Text = styled.p`
  font-family: Gilroy;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.greyishBrown};
`;

export const Photo = styled(Image)`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
  min-width: 40px;
`;
