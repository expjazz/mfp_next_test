import { css} from '@emotion/react'
import styled from '@emotion/styled'
export const Wrapper = styled.div`
  background: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  padding: 0px 0 12px;
  .scroll {
    display: flex;
    overflow-y: auto;
  }
  .item-link {
    :focus {
      outline: none;
    }
  }
`;

export const IconWrap = styled.span`
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background: ${props => props.theme.pureWhite};
  width: 58px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 10px;
  .svg-inline--fa {
    font-size: 24px;
    color: ${props => props.theme.flatBlue};
  }
`;
export const Label = styled.span`
  font-family: Gilroy-Medium;
  font-size: 10px;
  color: ${props => props.theme.greyishBrown};
`;

const hoverStyle = `
  .label {
    font-family: Gilroy-Bold;
  }
  .icon-wrap {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.6);
    background: ${props =>
      props.theme.links ? props.theme.links : props.theme.flatBlue};
    .svg-inline--fa {
      color: ${props => props.theme.pureWhite};
    }
    #marketing {
      path {
        fill: ${props => props.theme.pureWhite};
      }
    }
  }
`;
export const IconLabel = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .shout-icon {
    margin-top: 6px;
    margin-left: 2px;
    .injected-svg {
      width: 29px;
    }
  }
  @media (hover: hover) {
    :hover {
      
      .label {
        font-family: Gilroy-Bold;
      }
      .icon-wrap {
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.6);
        background: ${props =>
          props.theme.links ? props.theme.links : props.theme.flatBlue};
        .svg-inline--fa {
          color: ${props => props.theme.pureWhite};
        }
        #marketing {
          path {
            fill: ${props => props.theme.pureWhite};
          }
        }
      }
    }
  }
  &.active {
   
    .label {
      font-family: Gilroy-Bold;
    }
    .icon-wrap {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.6);
      background: ${props =>
        props.theme.links ? props.theme.links : props.theme.flatBlue};
      .svg-inline--fa {
        color: ${props => props.theme.pureWhite};
      }
      #marketing {
        path {
          fill: ${props => props.theme.pureWhite};
        }
      }
    }
    
  }
`;

export const Item = styled.span`
  #marketing {
    path {
      fill: ${props => props.theme.flatBlue};
    }
  }
`;
