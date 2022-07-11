import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/CommonStyled';
import { media } from '../../../styles/mediaQueries';

export const Layout = styled.section`
  padding: 40px;
  width: 100%;
  .manage-user-header {
    height: 70px;
  }
  .header-padding {
    padding-top: 30px;
    ${media.webView} {
      padding-top: 0;
    }
  }
  .fieldWrapper {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .MuiFormControl {
    width: 100%;
  }
  .input-field {
    text-align: center;
    font-size: 22px;
    font-size: 20px;
    font-family: Gilroy-Medium;
    ::placeholder {
      color: ${props => props.theme.veryLightPink};
      font-family: Gilroy;
      font-size: 16px;
    }
    :-ms-input-placeholder {
      color: ${props => props.theme.veryLightPink};
      font-family: Gilroy;
      font-size: 16px;
    }
    ::-ms-input-placeholder {
      color: ${props => props.theme.veryLightPink};
      font-family: Gilroy;
      font-size: 16px;
    }
  }
  .note {
    color: ${props => props.theme.brownGrey};
    font-family: Gilroy-Medium;
    padding-top: 20px;
  }
  .social-icons {
    padding-top: 20px;
    .icon-social {
      color: ${props => props.theme.flatBlue};
      font-size: 30px;
      cursor: pointer;
    }
    .iconTwitter {
      margin-left: 20px;
    }
  }
  .search-add-btn {
    margin: 0 auto;
  }
  .star-layout {
    height: 90px;
    width: 50px;
    top: 40%;
    left: 100%;
  }
  .social-btn {
    display: inline-block;
  }
`;

export const Heading = styled.span`
  font-family: Gilroy;
  font-size: 36px;
  color: ${props => props.theme.twilight};
  width: 410px;
  ${media.smallScreen}{
    font-size: 28px;
  }
  ${media.webView} {
    font-size: 45px;
  }
`;
export const FlexBox = styled(FlexCenter)`
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

export const FloatLabel = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;
