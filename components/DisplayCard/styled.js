import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const DisplayStyled = styled.div`
  padding: 8px 13px;
  background-color: ${props => props.theme.white};
  ${media.largeScreen} {
    background-color: ${props => props.theme.pureWhite};
  }
  border-radius: 5px;
  box-shadow: 0 3px 16px 0 #dad4d4;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  min-width: 100%;
  box-shadow: none;
  .desc {
    line-height: 24px;
  }
`;

DisplayStyled.Title = styled.span`
  font-family: Gilroy-Medium;
  font-size: 16px;
  color: #969696;
  display: block;
  line-height: 30px;
`;

DisplayStyled.Heading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  display: block;
  line-height: 20px;
`;

DisplayStyled.CloseButton = styled.span`
  width: 25px;
  height: 25px;
  display: block;
  position: absolute;
  right: 10.1px;
  top: 10.1px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .close-icon {
    width: 15px;
    height: 15px;
    color: ${props => props.theme.flatBlue};
  }
`;

export default DisplayStyled;
