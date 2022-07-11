import styled from '@emotion/styled';

export const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  @media (max-width: 831px) {
    padding-top: 10px;
    justify-content: center;
    align-items: center;
  }
  .profile-status {
    padding-bottom: 8px;
    font-size: 16px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.brownGrey};
    @media (max-width: 831px) {
      text-align: center;
    }
  }
`;
