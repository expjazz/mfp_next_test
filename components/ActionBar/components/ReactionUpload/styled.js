import styled from '@emotion/styled';

export const Reaction = styled.section`
  padding: 20px;
  .btn-wrp {
    display: block;
    width: 100%;
    text-align: center;
    .action-btn {
      margin-top: 5px;
      color: ${props => props.theme.flatBlue};
      border: 1px solid ${props => props.theme.flatBlue};
      border-radius: 5px;
      padding: 7px 20px;
      background: #fff;
      cursor: pointer;
      outline: none;
    }
  }
`;

export const ReactionInput = styled.input`
  display: none;
`;

export const ReactionTitle = styled.span`
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #3c3c3c;
  text-align: center;
  padding-bottom: 5px;
`;
