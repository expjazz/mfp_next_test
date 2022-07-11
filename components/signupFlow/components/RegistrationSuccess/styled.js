import styled from '@emotion/styled';
import { largeHeading, descStyles } from 'styles/TextStyled';
import { modalPadding } from '../../styled';

const RegSuccessWrapper = styled.div`
  text-align: center;
  ${modalPadding};
  .header-wrp {
    justify-content: flex-end;
  }
`;

RegSuccessWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

RegSuccessWrapper.SectionHead = styled.span`
  font-size: 16px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  line-height: 22px;
`;

RegSuccessWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:832px){
    padding: 0px 29px;
  }
  @media(max-width:831px){
    padding-bottom: 16px;
  }
`;
RegSuccessWrapper.HeaderText = styled.div`
  padding-top: 27px;
  font-family: Gilroy;
  font-size: 23px;
  line-height: 1.25;
  text-align: center;
  color: ${props => props.theme.orangePink};
  @media(max-width:831px){
    padding-top: 20px;
  }
  @media(min-width:832px){
    padding-top: 33px;
  }
`;

RegSuccessWrapper.ButtonWrapper = styled.div`
text-align: center;
margin-top: 30px;
display: flex;
justify-content: center;
flex-wrap: wrap;
${RegSuccessWrapper.SectionHead} {
  width: 100%;
  margin-bottom: 10px;
}
.success-button {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
@media(max-width: 831px){
  padding-bottom:20px;
}
`;

RegSuccessWrapper.Type = styled.div`
  padding-bottom: 0;
  // margin-top: 15px;
  @media(min-width: 832px){
    margin-top: -7px;
  }
`;
RegSuccessWrapper.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 200px;
  margin-bottom: 0;
  @media(max-width: 831px){
    background-size: 207px auto;
  }
  &.success-fan {
    @media screen and (min-width: 832px) and (max-height: 720px) {
      height: 225px;
    }
  }
`;
RegSuccessWrapper.Label = styled.div`
  ${largeHeading};
  text-align: center;
  color:  ${props => props.theme.orangePink};
  padding-top: 10px;
`;
RegSuccessWrapper.Description = styled.div`
  padding-top: 9px;
  ${descStyles};
  text-align: center;
  width: 100%;
  margin: 0 auto;
  @media(min-width: 832px){
    max-width: 450px;
  }
  @media(max-width: 831px){
    color: #7c7c7c;
    margin: 0 auto;
    max-width: 310px;
  }
`;

RegSuccessWrapper.PriceSection = styled.section`
  margin-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .convert-price {
    display: block;
    margin-top: 5px;
    font-family: Gilroy-Medium;
    font-size: 12px;
    text-align: left;
    color: ${props => props.theme.greyishBrown};
  }
  .price-submit {
    margin-top: 15px;
  }
  ${RegSuccessWrapper.Description} {
    padding-top: 0;
  }
  .price-root {
    max-width: 150px;
    margin-top: 15px;
    text-align: left;
  }
`;

RegSuccessWrapper.HighLight = styled.div`
  padding-top: 13px;
  font-family: Gilroy-SemiBold;
  font-size: 18px;
  line-height: 1.44;
  text-align: center;
  color: ${props => props.theme.greyishBrown};
  width: 80%;
  margin: 0 auto;
  @media(max-width: 831px){
    padding-top: 10px;
    color: #7c7c7c;
    width: 100%;
  }
`;

export default RegSuccessWrapper;
