import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { largeHeading } from '../../styles/TextStyled';

export const DropHeading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Heading = styled.span`
  ${largeHeading};
  color: ${props => props.theme.orangePink};
  margin-bottom: 5px;
`;

export const DropWrapper = styled.ul`
  margin-top: 15px;
  .drop-custom-scroll {
    /* max-height: 180px !important; */
  }
  .cus-drop {
    margin-bottom: 5px;
  }
`;

export const DropItem = styled.li`
  margin-bottom: 25px;
`;

export const DialogContent = styled.section`
  padding: 40px 15px;
  position: relative;
  .close-icon {
    position: absolute;
    top: 40px;
    cursor: pointer;
    right: 10px;
    font-size: 24px;
    color: ${props => props.theme.flatBlue};
    @media (min-width: 832px) {
      top: 10px;
      right: 15px;
    }
  }
  .action-btn {
    margin: 0 auto;
    display: block;
    background-color: ${props => props.theme.flatBlue};
    border-color: ${props => props.theme.flatBlue};
  }
  @media (min-width: 832px) {
    padding: 55px;
  }
`;

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      max-height: 700px;
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
    @media (max-width: 831px) {
      max-height: none;
      height: 100vh;
      margin: 0;
    }
  }
`;

export const Wrap = styled.section`
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 32px;
  color: ${props => props.theme.greyishBrown};
  display: flex;
  align-items: center;
  cursor: pointer;
  .text-container {
    display: flex;
    align-items: center;
    .region-icon {
      height: 22px;
      ${props =>
        !props.liteView &&
        `
        margin-right: 10px;
      `}
    }
  }
`;
