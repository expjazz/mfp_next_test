import styled from '@emotion/styled';
import { Heading } from '../../../../../styles/TextStyled';
import { horizontalPadding } from '../styled';
// import { Heading } from 'styles/TextStyled';
// import { horizontalPadding } from '../../styled';

export const ImagePreview = styled.img`
  width: 100%;
  margin: 0 auto;
`;

export const HeaderText = styled(Heading)`
  font-family: Gilroy-SemiBold;
  font-size: 18px;
  color: ${props => props.theme.orangePink};
  padding: 0;
  text-align: center;
  line-height: 27px;
  word-break: break-word;
  white-space: normal;
  word-wrap: break-word;
  font-weight: normal;
  ${horizontalPadding};
  display: block;
  margin-bottom: 10px;
  strong {
    font-family: Gilroy-Medium;
    font-weight: normal;
  }
  @media (min-width: 832px) {
    margin-top: 11px;
  }
`;

export const ReactionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .book-modal-header {
    justify-content: space-between;
    .header-wrp {
      width: 100%;
      @media(min-width: 832px) {
        .back-lbl-wrp {
          display: flex;
        }
      }
    }
  }
  .video-render-wrap {
    width: auto;
  }
  ${horizontalPadding};
  .player-icon-wrap {
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
  }
  .video-container {
    box-shadow: none;
    width: 250.7px;
    height: 410.9px;
  }
  @media (min-width: 832px) {
    .video-container {
      width: 310.3px;
      height: 420.6px;
    }
  }
`;
