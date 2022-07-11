import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import {
  ProgressBarDiv,
  FillerDiv,
  ProgressBarStarDiv,
  ProgressBarWrapper,
} from './styled';

const Filler = props => {
  const isMobile = useMediaQuery('(max-width: 831px)');
  const { t } = useTranslation();
  return (
    <FillerDiv percentage={props.percentage} className="progress-fill">
      {props.percentage}%{!isMobile && props.percentage >= 20 ? ` ${t('common.complete')}` : ''}
    </FillerDiv>
  );
};

const ProgressBar = props => {
  return (
    <ProgressBarWrapper className="progress-wrap">
      <ProgressBarDiv>
        <Filler percentage={props.percentage} />
      </ProgressBarDiv>
      <ProgressBarStarDiv>
        <FontAwesomeIcon className="message-icon" icon={faStar} />
      </ProgressBarStarDiv>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
