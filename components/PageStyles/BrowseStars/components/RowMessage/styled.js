import styled from '@emotion/styled';

const RowStyled = styled.section`
  background: ${props => props.theme.paleGrey};
  border-radius: inherit;
  width: 100%;
  padding: 8px;
  padding-top: 0;
  @media(min-width: 832px) {
    border-radius: 10px;
    padding: 15px;
    background: ${props => props.theme.pureWhite};
    box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.14);
    margin-bottom: 35px;
  }
  .image-wrapper {
      display: inline-flex;
      width: 100px;
      height: 86px;
      position: relative;
      border-radius: inherit;
      margin: 0 auto;
      object-fit: cover;
      display: block;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      @media(min-width: 832px) {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
`;

RowStyled.Container = styled.section`
  display: flex;
  align-items: center;
  .info-icon {
    font-size: 24px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
`;

RowStyled.Description = styled.article`
  color: ${props => props.theme.greyishBrown};
  font-family: Gilroy;
  font-size: 15px;
  padding: 10px 0;
  @media(min-width: 832px) {
    padding: 0;
    color: ${props => props.theme.orangePink};
    font-size: 30px;
  }
`;

RowStyled.Button = styled.a`
  font-family: Gilroy-Medium;
  font-size: 12px;
  color: ${props => props.theme.flatBlue};
  display: block;
  cursor: pointer;
  text-align: center;
  @media(min-width: 832px) {
    font-size: 16px;
    text-align: left;
  }
`;

RowStyled.Avatar = styled.img`
  width: 100px;
  height: 86px;
  border-radius: inherit;
  margin: 0 auto;
  object-fit: cover;
  display: block;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  @media(min-width: 832px) {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

RowStyled.LeftCol = styled.section`
  flex: 1;
  @media(min-width: 832px) {
    margin-right: 10px;
    .image-wrapper {
      display: inline-flex;
      width: 100px;
      height: 86px;
      position: relative;
      margin: 0 auto;
      object-fit: cover;
      display: block;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      @media(min-width: 832px) {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    ${RowStyled.Button} {
      margin-top: 10px;
    }
    ${RowStyled.Avatar} {
      margin-right: 20px;
    }
    display: flex;
    align-items: center;
  }
`;

RowStyled.RightCol = styled.section`
  display: flex;
  align-items: center;
  ${RowStyled.Button} {
    margin-left: 20px;
  }
`;

export default RowStyled;
