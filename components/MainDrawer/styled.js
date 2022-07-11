import styled from '@emotion/styled';
import Drawer from '@material-ui/core/Drawer';

export const Logo = styled.img`
  width: 154px;
  height: 40px;
`;

export const CategoryList = styled.ul`
  padding: 10px 0;
  padding-top: 25px;
  overflow: auto;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
`;

export const CategoryItem = styled.li`
  font-family: Gilroy-Medium;
  font-size: 21px;
  line-height: 46px;
  cursor: pointer;
  position: relative;
  margin-bottom: 5px;
  color: ${props => props.theme.brownGrey};
  text-align: left;
  &:hover {
    border-left: ${props => `5px solid ${props.theme.flatBlue}`};
    color: ${props => props.theme.flatBlue};
    padding-left: 13px;
  }
`;

export const Wrapper = styled(Drawer)`
  .drawer-paper {
    padding: 10px 18px;
    width: 314px;
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: ${props => props.theme.greyishBrown};
  }
`;
