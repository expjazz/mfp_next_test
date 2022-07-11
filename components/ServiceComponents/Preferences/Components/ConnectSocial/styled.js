import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from '@material-ui/core/Popover';
import { media } from 'styles/mediaQueries';

export const FontIcon = styled(FontAwesomeIcon)`

`;

export const ConnectListItem = styled.article`
  padding: 15px 10px;
  display: flex;
  margin-top: 15px;
  background: ${props => props.theme.pureWhite};
  color: ${props => props.theme.greyishBrown};
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 0;
  .left-section, .right-section {
    display: flex;
  }
  .social-icon {
    font-size: 40px;
  }
  .myfanpark-icon {
    width: 34px;
    margin-bottom: 10px;
  }
  .social-det {
    margin-left: 10px;
    .social-name {
      display: block;
      text-transform: capitalize;
      font-family: Gilroy-Bold;
    }
  }
  .right-section {
    flex-direction: column;
    align-items: flex-end;
    .connect-text {
      text-transform: capitalize;
      font-family: Gilroy-Regular;
    }
    .ellipsis {
      font-size: 37px;
      cursor: pointer;
    }
  }
  ${media.mobileScreen} {
    background: ${props => props.theme.white};
  }
`;

export const PopStyled = styled(Popover)`
  .drop-root {
    .drop-option {
      cursor: pointer;
      padding: 10px;
      text-transform: capitalize;
      display: block;
      &:hover {
        background: ${props => props.theme.white};
      }
    }
  }
`;

export const Wrap = styled.section`
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .promote-link {
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
  .social-list {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .social-ele {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;
      .soc-icon {
        font-size: 40px;
      }
      .soc-name {
        font-family: Gilroy-Bold;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
`;
