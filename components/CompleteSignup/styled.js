import styled from '@emotion/styled';

export const Content = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
`;

Content.ButtonWrapper = styled.div`
text-align: center;
margin-top: 20px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
@media(min-width: 832px){
  flex-direction: row;
}
  .success-button {
    @media(max-width: 831px){
      margin-bottom:20px;
    }
    @media(min-width: 832px){
      &:first-child {
        width: auto;
      }
      &:last-child {
        margin-left: 24px;
      }
    }
  }
`;
Content.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100px;
  width: 85px;
  margin-bottom: 0;
`;

Content.Description = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  width: 282px;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: ${props => `${props.theme.brownGrey}`};
`;

Content.MainTitle = styled.div`
  font-family: Gilroy;
  font-size: 50px;
  line-height: 1.64;
  letter-spacing: normal;
  text-align: center;
  color: ${props => `${props.theme.flatBlue}`};
  @media (max-width: 831px) {
    padding: 10px;
    line-height: 34px;
    font-size: 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  .leftArrow {
    position: absolute;
  }
  .dots-container {
    @media (max-width: 831px) {
      display: ${props => (props.compSwitch ? 'none' : 'block')};
    }
  }
  .colAlign {
    flex-direction: column;
    align-items: center;
  }
  .content {
    max-width: 470px;
    margin: 0 auto;
  }
  
  }
`;

export const Head = styled.div`
text-align: center;
color: ${props => props.theme.orangePink};
font-size: 24px;
font-family: 'Gilroy';
padding-top: 61px;
@media (max-width: 831px) {
  padding-top: 65px;
  max-width: 230px;
  margin: 0 auto 10.2px;
  line-height: 28px;
}
`;

