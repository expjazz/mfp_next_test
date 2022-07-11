import styled from '@emotion/styled';

const FundStyled = styled.div`
  width: 100%;
  background: ${props => props.theme.twilight};
  height: 26.1px;
  padding: 4px;
  border-radius: 40px;
  position: relative;
  overflow: auto;
`;

FundStyled.FundProgress = styled.span`
  background: ${props => props.theme.paleBlue};
  transition: width 1s ease;
  width: ${props => props.progress ? `${props.progress}%` : 0};
  max-width: 100%;
  height: 100%;
  border-radius: 40px;
  ${props => props.progress >= '100' ? `
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  ` : `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}
  display: block;
`;

FundStyled.GoalDisplay = styled.span`
  position: absolute;
  right: 16.1px;
  bottom: 3px
  top: 3px;
  display: flex;
  align-items: center;
  font-family: Gilroy-Bold;
  font-size: 12px;
  color: #fff;
  line-height: 17px;
  padding-top: 3px;
`;

export default FundStyled;
