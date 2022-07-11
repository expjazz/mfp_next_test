import styled from '@emotion/styled';

export const StoreContainer = styled.div`
    background-color: #f6f6f6;
    position: relative;
    padding-top: 45px;
    height: 191px;
    box-sizing: border-box;
    @media (max-width: 767px) {
        padding: 15px 0;
        height: auto;
    }
`;

export const StoreHead = styled.div`
    color: #555;
    width: 100%;
    font-family: gilroy;
    font-size: 30px;
    font-weight: 700;
    z-index: 100023;
    line-height: 1.5;
    -webkit-letter-spacing: 0;
    -moz-letter-spacing: 0;
    -ms-letter-spacing: 0;
    letter-spacing: 0;
    text-align: center;
    text-align-last: center;
    font-style: normal;
    display: block;
    margin: 0 auto 8px auto;
    p {margin: 0;}
    @media (min-width: 767px) and (max-width: 992px) {
        font-size: 1.4em;
    }
    @media (max-width: 767px) {
        font-size: 1.3em;
        width: 100%;
    }
`;
export const Container = styled.div`
    height: 100%;
    margin: 0 auto;
    position: relative;
    width: 960px;
    @media (max-width: 992px) {
        width: 96%;
    }
    @media (max-width: 767px) {
        width: 100%;
        padding: 0 15px;
    }
`;

export const SubParagraph = styled.p`
    color: #555;
    text-align: center;
    text-align-last: center;
    font-size: 20px;
    font-weight: 400;
    font-family: gilroy;
    margin: auto;
    max-width: 795px;
    @media (max-width: 800px) {
      max-width: 700px;
    }
    @media (max-width: 767px) {
        font-size: 1em;
        width: 100%;
        text-align: center;
    }
    @media (min-width: 767px) and (max-width: 992px) {
        font-size: 1.2em;
    }
`;
