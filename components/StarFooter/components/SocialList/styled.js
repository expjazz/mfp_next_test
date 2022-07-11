import styled from '@emotion/styled';

export const IconWrapper = styled.ul`
  display: flex;
  margin-top: 30px;
  .icon-wrap {
    margin-right: 15px;
    .icon {
      font-size: 23px;
      &.gigsalad svg {
        width: 23px;
        height: 23px;
        path:first-child {
          fill: ${props => props.theme.greyishBrown};
        }
      }
    }
  }
  @media(min-width: 832px) {
    width: 100%;
  }
`;
