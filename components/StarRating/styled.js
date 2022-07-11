import styled from '@emotion/styled';

const RatingStyled = styled.div`
  .rating-star {
    color: ${props => props.theme.orangePink};
  }
  .empty-star {
    transform:translateY(3px) rotate(35deg);
    margin-left: -1px;
    box-sizing: content-box;
    /* @media not screen and (-moz-windows-theme) and (-webkit-min-device-pixel-ratio: 0) {
      .request-content & {
        padding-top: 5px;
      }
    } */
  }
`;

export default RatingStyled;
