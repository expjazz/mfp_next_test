import styled from '@emotion/styled';

export const AboutWrapper = styled.div`
  padding: 20px 0;
  background: #fff;
  .link-row-col,.link-row {
    display: flex;
    flex-direction: column;
  }
  .link-col {
    padding-bottom: 50px;
  }
`;
export const AboutContainer = styled.div`
  margin-top: 90px;
  margin-left: 20px;
`;

export const Heading = styled.div`
text-align: left;
color: ${props => props.theme.flatBlue};
font-size: 24px;
font-family: Gilroy-Medium;
font-weight: normal;
padding-top: 20px;
margin-bottom: 25px;
`;

export const IconWrapper = styled.span`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: center;
  .social-icon-footer {
    color: ${props => props.theme.brownGrey};
    font-size: 50px;
    margin-right: 20px;
  }
`;

export const Anchor = styled.a`
  font-family: Gilroy-Light;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  margin-top: 10px;
`;

export const shareIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
`;

export const StoreIcon = styled.img`
  cursor: pointer;
  width: 90px;
  height: 40px;
  margin-right: 20px;
  display: inline-block;
`;

export const StoreIconWrapper = styled.span`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
  @media(min-width: 832px) {
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 20px;
    margin-right: 0;
    width: 20%;
    justify-content: flex-end;
  }
`;
