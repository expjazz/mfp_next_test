import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import FanViewStyled from '../../styled';

const Wrapper = styled(FanViewStyled)`
  .web-switch {
    display: none;
  }
  .action-root {
    margin: 0 auto;
    width: 100%;
    @media(min-width: 832px) {
      .action-list-li {
        min-width: 106px;
      }
    }
  }
  @media (min-width: 832px) {
    .mob-switch {
      display: none;
    }
    .web-switch {
      display: block;
    }
  }
`;

const EvidenceList = styled.ul`
  ${props => props.isScrollable && `
    overflow-x: auto;
    white-space: nowrap;
    @media (min-width: 832px) {
      height: calc(100% - 10px);
    }
  `};
  margin-bottom: 10px;
  .evidence-item {
    width: 213px;
    height: 250px;
    margin-right: 21px;
    &.no-evidence {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Gilroy-Medium;
      font-size: 18px;
      width: 100%;
      margin: 0;
    }
  }
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 28.7px;
`;

export { Wrapper, ImageSection, EvidenceList }
