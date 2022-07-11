import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const QuestionWrapper = styled.section`
  display: flex;
  padding-bottom: 18px;
  padding-left: 30px;
  padding-right: 30px;
  svg {
    margin-top: 2px;
    color: ${props => props.theme.orangePink};
  }
`;

export const QuestionTag = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.pureWhite};
  padding-left: 15px;
`;
