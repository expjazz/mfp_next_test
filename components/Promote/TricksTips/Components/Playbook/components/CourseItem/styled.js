import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { ChildLayout } from '../../styled';

export const Layout = styled(ChildLayout)`
  .time-description {
    text-align: center;
  }
`;

export const TaskOverview = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10.2px 0;
  .task-count {
    font-size: 62px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.orangePink};
    margin-right: 10px;
  }
  .description {
    max-width: 110px;
    font-size: 14px;
    font-family: Gilroy-Bold;
    line-height: 20px;
  }
`;

export const TaskHeading = styled.span`
  font-size: 14px;
  font-family: Gilroy-Bold;
  line-height: 20px;
  color: ${props => props.theme.flatBlue};
`;

export const ListItem = styled.li`
  display: flex;
  cursor: pointer;
  ${props => props.grid ? `
    width: 174px;
    border-radius: 6px;
    flex-direction: column;
    padding: 14px;
    align-items: center;
    margin-right: 10px;
    background: ${props.theme.white};
    margin-bottom: 10px;
    &:hover, &:focus, &:active {
      background: ${props.theme.veryLightPink};
    }
  ` : `
    margin-top: 30px;
  `}
  @media(min-width: 1280px) {
    ${props => props.grid && `
      background: ${props.theme.pureWhite};
  `}
  }
  .check-box {
    width: 45px;
    height: 45px;
    margin-bottom: 0;
  }
  .checkmark {
    width: 45px;
    height: 45px;
    &:after {
      left: 15px;
      top: 6px;
      width: 11px;
      height: 20px;
    }
  }
  .task-content {
    display: flex;
    flex: 1;
    ${props => props.grid ? `
      flex-direction: column;
      align-items: center;
    ` : `
      margin-left: 22px;
    `}
    .task-image-wrapper {
      display: block;
      border-radius: 6px;
      ${props => !props.hasImage && `
        background: ${props.theme.greyishBrown};
      `}
      ${props => props.grid ? `
        width: 68px;
        height: 68px;
        position: relative;
        margin-bottom: 5px;
        .check-box {
          position: absolute;
          width: auto;
          height: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          .checkmark {
            background: transparent !important;
            width: 100%;
            height: 100%;
            &:after {
              border-width: 0 11px 11px 0;
              left: 21px;
              top: 6px;
              width: 16px;
              height: 32px;
              border-color: ${props.theme.pureWhite};
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
              border-bottom-left-radius: 5px;
            }
          }
        }
      ` : `

      `}
    }
    .task-image {
      width: 68px;
      height: 68px;
      border-radius: 6px;
      object-fit: cover;
      display: block;
    }
    .task-text {
      display: flex;
      flex: 1;
      font-size: 14px;
      font-family: Gilroy;
      line-height: 20px;
      flex-direction: column;
      ${props => !props.grid && props.hasImage && `
        margin-left: 15px;
      `}
      .task-description {
        font-size: 14px;
        line-height: 18px;
        color: ${props => props.theme.greyishBrown};
      }
    }
  }
`;

export const ListWrapper = styled.ul`
  margin-top: 10.2px;
  display: flex;
  ${props => props.grid ? `
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  ` : `
    flex-direction: column;
  `}
`;
