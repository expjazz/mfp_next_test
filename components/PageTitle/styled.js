import styled from '@emotion/styled';

const PageTitleStyled = styled.div`
  margin-bottom: 25px;
  text-align: center;
`;

PageTitleStyled.Title = styled.h1`
  display: inline;
  background: white;
  padding: 0 35px;

  font-family: 'Gilroy';
  font-size: 36px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.75;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.theme.orangePink};

  @media (max-width: 1023px) {
    padding: 0 3px;
  }
`;

export default PageTitleStyled;
