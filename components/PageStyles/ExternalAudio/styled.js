import styled from '@emotion/styled';

export const PageTitle = styled.h1`
font-family: Gilroy-Medium;
font-size: 24px;
line-height: 28px;
flex: 1;
color: ${props => props.theme.twilight};
text-transform: ${props => (props.noCapitalise ? 'none' : 'capitalize')};
display: ${props => (props.isTag ? 'none' : 'block')};
@media (min-width: 832px) {
  ${props =>
		props.isTag &&
    `
    color: ${props.theme.twilight};
    font-family: Gilroy-Regular;
    display: block;
    font-size: 50px;
    width: 100%;
    line-height: 1;
    padding-top: 22px;
    padding-bottom: 10px;
    max-width: 832px;
    margin: 0 auto;
  `}
}
@media (min-width: 1280px) {
  ${props =>
		props.isTag &&
    `
    max-width: 1246px;
    margin: 0 auto;
    padding-top: 25px;
  `}
}
`;

export const Container = styled.div`
  padding: 0px 20px;
  width: 100%;
  `;