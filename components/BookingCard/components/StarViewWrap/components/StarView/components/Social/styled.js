import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import StarViewStyled from '../../styled';

const Wrapper = styled(StarViewStyled)`
  .right-section {
    margin-top: 21px;
  }
  @media (min-width: 832px) {
    .layout {
      flex-direction: column;
      height: calc(100% - 26px);
    }
  }
  .hidden-upload {
    display: none;
  }
`;

const EvidenceList = styled.ul`
  ${props =>
    props.isScrollable
      ? `
    overflow-x: auto;
    white-space: nowrap;
    @media (min-width: 832px) {
      height: calc(100% - 10px);
    }
  `
      : `
  `};
  margin-bottom: 10px;
  display: flex;
  .evidence-item {
    width: 213px;
    height: 250px;
    margin-right: 21px;
    position: relative;
    .download-icon {
      font-size: 20px;
      color: ${props => props.theme.flatBlue};
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    &.no-evidence {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Gilroy-Light;
      font-size: 14px;
      width: 100%;
      margin: 0;
      height: auto;
      margin-top: 5px;
    }
  }
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .upload-lbl {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy;
    font-size: 14px;
    margin: 0 auto;
    display: block;
    max-width: 260px;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: white;
    text-align: center;
    border: dashed 1px ${props => props.theme.greyishBrown};
    border-radius: 10px;
    cursor: pointer;
    .hidden-upload {
      display: none;
    }
  }
`;

export { Wrapper, EvidenceList, ImageSection };
