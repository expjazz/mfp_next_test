import styled from '@emotion/styled';

export const CarousalWrap = styled.div`
  .slick-dots {
    li {
      box-shadow: none;
      margin: 0;
      button:before {
        opacity: 1;
      }
      button:before {
        color: ${props => props.theme.veryLightPink};
      }
      &.slick-active button:before {
        color: ${props => props.theme.greyishBrown};
      }
      @media (hover: hover) {
        button:hover:before {
          color: ${props => props.theme.greyishBrown};
        }
      }
    }
  }
`;
