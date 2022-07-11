import styled from '@emotion/styled';

export const PlaceholderImg = styled.img`
  width: 54.5px;
  height: 54.54px;
`;

export const PlaceholderText = styled.article`
  font-family: Gilroy-Regular;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.greyishBrown};
  white-space: pre-line;
  max-width: 300px;
  margin: 14px auto;
  text-align: center;
`;

export const PlaceholderWrap = styled.section`
  margin-top: 69px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
