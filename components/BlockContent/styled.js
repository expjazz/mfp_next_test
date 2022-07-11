import styled from '@emotion/styled';

const BlockStyled = styled.div`
  cursor: pointer;
`;

BlockStyled.AvatarImage = styled.span`
  width: 100px;
  height: 100px;
  display: flex;
  background: ${props => props.imageURL ? `url(${props.imageURL}) no-repeat` : props.theme.white};
  background-position: center center;
  background-size: cover;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  .play-icon {
    font-size: 27px;
    color: ${props => props.theme.pureWhite};
  }
`;

BlockStyled.Title = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

BlockStyled.Heading = styled.span`
  display: block;
  font-family: Gilroy-Medium;
  font-size: 14px;
`;

export default BlockStyled;
