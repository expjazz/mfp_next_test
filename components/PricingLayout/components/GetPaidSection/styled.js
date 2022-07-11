import styled from '@emotion/styled';

export const Container = styled.div`
    font-size: 14px;
    font-family: arial;
    width: 960px;
    position: relative;
    margin: auto;
    @media only screen and (max-width: 992px) {
        width: 100%;
        padding: 0 15px;
        position: relative;
    }

    p { margin: 0; }
`;

export const Title = styled.div`
    color: ${props => props.theme.greyishBrown};
    display: block;
    font-family: gilroy;
    font-size: 50px;
    font-weight: normal;
    line-height: 1;
    letter-spacing: 0;
    text-align: center;
    text-align-last: center;
    padding: 50px 0 10px;
    @media only screen and (max-width: 767px) {
        text-align: left;
        text-align-last: left;
        font-size: 31px;
        line-height: 1.1;
    }
`;

export const Desc = styled.div`
    color: ${props => props.theme.greyishBrown};
    display: block;
    font-family: gilroy;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: 0;
    text-align: center;
    text-align-last: center;

    @media only screen and (max-width: 767px) {
        text-align: left;
        text-align-last: left;
        font-size: 16px;
    }
`;

export const CompareBtn = styled.a`
    border-radius: 4px;
    box-sizing: border-box;
    color: ${props => props.theme.flatBlue};
    padding: 8px;
    display: block;
    font-family: gilroy;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: 1.3;
    overflow: hidden;
    text-decoration: none;
    text-align: center;
    text-align-last: center;
    margin-bottom: 30px;
    transition: all .5s ease-in-out;
    &:hover { opacity: .8; }
    @media only screen and (max-width: 767px) {
        font-size: 14px;
    }
`;
