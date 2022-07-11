import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 15px;
  .link-wrapper {
    background: ${props => props.theme.white};
    padding: 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    .links {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
    .link-icon {
      font-size: 34px;
      color: ${props => props.theme.brownGreyTwo};
      cursor: pointer;
    }
  }
`;
