import styled from '@emotion/styled';

export const TabList = styled.ul`
  margin: 10px 0;
  width: 100%;
  text-align: center;
`;

export const TabItem = styled.li`
  display: inline-block;
  margin-right: 15px;
  font-size: 12px;
  cursor: pointer;
  padding: 0 10px;
  position: relative;
  font-family: ${props => props.selected ? 'Gilroy-Bold' : 'Gilroy'};
  &:last-child {
    margin-right: 0;
  }
  .highlight {
    color: ${props => props.theme.orangePink};
    font-size: 15px;
    margin-left: 5px;
  }
  ${props => props.selected && `
    border-bottom: 1px solid ${props.theme.greyishBrown};
    padding-bottom: 2px;
  `};
`;
