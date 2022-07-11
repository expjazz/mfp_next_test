import styled from '@emotion/styled';
import { largeHeading, descStyles , LinkStyles} from 'styles/TextStyled';
import { modalPadding } from '../../styled';

const TypeSelectorWrapper = styled.div`
  text-align: center;
  height: 100%;
  ${modalPadding};
  padding-top: 0;
  .header-wrp {
    justify-content: flex-end;
  }
  @media(min-width: 832px) {
    height: 100%;
    padding-top: 0;
  }
`;

TypeSelectorWrapper.ComponentWrapper = styled.div`
  height: calc(100% - 35px);
  overflow: hidden;
`;

TypeSelectorWrapper.OptionWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
TypeSelectorWrapper.HeaderText = styled.h1`
  ${largeHeading};
  padding: 25px 0 14px;
  color: ${props => props.theme.greyishBrown};
  @media(min-width:832px){
    padding: 0 0 14px;
    margin-bottom: 0;
  }
`;

TypeSelectorWrapper.Type = styled.div`
  cursor: pointer;
  transition: all .2s ease-in-out;
  border-radius: 10px;
  max-width: 450px;
  margin: 0 auto;
  padding: 28px 20px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${props => props.theme.dashButtonGrey};
    box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.16);
  }
`;
TypeSelectorWrapper.Image = styled.span`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 107px;
`;
TypeSelectorWrapper.Label = styled.span`
  display: block;
  font-family: Gilroy-Extrabold;
  font-size: 28px;
  line-height: .89;
  padding-top: 10px;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.theme.headBlue};;
  @media(min-width: 832px){
    line-height: 45px;
    padding-top: 9px;
  }
`;
TypeSelectorWrapper.Description = styled.span`
  display: block;
  ${descStyles};
  text-align: center;
  color: ${props => props.theme.greyishBrown};
  max-width: 250px;
  margin: 0 auto;
  margin-top: 10px;
  @media(min-width: 832px){
    max-width: 300px;
  }
`;

TypeSelectorWrapper.StarText = styled.span`
  font-size: 16px;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.linkBlue};
  max-width: 190px;
  margin: 0 auto;
  margin-top: 15%;
  cursor: pointer;
  @media(min-width: 832px) {
    margin-top: 5%;
  }
`;

export default TypeSelectorWrapper;
