import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { largeHeading, LinkStyles } from 'styles/TextStyled';
import Dialog from '@material-ui/core/Dialog';

export const DialogStyled = styled(Dialog)`
  .paperScroll {
    max-width: 700px;
    background-color: transparent;
    overflow-y: inherit;
    background-color: ${props => props.theme.pureWhite};
    ${media.mobileScreen} {
      max-height: 100%;
      overflow-y: auto;
    }
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;

export const LinkTag = styled.a`
  ${LinkStyles};
`;

export const Logo = styled.img`
  width: 210px;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
`;

export const Heading = styled.h5`
  ${largeHeading};
  text-align: center;
`;

export const ModalContainer = styled.div`
  min-height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  .description {
    margin-top: 15px;
  }
  @media(min-width: 832px) {
    width: 700px;
  }
`;
