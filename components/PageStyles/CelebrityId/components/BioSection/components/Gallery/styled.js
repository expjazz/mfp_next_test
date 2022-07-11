import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import StarProfileStyled, { MainHeading } from '../../../../styled';
// import StarProfileStyled, { MainHeading } from '../../../../styled';
import styled from '@emotion/styled'
import { css} from '@emotion/react'

const VideoStyled = styled.section`
  .slick-list {
    ${StarProfileStyled.HorzSpacing};
  }
  .carousal {
    margin-top: 20px;
  }
  .slick-dots {
    li {
      button:before {
        color: ${props => props.theme.normalGrey};
      }
      &.slick-active button:before {
        color: ${props => props.theme.pureWhite};
      }
      @media (hover: hover) {
        button:hover:before {
          color: ${props => props.theme.pureWhite};
        }
      }
    }
  }
  @media (min-width: 832px) {
    ${StarProfileStyled.HorzSpacing};
    ${StarProfileStyled.ContentLimiter};
  }
`;

const activeArrow = props => css`
  color: ${
    props.theme.links ? props.theme.links : props.theme.flatBlue};
`;

const disabledArrow = props => css`
  color: ${props.theme.veryLightPink};
`;

export const Arrows = styled(FontAwesomeIcon)`
  display: none;
  @media (min-width: 832px) {
    cursor: pointer;
    pointer-events: ${props => (props.active ? 'auto' : 'none')};
    display: block;
    font-size: 40px;
    ${props => (props.active ? activeArrow : disabledArrow)};
  }
`;

const applyFavStyled = ratio => {
  return `
     height: 141px;
     cursor: pointer;
     object-fit: cover;
     width: ${ratio ? `${ratio * 141}px` : 'auto !important'};
    `;
};

export const Image = styled.img`
  ${props => applyFavStyled(props.ratio)};
`;

export const ImageWrap = styled.span`
  display: block;
  padding-right: 16px;
  &:last-child {
    padding-right: 0;
  }
`;

const Heading = styled(MainHeading)`
  color: ${props => props.theme.pureWhite};
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .carousal {
    width: 100%;
    margin: 0;
    .slick-slider {
      position: static;
    }
    .slick-dots {
      bottom: 20px;
      left: 0;
      right: 0;
      button:before {
        color: ${props => props.theme.greyishBrown};
      }
      .slick-active button:before,
      button:hover:before {
        color: ${props => props.theme.orangePink};
      }
    }
  }
  ${Image} {
    width: 100vw !important;
    height: auto;
    object-fit: contain;
    max-height: calc(100vh - 300px);
  }
  .close-icon {
    position: absolute;
    top: 10px;
    font-size: 20px;
    color: ${props => props.theme.flatBlue};
    right: 10px;
    cursor: pointer;
  }
  @media (min-width: 832px) {
    .carousal {
      margin: 0 10px;
      width: 630px;
    }
    ${Image} {
      width: 630px !important;
      max-height: 600px;
    }
  }
`;

export const ImageModal = styled(Dialog)`
  .modal-paper {
    overflow: hidden;
    position: relative;
    @media (min-width: 832px) {
      width: 700px;
      height: 700px;
      max-width: 700px;
      border-radius: 20px;
      padding: 0 10px;
    }
  }
`;

export const CarousalContainer = styled.section`
  display: flex;
  align-items: center;
  .list-root {
    margin-top: 20px;
    .slide-arrow {
      padding-bottom: 0;
      &.arrow-active {
        color: ${props =>
          props.theme.links ? props.theme.links : props.theme.flatBlue};
      }
    }
  }
  .scroll-container {
    height: 141px;
  }
  .track-vertical {
    display: none;
  }
  .track-horizontal {
    display: none;
  }
`;

export { Heading, VideoStyled as default };
