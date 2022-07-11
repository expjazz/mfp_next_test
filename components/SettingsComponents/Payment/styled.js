import styled from '@emotion/styled';
import { Container, Wrapper } from '../styled';
import CloseIcon from '../../../components/CloseIcon';
import { Dashed } from 'styles/CommonStyled';

export const Layout = styled(Container)`
  height: inherit;
`;

export const Wrap = styled(Wrapper)`
  a {
    width: 100%;
    .d-btn {
      background: ${props => props.theme.pureWhite};
      text-align: left;
    }
  }
  .note-payment {
    padding-bottom: 15px;
  }
`;

export const StyledDashed = styled(Dashed)`
  display: flex;
  position: relative;
`;
export const CardLink = styled.a`
  width: 100%;
  height: 100%;
  text-align: initial;
`;

export const CloseBtn = styled(CloseIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const TruzoContainer = styled.div`
  margin-top: 10px;
`;

export const TruzoFlex = styled.div`
  display: 'flex';
  flex-direction: 'column';
  .content {
    /* padding-left: 20px; */
    span {
      margin: 10px 0;
    }
  }
`;
