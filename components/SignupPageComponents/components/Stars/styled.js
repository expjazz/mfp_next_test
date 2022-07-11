import styled from '@emotion/styled';

export const StarsContainer = styled.div`
  background-color: #f6f6f6;
  text-align: center;
  padding: 20px 0;
`;
export const Container = styled.div`
  width: 960px;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 96%;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
    position: relative;
  }
`;

export const StarsHead = styled.h2`
  font-size: 30px;
  margin-bottom: 35px;
  color: ${props => props.theme.greyishBrown};
  @media (max-width: 767px) {
    width: 100%;
    font-size: 19px;
    display: block;
    font-weight: 600;
    margin: 0 auto 25px;
    color: #444;
  }
`;

export const GridImages = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 992px) {
    .single-img {
      margin-bottom: 20px;
    }
  }

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 320px;
    margin: 0 auto;
  }
`;

export const RoundedThumbnail = styled.img`
  border-radius: 50%;
`;

export const ImageParagraph = styled.p`
  font-family: gilroy;
  font-size: 18px;
  font-weight: 700;
`;
