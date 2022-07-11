import styled from '@emotion/styled';
import { css } from '@emotion/react'

function createCSS(rot, angle, count, circleSize) {
  let rotation = rot;
  let styles = '';
  for (let i = 0; i < count; i += 1) {
    const rotationVal = rotation * 1;
    const circleSizeVal = circleSize / 2;
    const rotateVal = rotation * -1;
    styles += `
    &:nth-of-type(${i}) {
      transform: rotate(${rotationVal}deg)
      translate(${circleSizeVal}px)
      rotate(${rotateVal}deg);
    }

  `;
    rotation += angle;
  }
  return css`
  ${styles}
  `;
}

function onCircle(itemCount, circleSize, itemSize) {
  const angle = 360 / itemCount;
  const rot = 0;
  return `position: relative;
  width: ${circleSize}px;
  height: ${circleSize}px;
  border-radius: 50%;
  padding: 0;
  list-style: none;
  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: calc(-${itemSize}px / 2);
    width: ${itemSize}px;
    height: ${itemSize}px;
    ${createCSS(rot, angle, itemCount, circleSize)}
  }
  `;
}

export const Dot = styled.span`
  background: ${props => {
    if (props.offline) {
      return `${props.active ? props.theme.exclamationWarn : props.theme.white}`;
    }
    return `${props.active ? props.theme.orangePink : props.theme.white}`;
  }};
`;

export const PercentStyled = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px 0;
  .circle-container {
    ${onCircle(20, '145', '15')}
    transform: rotate(-100deg);
    ${Dot} {
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      transition: 0.15s;
    }
  }
  .caution-icon {
    font-size: 45px;
    margin-bottom: 8px;
    margin-left: 4px;
    color: ${props => props.theme.exclamationWarn};
  }
  .wrap-progress-bar {
    position: relative;

    & > span {
      border: 10px solid ${props => props.theme.greyishBrown};
      border-radius: 50%;
      width: 108px;
      height: 108px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 21px;
      top: 98px;
      font: 20px/24px Gilroy-Bold;
      color: ${props => props.theme.orangePink};
    }
  }
`;
