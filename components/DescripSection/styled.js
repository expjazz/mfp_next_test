import styled from '@emotion/styled';
import StarProfileStyled from '../PageStyles/CelebrityId/styled';

export const LeftDesc = styled.article`
  flex: 1;
  z-index: 1;
  ${StarProfileStyled.HorzSpacing};
  @media(min-width: 1280px) {
    padding: 0;
    width: calc(100% - 276px);
  }
`;

export const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1280px) {
    flex: 1;
    align-items: flex-start;
  }
`;

export const RightDesc = styled.article`
  z-index: 1;
  @media(min-width: 832px) {
    width: 374px;
    margin-left: 10px;
    margin-top: 10px;
  }
  @media(min-width: 832px) and (max-width: 1279px) {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  @media(min-width: 1280px) {
    margin-left: 30px;
    width: 247px;
  }
`;

export const DescWrapper = styled.section`
  display: flex;
  flex-direction: column;
  ${StarProfileStyled.ContentLimiter};
  .LinesEllipsis {
    font-family: Gilroy-Regular;
    color: ${props => props.theme.greyishBrown};
    display: block;
    width: 100%;
    letter-spacing: normal;
  }
  @media(min-width: 1280px) {
    flex-direction: row;
    padding-left: 229px;
    margin-bottom: ${props => !props.description ? '100px !important' : "0px"};
    ${StarProfileStyled.SectionWrapper};
    margin-top: -150px;
  }
`;
