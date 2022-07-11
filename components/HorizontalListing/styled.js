import { css} from '@emotion/react'
import styled from '@emotion/styled'
import { media } from '../../styles/mediaQueries';

const HorizontalStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ActiveArrow = props => css`
  color: ${props.theme.links || props.theme.flatBlue};
`;

const disabledArrow = css`
  color: ${props => props.theme.veryLightPink};
`;

HorizontalStyled.ArrowWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  width: 18px;
  padding-bottom: 31px;
  font-size: 48px;
  ${props => props.customColor ? (props.active ? props.customColor.active : props.customColor.disabled ) : (props.active ? ActiveArrow : disabledArrow)};
  ${props => props.customCss}

`;

HorizontalStyled.Listing = styled.section`
  padding: ${props => (props.hasArrows ? '0 10px' : 0)};
  height: 100%;
  width: 100%;
  ${media.webView} {
    width: calc(100% - 36px);
  }
  .list-scroll {
    display: flex;
    align-items: center;
    scroll-behavior: smooth;
    margin-right: 0 !important;
    margin-bottom: 0 !important;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .track-horizontal {
    display: none;
  }
`;

export default HorizontalStyled;
