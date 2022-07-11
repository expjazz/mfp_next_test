import styled from '@emotion/styled';
import { LinkStyles } from '../../styles/TextStyled';
const sectionSpacing = '30px';

export const TermsWrap = styled.ul`
  margin-right: 36px;
  margin-top: 5px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

  .search-icon {
    color: ${props => props.theme.brownGrey};
    font-size: 20px;
  }
  #search-term {
    border-radius: 0;
    font-family: Gilroy-Medium;
    font-size: 16px;
  }
  .search-input-root {
    border-radius: 0;
  }
  .suggestion-wrap {
    top: initial;
    bottom: 100%;
    @media(max-width: 831px) {
      height: calc(100vh - 240px);
    }
  }
  .search-root {
    flex: 1;
  }
  .suggestion-wrap {
    z-index: 18;
  }
  .ham-icon {
    margin-left: 10px;
    font-size: 27px;
  }
  @media(max-width: 831px) {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  @media(min-width: 832px) {
    .ham-icon {
      display: none;
    }
    .search-root {
      height: 40px;
      width: 280px;
      min-width: 280px;
    }
  }
`;

export const Logo = styled.img`
  width: auto;
  max-width: 150px;
  display: block;
`;

export const FooterWrap = styled.section`
  padding: 20px 15px 5px;
  padding-top: 24px;
  color: ${props => props.theme.greyishBrown};
  @media(min-width: 832px) {
    padding: 20px 34px;
  }
  .heading {
    font-family: Gilroy-Semibold;
    font-size: 12px;
    line-height: 18px;
    margin-top: 5px;
    display: block;
    text-transform: uppercase;
    &.faint-heading {
      color: ${props => props.theme.brownGrey};
      margin-top: 0;
    }
  }
`;

export const ListItem = styled.li`
  margin-top: 5px;
  ${LinkStyles};
  color: ${props => props.theme.greyishBrown};
  font-family: ${props => props.normalFont ? 'Gilroy-Regular' : 'Gilroy-Medium'};
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  .phone-icon {
    margin-left: 5px;
    font-size: 24px;
    transform: rotate(-20deg);
  }
`;

export const CatWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  ${ListItem} {
    width: 50%;
  }
`;

export const SectionWrapper = styled.section`
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
  @media(min-width: 832px) {
    margin-bottom: ${sectionSpacing};
    margin-right: 50px;

    &:last-child {
      margin-right: 0;
      margin-left: 50px;
    }
  }

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
      img {
        width: 35px;
        margin-left: auto;
        @media (max-width: 831px) {
          margin-left: 10px;
        }
      }
    }
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 832px) {
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: ${sectionSpacing};
  }
`;

export const RightCol = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 25px;
  ${SectionWrapper} {
    margin-right: 0;
  }
  @media(min-width: 832px) {
    margin-top: ${sectionSpacing};
    justify-content: center;
    margin-top: 0;
    margin-bottom: ${sectionSpacing};

  }
  .bottom-blk {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media(min-width: 832px) {
      align-items: center;
    }
  }
  .logo-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;

    section {
      margin-left: 40px;;
    }

    @media(max-width: 831px) {
      flex-direction: column;

      section {
        margin-left: 0;
      }
    }

    .text-container {
      font-size: 12px;
    }
  }

  .copy-right {
    font-size: 12px;
    font-family: 'Gilroy-SemiBold';
  }

  .faint-heading {
    font-size: 12px;
    margin-bottom: 15px;;
  }

  ul {
    display: flex;
    margin-right: 0;
    margin-top: 0;

    @media(max-width: 831px) {
      flex-direction: column;
      display: none;
    }

    li {
      margin-top: 0;

      &:not(:last-child){
        margin-right: 30px;
      }

    }


  }
`;

export const ColWrapper = styled.div`
  position: relative;
  padding-bottom: 70px;

  @media(min-width: 832px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    padding-bottom: 0;
  }
`;
