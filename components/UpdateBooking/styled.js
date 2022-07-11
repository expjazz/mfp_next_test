import Styled from '@emotion/styled';

const UpdateStyled = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .heading {
    max-width: 80%;
    margin: 0 auto;
    margin-top: 34px;
    margin-bottom: 16.8px;
    @media(min-width: 832px) {
      margin-top: 0;
    }
  }
  .textarea-root {
    width: 100%;
    @media(min-width: 832px) {
      width: 50%;
    }
  }
  .reason-textfield {
    margin-bottom: 15px;
  }
  ${props => !props.starMode && `
    padding: 40px 30px;
    @media(max-width: 831px) {
      padding: 36px 30px;
    }
  `}
  .update-header {
    left: 0;
    @media(min-width: 832px) {
      position: absolute;
      padding: 0 14px;
      .header-wrp {
        justify-content: flex-end;
      }
    }
    .help-text {
      display: none;
    }
  }
  .prim-btn {
    padding-top: 6px;
    padding-bottom: 6px;
    min-width: 150px;
    margin-top: 15px;
  }
  .secondary-btn {
    margin-top: 16px;
  }

  .drop-down {
    display: block;
    margin-bottom: 15px;
    width: 100%;
    .select-drop {
      border: 1px solid ${props => props.theme.headerGrey};
    }
    @media(min-width: 832px) {
      min-width: 275px;
      width: 50%;
    }
  }

  @media(min-width: 832px) {
    ${props => props.starMode && `
      margin-top: 20px;
      height: 100%;
    `}
  }
`;

export default UpdateStyled;

export const CharCount = Styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 11px;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 10px;
  padding-top: 3px;
`;