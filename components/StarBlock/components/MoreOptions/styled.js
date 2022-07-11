import styled from '@emotion/styled';

const MoreOption = styled.div`
  width: auto;
  height:auto;
  background-color: #ffffff;
  text-align: center;
  font-size:19px;
  font-family: Gilroy-Medium;
  cursor: pointer;
  border-radius: 10px;
  .auto-fit {
    width: 100%;
  }
  @media (min-width:832px){
    font-family: Gilroy-Regular;
    width: 350px;
  }
  @media (max-width: 831px) {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  & > div:last-child {
    border-bottom: 0px;
  }
  @media(min-width: 832px) {
    width: 350px;
  }
`;

MoreOption.OptionWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  white-space: nowrap;
  line-height: 2;
  ${props => props.dynamicData && `
    white-space: initial;
    line-height: 26px;
    padding: 10px 0;
  `}
  @media (min-width:832px){
    line-height: 2.3;
    ${props => props.dynamicData && `
      line-height: 26px;
    `}
  }
  .first-option {
    color: ${props => props.theme.orangePink};
  }
  .wrap{
    margin-left:27px;
    margin-right:27px;
  }

`;
export default MoreOption;
