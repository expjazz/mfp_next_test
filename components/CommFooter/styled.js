import styled from '@emotion/styled';
import { css } from '@emotion/react'

const maxWidth = css`
  margin: 0 auto;
  padding: 0 36px;
  @media(max-width: 831px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

export const FooterContainer = styled.footer`
  padding: 30px 0 20px;
  .subText {
      font-size: 14px;
      line-height: 18px;
      color: ${props => props.theme.greyishBrown};
      display: flex;
      align-items: center;
      .phone-icon {
        margin-left: 5px;
        font-size: 24px;
        transform: rotate(-20deg);
        width: 25px;
        margin-left: auto;
        margin-right: 8px;
        padding-left: 9px;
        @media (max-width: 831px) {
          margin-left: 10px;
        }
      }
      .what-icon {
        width: 35px;
        margin-left: auto;
        @media (max-width: 831px) {
          margin-left: 10px;
        }
      }
    }
    .what-icon {
      width: 35px;
      margin-left: auto;
      @media (max-width: 831px) {
        margin-left: 10px;
      }
    }
  }
`;

export const Container = styled.div`
  ${maxWidth};
`;

export const GridFooter = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
  @media (max-width: 831px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
    .logo-link {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .logo-link {
    align-self: flex-start;
  }
`;

export const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  @media(max-width: 831px) {
    &.icons-container {
      width: 100%;
    }
  }
  @media(min-width: 832px) {
    margin-left: 20px;
    .icons-wrapper > section {
      justify-content: flex-end;
    }
  }
  @media(min-width: 992px) {
    margin-left: 135px;
    margin-top: 20px;
  }

`;

export const ColumnTitle = styled.h3`
  color: ${props => props.theme.brownGrey};
  font-family: gilroy;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.3;
  letter-spacing: 0;
  height: 15px;
  display: block;
  margin-bottom: 5px;
`;

export const MultipleColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  @media (max-width: 831px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  a {
    margin-bottom: 0;
    @media (max-width: 831px) {
      margin-right: 40px;
    }
  }
`;

export const SingleColumn = styled.div`
  display: flex;
  flex-direction: column;
  a {
    margin-bottom: 5px;
  }
`;

export const ImgRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
  .social-icon-footer {
    color: ${props => props.theme.brownGrey};
    font-size: 38px;
    margin-right: 10px;
    @media (min-width: 832px) {
      font-size: 38px;
      margin: 0 0 5px 10px;
    }
  }
  @media (max-width: 831px) {
    margin-bottom: 4px;
    justify-content: start;
    margin-top: 0;
  }
`;

export const ImgRowStore = styled.div`
  img {
    margin-left: 10px;
    @media (max-width: 831px) {
      margin-right: 10px;
      margin-left: 0;
    }
  }
  @media (max-width: 831px) {
    display: flex;
  }
`;

export const FooterLink = styled.a`
  color: ${props => props.theme.flatBlue};
  -webkit-text-decoration: none;
  text-decoration: none;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  font-family: gilroy;
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
  font-style: normal;
  line-height: 1.3;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

export const LogoContainer = styled.div`
  img {
    height: auto;
    max-width: 150px;
  }
  @media (max-width: 992px) {
    display: flex;
    align-items: end;
    justify-content: end;
    height: auto;
  }
`;

export const HelpContainer = styled.section`
  display: flex;
  @media(max-width: 831px) {
    flex-direction: column;
  }
`;

export const LinkContainer = styled.section`
  display: flex;
  @media(max-width: 831px) {
    width: 100%;
  }
  @media(min-width: 832px) {
    flex: 1;
    margin-top: 20px;
  }
  .know-container {
    margin-top: 0;

    @media(max-width: 831px) {
      margin-bottom: 15px;
    }

    h3 {
      font-size: 14px;
      line-height: 15px;
      font-family: Gilroy-Bold;
      color: #555555;
      padding-bottom: 5px;
    }
  }
`;
