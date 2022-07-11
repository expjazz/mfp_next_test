import styled from '@emotion/styled';

export const SponsersContainer = styled.div`
  padding: 30px 40px 0;
  background: #f6f6f6;
  text-align: center;
  padding-bottom: 50px;
`;

export const Container = styled.div`
  width: 90%;
  margin: auto;
  @media (max-width: 992px) {
    width: 96%;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const H2 = styled.h2`
  color: ${props => props.theme.greyishBrown};
  margin-bottom: 20px;
  font-size: 30px;
`;

export const GridImages = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 320px;
    margin: 0 auto;
    img {
      margin: 20px auto;
    }
    .abc {
      width: 50px;
      height: 50px;
    }
    .cbs {
      width: 86px;
      height: 25px;
    }
    .oxygen {
      width: 91px;
      height: 30px;
    }
    .bar {
      width: 116px;
      height: 33px;
    }
  }
`;
