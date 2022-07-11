import styled from '@emotion/styled';

const Wrapper = styled.section`
`;

const LinkItem = styled.a`
  color: ${props => props.theme.flatBlue};
`;

const Heading = styled.h3`
  font-family: Gilroy-Medium;
  font-size: 24px;
  text-transform: uppercase;
  margin-top: 38px;
  text-align: center;
  color: ${props => props.theme.greyAlternate};
  @media(min-width: 1280px) {
    margin-top: 20px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  white-space: pre-wrap;
  .charity {
    font-family: Gilroy-Medium;
    display: block;
  }
`;

 const ContentList = styled.ul`
  .content-item {
    display: flex;
    margin:15px auto;
    .small-title {
      font-size: 10px;
      text-transform: uppercase;
      font-family: Gilroy-Semibold;
      color: ${props => props.theme.brownGrey};
    }
    .description {
      font-size: 18px;
      font-family: Gilroy-Regular;
      color: ${props => props.theme.greyishBrown};
    }
    .icon {
      font-size: 25px;
      min-width: 25px;
    }
    .content {
      margin-left: 17px;
      display: flex;
      flex-direction: column;
    }
  }
 `;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-bottom: ${props => props.paddingBottom ? props.paddingBottom: '0px' } !important;
  padding: 0 10px;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightPink}
  }
  .LinesEllipsis {
    font-size: 14px;
    font-family: Gilroy-Regular;
    margin-bottom: 10px;
  }
  .tag-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .tag-item {
      cursor: pointer;
      font-size: 12px;
      font-family: Gilroy-Medium;
      display: inline-block;
      background: ${props => props.theme.white};
      border: none;
    }
  }
`;

export { Wrapper, Heading, ContentWrapper, ContentList, Description, LinkItem };
