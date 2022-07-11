import styled from '@emotion/styled';


export const Charity = styled.span`
  line-height: 22px;
  display: block;
  margin-top: 17px;
`;

export const PillList = styled.span`
  display: block;
`;

export const RateSection = styled.span`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rate-section {
    font-size: 13px;
    font-family: Gilroy-Regular;
    color: ${props => props.theme.greyishBrown};
    display: flex;
    align-items: center;
    .rate-root {
      .rating-star {
        color: ${props => props.theme.starViolet};
        font-size: 16px;
        margin-right: 2px;
      }
      margin-right: 5px;
    }
  }
  @media(min-width: 832px) {
    margin-top: 10px;
  }
`;

export const Wrap = styled.section`
  font-size: 16px;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.greyishBrown};
  .LinesEllipsis {
    font-family: Gilroy-Regular;
  }
  .char-link {
    color: ${props => props.theme.links ? props.theme.links : 'inherit'};
  }
  .pill-item {
    border: 1px solid ${props => props.theme.veryLightPink};
    color: ${props => props.theme.links ? props.theme.links : props.theme.flatBlue};
    font-size: 12px;
    display: inline-block;
    height: 22px;
    line-height: 17px;
    margin-bottom: 9px;
    margin-right: 9px;
    border-radius: 30px;
    font-family: Gilroy-Medium;
  }
`;
