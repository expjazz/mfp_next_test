import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { maxWidth } from '../../styled';

export const BannerBg = styled.div`
  background-image: url(${props => props.bgBanner});
  background-position: top center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  display: block;
  color: #fff;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.33);
  }
  @media(min-width: 992px) and (max-width: 1200px) {
    padding-bottom: 90px
  }
  @media (max-width: 992px) {
    background-size: cover;
    background-attachment:scroll
  }
  @media (max-width: 767px) {
    background-position: center;
    background-attachment: local;
    background-size: cover;
    height: 280px;
    position: relative;
    &::before {
      background: rgba(0, 0, 0, 0);
    }
  }
`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  height: 427px;
  position: relative;
  display: block;
  ${maxWidth}
  @media(min-width: 992px) and (max-width: 1200px) {
    height: auto;
  }
  .common-btn {
    background: transparent;
    color: ${props => props.theme.pureWhite};
    border-color: ${props => props.theme.pureWhite};
    padding: 5px 15px;
    position: absolute;
    bottom: 168px;
    left: 13px;

    @media(max-width: 768px) {
      top: 120px;
      left: 2px;
    }

    @media(min-width: 768px) {
      bottom: 95px;
      left: 2px;
      top: inherit;
    }

    @media(min-width: 992px) and (max-width: 1200px) {
      bottom: -51px;
    }
  }
`;

export const ContentWrapper = styled.div`
  color: #ffffff;
  width: 581px;
  font-family: gilroy;
  font-size: 50px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.2;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  height: 150px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 90%;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  @media(min-width: 992px) and (max-width: 1200px) {
    height: 100%;
    justify-content: center;
    padding: 35px 0 0;
    margin-bottom: 30px;
  }
  @media(min-width: 767px) and (max-width: 992px) {
    height: 65%;
  }
  p {
    margin: 0;
  }
  @media (max-width: 767px) {
    width: 365px;
    height: 102.3px;
    top: ${props => props.isLoggedIn ? '80px' : '26px'};
    left: 11.5px;
    text-align: left;
    text-align-last: left;
    font-size: 31px;
    line-height: 1.1;
    display: block;
    position: absolute;
  }
  @media(min-width: 1200px) {
    padding-bottom: ${props => props.isLoggedIn ? '80px' : '150px'};
  }
`;
