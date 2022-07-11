import styled from '@emotion/styled';

const Page404Styled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
  padding: 15px;
  height: 100vh;
  color: ${props => props.theme.greyishBrown};
  @media(min-width: 832px) {
    align-items: center;
  }
`;

Page404Styled.Description = styled.p`
  font-size: 18px;
  font-family: Gilroy-Medium;
  line-height: 24px;
  @media(min-width: 832px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

Page404Styled.MainHeading = styled.h2`
  font-size: 30px;
  font-family: Gilroy-Medium;
  line-height: 39px;
  margin: 23px 0;
  @media(min-width: 832px) {
    font-size: 48px;
    line-height: 57px;
  }
`;

Page404Styled.Image = styled.img`
  width: 180px;
  margin: 0 auto;
  @media(min-width: 832px) {
    width: 320px;
  }
`;

Page404Styled.LogoWrap = styled.section`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  @media(min-width: 832px) {
    position: static;
    margin-top: 22.3px;
  }
`;

Page404Styled.Logo = styled.img`
  height: 50px;
  margin: 0 auto;
  display: block;
`;

Page404Styled.ActionSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .action-btn {
    margin-top: 14.7px;
  }
`;

Page404Styled.Content = styled.section`
  max-width: 650px;
`;

export default Page404Styled;
