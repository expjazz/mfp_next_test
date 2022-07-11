import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from '../../styled';

export const Wrap = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    ${media.mobileScreen} {
      margin: 15px 0 0;
      font-size: 24px;
      padding-bottom: 3px;
    }
  }
`;

export const SubHeading = styled.span`
  font-size: 14px;
  font-family: Gilroy-Medium;
  line-height: 25px;
  color: ${props => props.theme.greyishBrown};
  margin-bottom: 8px;
  ${media.mobileScreen} {
    font-size: 16px;
  }
`;

export const Title = styled.h5`
  font-family: 14px;
  font-family: Gilroy-Bold;
  margin-top: 19px;
`;

export const StarAvatar = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 50%;
`;

export const DetailWrapper = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  font-family: Gilroy;
  line-height: 23px;
  ${media.mobileScreen} {
    font-size: 16px;
  }
  &.btn-wrp {
    margin-top: 15px;
    flex-direction: row;
  }
  .btn {
    margin-right: 10px;
  }
  &.btn:last-child {
    margin-right: 0;
  }
`;

export const StarName = styled.span`
  font-family: Gilroy-Bold;
`;

export const LinkText = styled.a`
  font-family: Gilroy;
  color: ${props => props.theme.flatBlue};
`;
