import styled from '@emotion/styled';

export const Wrap = styled.section`
  font-family: Gilroy-Regular;
  font-size: 16px;
  color: ${props => props.theme.greyishBrown};
  margin-top: 10px;
  .customPlaceholder {
    color: ${props => props.theme.lightGrey};
  }
  .language-label {
    margin: 15px 0 5px;
    display: block;
    font-size: 14px;
    line-height: 18px;
    font-family: Gilroy-Regular;
  }
`;
