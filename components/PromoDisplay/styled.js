import styled from '@emotion/styled';

export const Bold = styled.span`
  font-family: Gilroy-Bold;
`;

export const PromoError = styled.span`
  display: block;
  color: ${props => props.theme.errorRed};
  margin-top: 5px;
  font-size: 14px;
  font-family: Gilroy-Bold;
  text-align: left;
`;

export const InputWrapper = styled.span`
  position: relative;
  flex: 1;
  .input-field {
    padding-right: 24px;
  }
  .promo-close {
    cursor: pointer;
    position: absolute;
    top: 11px;
    right: 10px;
  }
`;

export const InputWrap = styled.section`
  width: 100%;
  display: flex;
  .cta-btn {
    min-width: auto;
    margin-left: 10px;
    padding: 0 10px;
    min-height: auto;
    height: 45px;
   }
`;

export const PromoWrap = styled.section`
  .promo-head {
    font-size: 14px;
    cursor: pointer;
    color: ${props => props.theme.greyishBrown};
    text-decoration: underline;
  }
`;
